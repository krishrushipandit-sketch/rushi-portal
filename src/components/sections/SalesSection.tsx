'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { Phone, Users, TrendingUp, FileText, ChevronDown, ChevronUp, Calendar, Target, CheckCircle2, AlertCircle } from 'lucide-react'

interface MetricData {
  total: number
  dailyTarget: number
  monthlyTarget: number
  entries: { date: string; count: number; notes: string }[]
}

interface EmployeeData {
  employee: { id: string; full_name: string; designation: string; avatar_url: string | null }
  responsibilities: { title: string; daily_target: number }[]
  metrics: Record<string, MetricData>
  daysReported: number
  workingDaysSoFar: number
  reportRate: number
  daily: { date: string; entries: any[]; note: string; totalCount: number }[]
}

// Which metrics are "enrollment" type vs "activity" type
const ENROLLMENT_KEYWORDS = ['enrollment', 'enroll', 'admission', 'join', 'target']
const CALL_KEYWORDS = ['call', 'calling']
const FOLLOWUP_KEYWORDS = ['follow', 'followup', 'follow-up']

function metricIcon(title: string) {
  const t = title.toLowerCase()
  if (ENROLLMENT_KEYWORDS.some(k => t.includes(k))) return <Users size={14} />
  if (CALL_KEYWORDS.some(k => t.includes(k))) return <Phone size={14} />
  if (FOLLOWUP_KEYWORDS.some(k => t.includes(k))) return <TrendingUp size={14} />
  return <FileText size={14} />
}
function metricColor(title: string) {
  const t = title.toLowerCase()
  if (ENROLLMENT_KEYWORDS.some(k => t.includes(k))) return '#10b981'
  if (CALL_KEYWORDS.some(k => t.includes(k))) return '#6366f1'
  if (FOLLOWUP_KEYWORDS.some(k => t.includes(k))) return '#f59e0b'
  return '#8b5cf6'
}

function ProgressRing({ pct, color, size = 52 }: { pct: number; color: string; size?: number }) {
  const r = (size / 2) - 5
  const circ = 2 * Math.PI * r
  const dash = Math.min(1, pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s ease' }} />
    </svg>
  )
}

