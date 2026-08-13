import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    // If marking as completed, set completed_at and award 20 points
    if (body.status === 'completed' && !body.completed_at) {
      body.completed_at = new Date().toISOString()

      // Award flat 20 points for task completion
      const task = await queryOne<{ assigned_to: string; title: string }>(
        'SELECT assigned_to, title FROM tasks WHERE id = $1',
        [id]
      )
      if (task && task.assigned_to) {
        const newPoints = 20
        const addedReason = `Task "${task.title}" completed! 🏆 (+20)`

        const d = new Date()
        const offset = d.getTimezoneOffset() * 60000
        const istTime = new Date(d.getTime() + offset + (330 * 60000))
        const todayStr = istTime.toISOString().slice(0, 10)

        const existingPoint = await queryOne<{ points: number; reason: string }>(
          'SELECT points, reason FROM employee_points WHERE employee_id = $1 AND report_date = $2',
          [task.assigned_to, todayStr]
        )

        const totalPoints = (existingPoint?.points || 0) + newPoints
        const totalReason = existingPoint?.reason ? existingPoint.reason + ' | ' + addedReason : addedReason

        await execute(
          `INSERT INTO employee_points (employee_id, report_date, points, reason, updated_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (employee_id, report_date) DO UPDATE SET
             points = EXCLUDED.points,
             reason = EXCLUDED.reason,
             updated_at = EXCLUDED.updated_at`,
          [task.assigned_to, todayStr, totalPoints, totalReason, new Date().toISOString()]
        )
      }
    }

    const keys = Object.keys(body)
    if (keys.length === 0) {
      const existingTask = await queryOne('SELECT * FROM tasks WHERE id = $1', [id])
      return NextResponse.json(existingTask)
    }

    const setClauses = keys.map((key, i) => `${key} = $${i + 1}`)
    const values = keys.map(key => body[key])
    values.push(id)

    const updatedTask = await queryOne(
      `UPDATE tasks SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    )

    return NextResponse.json(updatedTask)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await execute('DELETE FROM tasks WHERE id = $1', [id])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// POST /api/tasks/[id] — add a progress comment
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { comment, progress_percent } = await req.json()

    const data = await queryOne(
      `INSERT INTO task_updates (task_id, updated_by, comment, progress_percent)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, user.userId, comment, progress_percent || 0]
    )

    return NextResponse.json(data)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
