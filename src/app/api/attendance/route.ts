import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') // e.g. 2026-05
  const employeeId = searchParams.get('employee_id')

  if (!month) return NextResponse.json({ error: 'Month is required' }, { status: 400 })

  const dateFrom = `${month}-01`
  const d0 = new Date(`${dateFrom}T00:00:00`)
  const dateTo = new Date(d0.getFullYear(), d0.getMonth() + 1, 1).toISOString().slice(0, 10)

  try {
    let sql = `
      SELECT 
        ea.*,
        json_build_object(
          'id', p.id,
          'full_name', p.full_name,
          'avatar_url', p.avatar_url,
          'designation', p.designation
        ) AS employee
      FROM employee_attendance ea
      LEFT JOIN profiles p ON p.id = ea.employee_id
      WHERE ea.date >= $1 AND ea.date < $2
    `
    const params: unknown[] = [dateFrom, dateTo]

    if (user.role !== 'admin') {
      // Employees can only see their own attendance
      params.push(user.userId)
      sql += ` AND ea.employee_id = $${params.length}`
    } else if (employeeId) {
      // Admin filtering by specific employee
      params.push(employeeId)
      sql += ` AND ea.employee_id = $${params.length}`
    }

    sql += ` ORDER BY ea.date ASC`

    const data = await query(sql, params)
    return NextResponse.json(data || [])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'

  try {
    const body = await req.json()
    const { date, status } = body
    const targetEmployeeId = (isAdmin && body.employee_id) ? body.employee_id : user.userId

    if (!date || !status) {
      return NextResponse.json({ error: 'Date and status required' }, { status: 400 })
    }

    if (status === 'DELETE') {
      if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      await execute('DELETE FROM employee_attendance WHERE employee_id = $1 AND date = $2', [targetEmployeeId, date])
      return NextResponse.json({ success: true })
    }

    // You can't mark attendance for future dates
    const todayIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
    if (date > todayIST && !isAdmin) {
      return NextResponse.json({ error: 'Cannot mark attendance for future dates' }, { status: 400 })
    }

    const data = await queryOne(
      `INSERT INTO employee_attendance (employee_id, date, status, updated_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (employee_id, date) DO UPDATE SET
         status = EXCLUDED.status,
         updated_at = EXCLUDED.updated_at
       RETURNING *`,
      [targetEmployeeId, date, status, new Date().toISOString()]
    )

    // ── Auto Sandwich Leave Logic ──
    // If leave is marked on Saturday or Monday, check the other side of the weekend.
    if (status === 'leave' || status === 'leave_pending') {
      const d = new Date(date + 'T00:00:00')
      const day = d.getDay() // 0=Sun, 1=Mon, 6=Sat

      if (day === 1 || day === 6) {
        // Find the adjacent Saturday (if today is Mon) or Monday (if today is Sat)
        const checkOffset = day === 1 ? -2 : 2
        const adjacentDate = new Date(d)
        adjacentDate.setDate(adjacentDate.getDate() + checkOffset)
        const adjacentDateStr = adjacentDate.toISOString().slice(0, 10)

        const adjacentRec = await queryOne<{ status: string }>(
          `SELECT status FROM employee_attendance WHERE employee_id = $1 AND date = $2`,
          [targetEmployeeId, adjacentDateStr]
        )

        if (adjacentRec && (adjacentRec.status === 'leave' || adjacentRec.status === 'leave_pending')) {
          // Both Sat and Mon are leaves! Add sandwich leave for Sunday.
          const sundayDate = new Date(d)
          sundayDate.setDate(sundayDate.getDate() + (day === 1 ? -1 : 1))
          
          await execute(
            `INSERT INTO employee_attendance (employee_id, date, status, updated_at)
             VALUES ($1, $2, 'sandwich_leave', $3)
             ON CONFLICT (employee_id, date) DO UPDATE SET
               status = EXCLUDED.status,
               updated_at = EXCLUDED.updated_at`,
            [targetEmployeeId, sundayDate.toISOString().slice(0, 10), new Date().toISOString()]
          )
        }
      }
    }

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
