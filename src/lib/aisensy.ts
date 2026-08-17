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
  'busy_callback',
  'not_connected',
  'switched_off',
])

const DISALLOWED_STATUSES = new Set([
  'interested',
  'visit_scheduled',
  'closed_won',
  'closed_lost',
  'not_logical',
  'new',
])

/**
 * Format and normalize destination phone number for AiSensy / WhatsApp API.
 * Output: "919876543210"
 */
export function normalizePhoneForWhatsApp(phone: string): string | null {
  if (!phone) return null
  const cleaned = phone.replace(/\D/g, '')
  if (!cleaned) return null

  // 10-digit Indian number
  if (cleaned.length === 10) {
    return `91${cleaned}`
  }
  // 11-digit starting with 0
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `91${cleaned.slice(1)}`
  }
  // 12-digit already having 91
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned
  }
  // Any other international number
  if (cleaned.length >= 10 && cleaned.length <= 15) {
    return cleaned
  }

  return null
}

/**
 * Clean 10-digit sales rep phone number for insertion into template text
 * (e.g. "📞 +91 9768726006")
 */
export function formatSalesRepPhone(phone?: string | null): string {
  if (!phone) return '9768726006'
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned.slice(2)
  }
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return cleaned.slice(1)
  }
  if (cleaned.length === 10) {
    return cleaned
  }
  return cleaned || '9768726006'
}

/**
 * Clean human-readable status for template variable {{2}}
 */
export function formatStatusForTemplate(status: string): string {
  const s = (status || '').toLowerCase().trim()
  if (s === 'ringing') return 'Ringing'
  if (s === 'busy_callback') return 'Busy / Call Back'
  if (s === 'not_connected') return 'Not Reachable'
  if (s === 'switched_off') return 'Switched Off'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

/**
 * Checks whether this status transition should trigger the 1-time ringing_sale AiSensy WhatsApp template.
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

  // Trigger when moving from 'new' (or initial transition)
  const isFromNew = cleanOld === 'new' || !cleanOld || cleanOld === cleanNew
  return isFromNew
}

/**
 * Sends the AiSensy 'ringing_sale' template to the lead with 3 templateParams:
 * 1. Lead Name (e.g. "Krish")
 * 2. Status (e.g. "Ringing")
 * 3. Salesperson Phone (e.g. "9768726006")
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
      await execute(
        `UPDATE leads SET whatsapp_msg_status = $1 WHERE id = $2`,
        [`config_error: ${msg}`, lead.id]
      )
      return { success: false, error: msg }
    }

    const destination = normalizePhoneForWhatsApp(lead.phone)
    if (!destination) {
      const msg = `Invalid phone number: ${lead.phone}`
      console.warn(`[AiSensy] ${msg}`)
      await execute(
        `UPDATE leads SET whatsapp_msg_status = $1 WHERE id = $2`,
        [`invalid_phone: ${lead.phone}`, lead.id]
      )
      return { success: false, error: msg }
    }

    const fullName = (lead.client_name || lead.name || 'Friend').trim()
    const templateName = options?.templateName || 'ringing_sale'
    const statusText = formatStatusForTemplate(options?.status || lead.status || 'Ringing')
    const salesPhone = formatSalesRepPhone(options?.salesRepPhone)

    // 3 Exact Variables matching the template: [Lead Name, Status, Salesperson Phone]
    const templateParams = [
      fullName,
      statusText,
      salesPhone,
    ]

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

    console.log(`[AiSensy] Sending '${templateName}' to ${destination}:`, JSON.stringify(templateParams))

    const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const resData = await res.json().catch(() => ({}))

    if (!res.ok || resData.success === false) {
      const errMsg = resData.message || resData.error || `HTTP ${res.status}`
      console.error('[AiSensy] API Error:', errMsg, resData)
      await execute(
        `UPDATE leads SET 
          whatsapp_msg_status = $1,
          updated_at = NOW()
         WHERE id = $2`,
        [`aisensy_error: ${errMsg}`, lead.id]
      )
      return { success: false, error: errMsg, data: resData }
    }

    console.log(`[AiSensy] Successfully delivered '${templateName}' to ${destination}`)

    // Mark as sent in DB
    await execute(
      `UPDATE leads SET 
        whatsapp_ringing_sent = TRUE,
        whatsapp_msg_status = 'aisensy_ringing_sent',
        last_whatsapp_sent_at = NOW(),
        updated_at = NOW()
       WHERE id = $1`,
      [lead.id]
    )

    return { success: true, data: resData }
  } catch (err: any) {
    console.error('[AiSensy] Exception while sending template:', err)
    return { success: false, error: err.message || 'Unknown error' }
  }
}

/**
 * Helper to check and execute the AiSensy trigger on lead status change.
 */
export async function handleLeadStatusChangeAiSensy(
  leadId: string,
  newStatus: string,
  updatedByUserId?: string
): Promise<void> {
  try {
    const lead = await queryOne<LeadForAiSensy>(
      `SELECT id, name, client_name, phone, status, assigned_to, whatsapp_ringing_sent 
       FROM leads 
       WHERE id = $1`,
      [leadId]
    )

    if (!lead) return

    const shouldSend = shouldTriggerRingingSaleWhatsApp(
      lead.status,
      newStatus,
      lead.whatsapp_ringing_sent
    )

    if (!shouldSend) return

    // Find the salesperson's phone number who made the call / updated the status
    let salesRepPhone = '9768726006'
    const targetUserId = updatedByUserId || lead.assigned_to
    if (targetUserId) {
      const profile = await queryOne<{ phone: string | null; whatsapp_number: string | null }>(
        `SELECT phone, whatsapp_number FROM profiles WHERE id = $1`,
        [targetUserId]
      )
      if (profile?.phone || profile?.whatsapp_number) {
        salesRepPhone = profile.phone || profile.whatsapp_number || '9768726006'
      }
    }

    await sendAiSensyRingingSaleTemplate(lead, {
      status: newStatus,
      salesRepPhone,
      templateName: 'ringing_sale',
    })
  } catch (err) {
    console.error('[AiSensy] Error in handleLeadStatusChangeAiSensy:', err)
  }
}
