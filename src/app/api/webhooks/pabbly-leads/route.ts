import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null) || {}

    // Security token check (optional secret token parameter)
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-pabbly-secret')
    const expectedSecret = process.env.PABBLY_WEBHOOK_SECRET || 'rushi_pabbly_secret_2026'

    if (secret && secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 })
    }

    // 1. Parse standard lead fields from Pabbly / Facebook Lead Ads payload
    const rawName =
      body.full_name ||
      body.name ||
      body.Name ||
      body.client_name ||
      body.ClientName ||
      `${body.first_name || ''} ${body.last_name || ''}`.trim() ||
      'Unknown Lead'

    const rawPhone =
      body.phone_number ||
      body.phone ||
      body.Phone ||
      body.mobile ||
      body.Mobile ||
      body.contact ||
      body.Contact ||
      ''

    const rawEmail = body.email || body.Email || body.email_address || body.EmailAddress || null
    const platform = body.platform || body.Platform || body.source || 'Facebook'

    // Normalize phone number
    const cleanPhone = String(rawPhone).replace(/[^\d+]/g, '') || 'Not provided'

    // 2. Identify Industry/Course
    let industry = body.industry || body.Industry || body.course || body.Course || body.category || 'Digital Marketing'
    const lowerInd = String(industry).toLowerCase()
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
    }

    // 3. Extract ALL Dynamic Qualification Questions / Custom Form Parameters
    const standardKeys = new Set([
      'full_name', 'name', 'first_name', 'last_name', 'client_name', 'clientname',
      'phone_number', 'phone', 'mobile', 'contact',
      'email', 'email_address', 'emailaddress',
      'platform', 'source',
      'industry', 'course', 'category',
      'secret'
    ])

    const qualificationAnswers: Record<string, any> = {}

    // Check if a pre-bundled qualification_answers or custom_questions object is passed
    if (body.qualification_answers && typeof body.qualification_answers === 'object') {
      Object.assign(qualificationAnswers, body.qualification_answers)
    }

    if (Array.isArray(body.custom_questions)) {
      for (const q of body.custom_questions) {
        if (q && typeof q === 'object') {
          const key = q.key || q.name || q.question || 'Question'
          const val = q.value || q.answer || q.val || ''
          if (val !== '') qualificationAnswers[key] = val
        }
      }
    }

    // Capture every other top-level key dynamically
    for (const [key, value] of Object.entries(body)) {
      const lowerKey = key.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (!standardKeys.has(lowerKey) && value !== null && value !== undefined && value !== '' && typeof value !== 'object') {
        // Format key nicely (e.g. "where_do_you_live" -> "Where Do You Live")
        const formattedKey = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase())
        qualificationAnswers[formattedKey] = value
      }
    }

    // 4. Industry Round-Robin Sales Representative Assignment
    const industryReps = await query<{ employee_id: string; full_name: string }>(
      `SELECT s.employee_id, p.full_name
       FROM sales_industry_skills s
       INNER JOIN profiles p ON s.employee_id = p.id
       WHERE s.industry = $1 AND p.is_active = true`,
      [industry]
    )

    let eligibleRepIds: { id: string; name: string }[] = []
    if (industryReps && industryReps.length > 0) {
      eligibleRepIds = industryReps.map(r => ({ id: r.employee_id, name: r.full_name || 'Sales Rep' }))
    }

    // Fallback: If no rep mapped to this industry, round-robin among all active sales reps
    if (eligibleRepIds.length === 0) {
      const allEmps = await query<{ id: string; full_name: string }>(
        `SELECT id, full_name FROM profiles WHERE role = 'employee' AND is_active = true AND LOWER(department) = 'sales'`
      )
      if (allEmps && allEmps.length > 0) {
        eligibleRepIds = allEmps.map(e => ({ id: e.id, name: e.full_name }))
      }
    }

    // Final fallback: any active employee
    if (eligibleRepIds.length === 0) {
      const anyEmps = await query<{ id: string; full_name: string }>(
        `SELECT id, full_name FROM profiles WHERE role = 'employee' AND is_active = true`
      )
      if (anyEmps && anyEmps.length > 0) {
        eligibleRepIds = anyEmps.map(e => ({ id: e.id, name: e.full_name }))
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

    // 5. Insert Lead into Database with full qualification answers
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

    // 6. Create Notification for Assigned Sales Rep
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
      industry,
      qualification_count: Object.keys(qualificationAnswers).length,
      qualification_answers: qualificationAnswers,
    })

  } catch (err: any) {
    console.error('Pabbly Webhook Error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
