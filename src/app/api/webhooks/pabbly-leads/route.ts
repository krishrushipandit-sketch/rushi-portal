import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'

// Helper to parse multipart boundary payload from raw text
function parseMultipartText(text: string): Record<string, string> {
  const result: Record<string, string> = {}
  const parts = text.split(/--+[a-zA-Z0-9_-]+/)
  for (const part of parts) {
    const nameMatch = part.match(/name=["']?([^"';\r\n]+)["']?/)
    if (nameMatch) {
      const fieldName = nameMatch[1].trim()
      // The value is everything after the double newline up to the end of the part
      const bodyIndex = part.indexOf('\r\n\r\n') !== -1 
        ? part.indexOf('\r\n\r\n') + 4 
        : part.indexOf('\n\n') !== -1 
          ? part.indexOf('\n\n') + 2 
          : -1
      
      if (bodyIndex !== -1) {
        const val = part.slice(bodyIndex).replace(/[\r\n]+$/, '').trim()
        if (val) {
          result[fieldName] = val
        }
      }
    }
  }
  return result
}

// Universal parser for any webhook request
async function parseIncomingRequest(req: NextRequest): Promise<Record<string, any>> {
  const result: Record<string, any> = {}

  // 1. Read URL query parameters first
  for (const [key, value] of req.nextUrl.searchParams.entries()) {
    if (key !== 'secret' && value) {
      result[key] = value
    }
  }

  // 2. Read raw body text once (never fails, never throws stream consumed)
  let rawText = ''
  try {
    rawText = await req.text()
  } catch {
    rawText = ''
  }

  if (rawText && rawText.trim()) {
    const trimmed = rawText.trim()

    // Try JSON parse
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed)
        if (typeof parsed === 'object' && parsed !== null) {
          Object.assign(result, parsed)
          return result
        }
      } catch { /* proceed to next format */ }
    }

    // Try Multipart form-data text parse
    if (trimmed.includes('Content-Disposition') || trimmed.includes('form-data')) {
      try {
        const multipartData = parseMultipartText(trimmed)
        if (Object.keys(multipartData).length > 0) {
          Object.assign(result, multipartData)
          return result
        }
      } catch { /* proceed to next format */ }
    }

    // Try URL-Encoded format (e.g. key1=val1&key2=val2)
    try {
      const params = new URLSearchParams(trimmed)
      let count = 0
      for (const [key, value] of params.entries()) {
        if (key && value) {
          result[key] = value
          count++
        }
      }
      if (count > 0) return result
    } catch { /* proceed */ }
  }

  return result
}

export async function GET(req: NextRequest) {
  return handleLeadWebhook(req)
}

export async function POST(req: NextRequest) {
  return handleLeadWebhook(req)
}

