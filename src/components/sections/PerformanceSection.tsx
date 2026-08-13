'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/database.types'
import { getInitials } from '@/lib/utils'
import {
  BarChart3, CheckCircle2, AlertTriangle, Clock, TrendingUp,
  ChevronDown, ChevronUp, CheckCircle, X
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

interface ReportEntry { description: string; notes?: string; count: number }
interface ReportDetail { date: string; entries: ReportEntry[]; note: string }

interface EmployeePerf {
  employee: { id: string; full_name: string; email: string; designation: string | null; department: string | null; avatar_url: string | null }
  tasks: { total: number; completed: number; pending: number; in_progress: number; overdue: number }
  completionRate: number
  onTimeRate: number
  leads: {
    total: number; closed_won: number; closed_lost: number
    conversion_rate: number; by_category: Record<string, number>
  }
  reports: { total_this_month: number; details: ReportDetail[] }
}

interface GlobalStats {
  total_tasks: number; completed: number; in_progress: number; overdue: number
  total_leads: number; leads_closed_won: number
}

export default function PerformanceSection({ profile }: { profile: Profile }) {
  const [performance, setPerformance] = useState<EmployeePerf[]>([])
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedEmpId, setExpandedEmpId] = useState<string | null>(null)
  const [activeDate, setActiveDate] = useState<string | null>(null) // empId::date

  const fetchData = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const token = session.access_token
    const res = await fetch('/api/performance', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (data.performance) {
      setPerformance(data.performance)
      setGlobalStats(data.globalStats)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  if (profile.role !== 'admin') return (
    <div className="empty-state">
      <p style={{ color: 'var(--text-muted)' }}>Access restricted to administrators</p>
    </div>
  )

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: '36px', width: '240px', marginBottom: '1.5rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: '88px' }} />)}
        </div>
        <div className="skeleton" style={{ height: '300px' }} />
      </div>
    )
  }

  const completionChartData = performance.map(p => ({
    name: p.employee.full_name.split(' ')[0],
    'Completion %': p.completionRate,
    'On-Time %': p.onTimeRate,
  }))

  const reportsChartData = performance.map(p => ({
    name: p.employee.full_name.split(' ')[0],
    'Reports': p.reports.total_this_month,
  }))

  const currentMonthLabel = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  return (
    <div className="animate-fade-in">
      {/* ── Header ── */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Team Performance</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {currentMonthLabel} — Click any employee to see their daily reports
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={fetchData}>Refresh</button>
      </div>

      {/* ── Global KPIs ── */}
      {globalStats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Tasks', value: globalStats.total_tasks, icon: BarChart3, color: '#6366f1' },
            { label: 'Completed', value: globalStats.completed, icon: CheckCircle2, color: '#10b981' },
            { label: 'In Progress', value: globalStats.in_progress, icon: Clock, color: '#3b82f6' },
            { label: 'Overdue', value: globalStats.overdue, icon: AlertTriangle, color: '#ef4444' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div className="metric-value" style={{ color }}>{value}</div>
                  <div className="metric-label">{label}</div>
                </div>
                <div style={{ width: '40px', height: '40px', background: `${color}18`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color, border: `1px solid ${color}22` }}>
                  <Icon size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Charts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.25rem' }}>Task Completion by Employee</h3>
          {completionChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={completionChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} unit="%" />
                <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '0.8rem' }} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Bar dataKey="Completion %" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="On-Time %" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ height: '160px' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No task data yet</p></div>
          )}
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.25rem' }}>Daily Reports Submitted This Month</h3>
          {reportsChartData.some(d => d.Reports > 0) ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={reportsChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '0.8rem' }} />
                <Bar dataKey="Reports" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ height: '160px' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No reports this month</p></div>
          )}
        </div>
      </div>

      {/* ── Individual Performance Cards ── */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Individual Performance</h2>

      {performance.length === 0 ? (
        <div className="glass-card">
          <div className="empty-state">
            <div className="empty-state-icon"><BarChart3 size={24} /></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No employee data available</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {performance.map(perf => {
            const isExpanded = expandedEmpId === perf.employee.id
            const activeDateKey = `${perf.employee.id}::${activeDate}`
            const activeReport = isExpanded && activeDate
              ? perf.reports.details.find(d => `${perf.employee.id}::${d.date}` === activeDateKey)
              : null

            return (
              <div key={perf.employee.id} className="glass-card" style={{ overflow: 'hidden', transition: 'all 0.2s' }}>

                {/* ── Row Header (always visible) ── */}
                <div
                  onClick={() => {
                    if (isExpanded) { setExpandedEmpId(null); setActiveDate(null) }
                    else { setExpandedEmpId(perf.employee.id); setActiveDate(null) }
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', cursor: 'pointer', flexWrap: 'wrap' }}
                >
                  {/* Avatar & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: '180px', flex: 1 }}>
                    {perf.employee.avatar_url ? (
                      <img
                        src={perf.employee.avatar_url}
                        alt={perf.employee.full_name}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--border-default)' }}
                      />
                    ) : (
                      <div className="avatar avatar-lg" style={{ flexShrink: 0 }}>{getInitials(perf.employee.full_name)}</div>
                    )}
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{perf.employee.full_name}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {perf.employee.designation || 'Employee'}
                        {perf.employee.department ? ` — ${perf.employee.department}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Task Stats */}
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {[
                      { label: 'Tasks', value: perf.tasks.total, color: 'var(--text-primary)' },
                      { label: 'Done', value: perf.tasks.completed, color: '#10b981' },
                      { label: 'Active', value: perf.tasks.in_progress + perf.tasks.pending, color: '#3b82f6' },
                      { label: 'Overdue', value: perf.tasks.overdue, color: '#ef4444' },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ textAlign: 'center', minWidth: '48px' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color }}>{value}</div>
                        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '1px' }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Completion Rate */}
                  <div style={{ textAlign: 'center', minWidth: '72px' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6366f1' }}>{perf.completionRate}%</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Completion</div>
                    <div style={{ marginTop: '4px', height: '3px', borderRadius: '99px', background: 'var(--border-subtle)' }}>
                      <div style={{ height: '3px', borderRadius: '99px', width: `${perf.completionRate}%`, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)' }} />
                    </div>
                  </div>

                  {/* Reports count */}
                  <div style={{
                    padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-md)', textAlign: 'center',
                    background: perf.reports.total_this_month > 0 ? 'rgba(245,158,11,0.08)' : 'var(--bg-elevated)',
                    border: `1px solid ${perf.reports.total_this_month > 0 ? 'rgba(245,158,11,0.25)' : 'var(--border-subtle)'}`,
                    minWidth: '80px'
                  }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: perf.reports.total_this_month > 0 ? '#f59e0b' : 'var(--text-muted)' }}>
                      {perf.reports.total_this_month}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Reports</div>
                  </div>

                  {isExpanded
                    ? <ChevronUp size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    : <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                </div>

                {/* ── Expanded: date pills + selected report ── */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)' }}>

                    {/* Date pill strip */}
                    <div style={{ padding: '0.875rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {currentMonthLabel}:
                      </span>
                      {perf.reports.details.length === 0 ? (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No reports submitted this month</span>
                      ) : perf.reports.details.map(rpt => {
                        const key = `${perf.employee.id}::${rpt.date}`
                        const isActive = key === activeDateKey
                        return (
                          <button
                            key={rpt.date}
                            onClick={e => { e.stopPropagation(); setActiveDate(isActive ? null : rpt.date) }}
                            style={{
                              padding: '5px 12px', borderRadius: '99px', border: 'none', cursor: 'pointer',
                              fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.15s',
                              background: isActive ? 'var(--brand-primary)' : 'rgba(16,185,129,0.1)',
                              color: isActive ? 'white' : '#10b981',
                              boxShadow: isActive ? '0 2px 8px rgba(14,61,53,0.3)' : 'none',
                              outline: isActive ? '2px solid var(--brand-primary)' : '1px solid rgba(16,185,129,0.25)',
                              outlineOffset: '1px'
                            }}
                          >
                            {new Date(rpt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            {' '}
                            <span style={{ opacity: 0.7 }}>({rpt.entries.length})</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Selected report detail panel */}
                    {activeReport && (
                      <div style={{ margin: '0 1.25rem 1.25rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-default)', background: 'var(--bg-card)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                        {/* Panel header */}
                        <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(14,61,53,0.06) 0%, transparent 100%)' }}>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-primary)' }}>
                              {new Date(activeReport.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {activeReport.entries.length} work item{activeReport.entries.length !== 1 ? 's' : ''} logged
                            </p>
                          </div>
                          <button
                            onClick={e => { e.stopPropagation(); setActiveDate(null) }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '4px' }}
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Entries table */}
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ background: 'var(--bg-elevated)' }}>
                              <th style={{ padding: '0.45rem 1.25rem', textAlign: 'left', fontSize: '0.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', width: '200px' }}>Responsibility</th>
                              <th style={{ padding: '0.45rem 1rem', textAlign: 'left', fontSize: '0.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Description</th>
                              <th style={{ padding: '0.45rem 1.25rem', textAlign: 'center', fontSize: '0.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', width: '70px' }}>Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeReport.entries.map((entry, i) => (
                              <tr key={i} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                <td style={{ padding: '0.75rem 1.25rem', verticalAlign: 'top' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle size={12} style={{ color: '#10b981', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{entry.description}</span>
                                  </div>
                                </td>
                                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'top' }}>
                                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{entry.notes || '—'}</p>
                                </td>
                                <td style={{ padding: '0.75rem 1.25rem', textAlign: 'center', verticalAlign: 'top' }}>
                                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: entry.count > 0 ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                                    {entry.count > 0 ? entry.count : '—'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {activeReport.note && (
                          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'rgba(99,102,241,0.04)', display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6366f1', flexShrink: 0, marginTop: '1px' }}>Note</span>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{activeReport.note}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
