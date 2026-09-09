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

    // Auto-ensure required tasks for Suyog and Kedar
    const targetUser = await queryOne<{ email: string; full_name: string }>(
      'SELECT email, full_name FROM profiles WHERE id = $1',
      [targetId]
    ).catch(() => null)

    if (targetUser) {
      const email = (targetUser.email || '').toLowerCase()
      const isMediaEditor = email.includes('suyog') || email.includes('kedar')

      if (isMediaEditor) {
        const requiredTasks = [
          { title: 'YouTube', target: 1, ord: 1 },
          { title: 'Reel', target: 4, ord: 2 },
          { title: 'Shoot', target: 0, ord: 3 },
          { title: 'External shoot', target: 0, ord: 4 },
          { title: 'External editing', target: 4, ord: 5 },
          { title: 'Internal shoot', target: 0, ord: 6 },
          { title: 'Internal editing', target: 4, ord: 7 }
        ]

        let needsReload = false
        for (const t of requiredTasks) {
          const exists = (data || []).some(
            (d: any) => d.title.toLowerCase().trim() === t.title.toLowerCase().trim()
          )
          if (!exists) {
            await execute(
              `INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
               VALUES ($1, $2, $3, $4)`,
              [targetId, t.title, t.target, t.ord]
            ).catch(() => {})
            needsReload = true
          }
        }

        if (needsReload) {
          const reloaded = await query(
            `SELECT id, title, daily_target, sort_order
             FROM employee_responsibilities
             WHERE employee_id = $1
               AND title NOT ILIKE '%enrollment%'
               AND title NOT ILIKE '%admission%'
             ORDER BY sort_order ASC`,
            [targetId]
          )
          return NextResponse.json(reloaded || [])
        }
      }
    }

    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}

// POST /api/responsibilities — add a daily report task
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'

  try {
    const body = await req.json()
    const { employee_id, title, daily_target, sort_order } = body

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const targetEmpId = isAdmin && employee_id ? employee_id : user.userId

    const data = await queryOne(
      `INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [targetEmpId, title.trim(), daily_target !== undefined && daily_target !== '' ? Number(daily_target) : null, sort_order || 0]
    )

    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// PATCH /api/responsibilities — edit an existing daily report task
export async function PATCH(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'

  try {
    const body = await req.json()
    const { id, title, daily_target } = body

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    let updated: any
    if (isAdmin) {
      updated = await queryOne(
        `UPDATE employee_responsibilities
         SET title = COALESCE($1, title),
             daily_target = $2
         WHERE id = $3
         RETURNING *`,
        [title?.trim() || null, daily_target !== undefined && daily_target !== '' ? Number(daily_target) : null, id]
      )
    } else {
      updated = await queryOne(
        `UPDATE employee_responsibilities
         SET title = COALESCE($1, title),
             daily_target = $2
         WHERE id = $3 AND employee_id = $4
         RETURNING *`,
        [title?.trim() || null, daily_target !== undefined && daily_target !== '' ? Number(daily_target) : null, id, user.userId]
      )
    }

    if (!updated) {
      return NextResponse.json({ error: 'Task not found or not permitted' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// DELETE /api/responsibilities?id=xxx — delete a daily report task
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  try {
    if (isAdmin) {
      await execute('DELETE FROM employee_responsibilities WHERE id = $1', [id])
    } else {
      await execute('DELETE FROM employee_responsibilities WHERE id = $1 AND employee_id = $2', [id, user.userId])
    }
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
