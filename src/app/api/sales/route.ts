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
  const { data: profile } = await db().from('profiles').select('role').eq('id', user.id).single()
  return { user, profile }
}

// GET /api/sales?month=2026-05
export async function GET(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (auth.profile?.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

  // Always work in IST (UTC+5:30)
  const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000)
  const todayIST = nowIST.toISOString().slice(0, 10) // YYYY-MM-DD in IST

  const { searchParams } = new URL(req.url)
  const monthParam = searchParams.get('month') || nowIST.toISOString().slice(0, 7)

  const dateFrom = `${monthParam}-01`
  // Last day of month: day-0 trick
  const d0 = new Date(`${dateFrom}T00:00:00`)
  const dateTo = new Date(d0.getFullYear(), d0.getMonth() + 1, 1).toISOString().slice(0, 10)

  // Get all sales department employees
  const { data: salesEmployees } = await db()
    .from('profiles')
    .select('id, full_name, designation, avatar_url')
    .eq('department', 'Sales')
    .eq('is_active', true)

  if (!salesEmployees || salesEmployees.length === 0) {
    return NextResponse.json({ month: monthParam, team: [], summary: {} })
  }

  const empIds = salesEmployees.map(e => e.id)

  // Get responsibilities for all sales employees
  const { data: responsibilities } = await db()
    .from('employee_responsibilities')
    .select('employee_id, title, daily_target')
    .in('employee_id', empIds)

  // Get all reports for sales employees this month
  const { data: reports } = await db()
    .from('daily_reports')
    .select('employee_id, report_date, entries, note')
    .in('employee_id', empIds)
    .gte('report_date', dateFrom)
    .lt('report_date', dateTo)
    .order('report_date', { ascending: false })

  // Working days in the month so far (Mon–Sat), counted in IST
  const workingDaysSoFar = (() => {
    let count = 0
    const d = new Date(`${dateFrom}T00:00:00`)
    const untilStr = todayIST < dateTo ? todayIST : dateTo
    const until = new Date(`${untilStr}T00:00:00`)
    while (d <= until) {
      if (d.getDay() !== 0) count++ // 0 = Sunday; Mon–Sat = 6 days
      d.setDate(d.getDate() + 1)
    }
    return count
  })()

  // Keywords that indicate a MONTHLY total target (not daily)
  const MONTHLY_TARGET_KEYWORDS = ['enrollment', 'enroll', 'admission', 'join', 'amazon', 'dm ', 'target']

  const isMonthlyTarget = (title: string) =>
    MONTHLY_TARGET_KEYWORDS.some(kw => title.toLowerCase().includes(kw))

  // Build per-employee data
  const team = salesEmployees.map(emp => {
    const empResps = (responsibilities || []).filter(r => r.employee_id === emp.id)
    const empReports = (reports || []).filter(r => r.employee_id === emp.id)

    // Aggregate entries by responsibility title (case-insensitive match)
    const metrics: Record<string, { total: number; dailyTarget: number; monthlyTarget: number; entries: any[] }> = {}

    for (const resp of empResps) {
      // Enrollment = fixed monthly target | Calls/Follow-up = daily × working days
      const monthly = isMonthlyTarget(resp.title)
        ? (resp.daily_target || 0)
        : (resp.daily_target || 0) * workingDaysSoFar

      metrics[resp.title] = {
        total: 0,
        dailyTarget: isMonthlyTarget(resp.title) ? 0 : (resp.daily_target || 0),
        monthlyTarget: monthly,
        entries: []
      }
    }

    for (const report of empReports) {
      for (const entry of (report.entries || [])) {
        const key = empResps.find(r =>
          r.title.toLowerCase() === entry.description?.toLowerCase()
        )?.title || entry.description

        if (!metrics[key]) {
          metrics[key] = { total: 0, dailyTarget: 0, monthlyTarget: 0, entries: [] }
        }
        metrics[key].total += entry.count || 0
        metrics[key].entries.push({ date: report.report_date, count: entry.count, notes: entry.notes })
      }
    }

    // Daily report history (last 14 days for sparkline)
    const daily = empReports.map(r => ({
      date: r.report_date,
      entries: r.entries,
      note: r.note,
      totalCount: (r.entries || []).reduce((s: number, e: any) => s + (e.count || 0), 0)
    }))

    return {
      employee: emp,
      responsibilities: empResps,
      metrics,
      daysReported: empReports.length,
      workingDaysSoFar,
      reportRate: workingDaysSoFar > 0 ? Math.round((empReports.length / workingDaysSoFar) * 100) : 0,
      daily
    }
  })

  // Team-level summary (aggregate across all sales employees)
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
    teamSummary
  })
}
