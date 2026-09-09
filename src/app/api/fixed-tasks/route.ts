import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

async function ensureTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS employee_fixed_tasks (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(employee_id, title)
    )
  `)
}

// GET /api/fixed-tasks — returns the employee's own fixed daily tasks
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await ensureTable()
    const data = await query(
      `SELECT id, title, sort_order, created_at
       FROM employee_fixed_tasks
       WHERE employee_id = $1
       ORDER BY sort_order ASC, created_at ASC`,
      [user.userId]
    )
    return NextResponse.json(data || [])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST /api/fixed-tasks — add a fixed task
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await ensureTable()
    const { title, sort_order } = await req.json()
    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Get next sort_order
    const maxRow = await queryOne<{ max_order: number }>(
      `SELECT COALESCE(MAX(sort_order), -1) + 1 AS max_order FROM employee_fixed_tasks WHERE employee_id = $1`,
      [user.userId]
    )

    const data = await queryOne(
      `INSERT INTO employee_fixed_tasks (employee_id, title, sort_order)
       VALUES ($1, $2, $3)
       ON CONFLICT (employee_id, title) DO NOTHING
       RETURNING *`,
      [user.userId, title.trim(), sort_order ?? (maxRow?.max_order ?? 0)]
    )

    if (!data) {
      return NextResponse.json({ error: 'Task already exists' }, { status: 409 })
    }
    return NextResponse.json(data, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE /api/fixed-tasks?id=xxx — remove a fixed task
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  try {
    await execute(
      `DELETE FROM employee_fixed_tasks WHERE id = $1 AND employee_id = $2`,
      [id, user.userId]
    )
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
