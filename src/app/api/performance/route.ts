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

    const callerProfile = await queryOne<{ role: string; email: string; full_name: string }>(
      'SELECT role, email, full_name FROM profiles WHERE id = $1',
      [user.userId]
    )
    const isAdmin = callerProfile?.role === 'admin'
    const isKedar = callerProfile?.email?.toLowerCase().includes('kedar') || callerProfile?.full_name?.toLowerCase().includes('kedar')

    if (!isAdmin && !isKedar) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const monthParam = searchParams.get('month')
    const currentMonthPrefix = monthParam || new Date().toISOString().slice(0, 7)
    const dateFrom = `${currentMonthPrefix}-01`
    const dateTo = new Date(new Date(dateFrom).setMonth(new Date(dateFrom).getMonth() + 1)).toISOString().slice(0, 10)

    // ── Run all DB queries in parallel ──
    const [employees, allProfiles, tasks, leads, reports, clientLogs] = await Promise.all([
      query<any>(`SELECT id, full_name, email, designation, department, avatar_url FROM profiles WHERE role = 'employee' AND is_active = true`),
      query<any>(`SELECT id, full_name, email, designation, department, avatar_url, role FROM profiles WHERE is_active = true`),
      query<any>(`SELECT id, assigned_to, status, deadline, completed_at, task_type, priority FROM tasks`),
      query<any>(`SELECT id, assigned_to, status, category FROM leads`),
      query<any>(`SELECT employee_id, report_date, entries, note FROM daily_reports WHERE report_date >= $1 AND report_date < $2`, [dateFrom, dateTo]),
      query<any>(`
        SELECT l.id, l.employee_id, l.client_id, l.deliverable_id, TO_CHAR(l.log_date, 'YYYY-MM-DD') AS log_date, l.count, l.notes,
               c.name as client_name, cd.content_type, p.full_name as employee_name
        FROM client_progress_log l
        LEFT JOIN clients c ON l.client_id = c.id
        LEFT JOIN client_deliverables cd ON l.deliverable_id = cd.id
        LEFT JOIN profiles p ON l.employee_id = p.id
        WHERE l.log_date >= $1 AND l.log_date < $2
        ORDER BY l.log_date DESC
      `, [dateFrom, dateTo]),
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

    // ── Media & Video Production Analytics (Suyog, Kedar, Rohan & Creators) ──
    const mediaProfiles = allProfiles.filter(p => {
      const name = (p.full_name || '').toLowerCase()
      const dept = (p.department || '').toLowerCase()
      const desig = (p.designation || '').toLowerCase()
      return (
        name.includes('suyog') ||
        name.includes('kedar') ||
        name.includes('rohan') ||
        dept.includes('media') ||
        dept.includes('client_management') ||
        dept.includes('strategy') ||
        desig.includes('video') ||
        desig.includes('editor') ||
        desig.includes('shoot') ||
        desig.includes('graphic') ||
        clientLogs.some((l: any) => l.employee_id === p.id)
      )
    })

    const mediaProduction = mediaProfiles.map(emp => {
      const empClientLogs = clientLogs.filter((l: any) => l.employee_id === emp.id)
      const empDailyReports = reports.filter((r: any) => r.employee_id === emp.id)

      let reels = 0
      let youtube = 0
      let shooting = 0
      let staticPosts = 0
      let other = 0

      const clientMap: Record<string, { reels: number; youtube: number; shooting: number; staticPosts: number; total: number }> = {}

      // 1. Process client_progress_log
      for (const log of empClientLogs) {
        const type = (log.content_type || log.notes || '').toLowerCase()
        const count = Number(log.count) || 0
        const clientName = log.client_name || 'General Client Work'

        if (!clientMap[clientName]) {
          clientMap[clientName] = { reels: 0, youtube: 0, shooting: 0, staticPosts: 0, total: 0 }
        }

        if (type.includes('reel')) {
          reels += count
          clientMap[clientName].reels += count
        } else if (type.includes('youtube') || type.includes('yt') || type.includes('video edit')) {
          youtube += count
          clientMap[clientName].youtube += count
        } else if (type.includes('shoot') || type.includes('shooting')) {
          shooting += count
          clientMap[clientName].shooting += count
        } else if (type.includes('static') || type.includes('post') || type.includes('banner') || type.includes('thumbnail')) {
          staticPosts += count
          clientMap[clientName].staticPosts += count
        } else {
          other += count
        }
        clientMap[clientName].total += count
      }

      // 2. Also check daily reports entries for media work not already logged in client_progress_log
      for (const rep of empDailyReports) {
        const entries = (typeof rep.entries === 'string' ? JSON.parse(rep.entries) : (rep.entries || [])) as { description: string; notes?: string; count: number }[]
        for (const entry of entries) {
          const desc = (entry.description || '').toLowerCase()
          const noteText = (entry.notes || '').toLowerCase()
          const combined = `${desc} ${noteText}`
          const count = Number(entry.count) || 0

          // If count > 0 and not tagged with client_id (standalone daily report entry)
          if (count > 0 && empClientLogs.length === 0) {
            if (combined.includes('reel') && !combined.includes('shoot')) {
              reels += count
            } else if (combined.includes('youtube') || combined.includes('yt edit') || combined.includes('video edit')) {
              youtube += count
            } else if (combined.includes('shoot')) {
              shooting += count
            } else if (combined.includes('static') || combined.includes('poster') || combined.includes('banner') || combined.includes('thumbnail')) {
              staticPosts += count
            }
          }
        }
      }

      const totalDeliverables = reels + youtube + shooting + staticPosts + other

      const clientBreakdown = Object.entries(clientMap).map(([clientName, counts]) => ({
        clientName,
        ...counts
      }))

      return {
        employee: emp,
        reels,
        youtube,
        shooting,
        staticPosts,
        other,
        totalDeliverables,
        clientBreakdown,
        logsCount: empClientLogs.length,
        recentLogs: empClientLogs.slice(0, 10)
      }
    })

    // Sort so Suyog, Kedar, and Rohan are prominently at the top
    mediaProduction.sort((a, b) => {
      const aName = (a.employee.full_name || '').toLowerCase()
      const bName = (b.employee.full_name || '').toLowerCase()
      const isPriorityA = aName.includes('suyog') || aName.includes('kedar') || aName.includes('rohan')
      const isPriorityB = bName.includes('suyog') || bName.includes('kedar') || bName.includes('rohan')
      if (isPriorityA && !isPriorityB) return -1
      if (!isPriorityA && isPriorityB) return 1
      return b.totalDeliverables - a.totalDeliverables
    })

    const mediaTotals = {
      totalReels: mediaProduction.reduce((sum, p) => sum + p.reels, 0),
      totalYoutube: mediaProduction.reduce((sum, p) => sum + p.youtube, 0),
      totalShooting: mediaProduction.reduce((sum, p) => sum + p.shooting, 0),
      totalStaticPosts: mediaProduction.reduce((sum, p) => sum + p.staticPosts, 0),
      grandTotal: mediaProduction.reduce((sum, p) => sum + p.totalDeliverables, 0)
    }

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

    return NextResponse.json({
      performance,
      mediaProduction,
      mediaTotals,
      month: currentMonthPrefix,
      globalStats
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
