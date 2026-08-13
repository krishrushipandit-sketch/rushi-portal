'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getInitials, formatDate } from '@/lib/utils'
import { Brain, TrendingUp, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TaskSummary {
  task_title: string
  days_worked: number
  ai_total: number | null
  ai_unit: string | null
}

interface EmployeeMetrics {
  employee: { id: string; full_name: string; designation: string | null; department: string | null }
  total_reports: number
  avg_productivity_score: number
  total_hours: number
  daily_scores: { date: string; score: number }[]
  task_summary: TaskSummary[]
}

const SCORE_COLOR = (s: number) => s >= 80 ? '#10b981' : s >= 60 ? '#3b82f6' : s >= 40 ? '#f59e0b' : '#ef4444'
const SCORE_BG = (s: number) => s >= 80 ? 'rgba(16,185,129,0.08)' : s >= 60 ? 'rgba(59,130,246,0.08)' : s >= 40 ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)'

// Task label color by index
const TASK_COLORS = ['#0e3d35', '#ffb33f', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4']

export default function MonthlyMetricsPanel({ isAdmin, employeeId }: {
  isAdmin: boolean
  employeeId?: string
}) {
  const router = useRouter()
  const [data, setData] = useState<EmployeeMetrics[]>([])
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7))
  const [loading, setLoading] = useState(true)
  const [expandedEmp, setExpandedEmp] = useState<string | null>(null)

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  const fetch_ = useCallback(async () => {
    setLoading(true)
    const token = getToken()
    if (!token) return
    const params = new URLSearchParams({ month })
    if (employeeId && employeeId !== 'all') params.set('employee_id', employeeId)
    const res = await fetch(`/api/reports/metrics?${params}`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } })
    const json = await res.json()
    setData(Array.isArray(json.data) ? json.data : [])
    setLoading(false)
  }, [month, employeeId, router])

  useEffect(() => { fetch_() }, [fetch_])

  const monthLabel = new Date(`${month}-01`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  return (
    <div style={{ marginBottom: '2rem' }}>

      {/* Panel header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <TrendingUp size={17} style={{ color: 'var(--brand-primary)' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Monthly Performance — {monthLabel}</h3>
        </div>
        <input type="month" className="form-input" value={month} max={new Date().toISOString().slice(0, 7)}
          onChange={e => setMonth(e.target.value)}
          style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.82rem' }} />
      </div>

      {loading ? (
        <div className="skeleton" style={{ height: '180px' }} />
      ) : data.length === 0 ? (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <FileText size={28} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No reports submitted for {monthLabel} yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.map(emp => {
            const empId = emp.employee?.id
            const isExp = expandedEmp === empId
            const score = emp.avg_productivity_score
            const color = SCORE_COLOR(score)
            const bg = SCORE_BG(score)
            const hasTasks = emp.task_summary.length > 0
            const hasScores = emp.daily_scores.length > 1

            return (
              <div key={empId} className="glass-card" style={{ overflow: 'hidden' }}>

                {/* ── Collapsed row ── */}
                <div onClick={() => setExpandedEmp(isExp ? null : empId)}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.25rem', cursor: 'pointer', flexWrap: 'wrap' }}>

                  {/* Avatar + name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: '160px' }}>
                    <div className="avatar avatar-sm">{getInitials(emp.employee?.full_name || '')}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{emp.employee?.full_name}</p>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{emp.employee?.designation}</p>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>

                    {/* Reports */}
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.3rem', fontWeight: 800, lineHeight: 1, color: emp.total_reports > 0 ? 'var(--brand-primary)' : 'var(--text-muted)' }}>{emp.total_reports}</p>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '2px' }}>Reports</p>
                    </div>

                    {/* Score */}
                    {score > 0 && (
                      <div style={{ textAlign: 'center', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-md)', background: bg }}>
                        <p style={{ fontSize: '1.3rem', fontWeight: 800, lineHeight: 1, color }}>{score}</p>
                        <p style={{ fontSize: '0.62rem', color, marginTop: '2px' }}>AI Score</p>
                      </div>
                    )}

                    {/* Hours */}
                    {emp.total_hours > 0 && (
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '1.3rem', fontWeight: 800, lineHeight: 1 }}>{emp.total_hours}h</p>
                        <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '2px' }}>Hours</p>
                      </div>
                    )}

                    {/* Top task chips preview */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', flex: 1 }}>
                      {emp.task_summary.slice(0, 5).map((t, i) => (
                        <span key={i} style={{
                          fontSize: '0.72rem', padding: '3px 10px', borderRadius: '99px', fontWeight: 600,
                          background: `${TASK_COLORS[i % TASK_COLORS.length]}18`,
                          color: TASK_COLORS[i % TASK_COLORS.length],
                          border: `1px solid ${TASK_COLORS[i % TASK_COLORS.length]}30`,
                        }}>
                          {t.task_title.split(' ').slice(0, 2).join(' ')}
                          {' · '}
                          {t.ai_total != null ? `${t.ai_total} ${t.ai_unit}` : `${t.days_worked}×`}
                        </span>
                      ))}
                      {emp.task_summary.length > 5 && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '3px 6px' }}>
                          +{emp.task_summary.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {isExp ? <ChevronUp size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <ChevronDown size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                </div>

                {/* ── Expanded ── */}
                {isExp && (
                  <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: hasTasks && hasScores ? '1fr 1fr' : '1fr', gap: 0 }}>

                      {/* Task breakdown table */}
                      {hasTasks && (
                        <div style={{ borderRight: hasScores ? '1px solid var(--border-subtle)' : 'none' }}>
                          <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', padding: '0.75rem 1.25rem 0.5rem' }}>
                            Task Breakdown — {monthLabel}
                          </p>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr style={{ background: 'var(--bg-elevated)' }}>
                                <th style={{ padding: '0.4rem 1.25rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Task</th>
                                <th style={{ padding: '0.4rem 0.75rem', textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Days</th>
                                <th style={{ padding: '0.4rem 0.75rem', textAlign: 'right', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total (AI)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {emp.task_summary.map((t, i) => {
                                const c = TASK_COLORS[i % TASK_COLORS.length]
                                const maxDays = emp.task_summary[0]?.days_worked || 1
                                const pct = (t.days_worked / maxDays) * 100
                                return (
                                  <tr key={i} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                    <td style={{ padding: '0.5rem 1.25rem' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{t.task_title}</span>
                                      </div>
                                      {/* Bar */}
                                      <div style={{ width: '100%', height: '3px', background: 'var(--bg-elevated)', borderRadius: '99px', marginTop: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: '99px' }} />
                                      </div>
                                    </td>
                                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 700, color: c }}>
                                      {t.days_worked}
                                    </td>
                                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontSize: '0.82rem', fontWeight: 700, color: t.ai_total != null ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                                      {t.ai_total != null ? `${t.ai_total} ${t.ai_unit}` : '—'}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Daily score trend */}
                      {hasScores && (
                        <div style={{ padding: '0.75rem 1rem' }}>
                          <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                            Daily Productivity Trend
                          </p>
                          <ResponsiveContainer width="100%" height={160}>
                            <LineChart data={emp.daily_scores} margin={{ top: 0, right: 5, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                              <XAxis dataKey="date" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} tickFormatter={d => formatDate(d, 'dd/MM')} />
                              <YAxis tick={{ fontSize: 9, fill: 'var(--text-muted)' }} domain={[0, 100]} />
                              <Tooltip formatter={(v: any) => [`${v}/100`, 'AI Score']} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '0.75rem' }} />
                              <Line type="monotone" dataKey="score" stroke={color} strokeWidth={2} dot={{ r: 3, fill: color }} />
                            </LineChart>
                          </ResponsiveContainer>

                          {/* Summary stats */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                            {[
                              { label: 'Reports', value: emp.total_reports },
                              { label: 'Avg Score', value: score > 0 ? `${score}/100` : '—', color },
                              { label: 'Hours', value: emp.total_hours > 0 ? `${emp.total_hours}h` : '—' },
                            ].map(({ label, value, color: c }) => (
                              <div key={label} style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '0.5rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '1rem', fontWeight: 800, color: c || 'var(--text-primary)' }}>{value}</p>
                                <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Brain note */}
                    {emp.task_summary.some(t => t.ai_total == null) && (
                      <div style={{ padding: '0.5rem 1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'rgba(99,102,241,0.03)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Brain size={12} style={{ color: 'var(--text-muted)' }} />
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          "Days" = days the task was reported. "Total (AI)" = quantity extracted from notes by Gemini (e.g. "50 LinkedIn outreaches"). Add numbers in your report notes to see AI totals.
                        </p>
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
