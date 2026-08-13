import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

interface SalesEmployee {
  id: string
  full_name: string
  designation: string | null
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

// GET /api/sales?month=2026-05
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (user.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

    // Always work in IST (UTC+5:30)
    const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000)
    const todayIST = nowIST.toISOString().slice(0, 10) // YYYY-MM-DD in IST

    const { searchParams } = new URL(req.url)
    const monthParam = searchParams.get('month') || nowIST.toISOString().slice(0, 7)

    const dateFrom = `${monthParam}-01`
    const d0 = new Date(`${dateFrom}T00:00:00`)
    const dateTo = new Date(d0.getFullYear(), d0.getMonth() + 1, 1).toISOString().slice(0, 10)

    // 1. Get sales department employees (case-insensitive)
    let salesEmployees = await query<SalesEmployee>(
      `SELECT id, full_name, designation, avatar_url
       FROM profiles
       WHERE LOWER(department) = 'sales' AND is_active = true
       ORDER BY full_name`
    )

    // Fallback: If no employees have department='sales', get all active non-admin employees
    if (!salesEmployees || salesEmployees.length === 0) {
      salesEmployees = await query<SalesEmployee>(
        `SELECT id, full_name, designation, avatar_url
         FROM profiles
         WHERE is_active = true
         ORDER BY full_name`
      )
    }

    if (!salesEmployees || salesEmployees.length === 0) {
      return NextResponse.json({ month: monthParam, workingDaysSoFar: 0, team: [], teamSummary: {} })
    }

    // 2. Get responsibilities for sales employees
    const responsibilities = await query<Responsibility>(
      `SELECT employee_id, title, daily_target
       FROM employee_responsibilities`
    )

    // 3. Get daily reports for this month
    const reports = await query<DailyReport>(
      `SELECT employee_id, TO_CHAR(report_date, 'YYYY-MM-DD') AS report_date, entries, note
       FROM daily_reports
       WHERE report_date >= $1 AND report_date < $2
       ORDER BY report_date DESC`,
      [dateFrom, dateTo]
    )

    // Working days in the month so far (Mon–Sat)
    const workingDaysSoFar = (() => {
      let count = 0
      const d = new Date(`${dateFrom}T00:00:00`)
      const untilStr = todayIST < dateTo ? todayIST : dateTo
      const until = new Date(`${untilStr}T00:00:00`)
      while (d <= until) {
        if (d.getDay() !== 0) count++ // 0 = Sunday
        d.setDate(d.getDate() + 1)
      }
      return count || 1
    })()

    const MONTHLY_TARGET_KEYWORDS = ['enrollment', 'enroll', 'admission', 'join', 'amazon', 'dm ', 'target']
    const isMonthlyTarget = (title: string) =>
      MONTHLY_TARGET_KEYWORDS.some((kw) => title.toLowerCase().includes(kw))

    // Build per-employee data
    const team = salesEmployees.map((emp) => {
      const empResps = (responsibilities || []).filter((r) => r.employee_id === emp.id)
      const empReports = (reports || []).filter((r) => r.employee_id === emp.id)

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
          const key =
            empResps.find(
              (r) => r.title.toLowerCase() === (entry.description || '').toLowerCase()
            )?.title || entry.description || 'General Task'

          if (!metrics[key]) {
            metrics[key] = { total: 0, dailyTarget: 0, monthlyTarget: 0, entries: [] }
          }
          metrics[key].total += entry.count || 0
          metrics[key].entries.push({ date: report.report_date, count: entry.count, notes: entry.notes })
        }
      }

      const daily = empReports.map((r) => ({
        date: r.report_date,
        entries: r.entries,
        note: r.note,
        totalCount: Array.isArray(r.entries) ? r.entries.reduce((s: number, e: any) => s + (e.count || 0), 0) : 0,
      }))

      return {
        employee: emp,
        responsibilities: empResps,
        metrics,
        daysReported: empReports.length,
        workingDaysSoFar,
        reportRate: workingDaysSoFar > 0 ? Math.round((empReports.length / workingDaysSoFar) * 100) : 0,
        daily,
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
