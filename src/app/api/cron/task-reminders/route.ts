import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getAiSensyApiKey } from '@/lib/aisensy'
import { getUserFromRequest } from '@/lib/auth'

const CRON_SECRET = process.env.CRON_SECRET || 'rushipandit-cron-2026'
const AISENSY_URL = 'https://backend.aisensy.com/campaign/t1/api/v2'

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
  const activeKey = getAiSensyApiKey()
  if (!activeKey) {
    return { sent: false, to: '' }
  }

  // Use profile phone or fallback to test number
  const raw = (phone && phone.trim().length >= 10) ? phone : fallbackPhone
  const cleaned = raw.replace(/\D/g, '')
  const e164 = cleaned.startsWith('91') ? cleaned : `91${cleaned}`

  // Try campaignName first, fallback to AISENSY_CAMPAIGN_NAME or 'task_reminder'
  const campaignsToTry = Array.from(new Set([
    campaignName,
    process.env.AISENSY_CAMPAIGN_NAME,
    'task_reminder'
  ].filter(Boolean))) as string[]

  for (const cName of campaignsToTry) {
    try {
      const res = await fetch(AISENSY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: activeKey,
          campaignName: cName,
          destination: e164,
          userName: name,
          templateParams: params,
          source: 'rushipandit-portal',
          media: {},
          buttons: []
        })
      })
      const body = await res.text()
      console.log(`[WA Task] ${cName} → ${e164} | status: ${res.status} | ${body}`)
      if (res.ok) {
        return { sent: true, to: e164 }
      }
    } catch (err: any) {
      console.error(`[WA Task] Error for ${cName}:`, err.message)
    }
  }

  return { sent: false, to: e164 }
}

// ── In-App notification ───────────────────────────────────────────────────────
async function sendInApp(userId: string, title: string, message: string, taskId: string) {
  try {
    await execute(
      `INSERT INTO notifications (user_id, title, message, type, task_id, is_read)
       VALUES ($1, $2, $3, 'info', $4, false)`,
      [userId, title, message, taskId]
    )
  } catch (err: any) {
    console.error('[InApp] Error:', err.message)
  }
}

// ── Deduplication helpers ─────────────────────────────────────────────────────
async function alreadySent(taskId: string, recipientId: string, reminderType: string, channel: string) {
  const data = await queryOne<{ id: string }>(
    `SELECT id FROM task_reminder_log
     WHERE task_id = $1 AND recipient_id = $2 AND reminder_type = $3 AND channel = $4`,
    [taskId, recipientId, reminderType, channel]
  )
  return !!data
}

async function markSent(taskId: string, recipientId: string, reminderType: string, channel: string) {
  // Ensure table and columns exist (safe to run every time - idempotent)
  await execute(
    `CREATE TABLE IF NOT EXISTS task_reminder_log (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      task_id       UUID,
      recipient_id  UUID,
      reminder_type TEXT DEFAULT 'deadline',
      channel       TEXT DEFAULT 'in_app',
      sent_at       TIMESTAMPTZ DEFAULT NOW()
    )`
  ).catch(() => {})
  await execute(`ALTER TABLE task_reminder_log ADD COLUMN IF NOT EXISTS recipient_id UUID`).catch(() => {})
  await execute(`ALTER TABLE task_reminder_log ADD COLUMN IF NOT EXISTS channel TEXT DEFAULT 'in_app'`).catch(() => {})
  // Create unique constraint if not exists
  await execute(
    `DO $$ BEGIN
      ALTER TABLE task_reminder_log ADD CONSTRAINT uq_task_reminder UNIQUE (task_id, recipient_id, reminder_type, channel);
     EXCEPTION WHEN duplicate_table THEN NULL; WHEN others THEN NULL;
     END $$`
  ).catch(() => {})

  await execute(
    `INSERT INTO task_reminder_log (task_id, recipient_id, reminder_type, channel)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT DO NOTHING`,
    [taskId, recipientId, reminderType, channel]
  )
}

async function checkAuth(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') || new URL(req.url).searchParams.get('secret')
  if (secret === CRON_SECRET) return true

  const user = await getUserFromRequest(req).catch(() => null)
  if (user?.role === 'admin') return true

  return false
}

