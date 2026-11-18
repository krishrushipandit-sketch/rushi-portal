'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import type { ActiveSection } from '@/lib/navigation'
import { canAccessLeads } from '@/lib/navigation'
import {
  AlertTriangle, ArrowUpRight, CalendarCheck, CheckCircle2, CheckSquare, Clock, GraduationCap,
  ListTodo, MapPinned, Sparkles, Star, Trophy, Users, ClipboardCheck, PhoneCall,
} from 'lucide-react'
import { formatDate, getStatusColor, getPriorityColor } from '@/lib/utils'
import Avatar from '@/components/ui/Avatar'
import KpiCard from '@/components/ui/KpiCard'
import AuroraHero from '@/components/ui/AuroraHero'
import CountUp from '@/components/fx/CountUp'
import DecryptedText from '@/components/fx/DecryptedText'
import DailyReportForm from './EmployeeReportForm'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

interface Props {
  profile: Profile
  onNavigate: (section: ActiveSection) => void
}

interface Task {
  id: string
  title: string
  status: string
  priority: string
  deadline: string | null
  task_type: string
  assigned_to_profile?: { full_name: string; avatar_url?: string | null } | null
}

interface GlobalStats {
  total_tasks: number
  completed: number
  in_progress: number
  overdue: number
}

interface MyDay {
  attendance: { status: string; check_in_time: string | null } | null
  reportDone: boolean
  todayReport: Record<string, unknown> | null
  reportsThisMonth: number
  followupsDue: number | null
  points: { total: number; rank: number; of: number } | null
}

const ATT_LABEL: Record<string, string> = {
  present: 'In office', wfh: 'Working from home', half_day: 'Half day',
  leave: 'On leave', leave_pending: 'Leave requested', sandwich_leave: 'On leave',
}

interface SalesPulse {
  leads: number
  pipeline: number
  visitsScheduled: number
  visitsDone: number
  enrolled: number
  trend: { month: string; visits: number }[]
}

