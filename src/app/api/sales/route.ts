import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

interface SalesEmployee {
  id: string
  full_name: string
  designation: string | null
  department: string | null
  avatar_url: string | null
}

interface Responsibility {
  employee_id: string
  title: string
  daily_target: number | null
}

interface DailyReport {
  employee_id: string
  report_date: string
  entries: { description: string; count: number; notes?: string }[] | null
  note: string | null
}

interface LeadRecord {
  id: string
  client_name: string
  phone: string
  email: string | null
  category: string
  industry: string | null
  platform: string | null
  status: string
  notes: string | null
  follow_up_date: string | null
  created_at: string
  updated_at: string | null
  assigned_to: string
}

const CALL_STATUSES = [
  'new', 'ringing', 'not_connected', 'switched_off',
  'not_logical', 'busy_callback', 'interested',
  'visit_scheduled', 'closed_won', 'closed_lost'
]

const ENROLLMENT_KEYWORDS = ['enrollment', 'enroll', 'admission', 'join', 'amazon', 'dm ', 'target']
const isMonthlyTarget = (title: string) =>
  ENROLLMENT_KEYWORDS.some((kw) => title.toLowerCase().includes(kw))

// GET /api/sales?month=2026-08&rep=<employee_id>
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const isAdmin = user.role === 'admin'

    // Always work in IST (UTC+5:30)
    const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000)
    const todayIST = nowIST.toISOString().slice(0, 10)

    const { searchParams } = new URL(req.url)
    const monthParam = searchParams.get('month') || nowIST.toISOString().slice(0, 7)
    const repParam = searchParams.get('rep') // admin can request a specific rep or 'all'

    const dateFrom = `${monthParam}-01`
    const d0 = new Date(`${dateFrom}T00:00:00`)
    const dateTo = new Date(d0.getFullYear(), d0.getMonth() + 1, 1).toISOString().slice(0, 10)

    // ── 1. Determine which employees to include ──────────────────────────────
    let salesEmployees: SalesEmployee[] = []

    if (isAdmin) {
      // Admin sees all sales dept employees, or can filter by one rep
      if (repParam && repParam !== 'all') {
        salesEmployees = await query<SalesEmployee>(
          `SELECT id, full_name, designation, department, avatar_url
           FROM profiles WHERE id = $1 AND is_active = true`,
          [repParam]
        )
      } else {
        salesEmployees = await query<SalesEmployee>(
          `SELECT id, full_name, designation, department, avatar_url
           FROM profiles
           WHERE LOWER(department) = 'sales' AND is_active = true
           ORDER BY full_name`
        )
        if (!salesEmployees || salesEmployees.length === 0) {
          salesEmployees = await query<SalesEmployee>(
            `SELECT id, full_name, designation, department, avatar_url
             FROM profiles WHERE role = 'employee' AND is_active = true ORDER BY full_name`
          )
        }
      }
    } else {
      // Salesperson only sees their own data
      salesEmployees = await query<SalesEmployee>(
        `SELECT id, full_name, designation, department, avatar_url
         FROM profiles WHERE id = $1 AND is_active = true`,
        [user.userId]
      )
    }

    if (!salesEmployees || salesEmployees.length === 0) {
      return NextResponse.json({ month: monthParam, workingDaysSoFar: 0, team: [], teamSummary: {}, allLeads: [] })
    }

    const empIds = salesEmployees.map(e => e.id)

    // ── 2. Fetch ALL leads assigned to these reps (all-time, for status breakdown) ──
    const allLeads = await query<LeadRecord>(
      `SELECT id, client_name, phone, email, category, industry, platform,
              status, notes, follow_up_date, assigned_to,
              TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at,
              TO_CHAR(updated_at, 'YYYY-MM-DD') AS updated_at
       FROM leads
       WHERE assigned_to = ANY($1::uuid[])
       ORDER BY created_at DESC`,
      [empIds]
    )

    // ── 3. Fetch leads converted THIS month (for monthly enrollment report) ──
    const convertedThisMonth = await query<LeadRecord>(
      `SELECT id, client_name, phone, email, category, industry, platform,
              status, notes, follow_up_date, assigned_to,
              TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at,
              TO_CHAR(updated_at, 'YYYY-MM-DD') AS updated_at
       FROM leads
       WHERE assigned_to = ANY($1::uuid[])
         AND status = 'closed_won'
         AND created_at >= $2 AND created_at < $3
       ORDER BY created_at DESC`,
      [empIds, dateFrom, dateTo]
    )

    // ── 4. Daily reports for this month ────────────────────────────────────
    const responsibilities = await query<Responsibility>(
      `SELECT employee_id, title, daily_target FROM employee_responsibilities
       WHERE employee_id = ANY($1::uuid[])`,
      [empIds]
    )

    const reports = await query<DailyReport>(
      `SELECT employee_id, TO_CHAR(report_date, 'YYYY-MM-DD') AS report_date, entries, note
       FROM daily_reports
       WHERE employee_id = ANY($1::uuid[]) AND report_date >= $2 AND report_date < $3
       ORDER BY report_date DESC`,
      [empIds, dateFrom, dateTo]
    )

    // ── 5. Working days so far ─────────────────────────────────────────────
    const workingDaysSoFar = (() => {
      let count = 0
      const d = new Date(`${dateFrom}T00:00:00`)
      const untilStr = todayIST < dateTo ? todayIST : dateTo
      const until = new Date(`${untilStr}T00:00:00`)
      while (d <= until) {
        if (d.getDay() !== 0) count++ // skip Sundays
        d.setDate(d.getDate() + 1)
      }
      return count || 1
    })()

    // ── 6. Build per-employee stats ─────────────────────────────────────────
    const team = salesEmployees.map((emp) => {
      const empLeads = (allLeads || []).filter(l => l.assigned_to === emp.id)
      const empConverted = (convertedThisMonth || []).filter(l => l.assigned_to === emp.id)
      const empResps = (responsibilities || []).filter(r => r.employee_id === emp.id)
      const empReports = (reports || []).filter(r => r.employee_id === emp.id)

      // Status breakdown: count each of the 10 statuses
      const statusBreakdown: Record<string, number> = {}
      for (const s of CALL_STATUSES) {
        statusBreakdown[s] = empLeads.filter(l => l.status === s).length
      }

      // Leads by status: for clicking through to see exact names
      const leadsByStatus: Record<string, { id: string; client_name: string; phone: string; email: string | null; industry: string | null; platform: string | null; created_at: string; notes: string | null }[]> = {}
      for (const s of CALL_STATUSES) {
        leadsByStatus[s] = empLeads
          .filter(l => l.status === s)
          .map(l => ({
            id: l.id,
            client_name: l.client_name,
            phone: l.phone,
            email: l.email,
            industry: l.industry,
            platform: l.platform,
            created_at: l.created_at,
            notes: l.notes
          }))
      }

      // Daily report metrics (calls / follow-ups from daily reports)
      const metrics: Record<string, { total: number; dailyTarget: number; monthlyTarget: number; entries: any[] }> = {}
      for (const resp of empResps) {
        const monthly = isMonthlyTarget(resp.title)
          ? resp.daily_target || 0
          : (resp.daily_target || 0) * workingDaysSoFar
        metrics[resp.title] = {
          total: 0,
          dailyTarget: isMonthlyTarget(resp.title) ? 0 : resp.daily_target || 0,
          monthlyTarget: monthly,
          entries: [],
        }
      }

      for (const report of empReports) {
        const parsedEntries: any[] = Array.isArray(report.entries) ? report.entries : []
        for (const entry of parsedEntries) {
          const key = empResps.find(r =>
            r.title.toLowerCase() === (entry.description || '').toLowerCase()
          )?.title || entry.description || 'General Task'
          if (!metrics[key]) metrics[key] = { total: 0, dailyTarget: 0, monthlyTarget: 0, entries: [] }
          metrics[key].total += entry.count || 0
          metrics[key].entries.push({ date: report.report_date, count: entry.count, notes: entry.notes })
        }
      }

      const daily = empReports.map(r => ({
        date: r.report_date,
        entries: r.entries,
        note: r.note,
        totalCount: Array.isArray(r.entries) ? r.entries.reduce((s: number, e: any) => s + (e.count || 0), 0) : 0,
      }))

      // Converted leads full details (this month)
      const convertedLeads = empConverted.map(l => ({
        id: l.id,
        client_name: l.client_name,
        phone: l.phone,
        email: l.email,
        industry: l.industry || l.category,
        platform: l.platform,
        notes: l.notes,
        enrolled_at: l.created_at,
      }))

      return {
        employee: emp,
        responsibilities: empResps,
        metrics,
        daysReported: empReports.length,
        workingDaysSoFar,
        reportRate: workingDaysSoFar > 0 ? Math.round((empReports.length / workingDaysSoFar) * 100) : 0,
        daily,
        // Lead analytics
        totalLeads: empLeads.length,
        convertedCount: empConverted.length,
        conversionRate: empLeads.length > 0 ? Math.round((empLeads.filter(l => l.status === 'closed_won').length / empLeads.length) * 100) : 0,
        activeLeads: empLeads.filter(l => ['interested', 'visit_scheduled', 'busy_callback'].includes(l.status)).length,
        statusBreakdown,
        leadsByStatus,
        convertedLeads,
      }
    })

    const teamSummary: Record<string, number> = {}
    for (const emp of team) {
      for (const [key, val] of Object.entries(emp.metrics)) {
        teamSummary[key] = (teamSummary[key] || 0) + val.total
      }
    }

    return NextResponse.json({
      month: monthParam,
      workingDaysSoFar,
      team,
      teamSummary,
    })
  } catch (err: unknown) {
    console.error('Sales route error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
