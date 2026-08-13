import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { formatPhoneForWhatsApp, isDeadlineApproaching } from '@/lib/utils'

// POST /api/tasks — create task (admin only)
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: callerProfile } = await supabase
      .from('profiles').select('role, full_name, phone').eq('id', user.id).single()
    if (callerProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, assigned_to, task_type, priority, deadline, notes } = body

    if (!title || !assigned_to) {
      return NextResponse.json({ error: 'title and assigned_to are required' }, { status: 400 })
    }

    const { data: task, error } = await supabase.from('tasks').insert({
      title,
      description,
      assigned_to,
      assigned_by: user.id,
      task_type: task_type || 'assigned',
      priority: priority || 'medium',
      deadline,
      notes,
      status: 'pending',
      reminder_sent: false,
    }).select().single()

    if (error) throw error

    // ── Fetch assignee profile (name + phone) ─────────────────────────────
    const { data: assigneeProfile } = await supabase
      .from('profiles')
      .select('full_name, phone')
      .eq('id', assigned_to)
      .single()

    // ── Fetch admin name ──────────────────────────────────────────────────
    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    const deadlineStr = deadline
      ? new Intl.DateTimeFormat('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true,
          timeZone: 'Asia/Kolkata'
        }).format(new Date(deadline))
      : 'No deadline set'

    const priorityLabel = (priority || 'medium').charAt(0).toUpperCase() + (priority || 'medium').slice(1)

    // ── In-app notification ───────────────────────────────────────────────
    await supabase.from('notifications').insert({
      user_id: assigned_to,
      title: '📋 New Task Assigned',
      message: `"${title}" has been assigned to you by ${adminProfile?.full_name || 'Admin'}. Priority: ${priorityLabel}. Deadline: ${deadlineStr}`,
      type: 'info',
      task_id: task.id,
    })

    // ── WhatsApp via AiSensy (instant on assignment) ──────────────────────
    const AISENSY_KEY = process.env.AISENSY_API_KEY || ''
    const DEFAULT_EMPLOYEE_PHONE = '9768726006'   // fallback test number

    if (AISENSY_KEY && AISENSY_KEY !== 'your-aisensy-api-key-here') {
      const AISENSY_ENDPOINT = 'https://backend.aisensy.com/campaign/t1/api/v2'
      
      // 1. Send to Assignee
      const empRaw = (assigneeProfile?.phone && assigneeProfile.phone.trim().length >= 10)
        ? assigneeProfile.phone
        : DEFAULT_EMPLOYEE_PHONE
      const empCleaned = empRaw.replace(/\D/g, '')
      const empE164 = empCleaned.startsWith('91') ? empCleaned : `91${empCleaned}`

      try {
        await fetch(AISENSY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey: AISENSY_KEY,
            campaignName: 'task_assigned',
            destination: empE164,
            userName: assigneeProfile?.full_name || 'Employee',
            templateParams: [
              assigneeProfile?.full_name || 'Team',
              title,
              priorityLabel,
              deadlineStr,
              callerProfile?.full_name || 'Admin',
            ],
            source: 'rushipandit-portal',
            media: {},
            buttons: []
          })
        })
        console.log(`[WA-Assign] Sent to Employee: ${empE164}`)
      } catch (waErr: any) {
        console.error('[WA-Assign] Emp Error:', waErr.message)
      }

      // 2. Send to Admin (Rushikesh) - Confirmation of assignment
      if (callerProfile?.phone) {
        const adminRaw = callerProfile.phone.trim()
        const adminCleaned = adminRaw.replace(/\D/g, '')
        const adminE164 = adminCleaned.startsWith('91') ? adminCleaned : `91${adminCleaned}`

        try {
          await fetch(AISENSY_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              apiKey: AISENSY_KEY,
              campaignName: 'task_assigned_admin_info', // ← Suggesting a separate template or use same
              destination: adminE164,
              userName: callerProfile.full_name,
              templateParams: [
                callerProfile.full_name,            // {{1}} Admin Name
                title,                               // {{2}} Task Title
                assigneeProfile?.full_name || '-',   // {{3}} Assigned To
                priorityLabel,                       // {{4}} Priority
                deadlineStr                          // {{5}} Deadline
              ],
              source: 'rushipandit-portal',
              media: {},
              buttons: []
            })
          })
          console.log(`[WA-Assign] Sent to Admin: ${adminE164}`)
        } catch (waErr: any) {
          console.error('[WA-Assign] Admin Error:', waErr.message)
        }
      }
    }

    return NextResponse.json(task)

  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// GET /api/tasks — list tasks
