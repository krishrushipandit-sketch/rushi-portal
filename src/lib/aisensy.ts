import { execute, queryOne, query } from './db'

export interface LeadForAiSensy {
  id: string
  name?: string | null
  client_name?: string | null
  phone: string
  status: string
  assigned_to?: string | null
  whatsapp_ringing_sent?: boolean | null
}

const ELIGIBLE_RINGING_STATUSES = new Set([
  'ringing',
  'callback',       // Call Back
  'switched_off',   // Switch Off
  'busy',           // Busy
  // Legacy aliases kept for backward compat
  'busy_callback',
  'not_connected',
])

const DISALLOWED_STATUSES = new Set([
  'new',
  'connected',
  'follow_up',
  'interested',
  'visit_scheduled',
  'not_interested',
  'closed_won',
  'closed_lost',
  'not_logical',
])

/**
 * Format and normalize destination phone number for AiSensy / WhatsApp API.
 * Output: "919876543210"
 */
export function normalizePhoneForWhatsApp(phone: string): string | null {
  if (!phone) return null
  const cleaned = phone.replace(/\D/g, '')
  if (!cleaned) return null

  if (cleaned.length === 10) return `91${cleaned}`
  if (cleaned.length === 11 && cleaned.startsWith('0')) return `91${cleaned.slice(1)}`
  if (cleaned.length === 12 && cleaned.startsWith('91')) return cleaned
  if (cleaned.length >= 10 && cleaned.length <= 15) return cleaned

  return null
}

/**
 * Clean 10-digit sales rep phone number for insertion into template text.
 */
export function formatSalesRepPhone(phone?: string | null): string {
  if (!phone) return '9768726006'
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 12 && cleaned.startsWith('91')) return cleaned.slice(2)
  if (cleaned.length === 11 && cleaned.startsWith('0')) return cleaned.slice(1)
  if (cleaned.length === 10) return cleaned
  return cleaned || '9768726006'
}

/**
 * Clean human-readable status label for template variable.
 */
