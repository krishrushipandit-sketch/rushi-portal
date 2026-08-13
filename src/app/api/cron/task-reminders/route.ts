import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const CRON_SECRET       = process.env.CRON_SECRET || 'rushipandit-cron-2026'
const AISENSY_KEY       = process.env.AISENSY_API_KEY || ''
const AISENSY_URL       = 'https://backend.aisensy.com/campaign/t1/api/v2'

// ── Default test numbers (used when no phone is saved on the profile) ────────
const DEFAULT_EMPLOYEE_PHONE = '9768726006'
const DEFAULT_ADMIN_PHONE    = '9702446345'

// ── WhatsApp via AiSensy ─────────────────────────────────────────────────────
async function sendWhatsApp(
  phone: string | null | undefined,
  fallbackPhone: string,
  name: string,
  params: string[],
  campaignName: string
): Promise<{ sent: boolean; to: string }> {
  if (!AISENSY_KEY || AISENSY_KEY === 'your-aisensy-api-key-here') {
    return { sent: false, to: '' }
  }

  // Use profile phone or fallback to test number
  const raw = (phone && phone.trim().length >= 10) ? phone : fallbackPhone
  const cleaned = raw.replace(/\D/g, '')
  const e164 = cleaned.startsWith('91') ? cleaned : `91${cleaned}`

  try {
    const res = await fetch(AISENSY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: AISENSY_KEY,
        campaignName,
        destination: e164,
        userName: name,
        templateParams: params,
        source: 'rushipandit-portal',
        media: {},
        buttons: []
      })
    })
    const body = await res.text()
    console.log(`[WA] ${campaignName} → ${e164} | status: ${res.status} | ${body}`)
    return { sent: res.ok, to: e164 }
  } catch (err: any) {
    console.error('[WA] Error:', err.message)
    return { sent: false, to: e164 }
  }
}

// ── In-App notification ───────────────────────────────────────────────────────
async function sendInApp(userId: string, title: string, message: string, taskId: string) {
  const { error } = await db().from('notifications').insert({
    user_id: userId,
    title,
    message,
    type: 'info',
    task_id: taskId,
    is_read: false
  })
  if (error) console.error('[InApp] Error:', error.message)
}

// ── Deduplication helpers ─────────────────────────────────────────────────────
async function alreadySent(taskId: string, recipientId: string, reminderType: string, channel: string) {
  const { data } = await db()
    .from('task_reminder_log')
    .select('id')
    .eq('task_id', taskId)
    .eq('recipient_id', recipientId)
    .eq('reminder_type', reminderType)
    .eq('channel', channel)
    .maybeSingle()
  return !!data
}

async function markSent(taskId: string, recipientId: string, reminderType: string, channel: string) {
  // Use upsert with ignoreDuplicates to safely skip existing entries
  await db().from('task_reminder_log')
    .upsert(
      { task_id: taskId, recipient_id: recipientId, reminder_type: reminderType, channel },
      { onConflict: 'task_id, recipient_id, reminder_type, channel', ignoreDuplicates: true }
    )
}

// ── Reminder windows ──────────────────────────────────────────────────
interface ReminderWindow { type: '2d' | '1d' | '1h' | 'deadline_hit'; label: string; minH: number; maxH: number }
const WINDOWS: ReminderWindow[] = [
  // maxH is strictly .01 (starts ~36 seconds before exact time). minH gives a 5-6 min buffer for late crons.
  { type: '2d',           label: '2 days',  minH: 47.90, maxH: 48.01 },
  { type: '1d',           label: '1 day',   minH: 23.90, maxH: 24.01 },
  { type: '1h',           label: '1 hour',  minH: 0.90,  maxH: 1.01  },
  { type: 'deadline_hit', label: '0 minutes', minH: -2,    maxH: 0.01 },
]