// ── POST /api/cron/task-reminders ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const authorized = await checkAuth(req)
  if (!authorized) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const now    = new Date()               // UTC — used for all DB comparisons
  const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000)  // IST — used only for display strings

  try {
    // ── Fetch active pending/in_progress tasks with a deadline ──────────
    // Include upcoming tasks (up to 50h in future) and overdue tasks (up to 48h in past)
    const windowStart = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString()
    const windowEnd = new Date(now.getTime() + 50 * 60 * 60 * 1000).toISOString()

    const tasks = await query<any>(
      `SELECT id, title, deadline, priority, assigned_to, assigned_by
       FROM tasks
       WHERE status IN ('pending', 'in_progress')
         AND deadline IS NOT NULL
         AND deadline <= $1
         AND deadline >= $2`,
      [windowEnd, windowStart]
    )

    // Fetch all profiles (for assignee + admin lookup)
    const allProfiles = await query<any>(
      'SELECT id, full_name, phone, role FROM profiles'
    )

    const admins = (allProfiles || []).filter((p: any) => p.role === 'admin')
    const results: any[] = []

    for (const task of (tasks || [])) {
      const deadline = new Date(task.deadline)
      const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60) // negative if passed

      const assignee = (allProfiles || []).find((p: any) => p.id === task.assigned_to)

      const deadlineStr = deadline.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
      })

      // Determine the applicable reminder stage
      let reminderType: 'deadline_hit' | '1h' | '1d' | '2d' | null = null
      let reminderLabel = ''

      if (hoursLeft <= 0) {
        reminderType = 'deadline_hit'
        reminderLabel = 'deadline reached'
      } else if (hoursLeft <= 1) {
        reminderType = '1h'
        reminderLabel = '1 hour'
      } else if (hoursLeft <= 24) {
        reminderType = '1d'
        reminderLabel = '1 day'
      } else if (hoursLeft <= 48) {
        reminderType = '2d'
        reminderLabel = '2 days'
      }

      if (!reminderType) continue

      const isDeadlineHit = reminderType === 'deadline_hit'
      const dbReminderType = isDeadlineHit ? 'overdue' : reminderType

      // ── Build message text ──────────────────────────────────────────────
      const empTitle = isDeadlineHit
        ? `🔔 Task Deadline Reached!`
        : `⏰ Task Due in ${reminderLabel}`
      const empMsg = isDeadlineHit
        ? `Your task "${task.title}" deadline was ${deadlineStr}. Please complete and submit it now.`
        : `"${task.title}" is due on ${deadlineStr}. Please complete it on time.`
      const adminTitle = isDeadlineHit
        ? `🔔 Deadline Reached — ${task.title}`
        : `📋 Task Alert — ${reminderLabel} left`
      const adminMsg = isDeadlineHit
        ? `"${task.title}" (assigned to ${assignee?.full_name || 'someone'}) hit its deadline at ${deadlineStr}. Check if it is completed.`
        : `"${task.title}" (assigned to ${assignee?.full_name || 'someone'}) is due in ${reminderLabel} on ${deadlineStr}.`

      // ── Employee notification ────────────────────────────────────────────
      if (assignee?.id) {
        // In-app
        if (!await alreadySent(task.id, assignee.id, dbReminderType, 'in_app')) {
          await sendInApp(assignee.id, empTitle, empMsg, task.id)
          await markSent(task.id, assignee.id, dbReminderType, 'in_app')
          results.push({ task: task.title, to: assignee.full_name, channel: 'in_app', type: reminderType })
        }

        // WhatsApp (uses default employee number if no phone saved)
        if (!await alreadySent(task.id, assignee.id, dbReminderType, 'whatsapp')) {
          const { sent, to } = await sendWhatsApp(
            assignee.phone, DEFAULT_EMPLOYEE_PHONE, assignee.full_name,
            [assignee.full_name, task.title, deadlineStr, reminderLabel],
            'task_reminder_employee'
          )
          if (sent) {
            await markSent(task.id, assignee.id, dbReminderType, 'whatsapp')
            results.push({ task: task.title, to: `${assignee.full_name} (${to})`, channel: 'whatsapp', type: reminderType })
          }
        }
      }

      // ── Admin (assigner) notification ────────────────────────────────────
      const assigningAdmin = (allProfiles || []).find((p: any) => p.id === task.assigned_by)
      const notifyAdmins = assigningAdmin
        ? [assigningAdmin]
        : admins

      for (const admin of notifyAdmins) {
        // In-app
        if (!await alreadySent(task.id, admin.id, dbReminderType, 'in_app')) {
          await sendInApp(admin.id, adminTitle, adminMsg, task.id)
          await markSent(task.id, admin.id, dbReminderType, 'in_app')
          results.push({ task: task.title, to: admin.full_name, channel: 'in_app (admin)', type: reminderType })
        }

        // WhatsApp
        if (!await alreadySent(task.id, admin.id, dbReminderType, 'whatsapp')) {
          const { sent, to } = await sendWhatsApp(
            admin.phone, DEFAULT_ADMIN_PHONE, admin.full_name,
            [admin.full_name, task.title, assignee?.full_name || '-', deadlineStr, reminderLabel],
            'task_reminder_admin'
          )
          if (sent) {
            await markSent(task.id, admin.id, dbReminderType, 'whatsapp')
            results.push({ task: task.title, to: `${admin.full_name} (${to})`, channel: 'whatsapp (admin)', type: reminderType })
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
  } catch (err: any) {
    console.error('Task reminders cron error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// GET — same logic, for easy browser/curl testing
export async function GET(req: NextRequest) {
  return POST(req)
}