export function formatStatusForTemplate(status: string): string {
  const s = (status || '').toLowerCase().trim()
  if (s === 'ringing') return 'Ringing'
  if (s === 'callback' || s === 'busy_callback') return 'Busy / Call Back'
  if (s === 'switched_off') return 'Switched Off'
  if (s === 'busy') return 'Busy'
  if (s === 'not_connected') return 'Not Reachable'
  if (s === 'connected') return 'Connected'
  if (s === 'follow_up') return 'Follow Up'
  if (s === 'interested') return 'Interested'
  if (s === 'not_interested') return 'Not Interested'
  if (s === 'visit_scheduled') return 'Visit Scheduled'
  if (s === 'closed_won') return 'Enrolled'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export const VALID_WORKING_AISENSY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzJjOTQ5NmM3YjZlMTM5NWJkYmIzOSIsIm5hbWUiOiJSdXNoaVBhbmRpdCAtIERpZ2l0YWwgQWNhZGVteSIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NjcyYzk0ODZjN2I2ZTEzOTViZGJiMjciLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTc4NzczMzYwOX0.7z3K8tMpMK9YunrZ1WiICIwEXkgJP4RoRaMX0lm0Im8'

export function getAiSensyApiKey(): string {
  const envKey = process.env.AISENSY_SALES_API_KEY || process.env.AISENSY_API_KEY
  if (envKey && !envKey.includes('Rh82o4bGgUUBEvHx3h6lIG-3_177shGrGY69UiL8PVU')) {
    return envKey
  }
  return VALID_WORKING_AISENSY_KEY
}

/**
 * Checks whether this status transition should trigger the ringing_sale AiSensy WhatsApp template.
 * 
 * Eligible statuses:
 * - ringing (Ringing)
 * - callback (Call Back)
 * - switched_off (Switch Off)
 * - busy (Busy)
 * - not_connected (Not Reachable)
 */
export function shouldTriggerRingingSaleWhatsApp(
  oldStatus: string | null | undefined,
  newStatus: string
): boolean {
  const cleanNew = (newStatus || '').toLowerCase().trim()
  return ELIGIBLE_RINGING_STATUSES.has(cleanNew)
}

/**
 * Sends the AiSensy 'ringing_sale' template with exactly 3 params:
 * 1. Lead Name (e.g. "Krish")
 * 2. Status (e.g. "Ringing")
 * 3. Salesperson Phone Number (e.g. "9768726006")
 */
export async function sendAiSensyRingingSaleTemplate(
  lead: LeadForAiSensy,
  options?: {
    status?: string
    salesRepPhone?: string
    templateName?: string
  }
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const apiKey = getAiSensyApiKey()

    const destination = normalizePhoneForWhatsApp(lead.phone)
    if (!destination) {
      const msg = `Invalid phone number: "${lead.phone}"`
      console.warn(`[AiSensy] ${msg}`)
      return { success: false, error: msg }
    }

    const fullName = (lead.client_name || lead.name || 'Friend').trim()
    const templateName = options?.templateName || 'ringing_sale'
    const statusText = formatStatusForTemplate(options?.status || lead.status || 'Ringing')
    const salesPhone = formatSalesRepPhone(options?.salesRepPhone)

    // Exactly 3 variables matching template: [Lead Name] [Status] [Sales Phone]
    const templateParams = [fullName, statusText, salesPhone]

    const payload = {
      apiKey,
      campaignName: templateName,
      destination,
      userName: fullName,
      templateParams,
      source: 'rushi_portal',
      media: {},
      buttons: [],
      carouselCards: [],
      location: {},
      paramsFallbackValue: {
        FirstName: fullName,
        Status: statusText,
        Phone: salesPhone,
      },
    }

    console.log(`[AiSensy] Sending '${templateName}' to ${destination} | params:`, templateParams)

    const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const resData = await res.json().catch(() => ({}))
    console.log(`[AiSensy] Response status: ${res.status}`, resData)

    if (!res.ok || resData.success === false) {
      const errMsg = resData.message || resData.error || `HTTP ${res.status}`
      console.error('[AiSensy] API Error:', errMsg, resData)
      try {
        await execute(
          `UPDATE leads SET whatsapp_msg_status = $1, updated_at = NOW() WHERE id = $2`,
          [`aisensy_error: ${errMsg}`, lead.id]
        )
      } catch (_) { /* ignore */ }
      return { success: false, error: errMsg, data: resData }
    }

    console.log(`[AiSensy] Successfully delivered '${templateName}' to ${destination}`)

    // Mark as sent in database
    try {
      await execute(
        `UPDATE leads SET 
          whatsapp_ringing_sent = TRUE,
          whatsapp_msg_status = 'aisensy_ringing_sent',
          last_whatsapp_sent_at = NOW(),
          updated_at = NOW()
         WHERE id = $1`,
        [lead.id]
      )
    } catch (_) { /* ignore if columns not added yet */ }

    return { success: true, data: resData }
  } catch (err: any) {
    console.error('[AiSensy] Exception:', err)
    return { success: false, error: err.message || 'Unknown error' }
  }
}

/**
 * Main trigger function. Called AFTER the lead is updated.
 */
export async function handleLeadStatusChangeAiSensy(
  leadId: string,
  newStatus: string,
  updatedByUserId?: string,
  oldStatus?: string
): Promise<void> {
  try {
    console.log(`[AiSensy] Status change: "${oldStatus}" -> "${newStatus}" for lead ${leadId}`)

    const shouldSend = shouldTriggerRingingSaleWhatsApp(oldStatus, newStatus)

    console.log(`[AiSensy] shouldSend=${shouldSend} | old="${oldStatus}" new="${newStatus}"`)

    if (!shouldSend) return

    // Get lead details
    const lead = await queryOne<LeadForAiSensy>(
      `SELECT id, name, client_name, phone, status, assigned_to FROM leads WHERE id = $1`,
      [leadId]
    )
    if (!lead) {
      console.warn(`[AiSensy] Lead not found: ${leadId}`)
      return
    }

    // Get salesperson's phone number
    let salesRepPhone: string | null = null
    if (updatedByUserId) {
      try {
        const profile = await queryOne<{ phone: string | null; whatsapp_number: string | null }>(
          `SELECT phone, whatsapp_number FROM profiles WHERE id = $1`,
          [updatedByUserId]
        )
        salesRepPhone = profile?.phone || profile?.whatsapp_number || null
      } catch (_) { /* ignore */ }
    }

    // Fallback: check assigned_to profile
    if (!salesRepPhone && lead.assigned_to) {
      try {
        const profile = await queryOne<{ phone: string | null; whatsapp_number: string | null }>(
          `SELECT phone, whatsapp_number FROM profiles WHERE id = $1`,
          [lead.assigned_to]
        )
        salesRepPhone = profile?.phone || profile?.whatsapp_number || null
      } catch (_) { /* ignore */ }
    }

    await sendAiSensyRingingSaleTemplate(lead, {
      status: newStatus,
      salesRepPhone: salesRepPhone || undefined,
      templateName: 'ringing_sale',
    })
  } catch (err) {
    console.error('[AiSensy] handleLeadStatusChangeAiSensy error:', err)
  }
}

