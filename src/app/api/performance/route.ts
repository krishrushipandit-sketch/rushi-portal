import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// GET /api/performance — employee performance analytics (admin only)
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const callerProfile = await queryOne<{ role: string }>(
      'SELECT role FROM profiles WHERE id = $1',
      [user.userId]
    )
    if (callerProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const currentMonthPrefix = new Date().toISOString().slice(0, 7)
    const dateFrom = `${currentMonthPrefix}-01`
    const dateTo = new Date(new Date(dateFrom).setMonth(new Date(dateFrom).getMonth() + 1)).toISOString().slice(0, 10)

    // ── Run all 4 DB queries in parallel ──
    const [employees, tasks, leads, reports] = await Promise.all([
      query<any>(`SELECT id, full_name, email, designation, department, avatar_url FROM profiles WHERE role = 'employee' AND is_active = true`),
      query<any>(`SELECT id, assigned_to, status, deadline, completed_at, task_type, priority FROM tasks`),
      query<any>(`SELECT id, assigned_to, status, category FROM leads`),
      query<any>(`SELECT employee_id, report_date, entries, note FROM daily_reports WHERE report_date >= $1 AND report_date < $2`, [dateFrom, dateTo]),
    ])

    const performance = employees.map(emp => {
      const empTasks = tasks.filter(t => t.assigned_to === emp.id)
      const total = empTasks.length
      const completed = empTasks.filter(t => t.status === 'completed').length
      const pending = empTasks.filter(t => t.status === 'pending').length
      const inProgress = empTasks.filter(t => t.status === 'in_progress').length
      const overdue = empTasks.filter(t => t.status === 'overdue' || (
        t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed'
      )).length

      const completedOnTime = empTasks.filter(t =>
        t.status === 'completed' && t.deadline && t.completed_at &&
        new Date(t.completed_at) <= new Date(t.deadline)
      ).length
      const onTimeRate = completed > 0 ? Math.round((completedOnTime / completed) * 100) : 0

      const empLeads = leads.filter(l => l.assigned_to === emp.id)
      const closedWon = empLeads.filter(l => l.status === 'closed_won').length
      const closedLost = empLeads.filter(l => l.status === 'closed_lost').length
      const conversionRate = empLeads.length > 0 ? Math.round((closedWon / empLeads.length) * 100) : 0

      const empReports = reports.filter(r => r.employee_id === emp.id)
      empReports.sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())

      return {
        employee: emp,
        tasks: { total, completed, pending, in_progress: inProgress, overdue },
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        onTimeRate,
        leads: {
          total: empLeads.length,
          closed_won: closedWon,
          closed_lost: closedLost,
          conversion_rate: conversionRate,
          by_category: empLeads.reduce((acc: Record<string, number>, l) => {
            acc[l.category] = (acc[l.category] || 0) + 1
            return acc
          }, {}),
        },
        reports: {
          total_this_month: empReports.length,
          details: empReports.map(r => ({
            date: r.report_date,
            entries: (typeof r.entries === 'string' ? JSON.parse(r.entries) : (r.entries || [])) as { description: string; notes?: string; count: number }[],
            note: r.note || ''
          }))
        }
      }
    })

    const globalStats = {
      total_tasks: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      in_progress: tasks.filter(t => t.status === 'in_progress' || t.status === 'pending').length,
      overdue: tasks.filter(t =>
        t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed' && t.status !== 'cancelled'
      ).length,
      total_leads: leads.length,
      leads_closed_won: leads.filter(l => l.status === 'closed_won').length,
      leads_by_category: leads.reduce((acc: Record<string, number>, l) => {
        acc[l.category] = (acc[l.category] || 0) + 1
        return acc
      }, {}),
      enrollments: { 'DM Enrollment': 0, 'SM Enrollment': 0, 'Amazon Enrollment': 0 }
    }

    const response = NextResponse.json({ performance, globalStats })
    // Cache for 30s on CDN, serve stale for up to 60s while revalidating
    response.headers.set('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    return response
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
