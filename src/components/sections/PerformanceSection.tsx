'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { BarChart3, CheckCircle2, AlertTriangle, Clock, Calendar, ChevronRight, RefreshCw, MessageSquareText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import PageHeader from '@/components/ui/PageHeader'
import Reveal from '@/components/ui/Reveal'
import KpiCard from '@/components/ui/KpiCard'
import Avatar from '@/components/ui/Avatar'
import Pill from '@/components/ui/Pill'
import SidePanel, { KeyValues, PanelSection } from '@/components/ui/SidePanel'

interface ReportEntry { description: string; notes?: string; count: number }
interface ReportDetail { date: string; entries: ReportEntry[]; note: string }

interface EmployeePerf {
  employee: { id: string; full_name: string; email: string; designation: string | null; department: string | null; avatar_url: string | null }
  tasks: { total: number; completed: number; pending: number; in_progress: number; overdue: number }
  completionRate: number
  onTimeRate: number
  leads: { total: number; closed_won: number; closed_lost: number; conversion_rate: number; by_category: Record<string, number> }
  reports: { total_this_month: number; details: ReportDetail[] }
}

interface GlobalStats { total_tasks: number; completed: number; in_progress: number; overdue: number; total_leads: number; leads_closed_won: number }

const tooltip = {
  contentStyle: { background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 10, fontSize: 12, color: 'var(--text-primary)' },
  cursor: { fill: 'color-mix(in srgb, var(--brand-primary) 8%, transparent)' },
}