// ─── Visit Reminders System (48hr, 24hr, and Today 6 AM IST) ─────────────────
export const VISIT_DEFAULT_LOCATION =
  'C, 2nd Floor, Kanchan Building Datta Mandir Road, Koliwada Rd, beside Datta Mandir Chendani, Thane West, Thane, Maharashtra 400601'

export interface VisitReminderParams {
  leadId: string
  name: string
  phone: string
  visitDateTime: string | Date
  reminderType: '48hr' | '24hr' | 'today'
  location?: string
}

export function formatVisitDateIST(dateInput: string | Date): string {
  const d = new Date(dateInput)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}

export function formatVisitTimeIST(dateInput: string | Date): string {
  const d = new Date(dateInput)
  return d.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })
}

export function getVisitDateStrIST(dateInput: string | Date): string {
  const d = new Date(dateInput)
  const istOffset = 5.5 * 60 * 60 * 1000
  const istTime = new Date(d.getTime() + istOffset)
  return istTime.toISOString().slice(0, 10)
}

export function getTodayStrIST(): string {
  const d = new Date()
  const istOffset = 5.5 * 60 * 60 * 1000
  const istTime = new Date(d.getTime() + istOffset)
  return istTime.toISOString().slice(0, 10)
}

/**
 * Sends a visit reminder via WhatsApp using AiSensy.
 * - 48hr and 24hr before: Campaign '24hr_48hr_site' (Template 'visit_reminder')
 *   Params: [Name, Date, Time, Location]
 * - Today at 6 AM IST: Campaign 'visit_reminder' (Template 'site_visit_today')
 *   Params: [Name, Time, Location]
 */
