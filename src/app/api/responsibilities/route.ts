import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// GET /api/responsibilities?employee_id=xxx
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'
  const { searchParams } = new URL(req.url)
  const employeeId = searchParams.get('employee_id')

  const targetId = isAdmin && employeeId ? employeeId : user.userId

  try {
    const data = await query(
      `SELECT id, title, daily_target, sort_order
       FROM employee_responsibilities
       WHERE employee_id = $1
         AND title NOT ILIKE '%enrollment%'
         AND title NOT ILIKE '%admission%'
       ORDER BY sort_order ASC`,
      [targetId]
    )

    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}

// POST /api/responsibilities — admin adds a responsibility
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (user.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

  try {
    const body = await req.json()
    const { employee_id, title, daily_target, sort_order } = body

    const data = await queryOne(
      `INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [employee_id, title, daily_target || null, sort_order || 0]
    )

    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// DELETE /api/responsibilities?id=xxx
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (user.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  try {
    await execute('DELETE FROM employee_responsibilities WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