export default function PerformanceSection({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [selectedMonth, setSelectedMonth] = useState(new Date(Date.now() + 19800000).toISOString().slice(0, 7))
  const [performance, setPerformance] = useState<EmployeePerf[]>([])
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)
  const [activeDate, setActiveDate] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }
    const data = await fetch(`/api/performance?month=${selectedMonth}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
    if (data.performance) {
      setPerformance(data.performance)
      setGlobalStats(data.globalStats)
    }
    setLoading(false)
  }, [selectedMonth, router])

  useEffect(() => { fetchData() }, [fetchData])

  if (profile.role !== 'admin') {
    return <div className="empty-state"><p>Performance analytics are available to administrators.</p></div>
  }

  const monthLabel = new Date(`${selectedMonth}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const completionData = performance.map(p => ({ name: p.employee.full_name.split(' ')[0], 'Completion %': p.completionRate, 'On-time %': p.onTimeRate }))
  const reportsData = performance.map(p => ({ name: p.employee.full_name.split(' ')[0], Reports: p.reports.total_this_month }))
  const open = performance.find(p => p.employee.id === openId) || null
  const activeReport = open?.reports.details.find(d => d.date === activeDate) || null
  const cols = 'minmax(200px, 1.8fr) 70px 70px 70px 80px minmax(140px, 1.2fr) 80px 14px'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <PageHeader
        eyebrow={monthLabel}
        title="Performance"
        description="Task delivery and reporting discipline across the team. Click a person for their full month."
        actions={<>
          <div style={{ position: 'relative' }}>
            <Calendar size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input type="month" className="form-input" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={{ width: 'auto', paddingLeft: 32 }} aria-label="Month" />
          </div>
          <button className="icon-btn bordered" onClick={fetchData} aria-label="Refresh"><RefreshCw size={15} /></button>
        </>}
      />

      {loading ? (
        <div className="grid-4">{[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 116 }} />)}</div>
      ) : (
        <>
          {globalStats && (
            <Reveal className="grid-4">
              <KpiCard label="Total tasks" value={globalStats.total_tasks} icon={BarChart3} />
              <KpiCard label="Completed" value={globalStats.completed} icon={CheckCircle2} tone="brand" foot={`${globalStats.total_tasks ? Math.round((globalStats.completed / globalStats.total_tasks) * 100) : 0}% of all tasks`} />
              <KpiCard label="Active" value={globalStats.in_progress} icon={Clock} tone="info" foot="Pending or in progress" />
              <KpiCard label="Overdue" value={globalStats.overdue} icon={AlertTriangle} tone={globalStats.overdue ? 'danger' : 'default'} foot={globalStats.overdue ? 'Needs follow-up' : 'On schedule'} />
            </Reveal>
          )}

          <Reveal delay={0.05} className="grid-2">
            <section className="card">
              <div className="card-header"><div className="card-title">Task completion by person</div></div>
              <div style={{ padding: '1rem 1rem 0.5rem' }}>
                {completionData.length ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={completionData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                      <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} unit="%" />
                      <Tooltip {...tooltip} formatter={v => [`${v}%`]} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="Completion %" fill="var(--brand-primary)" radius={[5, 5, 0, 0]} maxBarSize={22} />
                      <Bar dataKey="On-time %" fill="var(--brand-secondary)" radius={[5, 5, 0, 0]} maxBarSize={22} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div className="empty-state"><p>No task data yet</p></div>}
              </div>
            </section>
            <section className="card">
              <div className="card-header"><div className="card-title">Daily reports submitted</div></div>
              <div style={{ padding: '1rem 1rem 0.5rem' }}>
                {reportsData.some(d => d.Reports > 0) ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={reportsData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                      <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                      <Tooltip {...tooltip} />
                      <Bar dataKey="Reports" fill="var(--status-warning)" radius={[5, 5, 0, 0]} maxBarSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div className="empty-state"><p>No reports this month</p></div>}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <section className="card list">
              <div className="card-header"><div className="card-title">Individual performance</div><span className="card-subtitle">{performance.length} people</span></div>
              {performance.length === 0 ? (
                <div className="empty-state"><p>No employee data available</p></div>
              ) : (
                <div role="list">
                  <div className="list-head" style={{ '--cols': cols } as React.CSSProperties}>
                    <span>Employee</span><span>Tasks</span><span>Done</span><span>Active</span><span>Overdue</span><span>Completion</span><span>Reports</span><span />
                  </div>
                  {performance.map(p => (
                    <div key={p.employee.id} role="listitem" tabIndex={0} className={`list-row ${openId === p.employee.id ? 'selected' : ''}`} style={{ '--cols': cols } as React.CSSProperties}
                      onClick={() => { setOpenId(p.employee.id); setActiveDate(null) }} onKeyDown={e => { if (e.key === 'Enter') { setOpenId(p.employee.id); setActiveDate(null) } }}>
                      <div className="row-main">
                        <Avatar name={p.employee.full_name} src={p.employee.avatar_url} size="sm" />
                        <div style={{ minWidth: 0 }}>
                          <div className="row-title">{p.employee.full_name}</div>
                          <div className="row-sub">{[p.employee.designation, p.employee.department].filter(Boolean).join(' · ') || 'Employee'}</div>
                        </div>
                      </div>
                      <span className="row-cell col-hide-sm tabular">{p.tasks.total}</span>
                      <span className="row-cell col-hide-sm tabular" style={{ color: 'var(--status-success)' }}>{p.tasks.completed}</span>
                      <span className="row-cell col-hide-sm tabular" style={{ color: 'var(--status-info)' }}>{p.tasks.in_progress + p.tasks.pending}</span>
                      <span className="row-cell col-hide-sm tabular" style={{ color: p.tasks.overdue ? 'var(--status-danger)' : undefined }}>{p.tasks.overdue}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ height: 5, flex: 1 }}><div className="progress-fill" style={{ width: `${p.completionRate}%`, background: 'var(--brand-gradient)' }} /></div>
                        <span className="tabular" style={{ fontSize: '0.75rem', fontWeight: 600, width: 36, textAlign: 'right' }}>{p.completionRate}%</span>
                      </div>
                      <span className="col-hide-sm"><Pill color={p.reports.total_this_month ? '#f5a524' : '#8592a3'}>{p.reports.total_this_month}</Pill></span>
                      <ChevronRight size={16} className="row-chevron col-hide-sm" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </Reveal>
        </>
      )}

      {open && (
        <SidePanel
          open
          onClose={() => setOpenId(null)}
          width={620}
          leading={<Avatar name={open.employee.full_name} src={open.employee.avatar_url} size="md" />}
          title={open.employee.full_name}
          subtitle={<>{[open.employee.designation, open.employee.department].filter(Boolean).join(' · ') || 'Employee'} · {monthLabel}</>}
        >
          <KeyValues items={[
            { label: 'Tasks', value: `${open.tasks.total} total · ${open.tasks.completed} done` },
            { label: 'Overdue', value: open.tasks.overdue },
            { label: 'Completion rate', value: `${open.completionRate}%` },
            { label: 'On-time rate', value: `${open.onTimeRate}%` },
            { label: 'Leads handled', value: open.leads.total },
            { label: 'Lead conversion', value: `${open.leads.conversion_rate}% (${open.leads.closed_won} won)` },
          ]} />

          <PanelSection title={`Daily reports · ${open.reports.total_this_month}`}>
            {open.reports.details.length === 0 ? (
              <div className="empty-inline">No reports submitted this month</div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {open.reports.details.map(r => (
                  <button key={r.date} className={`chip ${activeDate === r.date ? 'active' : ''}`} onClick={() => setActiveDate(activeDate === r.date ? null : r.date)}>
                    {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    <span style={{ opacity: 0.6 }}>{r.entries.length}</span>
                  </button>
                ))}
              </div>
            )}
            {activeReport && (
              <>
                <ul className="report-entries">
                  {activeReport.entries.map((e, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} style={{ color: 'var(--status-success)', flexShrink: 0, marginTop: 2 }} />
                      <div style={{ flex: 1, minWidth: 0 }}><strong>{e.description}</strong>{e.notes && <p>{e.notes}</p>}</div>
                      <span className="report-count tabular">{e.count > 0 ? e.count : '—'}</span>
                    </li>
                  ))}
                </ul>
                {activeReport.note && <div className="note-box"><MessageSquareText size={14} /><span>{activeReport.note}</span></div>}
              </>
            )}
          </PanelSection>
        </SidePanel>
      )}
    </div>
  )
}
