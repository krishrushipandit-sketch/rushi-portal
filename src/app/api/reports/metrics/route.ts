import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// GET /api/reports/metrics?month=2026-05&employee_id=xxx
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await queryOne<{ role: string }>('SELECT role FROM profiles WHERE id = $1', [user.userId])
  const isAdmin = profile?.role === 'admin'

  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') || new Date().toISOString().slice(0, 7)
  const employeeFilter = searchParams.get('employee_id')

  const dateFrom = `${month}-01`
  const dateToObj = new Date(dateFrom)
  dateToObj.setMonth(dateToObj.getMonth() + 1)
  const dateTo = dateToObj.toISOString().slice(0, 10)

  let sql = `
    SELECT r.employee_id, r.report_date, r.task_entries, r.ai_metrics, r.ai_productivity_score, r.in_time, r.out_time,
           json_build_object('id', p.id, 'full_name', p.full_name, 'designation', p.designation, 'department', p.department) as employee
    FROM daily_reports r
    LEFT JOIN profiles p ON r.employee_id = p.id
    WHERE r.report_date >= $1 AND r.report_date < $2
  `
  const params: any[] = [dateFrom, dateTo]

  if (!isAdmin) {
    sql += ` AND r.employee_id = $3`
    params.push(user.userId)
  } else if (employeeFilter && employeeFilter !== 'all') {
    sql += ` AND r.employee_id = $3`
    params.push(employeeFilter)
  }

  let reports: any[] = []
  try {
    reports = await query(sql, params)
  } catch {
    return NextResponse.json({ month, data: [] })
  }

  // If admin and no filter, also get all employees (to show zero-report ones)
  let allEmployees: any[] = []
  if (isAdmin) {
    try {
      allEmployees = await query(
        `SELECT id, full_name, designation, department FROM profiles WHERE role = 'employee' AND is_active = true`
      )
    } catch {
      allEmployees = []
    }
  }

  // Build employee map
  const empMap: Record<string, {
    employee: any
    total_reports: number
    total_hours: number
    daily_scores: { date: string; score: number }[]
    // Task frequency counts (from task_entries — no AI needed)
    task_counts: Record<string, { task_title: string; count: number }>
    // AI-extracted quantities (from ai_metrics — richer when available)
    task_quantities: Record<string, { task_title: string; unit: string; total: number }>
  }> = {}

  // Init all employees with zeroes
  for (const emp of allEmployees) {
    empMap[emp.id] = { employee: emp, total_reports: 0, total_hours: 0, daily_scores: [], task_counts: {}, task_quantities: {} }
  }

  for (const report of reports) {
    const empId = report.employee_id
    if (!empMap[empId]) {
      empMap[empId] = { employee: report.employee, total_reports: 0, total_hours: 0, daily_scores: [], task_counts: {}, task_quantities: {} }
    }

    const e = empMap[empId]
    e.total_reports++

    if (report.ai_productivity_score) {
      e.daily_scores.push({ date: report.report_date, score: report.ai_productivity_score })
    }

    // Hours
    if (report.in_time && report.out_time) {
      const [ih, im] = (report.in_time as string).split(':').map(Number)
      const [oh, om] = (report.out_time as string).split(':').map(Number)
      const mins = (oh * 60 + om) - (ih * 60 + im)
      if (mins > 0) e.total_hours += mins / 60
    }

    // Count each task from task_entries (works without AI)
    const entries = (typeof report.task_entries === 'string' ? JSON.parse(report.task_entries) : report.task_entries || []) as any[]
    for (const entry of entries) {
      if (!entry.task_title) continue
      const key = entry.task_title.toLowerCase().replace(/\s+/g, '_')
      if (!e.task_counts[key]) e.task_counts[key] = { task_title: entry.task_title, count: 0 }
      e.task_counts[key].count++
    }

    // AI-extracted quantities (richer info when AI has analyzed)
    const metrics = (typeof report.ai_metrics === 'string' ? JSON.parse(report.ai_metrics) : report.ai_metrics || []) as any[]
    for (const m of metrics) {
      if (!m.task_title || !m.quantity) continue
      const key = m.task_title.toLowerCase().replace(/\s+/g, '_')
      if (!e.task_quantities[key]) e.task_quantities[key] = { task_title: m.task_title, unit: m.unit, total: 0 }
      e.task_quantities[key].total += Number(m.quantity)
    }
  }

  const result = Object.values(empMap).map(emp => {
    const scores = emp.daily_scores.map(d => d.score)
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

    // Build unified task summary: use quantity if AI gave it, else count
    const taskSummary = Object.values(emp.task_counts).map(tc => {
      const qKey = tc.task_title.toLowerCase().replace(/\s+/g, '_')
      const q = emp.task_quantities[qKey]
      return {
        task_title: tc.task_title,
        // How many days this task was worked on
        days_worked: tc.count,
        // AI-extracted total quantity (e.g. 50 outreaches) — null if not available
        ai_total: q ? q.total : null,
        ai_unit: q ? q.unit : null,
      }
    }).sort((a, b) => b.days_worked - a.days_worked)

    return {
      employee: emp.employee,
      total_reports: emp.total_reports,
      avg_productivity_score: avgScore,
      total_hours: Math.round(emp.total_hours * 10) / 10,
      daily_scores: emp.daily_scores.sort((a, b) => a.date.localeCompare(b.date)),
      task_summary: taskSummary,
    }
  }).sort((a, b) => b.total_reports - a.total_reports)

  return NextResponse.json({ month, data: result })
}