export async function sendAiSensyVisitReminder(params: VisitReminderParams): Promise<{
  success: boolean
  error?: string
  data?: any
  campaignName?: string
}> {
  try {
    const apiKey = getAiSensyApiKey()
    const destination = normalizePhoneForWhatsApp(params.phone)
    if (!destination) {
      const msg = `Invalid phone number for visit reminder: "${params.phone}"`
      console.warn(`[AiSensy Visit] ${msg}`)
      return { success: false, error: msg }
    }

    const fullName = (params.name || 'Candidate').trim()
    const location = (params.location || VISIT_DEFAULT_LOCATION).trim()
    const visitDate = formatVisitDateIST(params.visitDateTime)
    const visitTime = formatVisitTimeIST(params.visitDateTime)

    let campaignName = ''
    let templateParams: string[] = []
    let paramsFallbackValue: Record<string, string> = {}

    if (params.reminderType === 'today') {
      campaignName = 'visit_reminder'
      templateParams = [fullName, visitTime, location]
      paramsFallbackValue = {
        FirstName: fullName,
        VisitTime: visitTime,
        Location: location,
      }
    } else {
      // 48hr and 24hr reminders
      campaignName = '24hr_48hr_site'
      templateParams = [fullName, visitDate, visitTime, location]
      paramsFallbackValue = {
        FirstName: fullName,
        VisitDate: visitDate,
        VisitTime: visitTime,
        Location: location,
      }
    }

    const payload = {
      apiKey,
      campaignName,
      destination,
      userName: fullName,
      templateParams,
      source: 'rushi_portal',
      media: {},
      buttons: [],
      carouselCards: [],
      location: {},
      paramsFallbackValue,
    }

    console.log(`[AiSensy Visit] Sending '${campaignName}' (${params.reminderType}) to ${destination} | params:`, templateParams)

    const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const resData = await res.json().catch(() => ({}))
    console.log(`[AiSensy Visit] Response status: ${res.status}`, resData)

    const isSuccess = res.ok && resData.success !== false

    // Record into visit_reminder_log
    const visitDateStr = getVisitDateStrIST(params.visitDateTime)
    try {
      await execute(
        `CREATE TABLE IF NOT EXISTS visit_reminder_log (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          lead_id UUID NOT NULL,
          visit_date DATE NOT NULL,
          reminder_type VARCHAR(20) NOT NULL,
          campaign_name VARCHAR(50) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          sent_at TIMESTAMPTZ DEFAULT NOW(),
          status VARCHAR(20) DEFAULT 'sent',
          error_message TEXT,
          CONSTRAINT uq_visit_reminder UNIQUE (lead_id, visit_date, reminder_type)
        )`
      ).catch(() => {})

      await execute(
        `INSERT INTO visit_reminder_log (lead_id, visit_date, reminder_type, campaign_name, phone, status, error_message)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (lead_id, visit_date, reminder_type) DO UPDATE SET
           sent_at = NOW(),
           status = EXCLUDED.status,
           error_message = EXCLUDED.error_message`,
        [
          params.leadId,
          visitDateStr,
          params.reminderType,
          campaignName,
          destination,
          isSuccess ? 'sent' : 'failed',
          isSuccess ? null : (resData.message || resData.error || `HTTP ${res.status}`),
        ]
      ).catch(() => {})
    } catch (dbErr) {
      console.error('[AiSensy Visit] Failed to log reminder to DB:', dbErr)
    }

    if (!isSuccess) {
      const errMsg = resData.message || resData.error || `HTTP ${res.status}`
      console.error('[AiSensy Visit] API Error:', errMsg, resData)
      return { success: false, error: errMsg, data: resData, campaignName }
    }

    return { success: true, data: resData, campaignName }
  } catch (err: any) {
    console.error('[AiSensy Visit] Exception:', err)
    return { success: false, error: err.message || 'Unknown error' }
  }
}

/**
 * Iterates through all scheduled visits and triggers reminders due today (at 6 AM IST daily or whenever checked).
 * - Today: 'visit_reminder' (site_visit_today)
 * - 24hr before (tomorrow): '24hr_48hr_site' (visit_reminder)
 * - 48hr before (day after tomorrow): '24hr_48hr_site' (visit_reminder)
 */
