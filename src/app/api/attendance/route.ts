import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAuth(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const { data: { user } } = await db().auth.getUser(token)
  if (!user) return null
  const { data: profile } = await db().from('profiles').select('role').eq('id', user.id).single()
  return { user, profile }
}

export async function GET(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { user, profile } = auth

  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') // e.g. 2026-05
  const employeeId = searchParams.get('employee_id')

  if (!month) return NextResponse.json({ error: 'Month is required' }, { status: 400 })

  const dateFrom = `${month}-01`
  const d0 = new Date(`${dateFrom}T00:00:00`)
  const dateTo = new Date(d0.getFullYear(), d0.getMonth() + 1, 1).toISOString().slice(0, 10)

  try {
    let query = db()
      .from('employee_attendance')
      .select('*, employee:profiles!employee_attendance_employee_id_fkey(id, full_name, avatar_url, designation)')
      .gte('date', dateFrom)
      .lt('date', dateTo)

    if (profile?.role !== 'admin') {
      // Employees can only see their own attendance
      query = query.eq('employee_id', user.id)
    } else if (employeeId) {
      // Admin filtering by specific employee
      query = query.eq('employee_id', employeeId)
    }

    const { data, error } = await query.order('date', { ascending: true })
    if (error) throw error

    return NextResponse.json(data || [])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { user, profile } = auth
  const isAdmin = profile?.role === 'admin'

  try {
    const body = await req.json()
    const { date, status } = body
    const targetEmployeeId = (isAdmin && body.employee_id) ? body.employee_id : user.id

    if (!date || !status) {
      return NextResponse.json({ error: 'Date and status required' }, { status: 400 })
    }

    if (status === 'DELETE') {
      if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      await db().from('employee_attendance').delete().eq('employee_id', targetEmployeeId).eq('date', date)
      return NextResponse.json({ success: true })
    }

    // You can't mark attendance for future dates
    const todayIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
    if (date > todayIST && !isAdmin) {
      return NextResponse.json({ error: 'Cannot mark attendance for future dates' }, { status: 400 })
    }

    const { data, error } = await db()
      .from('employee_attendance')
      .upsert({
        employee_id: targetEmployeeId,
        date,
        status,
        updated_at: new Date().toISOString()
      }, { onConflict: 'employee_id,date' })
      .select()
      .single()

    if (error) throw error

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

        const { data: adjacentRec } = await db()
          .from('employee_attendance')
          .select('status')
          .eq('employee_id', targetEmployeeId)
          .eq('date', adjacentDateStr)
          .single()

        if (adjacentRec && (adjacentRec.status === 'leave' || adjacentRec.status === 'leave_pending')) {
          // Both Sat and Mon are leaves! Add sandwich leave for Sunday.
          const sundayDate = new Date(d)
          sundayDate.setDate(sundayDate.getDate() + (day === 1 ? -1 : 1))
          
          await db().from('employee_attendance').upsert({
            employee_id: targetEmployeeId,
            date: sundayDate.toISOString().slice(0, 10),
            status: 'sandwich_leave',
            updated_at: new Date().toISOString()
          }, { onConflict: 'employee_id,date' })
        }
      }
    }

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
