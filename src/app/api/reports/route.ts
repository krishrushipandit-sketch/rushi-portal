import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAuth(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const { data: { user } } = await db().auth.getUser(token)
  if (!user) return null
  const { data: profile } = await db().from('profiles').select('role, full_name').eq('id', user.id).single()
  return { user, profile }
}

// GET /api/reports                        → employee: own reports | admin: all
// GET /api/reports?employee_id=xxx        → admin: specific employee reports
// GET /api/reports?month=2026-05          → admin: monthly summary for all employees
export async function GET(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { user, profile } = auth
  const isAdmin = profile?.role === 'admin'
  const { searchParams } = new URL(req.url)
  const employeeId = searchParams.get('employee_id')
  const targetDate = searchParams.get('target_date')

  // Daily summary for all employees (admin dashboard)
  if (isAdmin && targetDate) {
    try {
      const { data: reports } = await db()
        .from('daily_reports')
        .select('*, employee:profiles!daily_reports_employee_id_fkey(id, full_name, designation, avatar_url)')
        .eq('report_date', targetDate)

      const { data: employees } = await db()
        .from('profiles')
        .select('id, full_name, designation, avatar_url')
        .eq('is_active', true)

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
    let query = db()
      .from('daily_reports')
      .select('*, employee:profiles!daily_reports_employee_id_fkey(id, full_name, designation, avatar_url)')
      .order('report_date', { ascending: false })

    if (!isAdmin) {
      query = query.eq('employee_id', user.id)
    } else if (employeeId) {
      query = query.eq('employee_id', employeeId)
    }

    const { data, error } = await query
    if (error) throw error
    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}

// POST /api/reports — submit today's report
export async function POST(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { user, profile } = auth
  const isAdmin = profile?.role === 'admin'
  const body = await req.json()
  const { report_date, entries, note, employee_id, check_in_time, check_out_time } = body

  if (!report_date || !Array.isArray(entries)) {
    return NextResponse.json({ error: 'report_date and entries required' }, { status: 400 })
  }

  const targetEmployeeId = isAdmin && employee_id ? employee_id : user.id
  const today = (() => {
    const d = new Date()
    const offset = d.getTimezoneOffset() * 60000
    const istTime = new Date(d.getTime() + offset + (330 * 60000))
    return istTime.toISOString().slice(0, 10)
  })()

  if (!isAdmin && report_date !== today) {
    return NextResponse.json({ error: 'You can only update today\'s report' }, { status: 403 })
  }

  try {
    const { data: existing } = await db()
      .from('daily_reports')
      .select('id')
      .eq('employee_id', targetEmployeeId)
      .eq('report_date', report_date)
      .single()

    const payload: Record<string, any> = {
      entries,
      note: note || '',
      updated_at: new Date().toISOString(),
      updated_by_admin: isAdmin,
    }

    if (check_in_time !== undefined)  payload.check_in_time  = check_in_time
    if (check_out_time !== undefined) payload.check_out_time = check_out_time

    let savedReport: any
    if (existing) {
      const { data, error } = await db().from('daily_reports').update(payload).eq('id', existing.id).select().single()
      if (error) throw error
      savedReport = data
    } else {
      const { data, error } = await db().from('daily_reports')
        .insert({ employee_id: targetEmployeeId, report_date, ...payload })
        .select().single()
      if (error) throw error
      savedReport = data
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
      db().from('employee_attendance').upsert({
        employee_id: targetEmployeeId,
        date: report_date,
        status: isHalfDay ? 'half_day' : 'present',
        updated_at: new Date().toISOString()
      }, { onConflict: 'employee_id,date' }).then(() => {})
    }

    // ── Auto-sync client production progress (non-blocking) ──
    runClientSync(db(), targetEmployeeId, report_date, entries)

    // ── WhatsApp Notification to Admin (non-blocking) ──
    ;(async () => {
      const AISENSY_KEY = process.env.AISENSY_API_KEY || ''
      if (!AISENSY_KEY || AISENSY_KEY === 'your-aisensy-api-key-here') return

      const { data: emp } = await db().from('profiles').select('full_name').eq('id', targetEmployeeId).single()
      const { data: admins } = await db().from('profiles').select('full_name, phone').eq('role', 'admin')

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
// Responsibility title = client name (e.g. "CA Suyash Sir")
// Description/notes text = content types (e.g. "4 reels 2 youtube 3 static posts")
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runClientSync(
  client: any,
  employee_id: string,
  report_date: string,
  entries: { description: string; count: number; notes?: string }[]
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
    const { data: clients, error } = await client
      .from('clients')
      .select('id, name, slug, deliverables:client_deliverables(id, content_type)')
      .eq('is_active', true)

    if (error || !clients || clients.length === 0) return

    for (const entry of entries) {
      // entry.description = responsibility title = client name
      // entry.notes = what Kedar typed ("4 reels 2 youtube 3 static posts")
      const responsibilityTitle = (entry.description || '').toLowerCase()
      const descriptionText = `${entry.notes || ''} ${entry.description || ''}`

      // Match client by fuzzy name matching against responsibility title
      const matchedClient = (clients as any[]).find((c: any) => {
        const clientName = c.name.toLowerCase()
        const slug = (c.slug || '').toLowerCase()

        // 1. Exact match or contains full client name
        if (responsibilityTitle.includes(clientName)) return true

        // 2. Word boundary match for slug (e.g. "CA" shouldn't match "Calls")
        if (slug && slug.length >= 2) {
          const slugRegex = new RegExp(`\\b${slug}\\b`, 'i')
          if (slugRegex.test(responsibilityTitle)) return true
        }

        return false
      })

      // Skip if it's a generic internal responsibility even if matched (double safety)
      const genericKeywords = ['daily calls', 'follow-up', 'enrollment', 'attendance', 'break']
      if (genericKeywords.some(kw => responsibilityTitle.includes(kw))) continue

      if (!matchedClient) continue

      const deliverables = matchedClient.deliverables || []
      if (deliverables.length === 0) continue

      // Parse content type + count from description text
      const contentCounts = parseContentCounts(descriptionText, entry.count)

      for (const { type, count } of contentCounts) {
        if (count <= 0) continue
        const matchedDel = deliverables.find((d: any) => d.content_type === type)
        if (!matchedDel) continue

        // Upsert: delete then insert for this employee+deliverable+date
        await client
          .from('client_progress_log')
          .delete()
          .eq('employee_id', employee_id)
          .eq('deliverable_id', matchedDel.id)
          .eq('log_date', report_date)

        await client.from('client_progress_log').insert({
          client_id: matchedClient.id,
          deliverable_id: matchedDel.id,
          employee_id,
          log_date: report_date,
          count,
          notes: entry.notes || null,
        } as any)
      }
    }
  }

  work().catch(() => { /* non-critical */ })
}

