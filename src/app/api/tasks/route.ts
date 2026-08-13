import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import { formatPhoneForWhatsApp } from '@/lib/utils'

// POST /api/tasks — create task (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const callerProfile = await queryOne<{ full_name: string; phone: string }>(
      'SELECT full_name, phone FROM profiles WHERE id = $1',
      [user.userId]
    )

    const body = await req.json()
    const { title, description, assigned_to, task_type, priority, deadline, notes } = body

    if (!title || !assigned_to) {
      return NextResponse.json({ error: 'title and assigned_to are required' }, { status: 400 })
    }

    const task = await queryOne(
      `INSERT INTO tasks (title, description, assigned_to, assigned_by, task_type, priority, deadline, notes, status, reminder_sent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', false)
       RETURNING *`,
      [
        title,
        description || null,
        assigned_to,
        user.userId,
        task_type || 'assigned',
        priority || 'medium',
        deadline || null,
        notes || null,
      ]
    )

    if (!task) throw new Error('Failed to create task')

    // ── Fetch assignee profile (name + phone) ─────────────────────────────
    const assigneeProfile = await queryOne<{ full_name: string; phone: string }>(
      'SELECT full_name, phone FROM profiles WHERE id = $1',
      [assigned_to]
    )

    // ── Fetch admin name ──────────────────────────────────────────────────
    const adminProfile = await queryOne<{ full_name: string }>(
      'SELECT full_name FROM profiles WHERE id = $1',
      [user.userId]
    )

    const deadlineStr = deadline
      ? new Intl.DateTimeFormat('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true,
          timeZone: 'Asia/Kolkata'
        }).format(new Date(deadline))
      : 'No deadline set'

    const priorityLabel = (priority || 'medium').charAt(0).toUpperCase() + (priority || 'medium').slice(1)

    // ── In-app notification ───────────────────────────────────────────────
    await execute(
      `INSERT INTO notifications (user_id, title, message, type, task_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        assigned_to,
        '📋 New Task Assigned',
        `"${title}" has been assigned to you by ${adminProfile?.full_name || 'Admin'}. Priority: ${priorityLabel}. Deadline: ${deadlineStr}`,
        'info',
        (task as any).id,
      ]
    )

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
              campaignName: 'task_assigned_admin_info',
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
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    let sql = `
      SELECT 
        t.*,
        json_build_object(
          'id', p_to.id,
          'full_name', p_to.full_name,
          'email', p_to.email,
          'avatar_url', p_to.avatar_url
        ) AS assigned_to_profile,
        json_build_object(
          'id', p_by.id,
          'full_name', p_by.full_name
        ) AS assigned_by_profile,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', tu.id,
                'comment', tu.comment,
                'progress_percent', tu.progress_percent,
                'created_at', tu.created_at,
                'updated_by', tu.updated_by
              )
            )
            FROM task_updates tu
            WHERE tu.task_id = t.id
          ),
          '[]'::json
        ) AS task_updates
      FROM tasks t
      LEFT JOIN profiles p_to ON p_to.id = t.assigned_to
      LEFT JOIN profiles p_by ON p_by.id = t.assigned_by
    `
    const params: unknown[] = []

    if (user.role !== 'admin') {
      params.push(user.userId)
      sql += ` WHERE t.assigned_to = $1`
    }

    sql += ` ORDER BY t.created_at DESC`

    const data = await query(sql, params)

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
    const now = new Date()
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)

    const tasks = await query<any>(
      `SELECT 
        t.*,
        json_build_object(
          'id', p.id,
          'full_name', p.full_name,
          'whatsapp_number', p.whatsapp_number,
          'email', p.email
        ) AS assigned_to_profile
      FROM tasks t
      LEFT JOIN profiles p ON p.id = t.assigned_to
      WHERE t.task_type = 'assigned'
        AND t.reminder_sent = false
        AND t.status NOT IN ('completed', 'cancelled')
        AND t.deadline >= $1
        AND t.deadline <= $2`,
      [now.toISOString(), oneHourLater.toISOString()]
    )

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
      await execute(
        `INSERT INTO notifications (user_id, title, message, type, task_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [task.assigned_to, 'Task Deadline Reminder', `"${task.title}" is due in less than 1 hour!`, 'reminder', task.id]
      )

      // Mark reminder as sent
      await execute('UPDATE tasks SET reminder_sent = true WHERE id = $1', [task.id])
    }

    return NextResponse.json({ processed: tasks?.length || 0, results })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