async function handleLeadWebhook(req: NextRequest) {
  try {
    const body = await parseIncomingRequest(req)
    console.log('[PABBLY WEBHOOK] Received payload keys:', Object.keys(body))

    // Security token check (optional secret token parameter)
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-pabbly-secret') || body.secret
    const expectedSecret = process.env.PABBLY_WEBHOOK_SECRET || 'rushi_pabbly_secret_2026'

    if (secret && secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 })
    }

    // 1. Extract Lead Name with smart aliases
    const rawName =
      body.full_name ||
      body.name ||
      body.Name ||
      body.client_name ||
      body.ClientName ||
      body.student_name ||
      body.StudentName ||
      body.lead_name ||
      body.LeadName ||
      `${body.first_name || body.FirstName || ''} ${body.last_name || body.LastName || ''}`.trim() ||
      'New Lead'

    // 2. Extract Phone Number
    const rawPhone =
      body.phone_number ||
      body.phone ||
      body.Phone ||
      body.mobile ||
      body.Mobile ||
      body.contact ||
      body.Contact ||
      body.contact_number ||
      body.whatsapp ||
      body.WhatsApp ||
      ''

    const rawEmail =
      body.email ||
      body.Email ||
      body.email_address ||
      body.EmailAddress ||
      null

    const platform =
      body.platform ||
      body.Platform ||
      body.source ||
      body.Source ||
      'Facebook'

    const cleanPhone = String(rawPhone).replace(/[^\d+]/g, '') || 'Not provided'

    // 3. Extract & Normalize Industry / Program
    let rawIndustry = body.industry || body.Industry || body.course || body.Course || body.category || 'Digital Marketing'
    let industry = 'Digital Marketing'
    const lowerInd = String(rawIndustry).toLowerCase().trim()

    if (lowerInd.includes('share') || lowerInd.includes('stock') || lowerInd.includes('trading')) {
      industry = 'Share Market'
    } else if (lowerInd.includes('digital') || lowerInd.includes('marketing')) {
      industry = 'Digital Marketing'
    } else if (lowerInd.includes('ai') || lowerInd.includes('artificial') || lowerInd.includes('intelligence')) {
      industry = 'AI Course'
    } else if (lowerInd.includes('amazon')) {
      industry = 'Amazon'
    } else if (lowerInd.includes('bba') || lowerInd.includes('mba')) {
      industry = 'BBA/MBA'
    } else {
      industry = rawIndustry.trim()
    }

    // 4. Extract Dynamic Qualification Answers (Dynamic Form Fields from Pabbly)
    const standardKeys = new Set([
      'full_name', 'name', 'first_name', 'last_name', 'client_name', 'clientname', 'student_name', 'studentname', 'lead_name', 'leadname',
      'phone_number', 'phone', 'mobile', 'contact', 'contact_number', 'whatsapp',
      'email', 'email_address', 'emailaddress',
      'platform', 'source',
      'industry', 'course', 'category',
      'secret'
    ])

    const qualificationAnswers: Record<string, any> = {}

    // Support pre-nested qualification_answers
    if (body.qualification_answers && typeof body.qualification_answers === 'object') {
      Object.assign(qualificationAnswers, body.qualification_answers)
    }

    // Support custom_questions array from Facebook Leads
    if (Array.isArray(body.custom_questions)) {
      for (const q of body.custom_questions) {
        if (q && typeof q === 'object') {
          const key = q.key || q.name || q.question || 'Question'
          const val = q.value || q.answer || q.val || ''
          if (val !== '') qualificationAnswers[key] = val
        }
      }
    }

    // Dynamically collect every single other parameter passed in the body
    for (const [key, value] of Object.entries(body)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (
        !standardKeys.has(normalizedKey) &&
        value !== null &&
        value !== undefined &&
        value !== '' &&
        typeof value !== 'object'
      ) {
        const formattedKey = key
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')
          .trim()
          .replace(/\b\w/g, c => c.toUpperCase())
        qualificationAnswers[formattedKey] = value
      }
    }

    // 5. Sales Representative Routing (Explicit Rep, Router Number, or Round-Robin)
    let assignedToId: string | null = null
    let assignedToName: string = 'Unassigned'
    let assignedToEmail: string | null = null

    // 5.1 Fetch active sales reps for this industry (Ordered: Navin -> Poonam)
    const industryReps = await query<{ employee_id: string; full_name: string; email: string }>(
      `SELECT DISTINCT s.employee_id, p.full_name, p.email
       FROM sales_industry_skills s
       INNER JOIN profiles p ON s.employee_id = p.id
       WHERE LOWER(TRIM(s.industry)) = LOWER(TRIM($1))
         AND p.is_active = true
         AND p.role = 'employee'
         AND LOWER(p.department) = 'sales'
       ORDER BY p.full_name ASC`,
      [industry]
    )

    let eligibleRepIds: { id: string; name: string; email: string }[] = []
    if (industryReps && industryReps.length > 0) {
      eligibleRepIds = industryReps.map(r => ({ id: r.employee_id, name: r.full_name || 'Sales Rep', email: r.email }))
    }

    // Fallback: Check for 'All' or 'General' skill
    if (eligibleRepIds.length === 0) {
      const generalReps = await query<{ employee_id: string; full_name: string; email: string }>(
        `SELECT DISTINCT s.employee_id, p.full_name, p.email
         FROM sales_industry_skills s
         INNER JOIN profiles p ON s.employee_id = p.id
         WHERE (LOWER(TRIM(s.industry)) = 'all' OR LOWER(TRIM(s.industry)) = 'general' OR LOWER(TRIM(s.industry)) = 'other')
           AND p.is_active = true
           AND p.role = 'employee'
           AND LOWER(p.department) = 'sales'
         ORDER BY p.full_name ASC`
      )
      if (generalReps && generalReps.length > 0) {
        eligibleRepIds = generalReps.map(r => ({ id: r.employee_id, name: r.full_name || 'Sales Rep', email: r.email }))
      }
    }

    // Fallback: All active sales employees
    if (eligibleRepIds.length === 0) {
      const allActiveSales = await query<{ id: string; full_name: string; email: string }>(
        `SELECT id, full_name, email
         FROM profiles
         WHERE role = 'employee'
           AND is_active = true
           AND LOWER(department) = 'sales'
         ORDER BY full_name ASC`
      )
      if (allActiveSales && allActiveSales.length > 0) {
        eligibleRepIds = allActiveSales.map(e => ({ id: e.id, name: e.full_name, email: e.email }))
      }
    }

    // 5.2 Check if Pabbly / Sheet passed an explicit salesperson / counselor by name
    const explicitRepInput =
      body.assigned_to ||
      body.salesperson ||
      body.sales_rep ||
      body.counselor ||
      body.agent ||
      body.caller ||
      body.owner ||
      body.employee ||
      body.Salesperson ||
      body.AssignedTo ||
      body.Counselor

    if (explicitRepInput && typeof explicitRepInput === 'string' && explicitRepInput.trim()) {
      const searchRep = explicitRepInput.trim()
      const matchedProfile = await queryOne<{ id: string; full_name: string; email: string }>(
        `SELECT id, full_name, email
         FROM profiles
         WHERE (
           LOWER(full_name) = LOWER($1) OR
           LOWER(full_name) ILIKE '%' || LOWER($1) || '%' OR
           LOWER(email) = LOWER($1) OR
           LOWER(email) ILIKE '%' || LOWER($1) || '%'
         )
         AND is_active = true
         ORDER BY (LOWER(full_name) = LOWER($1)) DESC, is_active DESC
         LIMIT 1`,
        [searchRep]
      )

      if (matchedProfile) {
        assignedToId = matchedProfile.id
        assignedToName = matchedProfile.full_name
        assignedToEmail = matchedProfile.email
      }
    }

    // 5.3 Check if Pabbly passed a router number (e.g. 1 -> Navin, 2 -> Poonam)
    const routingNumInput =
      body.routing_number ||
      body.router_number ||
      body.route ||
      body.router ||
      body.routing_no ||
      body.round_robin_no ||
      body.round_robin_number ||
      body.routingNumber ||
      body.routerNumber

    if (!assignedToId && routingNumInput !== undefined && routingNumInput !== null && routingNumInput !== '') {
      const num = parseInt(String(routingNumInput), 10)
      if (!isNaN(num) && num > 0 && eligibleRepIds.length > 0) {
        const targetIdx = (num - 1) % eligibleRepIds.length
        assignedToId = eligibleRepIds[targetIdx].id
        assignedToName = eligibleRepIds[targetIdx].name
        assignedToEmail = eligibleRepIds[targetIdx].email
      }
    }

    // 5.4 Standard Round-Robin if not assigned by above steps
    if (!assignedToId && eligibleRepIds.length > 0) {
      const state = await queryOne<{ last_assigned_index: number }>(
        `SELECT last_assigned_index FROM industry_round_robin_state WHERE industry = $1`,
        [industry]
      )

      const currentIndex = state ? state.last_assigned_index : -1
      const nextIndex = (currentIndex + 1) % eligibleRepIds.length

      assignedToId = eligibleRepIds[nextIndex].id
      assignedToName = eligibleRepIds[nextIndex].name
      assignedToEmail = eligibleRepIds[nextIndex].email

      await execute(
        `INSERT INTO industry_round_robin_state (industry, last_assigned_index, updated_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (industry)
         DO UPDATE SET last_assigned_index = EXCLUDED.last_assigned_index, updated_at = EXCLUDED.updated_at`,
        [industry, nextIndex, new Date().toISOString()]
      )
    }

    // 6. Insert Lead into Database (initial notes are blank)
    const newLead = await queryOne<{ id: string }>(
      `INSERT INTO leads (
        name,
        client_name,
        phone,
        email,
        category,
        industry,
        platform,
        status,
        assigned_to,
        qualification_answers,
        notes
      )
      VALUES ($1, $1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10)
      RETURNING id`,
      [
        rawName,
        cleanPhone,
        rawEmail,
        industry,
        industry,
        platform,
        'new',
        assignedToId,
        JSON.stringify(qualificationAnswers),
        null,
      ]
    )

    if (!newLead) {
      return NextResponse.json({ error: 'Failed to insert lead' }, { status: 500 })
    }

    // 7. Create in-app notification
    if (assignedToId) {
      try {
        await execute(
          `INSERT INTO notifications (user_id, title, message, type)
           VALUES ($1, $2, $3, $4)`,
          [
            assignedToId,
            `New ${industry} Lead Assigned!`,
            `Lead: ${rawName} (${cleanPhone}). Industry: ${industry}`,
            'info',
          ]
        )
      } catch (notifErr) {
        console.error('Notification error:', notifErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      lead_id: newLead.id,
      assigned_to: assignedToName,
      assigned_to_name: assignedToName,
      assigned_to_email: assignedToEmail,
      assigned_to_id: assignedToId,
      industry,
      name: rawName,
      phone: cleanPhone,
      email: rawEmail,
      qualification_count: Object.keys(qualificationAnswers).length,
      qualification_answers: qualificationAnswers,
      received_fields: Object.keys(body),
    })

  } catch (err: any) {
    console.error('Pabbly Webhook Error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
