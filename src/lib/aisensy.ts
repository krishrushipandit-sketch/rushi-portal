import { execute, queryOne } from './db'

export interface LeadForAiSensy {
  id: string
  name?: string | null
  client_name?: string | null
  phone: string
  status: string
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
 * E.g. "+91 98765 43210" -> "919876543210"
 * E.g. "9876543210" -> "919876543210"
 * E.g. "09876543210" -> "919876543210"
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

  // Trigger only when moving from 'new' (or first time status change)
  const isFromNew = cleanOld === 'new' || !cleanOld || cleanOld === cleanNew
  return isFromNew
}

/**
 * Sends the AiSensy 'ringing_sale' template to the lead if eligible and not already sent.
 */
export async function sendAiSensyRingingSaleTemplate(
  lead: LeadForAiSensy,
  templateName = 'ringing_sale'
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const apiKey = process.env.AISENSY_API_KEY
    if (!apiKey) {
      console.warn('[AiSensy] AISENSY_API_KEY environment variable is not configured.')
      return { success: false, error: 'AISENSY_API_KEY is not configured' }
    }

    const destination = normalizePhoneForWhatsApp(lead.phone)
    if (!destination) {
      console.warn(`[AiSensy] Invalid phone number for lead ID ${lead.id}: ${lead.phone}`)
      return { success: false, error: 'Invalid phone number' }
    }

    const fullName = (lead.client_name || lead.name || 'Student').trim()
    const firstName = fullName.split(' ')[0] || fullName

    const payload = {
      apiKey,
      campaignName: templateName,
      destination,
      userName: fullName,
      templateParams: [
        firstName
      ],
      source: 'rushi_portal',
      media: {},
      buttons: [],
      carouselCards: [],
      location: {},
      paramsFallbackValue: {
        FirstName: firstName || 'Student',
        Name: fullName || 'Student'
      }
    }

    console.log(`[AiSensy] Sending '${templateName}' to ${destination} (${fullName})...`)

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

    console.log(`[AiSensy] Successfully sent '${templateName}' to ${destination}`)

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
  newStatus: string
): Promise<void> {
  try {
    const lead = await queryOne<LeadForAiSensy>(
      `SELECT id, name, client_name, phone, status, whatsapp_ringing_sent 
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

    if (shouldSend) {
      await sendAiSensyRingingSaleTemplate(lead, 'ringing_sale')
    }
  } catch (err) {
    console.error('[AiSensy] Error in handleLeadStatusChangeAiSensy:', err)
  }
}
