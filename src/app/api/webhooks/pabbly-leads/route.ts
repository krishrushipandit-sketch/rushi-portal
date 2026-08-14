import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, any> = {}

    const contentType = req.headers.get('content-type') || ''

    // 1. Universal Body Parsing (supports Raw JSON, FormData, URL-Encoded, and URL Params)
    if (contentType.includes('application/json')) {
      try {
        body = await req.json()
      } catch {
        body = {}
      }
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      try {
        const formData = await req.formData()
        for (const [key, value] of formData.entries()) {
          body[key] = typeof value === 'string' ? value : (value as File).name
        }
      } catch {
        try {
          const text = await req.text()
          const params = new URLSearchParams(text)
          for (const [key, value] of params.entries()) {
            body[key] = value
          }
        } catch {
          body = {}
        }
      }
    } else {
      // Fallback: Try JSON parse, then URL search params from raw text
      try {
        const text = await req.text()
        if (text) {
          try {
            body = JSON.parse(text)
          } catch {
            const params = new URLSearchParams(text)
            for (const [key, value] of params.entries()) {
              body[key] = value
            }
          }
        }
      } catch {
        body = {}
      }
    }

    // Also merge URL search parameters
    for (const [key, value] of req.nextUrl.searchParams.entries()) {
      if (key !== 'secret' && !body[key]) {
        body[key] = value
      }
    }

    // Security token check (optional secret token parameter)
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-pabbly-secret') || body.secret
    const expectedSecret = process.env.PABBLY_WEBHOOK_SECRET || 'rushi_pabbly_secret_2026'

    if (secret && secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 })
    }

    // 2. Parse standard lead fields
    const rawName =
      body.full_name ||
      body.name ||
      body.Name ||
      body.client_name ||
      body.ClientName ||
      body.student_name ||
      body.StudentName ||
      `${body.first_name || body.FirstName || ''} ${body.last_name || body.LastName || ''}`.trim() ||
      'Unknown Lead'

    const rawPhone =
      body.phone_number ||
      body.phone ||
      body.Phone ||
      body.mobile ||
      body.Mobile ||
      body.contact ||
      body.Contact ||
      body.contact_number ||
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

    // Clean and normalize phone number
    const cleanPhone = String(rawPhone).replace(/[^\d+]/g, '') || 'Not provided'

    // 3. Identify & Normalize Industry/Course
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
      // Preserve custom industry entered by admin/user
      industry = rawIndustry.trim()
    }

    // 4. Dynamic Parameter Extraction (Any new questions from Facebook form / Pabbly)
    const standardKeys = new Set([
      'full_name', 'name', 'first_name', 'last_name', 'client_name', 'clientname', 'student_name', 'studentname',
      'phone_number', 'phone', 'mobile', 'contact', 'contact_number',
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

    // Support custom_questions array format from Facebook Leads API
    if (Array.isArray(body.custom_questions)) {
      for (const q of body.custom_questions) {
        if (q && typeof q === 'object') {
          const key = q.key || q.name || q.question || 'Question'
          const val = q.value || q.answer || q.val || ''
          if (val !== '') qualificationAnswers[key] = val
        }
      }
    }

    // Dynamically capture every single additional parameter sent in the request
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

    // 5. Strict Industry-Based Round Robin Routing
    // Find active sales employees strictly mapped to this specific industry
    const industryReps = await query<{ employee_id: string; full_name: string }>(
      `SELECT DISTINCT s.employee_id, p.full_name
       FROM sales_industry_skills s
       INNER JOIN profiles p ON s.employee_id = p.id
       WHERE LOWER(TRIM(s.industry)) = LOWER(TRIM($1))
         AND p.is_active = true
         AND p.role = 'employee'
         AND LOWER(p.department) = 'sales'
       ORDER BY p.full_name ASC`,
      [industry]
    )

    let eligibleRepIds: { id: string; name: string }[] = []
    if (industryReps && industryReps.length > 0) {
      eligibleRepIds = industryReps.map(r => ({ id: r.employee_id, name: r.full_name || 'Sales Rep' }))
    }

    // Fallback: If no rep has this specific industry, check for 'All' or 'General' skill
    if (eligibleRepIds.length === 0) {
      const generalReps = await query<{ employee_id: string; full_name: string }>(
        `SELECT DISTINCT s.employee_id, p.full_name
         FROM sales_industry_skills s
         INNER JOIN profiles p ON s.employee_id = p.id
         WHERE (LOWER(TRIM(s.industry)) = 'all' OR LOWER(TRIM(s.industry)) = 'general' OR LOWER(TRIM(s.industry)) = 'other')
           AND p.is_active = true
           AND p.role = 'employee'
           AND LOWER(p.department) = 'sales'
         ORDER BY p.full_name ASC`
      )
      if (generalReps && generalReps.length > 0) {
        eligibleRepIds = generalReps.map(r => ({ id: r.employee_id, name: r.full_name || 'Sales Rep' }))
      }
    }

    // Fallback: If still no mapped reps, route among all active sales department employees
    if (eligibleRepIds.length === 0) {
      const allActiveSales = await query<{ id: string; full_name: string }>(
        `SELECT id, full_name
         FROM profiles
         WHERE role = 'employee'
           AND is_active = true
           AND LOWER(department) = 'sales'
         ORDER BY full_name ASC`
      )
      if (allActiveSales && allActiveSales.length > 0) {
        eligibleRepIds = allActiveSales.map(e => ({ id: e.id, name: e.full_name }))
      }
    }

    let assignedToId: string | null = null
    let assignedToName: string = 'Unassigned'

    if (eligibleRepIds.length > 0) {
      const state = await queryOne<{ last_assigned_index: number }>(
        `SELECT last_assigned_index FROM industry_round_robin_state WHERE industry = $1`,
        [industry]
      )

      const currentIndex = state ? state.last_assigned_index : -1
      const nextIndex = (currentIndex + 1) % eligibleRepIds.length

      assignedToId = eligibleRepIds[nextIndex].id
      assignedToName = eligibleRepIds[nextIndex].name

      await execute(
        `INSERT INTO industry_round_robin_state (industry, last_assigned_index, updated_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (industry)
         DO UPDATE SET last_assigned_index = EXCLUDED.last_assigned_index, updated_at = EXCLUDED.updated_at`,
        [industry, nextIndex, new Date().toISOString()]
      )
    }

    // 6. Insert Lead into Database
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
        `Inbound lead via Pabbly Connect (${platform}). Industry: ${industry}`,
      ]
    )

    if (!newLead) {
      return NextResponse.json({ error: 'Failed to insert lead' }, { status: 500 })
    }

    // 7. Send In-App Notification to Assigned Sales Representative
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
        console.error('Notification insert error:', notifErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      lead_id: newLead.id,
      assigned_to: assignedToName,
      assigned_to_id: assignedToId,
      industry,
      qualification_count: Object.keys(qualificationAnswers).length,
      qualification_answers: qualificationAnswers,
    })

  } catch (err: any) {
    console.error('Pabbly Webhook Error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
