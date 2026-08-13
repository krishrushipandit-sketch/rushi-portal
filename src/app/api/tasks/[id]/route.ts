import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    // If marking as completed, set completed_at and award 20 points
    if (body.status === 'completed' && !body.completed_at) {
      body.completed_at = new Date().toISOString()

      // Award flat 20 points for task completion
      const { data: task } = await supabase.from('tasks').select('assigned_to, title').eq('id', id).single()
      if (task && task.assigned_to) {
        const newPoints = 20
        const addedReason = `Task "${task.title}" completed! 🏆 (+20)`

        const d = new Date()
        const offset = d.getTimezoneOffset() * 60000
        const istTime = new Date(d.getTime() + offset + (330 * 60000))
        const todayStr = istTime.toISOString().slice(0, 10)

        const { data: existingPoint } = await supabase
          .from('employee_points')
          .select('points, reason')
          .eq('employee_id', task.assigned_to)
          .eq('report_date', todayStr)
          .single()

        const totalPoints = (existingPoint?.points || 0) + newPoints
        const totalReason = existingPoint?.reason ? existingPoint.reason + ' | ' + addedReason : addedReason

        await supabase.from('employee_points').upsert({
          employee_id: task.assigned_to,
          report_date: todayStr,
          points: totalPoints,
          reason: totalReason,
          updated_at: new Date().toISOString()
        }, { onConflict: 'employee_id,report_date' })
      }
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
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
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// POST /api/tasks/[id]/update — add a progress comment
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { comment, progress_percent } = await req.json()

    const { data, error } = await supabase.from('task_updates').insert({
      task_id: id,
      updated_by: user.id,
      comment,
      progress_percent: progress_percent || 0,
    }).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
