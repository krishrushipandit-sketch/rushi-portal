import { execute, queryOne } from './db'

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

/**
 * Checks whether this status transition should trigger the 1-time ringing_sale AiSensy WhatsApp template.
 * 
 * Rules:
 * - Only triggers for ringing/not_connected/switched_off/busy_callback statuses
 * - Only when PREVIOUS status was 'new' (first-time call attempt)
 * - Never triggers twice (whatsapp_ringing_sent guard)
 */
export function shouldTriggerRingingSaleWhatsApp(
  oldStatus: string | null | undefined,
  newStatus: string,
  alreadySent: boolean | null | undefined
): boolean {
  if (alreadySent) return false

  const cleanNew = (newStatus || '').toLowerCase().trim()
  const cleanOld = (oldStatus || 'new').toLowerCase().trim()

  if (DISALLOWED_STATUSES.has(cleanNew)) return false
  if (!ELIGIBLE_RINGING_STATUSES.has(cleanNew)) return false

  // Only trigger on first call attempt — when previous status was 'new'
  const isFromNew = cleanOld === 'new' || !cleanOld
  return isFromNew
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
    const apiKey = process.env.AISENSY_API_KEY
    if (!apiKey) {
      const msg = 'AISENSY_API_KEY environment variable is not configured'
      console.warn(`[AiSensy] ${msg}`)
      return { success: false, error: msg }
    }

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
      // Safely update status - ignore error if column doesn't exist yet
      try {
        await execute(
          `UPDATE leads SET whatsapp_msg_status = $1, updated_at = NOW() WHERE id = $2`,
          [`aisensy_error: ${errMsg}`, lead.id]
        )
      } catch (_) { /* ignore */ }
      return { success: false, error: errMsg, data: resData }
    }

    console.log(`[AiSensy] Successfully delivered '${templateName}' to ${destination}`)

    // Mark as sent - use safe column update
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
 * 
 * IMPORTANT: oldStatus must be passed in explicitly from BEFORE the DB update.
 * Do NOT rely on querying lead.status from the DB here — it will already be the new status.
 */
export async function handleLeadStatusChangeAiSensy(
  leadId: string,
  newStatus: string,
  updatedByUserId: string,
  oldStatus: string   // <-- MUST be passed from BEFORE the DB update
): Promise<void> {
  try {
    console.log(`[AiSensy] Status change: "${oldStatus}" -> "${newStatus}" for lead ${leadId}`)

    // Check whatsapp_ringing_sent safely
    let alreadySent = false
    try {
      const row = await queryOne<{ whatsapp_ringing_sent: boolean | null }>(
        `SELECT whatsapp_ringing_sent FROM leads WHERE id = $1`,
        [leadId]
      )
      alreadySent = !!row?.whatsapp_ringing_sent
    } catch (_) {
      // Column might not exist yet — proceed as not sent
      alreadySent = false
    }

    const shouldSend = shouldTriggerRingingSaleWhatsApp(oldStatus, newStatus, alreadySent)

    console.log(`[AiSensy] shouldSend=${shouldSend} | alreadySent=${alreadySent} | old="${oldStatus}" new="${newStatus}"`)

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