export async function processScheduledVisitReminders(): Promise<{
  processed: number
  sent: number
  skipped: number
  errors: string[]
  details: any[]
}> {
  await execute(
    `CREATE TABLE IF NOT EXISTS visit_reminder_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID NOT NULL,
      visit_date DATE NOT NULL,
      reminder_type VARCHAR(20) NOT NULL,
      campaign_name VARCHAR(50) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      sent_at TIMESTAMPTZ DEFAULT NOW(),
      status VARCHAR(20) DEFAULT 'sent',
      error_message TEXT,
      CONSTRAINT uq_visit_reminder UNIQUE (lead_id, visit_date, reminder_type)
    )`
  ).catch(() => {})

  const todayStr = getTodayStrIST()
  const leads = await query<any>(
    `SELECT id, name, client_name, phone, status, follow_up_date, next_followup_at
     FROM leads
     WHERE status = 'visit_scheduled'
       AND (follow_up_date IS NOT NULL OR next_followup_at IS NOT NULL)`
  )

  let processed = 0
  let sent = 0
  let skipped = 0
  const errors: string[] = []
  const details: any[] = []

  const todayMidnight = new Date(`${todayStr}T00:00:00+05:30`).getTime()

  for (const lead of (leads || [])) {
    processed++
    const schedDateRaw = lead.next_followup_at || lead.follow_up_date
    if (!schedDateRaw) {
      skipped++
      continue
    }

    const schedDate = new Date(schedDateRaw)
    const visitDateStr = getVisitDateStrIST(schedDate)
    const visitMidnight = new Date(`${visitDateStr}T00:00:00+05:30`).getTime()

    // Calculate days diff (IST midnight to midnight)
    const diffDays = Math.round((visitMidnight - todayMidnight) / (1000 * 60 * 60 * 24))

    let reminderType: '48hr' | '24hr' | 'today' | null = null

    if (diffDays === 0) {
      reminderType = 'today'
    } else if (diffDays === 1) {
      reminderType = '24hr'
    } else if (diffDays === 2) {
      reminderType = '48hr'
    } else {
      // Either past or > 2 days away
      skipped++
      continue
    }

    // Check if already sent for this lead, visit_date, and reminderType
    const already = await queryOne(
      `SELECT id FROM visit_reminder_log 
       WHERE lead_id = $1 AND visit_date = $2 AND reminder_type = $3 AND status = 'sent'`,
      [lead.id, visitDateStr, reminderType]
    )

    if (already) {
      skipped++
      continue
    }

    const leadName = lead.client_name || lead.name || 'Candidate'
    const result = await sendAiSensyVisitReminder({
      leadId: lead.id,
      name: leadName,
      phone: lead.phone,
      visitDateTime: schedDate,
      reminderType,
    })

    if (result.success) {
      sent++
      details.push({
        leadId: lead.id,
        name: leadName,
        phone: lead.phone,
        visitDate: visitDateStr,
        reminderType,
        status: 'sent',
      })
    } else {
      errors.push(`Lead ${leadName} (${lead.phone}): ${result.error}`)
      details.push({
        leadId: lead.id,
        name: leadName,
        phone: lead.phone,
        visitDate: visitDateStr,
        reminderType,
        status: 'failed',
        error: result.error,
      })
    }
  }

  return { processed, sent, skipped, errors, details }
}

/**
 * Checks if a newly scheduled or rescheduled visit is 24hr or 48hr away,
 * and if so, sends the reminder immediately (e.g. if booked for tomorrow, sends 24hr and skips 48hr).
 */
export async function checkAndSendImmediateVisitReminder(
  leadId: string,
  scheduledAt: string | Date
): Promise<void> {
  try {
    const schedDate = new Date(scheduledAt)
    if (isNaN(schedDate.getTime())) return

    const todayStr = getTodayStrIST()
    const visitDateStr = getVisitDateStrIST(schedDate)
    const todayMidnight = new Date(`${todayStr}T00:00:00+05:30`).getTime()
    const visitMidnight = new Date(`${visitDateStr}T00:00:00+05:30`).getTime()
    const diffDays = Math.round((visitMidnight - todayMidnight) / (1000 * 60 * 60 * 24))

    let reminderType: '48hr' | '24hr' | null = null
    if (diffDays === 1) {
      reminderType = '24hr'
    } else if (diffDays === 2) {
      reminderType = '48hr'
    }

    if (!reminderType) return

    // Ensure table exists
    await execute(
      `CREATE TABLE IF NOT EXISTS visit_reminder_log (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        lead_id UUID NOT NULL,
        visit_date DATE NOT NULL,
        reminder_type VARCHAR(20) NOT NULL,
        campaign_name VARCHAR(50) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        sent_at TIMESTAMPTZ DEFAULT NOW(),
        status VARCHAR(20) DEFAULT 'sent',
        error_message TEXT,
        CONSTRAINT uq_visit_reminder UNIQUE (lead_id, visit_date, reminder_type)
      )`
    ).catch(() => {})

    const already = await queryOne(
      `SELECT id FROM visit_reminder_log 
       WHERE lead_id = $1 AND visit_date = $2 AND reminder_type = $3 AND status = 'sent'`,
      [leadId, visitDateStr, reminderType]
    )

    if (already) return

    const lead = await queryOne<LeadForAiSensy>(
      `SELECT id, name, client_name, phone FROM leads WHERE id = $1`,
      [leadId]
    )

    if (!lead?.phone) return

    await sendAiSensyVisitReminder({
      leadId,
      name: lead.client_name || lead.name || 'Candidate',
      phone: lead.phone,
      visitDateTime: schedDate,
      reminderType,
    })
  } catch (err) {
    console.error('[AiSensy] checkAndSendImmediateVisitReminder error:', err)
  }
}