function MetricCard({ title, data, monthlyDays }: { title: string; data: MetricData; monthlyDays: number }) {
  const color = metricColor(title)
  const pct = data.monthlyTarget > 0 ? Math.min(100, Math.round((data.total / data.monthlyTarget) * 100)) : 0
  const isBehind = pct < 60 && data.monthlyTarget > 0

  return (
    <div style={{ padding: '0.875rem 1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ProgressRing pct={pct} color={color} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          {metricIcon(title)}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color }}>{data.total}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ {data.monthlyTarget} {data.dailyTarget === 0 ? 'this month' : 'target'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
          {isBehind ? <AlertCircle size={11} color="#f59e0b" /> : <CheckCircle2 size={11} color="#10b981" />}
          <span style={{ fontSize: '0.65rem', color: isBehind ? '#f59e0b' : '#10b981' }}>
            {pct}% of target{data.dailyTarget > 0 ? ` · ${data.dailyTarget}/day` : ' · monthly goal'}
          </span>
        </div>
      </div>
    </div>
  )
}

function EmployeeCard({ data, defaultOpen }: { data: EmployeeData; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || false)

  const totalEnrollments = Object.entries(data.metrics)
    .filter(([k]) => ENROLLMENT_KEYWORDS.some(kw => k.toLowerCase().includes(kw)))
    .reduce((s, [, v]) => s + v.total, 0)

  const monthlyEnrollTarget = Object.entries(data.metrics)
    .filter(([k]) => ENROLLMENT_KEYWORDS.some(kw => k.toLowerCase().includes(kw)))
    .reduce((s, [, v]) => s + v.monthlyTarget, 0)

  const reportColor = data.reportRate >= 80 ? '#10b981' : data.reportRate >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      {/* Employee header */}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', userSelect: 'none' }}
      >
        {/* Avatar */}
        {data.employee.avatar_url ? (
          <img src={data.employee.avatar_url} alt="Avatar" style={{ width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color: '#fff', flexShrink: 0 }}>
            {data.employee.full_name.charAt(0)}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{data.employee.full_name}</p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{data.employee.designation}</p>
        </div>

        {/* Key stats */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{totalEnrollments}</p>
            <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>enrollments</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: reportColor }}>{data.reportRate}%</p>
            <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{data.daysReported}/{data.workingDaysSoFar} days</p>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {/* Metrics grid */}
          <div style={{ padding: '1rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {Object.entries(data.metrics).map(([title, m]) => (
              <MetricCard key={title} title={title} data={m} monthlyDays={data.workingDaysSoFar} />
            ))}
          </div>

          {/* Daily report history */}
          {data.daily.length > 0 && (
            <div style={{ padding: '0 1.25rem 1.25rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>Daily Reports</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {data.daily.map((day, i) => (
                  <div key={day.date} style={{
                    padding: '0.625rem 0', borderBottom: i < data.daily.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    display: 'flex', gap: '0.875rem', alignItems: 'flex-start'
                  }}>
                    {/* Date */}
                    <div style={{ minWidth: '70px', flexShrink: 0 }}>
                      <p style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                        {new Date(day.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                        {new Date(day.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short' })}
                      </p>
                    </div>

                    {/* Entries */}
                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {(day.entries || []).map((e: any, j: number) => (
                        <div key={j} style={{
                          padding: '2px 10px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600,
                          background: `${metricColor(e.description)}15`,
                          border: `1px solid ${metricColor(e.description)}30`,
                          color: metricColor(e.description)
                        }}>
                          {e.description}: <strong>{e.count}</strong>
                          {e.notes && <span style={{ fontWeight: 400, opacity: 0.75 }}> · {e.notes}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.daily.length === 0 && (
            <p style={{ padding: '0.75rem 1.25rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>No reports submitted this month yet.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function SalesSection({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [data, setData] = useState<{ team: EmployeeData[]; teamSummary: Record<string, number>; workingDaysSoFar: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))

  const load = useCallback(async () => {
    setLoading(true)
    const token = localStorage.getItem('rushi_token')
    if (!token) {
      router.push('/')
      return
    }
    const res = await fetch(`/api/sales?month=${month}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    setData(json)
    setLoading(false)
  }, [month, router])

  useEffect(() => { load() }, [load])

  if (profile.role !== 'admin') return null

  const enrollmentKeys = data ? Object.keys(data.teamSummary).filter(k => ENROLLMENT_KEYWORDS.some(kw => k.toLowerCase().includes(kw))) : []
  const callKeys = data ? Object.keys(data.teamSummary).filter(k => CALL_KEYWORDS.some(kw => k.toLowerCase().includes(kw))) : []
  const followKeys = data ? Object.keys(data.teamSummary).filter(k => FOLLOWUP_KEYWORDS.some(kw => k.toLowerCase().includes(kw))) : []

  const totalEnrollments = enrollmentKeys.reduce((s, k) => s + (data?.teamSummary[k] || 0), 0)
  const totalCalls = callKeys.reduce((s, k) => s + (data?.teamSummary[k] || 0), 0)
  const totalFollowUps = followKeys.reduce((s, k) => s + (data?.teamSummary[k] || 0), 0)

  const monthLabel = new Date(`${month}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>Sales & Leads</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Sales team performance and enrollment tracking
          </p>
        </div>
        <input
          type="month" className="form-input" value={month}
          max={new Date().toISOString().slice(0, 7)}
          onChange={e => setMonth(e.target.value)}
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
        />
      </div>

      {/* Team KPI bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Enrollments', value: totalEnrollments, icon: <Users size={20} />, color: '#10b981', sub: `${monthLabel}` },
          { label: 'Total Calls Made', value: totalCalls, icon: <Phone size={20} />, color: '#6366f1', sub: `${data?.workingDaysSoFar || 0} working days` },
          { label: 'Follow-ups Done', value: totalFollowUps, icon: <TrendingUp size={20} />, color: '#f59e0b', sub: 'across all sales staff' },
        ].map(kpi => (
          <div key={kpi.label} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${kpi.color}18`, border: `1px solid ${kpi.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color, flexShrink: 0 }}>
              {kpi.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{kpi.label}</p>
              {loading ? <div className="skeleton" style={{ width: '60px', height: '28px', borderRadius: '6px' }} /> :
                <p style={{ fontSize: '1.6rem', fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
              }
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Other team totals (non enrollment/call/follow) */}
      {data && Object.entries(data.teamSummary).filter(([k]) =>
        !ENROLLMENT_KEYWORDS.some(kw => k.toLowerCase().includes(kw)) &&
        !CALL_KEYWORDS.some(kw => k.toLowerCase().includes(kw)) &&
        !FOLLOWUP_KEYWORDS.some(kw => k.toLowerCase().includes(kw))
      ).length > 0 && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {Object.entries(data.teamSummary).filter(([k]) =>
            !ENROLLMENT_KEYWORDS.some(kw => k.toLowerCase().includes(kw)) &&
            !CALL_KEYWORDS.some(kw => k.toLowerCase().includes(kw)) &&
            !FOLLOWUP_KEYWORDS.some(kw => k.toLowerCase().includes(kw))
          ).map(([k, v]) => (
            <div key={k} style={{ padding: '0.5rem 1rem', borderRadius: '99px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-muted)' }}>{k}:</span> <span style={{ color: '#8b5cf6' }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Per-employee cards */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2].map(i => <div key={i} className="skeleton" style={{ height: '80px', borderRadius: '16px' }} />)}
        </div>
      ) : data?.team.length === 0 ? (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No sales employees found. Make sure employees have their department set to "Sales".</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {(data?.team || []).map((emp, i) => (
            <EmployeeCard key={emp.employee.id} data={emp} defaultOpen={i === 0} />
          ))}
        </div>
      )}
    </div>
  )
}