const monthLabel = (ym: string) =>
  new Date(`${ym}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'short' })

function lastSixMonths(): string[] {
  const now = new Date(Date.now() + 5.5 * 3600 * 1000)
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - i), 1))
    return d.toISOString().slice(0, 7)
  })
}

export default function OverviewSection({ profile, onNavigate }: Props) {
  const router = useRouter()
  const isAdmin = profile.role === 'admin'
  const showSales = canAccessLeads(profile)
  const [tasks, setTasks] = useState<Task[]>([])
  const [stats, setStats] = useState<GlobalStats | null>(null)
  const [pulse, setPulse] = useState<SalesPulse | null>(null)
  const [loading, setLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState<{ employee: { full_name: string; avatar_url?: string | null }; totalPoints: number }[]>([])
  const [myDay, setMyDay] = useState<MyDay | null>(null)
  const [showReport, setShowReport] = useState(false)
  const [stars, setStars] = useState<{ rank: number; total_points: number; employee: { full_name: string; designation: string | null } }[]>([])

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

    const [tasksRes, perfRes, pointsRes, salesRes] = await Promise.all([
      fetch('/api/tasks', { headers }),
      isAdmin ? fetch('/api/performance', { headers }) : Promise.resolve(null),
      fetch('/api/points', { headers }),
      showSales ? fetch('/api/sales', { headers }) : Promise.resolve(null),
    ])

    if (!isAdmin) {
      const json = (r: Response) => (r.ok ? r.json() : null)
      const [att, reports, leads] = await Promise.all([
        fetch('/api/attendance/today', { headers }).then(json).catch(() => null),
        fetch('/api/reports', { headers }).then(json).catch(() => null),
        showSales ? fetch('/api/leads', { headers }).then(json).catch(() => null) : Promise.resolve(null),
      ])
      const todayStr = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10)
      const myReports: { report_date: string }[] = Array.isArray(reports) ? reports : []
      const todayReport = myReports.find(r => String(r.report_date).slice(0, 10) === todayStr) ?? null
      const endOfToday = new Date(); endOfToday.setHours(23, 59, 59, 999)
      setMyDay({
        attendance: att?.record ?? null,
        reportDone: !!todayReport,
        todayReport: todayReport as Record<string, unknown> | null,
        reportsThisMonth: myReports.filter(r => String(r.report_date).slice(0, 7) === todayStr.slice(0, 7)).length,
        followupsDue: Array.isArray(leads)
          ? leads.filter((l: { status: string; next_followup_at?: string | null; follow_up_date?: string | null }) => {
              const d = l.next_followup_at || l.follow_up_date
              return d && new Date(d) <= endOfToday && !['closed_won', 'closed_lost', 'not_interested'].includes(l.status)
            }).length
          : null,
        points: null,
      })
    }

    const tasksData = await tasksRes.json().catch(() => [])
    if (Array.isArray(tasksData)) setTasks(tasksData)

    if (perfRes?.ok) {
      const perfData = await perfRes.json()
      if (perfData.globalStats) setStats(perfData.globalStats)
    }
    if (pointsRes?.ok) {
      const pointsData = await pointsRes.json()
      if (pointsData.leaderboard) setLeaderboard(pointsData.leaderboard)
      if (pointsData.stars) setStars(pointsData.stars)
      if (!isAdmin && Array.isArray(pointsData.leaderboard)) {
        const board: { employee: { id: string }; totalPoints: number }[] = pointsData.leaderboard
        const idx = board.findIndex(r => r.employee.id === profile.id)
        setMyDay(d => d && ({ ...d, points: idx >= 0 ? { total: board[idx].totalPoints, rank: idx + 1, of: board.length } : { total: 0, rank: board.length + 1, of: board.length + 1 } }))
      }
    }
    if (salesRes?.ok) {
      const s = await salesRes.json()
      const team: { totalLeads: number; activeLeads: number; visitsScheduled?: number; visitsDone?: number; convertedCount: number }[] = s.team ?? []
      const byMonth = new Map<string, number>((s.visitTrend ?? []).map((r: { month: string; visits: number }) => [r.month, r.visits]))
      setPulse({
        leads: team.reduce((a, t) => a + t.totalLeads, 0),
        pipeline: team.reduce((a, t) => a + t.activeLeads, 0),
        visitsScheduled: team.reduce((a, t) => a + (t.visitsScheduled ?? 0), 0),
        visitsDone: s.visitsDoneTotal ?? team.reduce((a, t) => a + (t.visitsDone ?? 0), 0),
        enrolled: team.reduce((a, t) => a + t.convertedCount, 0),
        trend: lastSixMonths().map(m => ({ month: monthLabel(m), visits: byMonth.get(m) ?? 0 })),
      })
    }
    setLoading(false)
  }, [isAdmin, showSales, router, profile.id])

  useEffect(() => { fetchData() }, [fetchData])

  const now = new Date()
  const hour = Number(now.toLocaleString('en-IN', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }))
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = profile.full_name.split(' ')[0]
  const monthName = now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  const isOverdueTask = (t: Task) => t.deadline && new Date(t.deadline) < now && t.status !== 'completed' && t.status !== 'cancelled'
  const mine = {
    total: tasks.length,
    open: tasks.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(isOverdueTask).length,
  }

  const kpis = isAdmin && stats
    ? [
        { label: 'Open tasks', value: stats.total_tasks - stats.completed, icon: ListTodo, foot: `${stats.total_tasks} total · ${stats.completed} done`, go: 'tasks' as ActiveSection },
        { label: 'In progress', value: stats.in_progress, icon: Clock, foot: 'Pending or being worked on', go: 'tasks' as ActiveSection },
        { label: 'Overdue', value: stats.overdue, icon: AlertTriangle, foot: stats.overdue ? 'Needs attention today' : 'All on schedule', danger: stats.overdue > 0, go: 'tasks' as ActiveSection },
        { label: 'Enrolments', value: pulse?.enrolled ?? 0, icon: GraduationCap, foot: `This month · ${monthName}`, go: 'sales' as ActiveSection },
      ]
    : [
        { label: 'Open tasks', value: mine.open, icon: ListTodo, foot: `${mine.total} assigned in total`, go: 'tasks' as ActiveSection },
        { label: 'In progress', value: mine.inProgress, icon: Clock, foot: 'Currently working on', go: 'tasks' as ActiveSection },
        { label: 'Completed', value: mine.completed, icon: CheckCircle2, foot: 'Nicely done', go: 'tasks' as ActiveSection },
        { label: 'Overdue', value: mine.overdue, icon: AlertTriangle, foot: mine.overdue ? 'Past the deadline' : 'Nothing overdue', danger: mine.overdue > 0, go: 'tasks' as ActiveSection },
      ]

  const recentTasks = [...tasks]
    .sort((a, b) => {
      const rank = (t: Task) => (t.status === 'completed' ? 2 : isOverdueTask(t) ? 0 : 1)
      return rank(a) - rank(b) || (a.deadline ?? '9').localeCompare(b.deadline ?? '9')
    })
    .slice(0, 6)

  const maxPoints = Math.max(1, ...leaderboard.map(l => l.totalPoints))

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: 30, width: 280, marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 16, width: 200, marginBottom: 28 }} />
        <div className="skeleton" style={{ height: 120, marginBottom: 20, borderRadius: 14 }} />
        <div className="grid-4">{[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 116, borderRadius: 14 }} />)}</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {showReport && (
        <DailyReportForm
          existingReport={myDay?.todayReport ?? undefined}
          onClose={() => setShowReport(false)}
          onSaved={() => { setShowReport(false); fetchData(); window.dispatchEvent(new Event('rp:refresh-badges')) }}
        />
      )}
      <AuroraHero>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div>
            <div className="hero-meta">
              <span className="live-dot" />
              <span className="eyebrow">
                {now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' })} · Systems online
              </span>
            </div>
            <h1 className="hero-title" style={{ marginTop: '0.7rem' }}>
              {greeting},{' '}
              <DecryptedText text={firstName} animateOn="view" sequential speed={45} revealDirection="start" className="text-gradient" encryptedClassName="hero-scramble" />
            </h1>
            <p style={{ marginTop: '0.45rem', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              {isAdmin ? 'Here’s how the team is doing today.' : 'Here’s what’s on your plate today.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => onNavigate('reports')}>
              <CalendarCheck size={15} /> {isAdmin ? 'Daily reports' : 'Submit daily report'}
            </button>
            {showSales && (
              <button className="btn btn-primary" onClick={() => onNavigate('leads')}>
                Open pipeline <ArrowUpRight size={15} />
              </button>
            )}
          </div>
        </div>
        <div className="hero-mission">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', minWidth: 0 }}>
            <Sparkles size={16} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 4 }} />
            <p>
              <strong>We’re building one of India’s leading AI, Business Transformation and Digital Growth companies, including Stock Advisory.</strong>{' '}
              Every one of you has the opportunity to grow into a leader as we scale together.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="badge tone-info">AI &amp; Transformation</span>
            <span className="badge tone-warning">Stock Advisory</span>
            <span className="badge tone-success">Digital Growth</span>
          </div>
        </div>
      </AuroraHero>

      {!isAdmin && myDay && (() => {
        const dueToday = tasks.filter(t => t.deadline && t.status !== 'completed' && t.status !== 'cancelled' && new Date(t.deadline) <= new Date(new Date().setHours(23, 59, 59, 999))).length
        const items = [
          {
            key: 'att', icon: CalendarCheck, done: !!myDay.attendance,
            title: myDay.attendance ? `Attendance: ${ATT_LABEL[myDay.attendance.status] || myDay.attendance.status}` : 'Mark your attendance',
            sub: myDay.attendance?.check_in_time ? `Checked in at ${myDay.attendance.check_in_time.slice(0, 5)}` : 'Scan the office QR or mark WFH',
            action: myDay.attendance ? null : { label: 'Mark now', run: () => onNavigate('attendance') },
          },
          {
            key: 'report', icon: ClipboardCheck, done: myDay.reportDone,
            title: myDay.reportDone ? 'Today’s report submitted' : 'Submit today’s report',
            sub: myDay.reportDone ? 'You can still edit it until midnight' : 'Takes a minute — use the mic',
            action: { label: myDay.reportDone ? 'Edit' : 'Fill report', run: () => setShowReport(true), primary: !myDay.reportDone },
          },
          {
            key: 'tasks', icon: ListTodo, done: dueToday === 0,
            title: dueToday ? `${dueToday} task${dueToday === 1 ? '' : 's'} due today or overdue` : 'No tasks due today',
            sub: `${mine.open} open in total`,
            action: dueToday ? { label: 'Open tasks', run: () => onNavigate('tasks') } : null,
          },
          ...(myDay.followupsDue !== null ? [{
            key: 'follow', icon: PhoneCall, done: myDay.followupsDue === 0,
            title: myDay.followupsDue ? `${myDay.followupsDue} follow-up${myDay.followupsDue === 1 ? '' : 's'} due` : 'No follow-ups due',
            sub: 'Calls scheduled for today or earlier',
            action: myDay.followupsDue ? { label: 'Call now', run: () => onNavigate('leads') } : null,
          }] : []),
        ]
        const doneCount = items.filter(i => i.done).length
        return (
          <div className="overview-split">
            <section className="card" style={{ overflow: 'hidden' }}>
              <div className="card-header">
                <div>
                  <div className="card-title">My day</div>
                  <div className="card-subtitle">{doneCount} of {items.length} done</div>
                </div>
                <div className="progress-bar" style={{ width: 120, height: 6 }}><div className="progress-fill" style={{ width: `${(doneCount / items.length) * 100}%`, background: 'var(--brand-gradient)' }} /></div>
              </div>
              <ul className="myday-list">
                {items.map(item => (
                  <li key={item.key} className={item.done ? 'done' : ''}>
                    <span className="myday-icon">{item.done ? <CheckCircle2 size={16} /> : <item.icon size={16} />}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="myday-title">{item.title}</div>
                      <div className="myday-sub">{item.sub}</div>
                    </div>
                    {item.action && (
                      <button className={`btn btn-sm ${'primary' in item.action && item.action.primary ? 'btn-primary' : 'btn-secondary'}`} onClick={item.action.run}>{item.action.label}</button>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="card myday-month">
              <div className="card-header">
                <div><div className="card-title">My month</div><div className="card-subtitle">{monthName}</div></div>
                <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('reports')}>Reports <ArrowUpRight size={14} /></button>
              </div>
              <div style={{ padding: '1.1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="rank-badge"><Trophy size={18} /><span className="tabular">#{myDay.points?.rank ?? '—'}</span></div>
                  <div>
                    <div className="kpi-value text-gradient" style={{ fontSize: '2rem' }}><CountUp to={myDay.points?.total ?? 0} duration={1.1} /></div>
                    <div className="kpi-foot">points · rank {myDay.points?.rank ?? '—'} of {myDay.points?.of ?? '—'}</div>
                  </div>
                </div>
                <div className="kv-grid">
                  <div><dt>Reports submitted</dt><dd className="tabular">{myDay.reportsThisMonth}</dd></div>
                  <div><dt>Tasks completed</dt><dd className="tabular">{mine.completed}</dd></div>
                </div>
              </div>
            </section>
          </div>
        )
      })()}

      {/* KPIs */}
      <div className="grid-4">
        {kpis.map(({ label, value, icon, foot, danger, go }) => (
          <KpiCard key={label} label={label} value={value} icon={icon} foot={foot} tone={danger ? 'danger' : 'default'} onClick={() => onNavigate(go)} />
        ))}
      </div>

      {/* Sales pulse */}
      {showSales && pulse && (
        <section className="card" style={{ overflow: 'hidden' }}>
          <div className="card-header">
            <div>
              <div className="card-title">Sales pulse</div>
              <div className="card-subtitle">{isAdmin ? 'All sales reps' : 'Your pipeline'} · {monthName}</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('sales')}>Analytics <ArrowUpRight size={14} /></button>
          </div>
          <div className="overview-pulse">
            <div className="overview-pulse-stats">
              {[
                { label: 'Leads assigned', value: pulse.leads, icon: Users },
                { label: 'In pipeline', value: pulse.pipeline, icon: ListTodo },
                { label: 'Visits scheduled', value: pulse.visitsScheduled, icon: CalendarCheck },
                { label: 'Visits done', value: pulse.visitsDone, icon: MapPinned, highlight: true, sub: 'this month' },
              ].map(s => (
                <div key={s.label} className="overview-pulse-stat">
                  <span className="kpi-label truncate-1">{s.label}</span>
                  <span className={`kpi-value ${s.highlight ? 'text-gradient' : ''}`} style={{ fontSize: '1.75rem' }}>
                    <CountUp to={s.value} duration={1.2} />
                  </span>
                  {s.sub && <span className="kpi-foot">{s.sub}</span>}
                </div>
              ))}
            </div>
            <div className="overview-pulse-chart">
              <span className="kpi-label">Visits done · last 6 months</span>
              <ResponsiveContainer width="100%" height={118}>
                <AreaChart data={pulse.trend} margin={{ top: 10, right: 6, left: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={0.32} />
                      <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <Tooltip
                    cursor={{ stroke: 'var(--border-strong)' }}
                    formatter={(v) => [`${v} visits`, '']}
                    separator=""
                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 8, fontSize: 12, color: 'var(--text-primary)' }}
                    labelStyle={{ color: 'var(--text-muted)' }}
                  />
                  <Area type="monotone" dataKey="visits" stroke="var(--brand-primary)" strokeWidth={2} fill="url(#visitsFill)" dot={{ r: 2.5, fill: 'var(--brand-primary)' }} activeDot={{ r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      <div className={isAdmin ? 'overview-split' : undefined}>
        {/* Tasks */}
        <section className="card" style={{ overflow: 'hidden' }}>
          <div className="card-header">
            <div>
              <div className="card-title">{isAdmin ? 'Team tasks' : 'My tasks'}</div>
              <div className="card-subtitle">Overdue first, then by deadline</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('tasks')}>View all <ArrowUpRight size={14} /></button>
          </div>
          {recentTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><CheckSquare size={20} /></div>
              <p style={{ fontWeight: 550, color: 'var(--text-secondary)' }}>You’re all caught up</p>
              <p style={{ fontSize: '0.8125rem' }}>New tasks will show up here.</p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none' }}>
              {recentTasks.map(task => {
                const overdue = isOverdueTask(task)
                return (
                  <li key={task.id} className="overview-task">
                    <span className="overview-task-dot" style={{
                      background: task.status === 'completed' ? 'var(--status-success)' : overdue ? 'var(--status-danger)' : task.status === 'in_progress' ? 'var(--status-info)' : 'var(--text-faint)',
                    }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p className="truncate-1" style={{ fontSize: '0.875rem', fontWeight: 500, color: task.status === 'completed' ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: task.status === 'completed' ? 'line-through' : undefined }}>
                        {task.title}
                      </p>
                      {isAdmin && task.assigned_to_profile?.full_name && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                          <Avatar name={task.assigned_to_profile.full_name} src={task.assigned_to_profile.avatar_url} size="xs" />{task.assigned_to_profile.full_name}
                        </p>
                      )}
                    </div>
                    <span className={`badge ${getPriorityColor(task.priority)} hidden-mobile`} style={{ textTransform: 'capitalize' }}>{task.priority}</span>
                    <span className={`badge ${overdue ? 'tone-danger' : getStatusColor(task.status)}`} style={{ textTransform: 'capitalize' }}>
                      {overdue ? 'Overdue' : task.status.replace('_', ' ')}
                    </span>
                    {task.deadline && (
                      <span className="tabular" style={{ fontSize: '0.75rem', color: overdue ? 'var(--status-danger)' : 'var(--text-muted)', width: 48, textAlign: 'right' }}>
                        {formatDate(task.deadline, 'dd MMM')}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        {/* Points leaderboard */}
        {isAdmin && (
          <section className="card" style={{ overflow: 'hidden' }}>
            <div className="card-header">
              <div>
                <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Trophy size={15} style={{ color: 'var(--status-warning)' }} /> Points leaderboard
                </div>
                <div className="card-subtitle">{monthName}</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('leaderboard')}>Details <ArrowUpRight size={14} /></button>
            </div>

            {stars.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.9rem 1.25rem 0', flexWrap: 'wrap' }}>
                {stars.map(s => (
                  <span key={s.rank} className="badge tone-warning" style={{ height: 26 }}>
                    <Star size={12} fill="currentColor" /> {s.employee.full_name} · {s.total_points} pts
                  </span>
                ))}
              </div>
            )}

            {leaderboard.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><Trophy size={20} /></div>
                <p style={{ fontSize: '0.8125rem' }}>Points appear once employees submit reports.</p>
              </div>
            ) : (
              <ol style={{ listStyle: 'none', padding: '0.6rem 0.75rem 0.9rem' }}>
                {leaderboard.slice(0, 8).map((row, i) => (
                  <li key={row.employee.full_name} className="overview-rank">
                    <span className={`overview-rank-pos ${i < 3 ? `top-${i + 1}` : ''}`}>{i + 1}</span>
                    <Avatar name={row.employee.full_name} src={row.employee.avatar_url} size="xs" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: '0.8125rem' }}>
                        <span className="truncate-1" style={{ fontWeight: 550 }}>{row.employee.full_name}</span>
                        <span className="tabular" style={{ color: 'var(--text-muted)' }}>{row.totalPoints}</span>
                      </div>
                      <div className="progress-bar" style={{ height: 4, marginTop: 5 }}>
                        <div className="progress-fill" style={{ width: `${(row.totalPoints / maxPoints) * 100}%`, background: i === 0 ? 'var(--status-warning)' : undefined }} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