// ── POST /api/cron/task-reminders ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') || new URL(req.url).searchParams.get('secret')
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const now    = new Date()               // UTC — used for all DB comparisons
  const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000)  // IST — used only for display strings

  // ── Query 1: Upcoming tasks (deadline in the future, not completed) ──────────
  const windowEnd = new Date(now.getTime() + 50 * 60 * 60 * 1000).toISOString()
  const { data: upcomingTasks, error: taskErr } = await db()
    .from('tasks')
    .select('id, title, deadline, priority, assigned_to, assigned_by')
    .in('status', ['pending', 'in_progress'])
    .not('deadline', 'is', null)
    .lte('deadline', windowEnd)
    .gt('deadline', now.toISOString())

  if (taskErr) return NextResponse.json({ error: taskErr.message }, { status: 500 })

  // ── Combine: upcoming + tasks that just passed deadline (for deadline_hit) ─
  // We fetch ALL pending tasks with passed deadlines — deduplication ensures
  // we only send once. No OVERDUE concept — just one "deadline reached" alert.
  const { data: passedTasks } = await db()
    .from('tasks')
    .select('id, title, deadline, priority, assigned_to, assigned_by')
    .in('status', ['pending', 'in_progress'])
    .not('deadline', 'is', null)
    .lt('deadline', now.toISOString())
    .gte('deadline', new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString())

  const tasks = [
    ...(upcomingTasks || []).map(t => ({ ...t, _windowType: 'upcoming' as const })),
    ...(passedTasks   || []).map(t => ({ ...t, _windowType: 'passed'   as const })),
  ]

  // Fetch all profiles (for assignee + admin lookup)
  const { data: allProfiles } = await db()
    .from('profiles')
    .select('id, full_name, phone, role')

  const admins = (allProfiles || []).filter(p => p.role === 'admin')
  const results: any[] = []

  for (const task of tasks) {
    const deadline = new Date(task.deadline)
    const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60) // negative if passed

    // All tasks past the deadline use 'deadline_hit' window
    // Upcoming tasks match against the WINDOWS array
    let win: ReminderWindow | undefined
    if (task._windowType === 'passed') {
      win = { type: 'deadline_hit', label: 'deadline reached', minH: -2, maxH: 0.5 }
    } else {
      win = WINDOWS.find(w => hoursLeft >= w.minH && hoursLeft < w.maxH)
    }
    if (!win) continue

    const assignee = (allProfiles || []).find(p => p.id === task.assigned_to)

    const deadlineStr = deadline.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
    })

    // ── Build message text ──────────────────────────────────────────────
    const isDeadlineHit = win.type === 'deadline_hit'
    const empTitle = isDeadlineHit
      ? `🔔 Task Deadline Reached!`
      : `⏰ Task Due in ${win.label}`
    const empMsg = isDeadlineHit
      ? `Your task "${task.title}" deadline was ${deadlineStr}. Please complete and submit it now.`
      : `"${task.title}" is due on ${deadlineStr}. Please complete it on time.`
    const adminTitle = isDeadlineHit
      ? `🔔 Deadline Reached — ${task.title}`
      : `📋 Task Alert — ${win.label} left`
    const adminMsg = isDeadlineHit
      ? `"${task.title}" (assigned to ${assignee?.full_name || 'someone'}) hit its deadline at ${deadlineStr}. Check if it is completed.`
      : `"${task.title}" (assigned to ${assignee?.full_name || 'someone'}) is due in ${win.label} on ${deadlineStr}.`

    // ── Employee notification ────────────────────────────────────────────
    if (assignee?.id) {

      // Use 'overdue' for DB logging because of the database CHECK constraint
      const dbReminderType = win.type === 'deadline_hit' ? 'overdue' : win.type

      // In-app
      if (!await alreadySent(task.id, assignee.id, dbReminderType, 'in_app')) {
        await sendInApp(assignee.id, empTitle, empMsg, task.id)
        await markSent(task.id, assignee.id, dbReminderType, 'in_app')
        results.push({ task: task.title, to: assignee.full_name, channel: 'in_app', type: win.type })
      }

      // WhatsApp (uses default employee number if no phone saved)
      if (!await alreadySent(task.id, assignee.id, dbReminderType, 'whatsapp')) {
        const { sent, to } = await sendWhatsApp(
          assignee.phone, DEFAULT_EMPLOYEE_PHONE, assignee.full_name,
          [assignee.full_name, task.title, deadlineStr, win.label],
          'task_reminder_employee'
        )
        if (sent) {
          await markSent(task.id, assignee.id, dbReminderType, 'whatsapp')
          results.push({ task: task.title, to: `${assignee.full_name} (${to})`, channel: 'whatsapp', type: win.type })
        }
      }
    }

    // ── Admin (assigner) notification ────────────────────────────────────
    // Find the admin who assigned this specific task
    const assigningAdmin = (allProfiles || []).find(p => p.id === task.assigned_by)
    const notifyAdmins = assigningAdmin
      ? [assigningAdmin]   // notify only the assigning admin
      : admins             // fallback: notify all admins if assigned_by is missing

    for (const admin of notifyAdmins) {
      const dbReminderType = win.type === 'deadline_hit' ? 'overdue' : win.type

      // In-app
      if (!await alreadySent(task.id, admin.id, dbReminderType, 'in_app')) {
        await sendInApp(admin.id, adminTitle, adminMsg, task.id)
        await markSent(task.id, admin.id, dbReminderType, 'in_app')
        results.push({ task: task.title, to: admin.full_name, channel: 'in_app (admin)', type: win.type })
      }

      // WhatsApp — use the admin's real phone or fallback
      if (!await alreadySent(task.id, admin.id, dbReminderType, 'whatsapp')) {
        const { sent, to } = await sendWhatsApp(
          admin.phone, DEFAULT_ADMIN_PHONE, admin.full_name,
          [admin.full_name, task.title, assignee?.full_name || '-', deadlineStr, win.label],
          'task_reminder_admin'
        )
        if (sent) {
          await markSent(task.id, admin.id, dbReminderType, 'whatsapp')
          results.push({ task: task.title, to: `${admin.full_name} (${to})`, channel: 'whatsapp (admin)', type: win.type })
        }
      }
    }
  }

  return NextResponse.json({
    ok: true,
    checked_at: nowIST.toISOString(),
    tasks_checked: (tasks || []).length,
    notifications_sent: results.length,
    details: results
  })
}

// GET — same logic, for easy browser/curl testing
export async function GET(req: NextRequest) {
  return POST(req)
}