export async function GET(req: NextRequest) {
  try {
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

    let query = supabase
      .from('tasks')
      .select(`
        *,
        assigned_to_profile:profiles!tasks_assigned_to_fkey(id, full_name, email, avatar_url),
        assigned_by_profile:profiles!tasks_assigned_by_fkey(id, full_name),
        task_updates(id, comment, progress_percent, created_at, updated_by)
      `)
      .order('created_at', { ascending: false })

    // Employees only see their own tasks (RLS handles this, but double-check)
    if (profile?.role !== 'admin') {
      query = query.eq('assigned_to', user.id)
    }

    const { data, error } = await query
    if (error) throw error

    const response = NextResponse.json(data)
    response.headers.set('Cache-Control', 's-maxage=15, stale-while-revalidate=30')
    return response
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// Cron reminder check — called by Vercel Cron or internal API
export async function PUT(req: NextRequest) {
  // Secure cron endpoint
  const cronSecret = req.headers.get('x-cron-secret')
  if (cronSecret !== process.env.CRON_SECRET && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = supabaseAdmin()

    // Find assigned tasks approaching deadline within 1 hour, reminder not yet sent
    const now = new Date()
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assigned_to_profile:profiles!tasks_assigned_to_fkey(
          id, full_name, whatsapp_number, email
        )
      `)
      .eq('task_type', 'assigned')
      .eq('reminder_sent', false)
      .neq('status', 'completed')
      .neq('status', 'cancelled')
      .gte('deadline', now.toISOString())
      .lte('deadline', oneHourLater.toISOString())

    if (error) throw error

    const results: { task: string; status: string }[] = []

    for (const task of tasks || []) {
      const profile = task.assigned_to_profile as {
        id: string
        full_name: string
        whatsapp_number: string | null
        email: string
      } | null

      if (!profile) continue

      // Send WhatsApp via AiSensy
      if (profile.whatsapp_number && process.env.AISENSY_API_KEY) {
        try {
          const waNumber = formatPhoneForWhatsApp(profile.whatsapp_number)
          const deadlineStr = task.deadline
            ? new Date(task.deadline).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            : 'soon'

          const response = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-AiSensy-Project-API-PWD': process.env.AISENSY_API_KEY,
            } as HeadersInit,
            body: JSON.stringify({
              apiKey: process.env.AISENSY_API_KEY,
              campaignName: process.env.AISENSY_CAMPAIGN_NAME || 'task_reminder',
              destination: waNumber,
              userName: profile.full_name,
              templateParams: [profile.full_name, task.title, deadlineStr],
              source: 'rushi-portal',
              media: {},
              buttons: [],
              carouselCards: [],
              location: {},
            }),
          })

          results.push({
            task: task.title,
            status: response.ok ? 'whatsapp_sent' : `whatsapp_failed_${response.status}`,
          })
        } catch {
          results.push({ task: task.title, status: 'whatsapp_error' })
        }
      }

      // Create in-portal reminder notification
      await supabase.from('notifications').insert({
        user_id: task.assigned_to,
        title: 'Task Deadline Reminder',
        message: `"${task.title}" is due in less than 1 hour!`,
        type: 'reminder',
        task_id: task.id,
      })

      // Mark reminder as sent
      await supabase.from('tasks').update({ reminder_sent: true }).eq('id', task.id)
    }

    return NextResponse.json({ processed: tasks?.length || 0, results })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
