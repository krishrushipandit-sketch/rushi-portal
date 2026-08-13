import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/performance — employee performance analytics (admin only)
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: callerProfile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()
    if (callerProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const currentMonthPrefix = new Date().toISOString().slice(0, 7)
    const dateFrom = `${currentMonthPrefix}-01`
    const dateTo = new Date(new Date(dateFrom).setMonth(new Date(dateFrom).getMonth() + 1)).toISOString().slice(0, 10)

    // ── Run all 4 DB queries in parallel ──
    const [empRes, tasksRes, leadsRes, reportsRes] = await Promise.all([
      supabase.from('profiles').select('id, full_name, email, designation, department, avatar_url').eq('role', 'employee').eq('is_active', true),
      supabase.from('tasks').select('id, assigned_to, status, deadline, completed_at, task_type, priority'),
      supabase.from('leads').select('id, assigned_to, status, category'),
      supabase.from('daily_reports').select('employee_id, report_date, entries, note').gte('report_date', dateFrom).lt('report_date', dateTo),
    ])

    const employees = empRes.data || []
    const tasks = tasksRes.data || []
    const leads = leadsRes.data || []
    const reports = reportsRes.data || []

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
            entries: (r.entries || []) as { description: string; notes?: string; count: number }[],
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
      enrollments: reports.reduce((acc: Record<string, number>, r) => {
        const ENROLL_KEYWORDS = ['enrollment', 'enroll', 'admission', 'join', 'amazon', 'dm ', 'target']
        const entries = (r.entries || []) as { description: string; count: number }[]
        for (const entry of entries) {
          const desc = entry.description?.toLowerCase() || ''
          if (ENROLL_KEYWORDS.some(kw => desc.includes(kw))) {
            let category = 'Others'
            if (desc.includes('dm')) category = 'DM Enrollment'
            else if (desc.includes('sm')) category = 'SM Enrollment'
            else if (desc.includes('amazon')) category = 'Amazon Enrollment'
            else category = 'General Enrollment'
            acc[category] = (acc[category] || 0) + (Number(entry.count) || 0)
          }
        }
        return acc
      }, { 'DM Enrollment': 0, 'SM Enrollment': 0, 'Amazon Enrollment': 0 })
    }

    const response = NextResponse.json({ performance, globalStats })
    // Cache for 30s on CDN, serve stale for up to 60s while revalidating
    response.headers.set('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    return response
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
