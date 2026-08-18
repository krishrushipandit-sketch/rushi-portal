import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// GET /api/reports                        → employee: own reports | admin: all
// GET /api/reports?employee_id=xxx        → admin: specific employee reports
// GET /api/reports?month=2026-05          → admin: monthly summary for all employees
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'
  const { searchParams } = new URL(req.url)
  const employeeId = searchParams.get('employee_id')
  const targetDate = searchParams.get('target_date')

  // Daily summary for all employees (admin dashboard)
  if (isAdmin && targetDate) {
    try {
      const reports = await query<any>(
        `SELECT 
          dr.id, dr.employee_id, TO_CHAR(dr.report_date, 'YYYY-MM-DD') AS report_date,
          dr.entries, dr.note, dr.submitted_at, dr.updated_at, dr.updated_by_admin,
          dr.check_in_time, dr.check_out_time, dr.admin_comment,
          json_build_object(
            'id', p.id,
            'full_name', p.full_name,
            'designation', p.designation,
            'avatar_url', p.avatar_url
          ) AS employee
        FROM daily_reports dr
        LEFT JOIN profiles p ON p.id = dr.employee_id
        WHERE dr.report_date = $1`,
        [targetDate]
      )

      const employees = await query<any>(
        `SELECT id, full_name, designation, avatar_url FROM profiles WHERE is_active = true`
      )

      const summary = (employees || []).map(emp => {
        const report = (reports || []).find((r: any) => r.employee_id === emp.id)
        return { employee: emp, submitted: !!report, report: report || null }
      })
      summary.sort((a, b) => (b.submitted ? 1 : 0) - (a.submitted ? 1 : 0))
      return NextResponse.json({ targetDate, summary })
    } catch (err: any) {
      console.error(err)
      return NextResponse.json({ targetDate, summary: [] })
    }
  }

  try {
    let sql = `
      SELECT 
        dr.id, dr.employee_id, TO_CHAR(dr.report_date, 'YYYY-MM-DD') AS report_date,
        dr.entries, dr.note, dr.submitted_at, dr.updated_at, dr.updated_by_admin,
        dr.check_in_time, dr.check_out_time, dr.admin_comment,
        json_build_object(
          'id', p.id,
          'full_name', p.full_name,
          'designation', p.designation,
          'avatar_url', p.avatar_url
        ) AS employee
      FROM daily_reports dr
      LEFT JOIN profiles p ON p.id = dr.employee_id
    `
    const params: unknown[] = []

    if (!isAdmin) {
      params.push(user.userId)
      sql += ` WHERE dr.employee_id = $1`
    } else if (employeeId) {
      params.push(employeeId)
      sql += ` WHERE dr.employee_id = $1`
    }

    sql += ` ORDER BY dr.report_date DESC`

    const data = await query(sql, params)
    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}

