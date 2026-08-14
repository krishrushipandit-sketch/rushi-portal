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
    const rawName = body.full_name || body.name || body.Name || `${body.first_name || ''} ${body.last_name || ''}`.trim() || 'Unknown Lead'
    const rawPhone = body.phone_number || body.phone || body.Phone || body.mobile || body.contact || ''
    const rawEmail = body.email || body.Email || body.email_address || null
    const platform = body.platform || body.Platform || body.source || 'Facebook'

    // Normalize phone number
    const cleanPhone = String(rawPhone).replace(/[^\d+]/g, '') || 'Not provided'

    // 2. Identify Industry/Course
    let industry = body.industry || body.Industry || body.course || body.Course || 'Digital Marketing'
    const lowerInd = String(industry).toLowerCase()
    if (lowerInd.includes('share') || lowerInd.includes('stock') || lowerInd.includes('trading')) {
      industry = 'Share Market'
    } else if (lowerInd.includes('digital') || lowerInd.includes('marketing')) {
      industry = 'Digital Marketing'
    } else if (lowerInd.includes('ai') || lowerInd.includes('artificial')) {
      industry = 'AI Course'
    }

    // 3. Extract Dynamic Qualification Questions
    // Put any non-standard fields into qualification_answers object
    const knownKeys = ['full_name', 'name', 'first_name', 'last_name', 'phone_number', 'phone', 'Phone', 'mobile', 'contact', 'email', 'Email', 'email_address', 'platform', 'Platform', 'source', 'industry', 'Industry', 'course', 'Course', 'secret']

    const qualificationAnswers: Record<string, any> = {}
    for (const [key, value] of Object.entries(body)) {
      if (!knownKeys.includes(key) && value !== null && value !== undefined && value !== '') {
        // Format key nicely (e.g. "where_do_you_live" -> "Where do you live")
        const formattedKey = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase())
        qualificationAnswers[formattedKey] = value
      }
    }

    // 4. Industry Round-Robin Sales Representative Assignment
    // First: find active sales reps mapped to this specific industry
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

    // Fallback: If no rep mapped to this industry, round-robin among all active employee-role profiles
    if (eligibleRepIds.length === 0) {
      const allEmps = await query<{ id: string; full_name: string }>(
        `SELECT id, full_name FROM profiles WHERE role = 'employee' AND is_active = true AND LOWER(department) = 'sales'`
      )
      if (allEmps && allEmps.length > 0) {
        eligibleRepIds = allEmps.map(e => ({ id: e.id, name: e.full_name }))
      }
    }

    let assignedToId: string | null = null
    let assignedToName: string = 'Unassigned'

    if (eligibleRepIds.length > 0) {
      // Fetch current round-robin state for this industry
      const state = await queryOne<{ last_assigned_index: number }>(
        `SELECT last_assigned_index FROM industry_round_robin_state WHERE industry = $1`,
        [industry]
      )

      let currentIndex = state ? state.last_assigned_index : -1
      const nextIndex = (currentIndex + 1) % eligibleRepIds.length

      assignedToId = eligibleRepIds[nextIndex].id
      assignedToName = eligibleRepIds[nextIndex].name

      // Update state for next round
      await execute(
        `INSERT INTO industry_round_robin_state (industry, last_assigned_index, updated_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (industry)
         DO UPDATE SET last_assigned_index = EXCLUDED.last_assigned_index, updated_at = EXCLUDED.updated_at`,
        [industry, nextIndex, new Date().toISOString()]
      )
    }

    // 5. Insert Lead into Database
    const newLead = await queryOne<{ id: string }>(
      `INSERT INTO leads (name, client_name, phone, email, category, industry, platform, status, assigned_to, qualification_answers, notes)
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
        `Lead received via Pabbly Connect (${platform}). Industry: ${industry}`,
      ]
    )

    if (!newLead) {
      console.error('Lead Insert Error')
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
            `🎯 New ${industry} Lead Assigned!`,
            `New Lead: ${rawName} (${cleanPhone}). Industry: ${industry}`,
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
    })

  } catch (err: any) {
    console.error('Pabbly Webhook Error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
