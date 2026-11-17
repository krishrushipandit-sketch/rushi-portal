import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

/**
 * POST /api/employees/[id]/offboard
 *
 * Offboards an employee:
 *  1. Deactivates their account (is_active = false)
 *  2. Reassigns open leads to another employee (or unassigns if no reassign_to)
 *  3. Unassigns open tasks
 *  4. Removes round-robin industry skills so they stop receiving leads
 *
 * Body: { reassign_to?: string }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (id === user.userId) return NextResponse.json({ error: 'You cannot offboard yourself' }, { status: 400 })

    const body = await req.json().catch(() => ({}))
    const { reassign_to } = body as { reassign_to?: string }

    // 1. Count new leads from the current month before reassigning
    const [leadCount] = await query<{ count: string }>(
      `SELECT COUNT(*) AS count FROM leads
       WHERE assigned_to = $1
         AND status = 'new'
         AND created_at >= date_trunc('month', NOW())`,
      [id]
    )

    // 2. Reassign ONLY uncontacted new leads of the current month
    // All worked/pipeline leads (ringing, callback, interested, etc.) and older historical leads remain with the employee!
    if (reassign_to) {
      await execute(
        `UPDATE leads SET assigned_to = $1, updated_at = NOW()
         WHERE assigned_to = $2
           AND status = 'new'
           AND created_at >= date_trunc('month', NOW())`,
        [reassign_to, id]
      )
    } else {
      await execute(
        `UPDATE leads SET assigned_to = NULL, updated_at = NOW()
         WHERE assigned_to = $1
           AND status = 'new'
           AND created_at >= date_trunc('month', NOW())`,
        [id]
      )
    }

    // 3. Unassign open tasks (keep them visible for admin, just remove assignee)
    const [taskCount] = await query<{ count: string }>(
      `SELECT COUNT(*) AS count FROM tasks
       WHERE assigned_to = $1
         AND status NOT IN ('completed', 'cancelled')`,
      [id]
    )
    await execute(
      `UPDATE tasks SET assigned_to = NULL, updated_at = NOW()
       WHERE assigned_to = $1
         AND status NOT IN ('completed', 'cancelled')`,
      [id]
    )

    // 4. Remove industry skills so they stop getting round-robin lead assignments
    await execute(
      `DELETE FROM sales_industry_skills WHERE employee_id = $1`,
      [id]
    ).catch(() => {})

    // 5. Deactivate the account
    await execute(
      `UPDATE profiles SET is_active = false, updated_at = NOW() WHERE id = $1`,
      [id]
    )

    return NextResponse.json({
      success: true,
      summary: {
        leadsReassigned: parseInt(leadCount?.count || '0'),
        tasksUnassigned: parseInt(taskCount?.count || '0'),
        reassignedTo: reassign_to || null,
      },
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