// POST /api/reports — submit today's report
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'
  const body = await req.json()
  const { report_date, entries, note, employee_id, check_in_time, check_out_time } = body

  if (!report_date || !Array.isArray(entries)) {
    return NextResponse.json({ error: 'report_date and entries required' }, { status: 400 })
  }

  const targetEmployeeId = isAdmin && employee_id ? employee_id : user.userId
  const today = (() => {
    const d = new Date()
    const offset = d.getTimezoneOffset() * 60000
    const istTime = new Date(d.getTime() + offset + (330 * 60000))
    return istTime.toISOString().slice(0, 10)
  })()

  const cleanReportDate = String(report_date).slice(0, 10)
  if (!isAdmin && cleanReportDate < today) {
    return NextResponse.json({ error: 'Daily reports can only be edited on the same day before 12:00 AM midnight IST. Past reports are locked.' }, { status: 403 })
  }

  try {
    const existing = await queryOne<{ id: string }>(
      `SELECT id FROM daily_reports WHERE employee_id = $1 AND report_date = $2`,
      [targetEmployeeId, report_date]
    )

    let savedReport: any
    if (existing) {
      const setClauses: string[] = [
        `entries = $1::jsonb`,
        `note = $2`,
        `updated_at = $3`,
        `updated_by_admin = $4`,
      ]
      const updateParams: unknown[] = [
        JSON.stringify(entries),
        note || '',
        new Date().toISOString(),
        isAdmin,
      ]

      if (check_in_time !== undefined) {
        updateParams.push(check_in_time)
        setClauses.push(`check_in_time = $${updateParams.length}`)
      }
      if (check_out_time !== undefined) {
        updateParams.push(check_out_time)
        setClauses.push(`check_out_time = $${updateParams.length}`)
      }

      updateParams.push(existing.id)
      savedReport = await queryOne(
        `UPDATE daily_reports SET ${setClauses.join(', ')} WHERE id = $${updateParams.length} RETURNING *`,
        updateParams
      )
    } else {
      const columns: string[] = ['employee_id', 'report_date', 'entries', 'note', 'updated_at', 'updated_by_admin']
      const values: string[] = ['$1', '$2', '$3::jsonb', '$4', '$5', '$6']
      const insertParams: unknown[] = [
        targetEmployeeId,
        report_date,
        JSON.stringify(entries),
        note || '',
        new Date().toISOString(),
        isAdmin,
      ]

      if (check_in_time !== undefined) {
        insertParams.push(check_in_time)
        columns.push('check_in_time')
        values.push(`$${insertParams.length}`)
      }
      if (check_out_time !== undefined) {
        insertParams.push(check_out_time)
        columns.push('check_out_time')
        values.push(`$${insertParams.length}`)
      }

      savedReport = await queryOne(
        `INSERT INTO daily_reports (${columns.join(', ')}) VALUES (${values.join(', ')}) RETURNING *`,
        insertParams
      )
    }

    // ── Auto-calculate points (non-blocking) ──
    const token = req.headers.get('Authorization')?.replace('Bearer ', '') || ''
    const baseUrl = req.nextUrl.origin
    fetch(`${baseUrl}/api/points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ employee_id: targetEmployeeId, report_date, entries })
    }).catch(() => { /* non-critical */ })

    // ── Auto-mark Attendance based on checkout (non-blocking) ──
    if (check_out_time) {
      const isHalfDay = check_out_time < '17:00'
      execute(
        `INSERT INTO employee_attendance (employee_id, date, status, updated_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (employee_id, date) DO UPDATE SET
           status = EXCLUDED.status,
           updated_at = EXCLUDED.updated_at`,
        [targetEmployeeId, report_date, isHalfDay ? 'half_day' : 'present', new Date().toISOString()]
      ).catch(() => {})
    }

    // ── Auto-sync client production progress (non-blocking) ──
    runClientSync(targetEmployeeId, report_date, entries)

    // ── WhatsApp Notification to Admin (non-blocking) ──
    ;(async () => {
      const AISENSY_KEY = process.env.AISENSY_API_KEY || ''
      if (!AISENSY_KEY || AISENSY_KEY === 'your-aisensy-api-key-here') return

      const emp = await queryOne<{ full_name: string }>('SELECT full_name FROM profiles WHERE id = $1', [targetEmployeeId])
      const admins = await query<{ full_name: string; phone: string }>('SELECT full_name, phone FROM profiles WHERE role = $1', ['admin'])

      if (!admins || admins.length === 0) return

      const count = entries.reduce((acc: number, e: any) => acc + (e.count || 0), 0)
      const list = entries.map((e: any) => e.description).join(', ').slice(0, 50) + '...'

      for (const admin of admins) {
        if (!admin.phone || admin.phone.length < 10) continue
        const cleaned = admin.phone.replace(/\D/g, '')
        const e164 = cleaned.startsWith('91') ? cleaned : `91${cleaned}`
        try {
          await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              apiKey: AISENSY_KEY,
              campaignName: 'report_submitted_admin',
              destination: e164,
              userName: admin.full_name,
              templateParams: [
                admin.full_name,
                emp?.full_name || 'Someone',
                report_date,
                `${count} items`,
                list
              ],
              source: 'rushipandit-portal',
              media: {},
              buttons: []
            })
          })
        } catch (waErr: any) {
          console.error('[WA-Report] Admin Error:', waErr.message)
        }
      }
    })().catch(() => {})

    return NextResponse.json(savedReport, { status: existing ? 200 : 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ── Standalone sync: report entries → client_progress_log ────────────────────
function runClientSync(
  employee_id: string,
  report_date: string,
  entries: { description: string; count: number; notes?: string; clientId?: string; client_id?: string }[]
): void {
  if (!entries || entries.length === 0) return

  // Parse "4 reels", "2 youtube", "3 static posts" etc from free text
  const typePatterns: { type: string; regex: RegExp }[] = [
    { type: 'Reel',        regex: /(\d+)\s*(?:reels?|reel)/i },
    { type: 'YouTube',     regex: /(\d+)\s*(?:youtube|yt|videos?)/i },
    { type: 'Static Post', regex: /(\d+)\s*(?:static\s*posts?|static|graphics?|posts?)/i },
  ]

  function parseContentCounts(text: string, fallbackCount: number): { type: string; count: number }[] {
    const results: { type: string; count: number }[] = []
    for (const { type, regex } of typePatterns) {
      const match = text.match(regex)
      if (match) results.push({ type, count: parseInt(match[1]) })
    }
    // If nothing matched from text, use the count field as a Reel fallback
    if (results.length === 0 && fallbackCount > 0) {
      results.push({ type: 'Reel', count: fallbackCount })
    }
    return results
  }

  const work = async () => {
    const clients = await query<any>(
      `SELECT 
        c.id, c.name, c.slug,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', cd.id,
                'content_type', cd.content_type
              )
            )
            FROM client_deliverables cd
            WHERE cd.client_id = c.id
          ),
          '[]'::json
        ) AS deliverables
      FROM clients c
      WHERE c.is_active = true OR c.status = 'active'`
    )

    if (!clients || clients.length === 0) return

    // Clear existing logs for this employee on this report date before inserting updated rows
    await execute(
      `DELETE FROM client_progress_log WHERE employee_id = $1 AND log_date = $2`,
      [employee_id, report_date]
    )

    for (const entry of entries) {
      const responsibilityTitle = (entry.description || '').toLowerCase()
      const notesText = (entry.notes || '').toLowerCase()
      const combinedText = `${responsibilityTitle} ${notesText}`
      const entryCount = Number(entry.count) || 1

      // 1. Check if entry explicitly provided clientId
      let matchedClient: any = null
      if (entry.clientId) {
        matchedClient = (clients as any[]).find((c: any) => c.id === entry.clientId)
      }

      // 2. Otherwise match client by name/slug in notes or description
      if (!matchedClient) {
        matchedClient = (clients as any[]).find((c: any) => {
          const clientName = c.name.toLowerCase()
          const slug = (c.slug || '').toLowerCase()
          return combinedText.includes(clientName) || (slug.length >= 2 && combinedText.includes(slug))
        })
      }

      if (!matchedClient) continue

      const deliverables = matchedClient.deliverables || []
      if (deliverables.length === 0) continue

      // Check if this is a non-deliverable client activity (e.g. meeting, call, discussion, consultation)
      const isMeetingOrCall =
        combinedText.includes('meeting') ||
        combinedText.includes('call') ||
        combinedText.includes('discussion') ||
        combinedText.includes('consultation') ||
        combinedText.includes('review') ||
        combinedText.includes('strategy session') ||
        combinedText.includes('onboarding')

      // Determine content type strictly (Reel, YouTube, Static Post, Shooting, etc.)
      let contentType: string | null = null
      if (combinedText.includes('youtube') || combinedText.includes('yt ') || combinedText.includes('yt video') || combinedText.includes('long video')) {
        contentType = 'YouTube'
      } else if (combinedText.includes('reel') || combinedText.includes('shorts') || combinedText.includes('short video')) {
        contentType = 'Reel'
      } else if (combinedText.includes('shoot') || combinedText.includes('shooting')) {
        contentType = 'Shooting'
      } else if (
        !isMeetingOrCall &&
        (combinedText.includes('static post') ||
         combinedText.includes('static') ||
         combinedText.includes('poster') ||
         combinedText.includes('banner') ||
         combinedText.includes('thumbnail') ||
         combinedText.includes('graphic design') ||
         combinedText.includes('creative post'))
      ) {
        contentType = 'Static Post'
      } else if (combinedText.includes('story') || combinedText.includes('stories')) {
        contentType = 'Stories'
      } else if (combinedText.includes('podcast')) {
        contentType = 'Podcast'
      }

      // If it's a meeting or call and client has a specific Meeting deliverable:
      if (isMeetingOrCall && !contentType) {
        const meetingDel = deliverables.find((d: any) =>
          d.content_type.toLowerCase().includes('meeting') ||
          d.content_type.toLowerCase().includes('call') ||
          d.content_type.toLowerCase().includes('consultation')
        )
        if (meetingDel) {
          contentType = meetingDel.content_type
        } else {
          // It is a client relationship meeting — do NOT increment static post or reel counts!
          continue
        }
      }

      // If no valid deliverable format was found, NEVER guess or default to deliverables[0]!
      if (!contentType) {
        continue
      }

      // Find deliverable with matching content type
      const matchedDel = deliverables.find((d: any) => d.content_type.toLowerCase() === contentType!.toLowerCase())
      if (!matchedDel) {
        // Do not insert into progress log if client does not have this deliverable
        continue
      }

      await execute(
        `INSERT INTO client_progress_log (client_id, deliverable_id, employee_id, log_date, count, notes)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [matchedClient.id, matchedDel.id, employee_id, report_date, entryCount, entry.notes || entry.description || null]
      )
    }
  }

  work().catch(() => { /* non-critical */ })
}
