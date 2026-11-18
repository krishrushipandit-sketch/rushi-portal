'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import type { Profile } from '@/lib/database.types'
import {
  Users, Award, TrendingUp, Calendar, Filter, Search, Download, RefreshCw, ChevronRight, X, Phone, Mail,
  FileText, Activity, Layers, CheckCircle2, XCircle, PhoneOff, PhoneMissed, Voicemail, Zap, CircleDot,
  PhoneCall, CalendarClock, CalendarCheck, MapPinCheck, BellRing, Loader2, ArrowUpRight, ArrowDownRight,
} from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatDate } from '@/lib/utils'
import KpiCard from '@/components/ui/KpiCard'
import Avatar from '@/components/ui/Avatar'

interface Props { profile: Profile }

interface ConvertedLead {
  id: string
  client_name: string
  phone: string
  email: string | null
  industry: string | null
  platform: string | null
  notes: string | null
  enrolled_at: string
  rep_name?: string
}

interface LeadInStatus {
  id: string
  client_name: string
  phone: string
  email: string | null
  industry: string | null
  platform: string | null
  created_at: string
  notes: string | null
}

interface VisitLead {
  id: string
  client_name: string
  phone: string
  industry: string | null
  status: string
  assigned_to: string
  visit_done_at: string
  rep_name?: string
}

interface EmployeeData {
  employee: { id: string; full_name: string; designation: string | null; department: string | null; avatar_url: string | null }
  responsibilities: { title: string; daily_target: number }[]
  metrics: Record<string, { total: number; dailyTarget: number; monthlyTarget: number; entries: unknown[] }>
  daysReported: number
  workingDaysSoFar: number
  reportRate: number
  daily: { date: string; entries: { description: string; count: number }[]; note: string; totalCount: number }[]
  totalLeads: number
  convertedCount: number
  conversionRate: number
  activeLeads: number
  visitsScheduled: number
  visitsDone: number
  visitsDoneLeads: VisitLead[]
  statusBreakdown: Record<string, number>
  leadsByStatus: Record<string, LeadInStatus[]>
  convertedLeads: ConvertedLead[]
}

type Stage = 'Discovery' | 'Nurturing' | 'Visit' | 'Closing'

// Mirrors the call statuses used on the Leads page; legacy ones only render when they still hold leads.
const STATUS_DEFINITIONS: { id: string; label: string; color: string; icon: React.ReactNode; stage: Stage; description: string; legacy?: boolean }[] = [
  { id: 'new',                  label: 'New Lead',        color: '#7c83ff', icon: <CircleDot size={13} />,     stage: 'Discovery', description: 'Fresh inbound lead, awaiting first contact' },
  { id: 'ringing',              label: 'Ringing',         color: '#f5b544', icon: <Phone size={13} />,         stage: 'Discovery', description: 'Call placed but unanswered' },
  { id: 'connected',            label: 'Connected',       color: '#2cc2c9', icon: <PhoneCall size={13} />,     stage: 'Discovery', description: 'Spoke with the lead' },
  { id: 'switched_off',         label: 'Switched Off',    color: '#8a94a3', icon: <PhoneMissed size={13} />,   stage: 'Discovery', description: 'Phone powered off' },
  { id: 'not_connected',        label: 'Not Connected',   color: '#ff5c6c', icon: <PhoneOff size={13} />,      stage: 'Discovery', description: 'Unreachable', legacy: true },
  { id: 'not_logical',          label: 'Not Logical',     color: '#8a94a3', icon: <XCircle size={13} />,       stage: 'Discovery', description: 'Invalid number or requirement', legacy: true },
  { id: 'callback',             label: 'Call Back',       color: '#9b87f5', icon: <Voicemail size={13} />,     stage: 'Nurturing', description: 'Asked to be called later' },
  { id: 'busy_callback',        label: 'Busy / Callback', color: '#9b87f5', icon: <Voicemail size={13} />,     stage: 'Nurturing', description: 'Asked to be called later', legacy: true },
  { id: 'follow_up',            label: 'Follow Up',       color: '#f5b544', icon: <CalendarClock size={13} />, stage: 'Nurturing', description: 'Scheduled follow-up call' },
  { id: 'interested',           label: 'Interested',      color: '#4ab8ff', icon: <Zap size={13} />,           stage: 'Nurturing', description: 'Interested in syllabus & fees' },
  { id: 'ai_workshop_saturday', label: 'AI Workshop',     color: '#9b87f5', icon: <BellRing size={13} />,      stage: 'Nurturing', description: 'Registered for Saturday AI workshop' },
  { id: 'visit_scheduled',      label: 'Visit Scheduled', color: '#ec5f9e', icon: <CalendarCheck size={13} />, stage: 'Visit',     description: 'Campus counselling visit booked' },
  { id: 'visit_done',           label: 'Visit Done',      color: '#2fd0b0', icon: <MapPinCheck size={13} />,   stage: 'Visit',     description: 'Visited the campus — ready to close' },
  { id: 'closed_won',           label: 'Enrolled',        color: '#3ee6a8', icon: <CheckCircle2 size={13} />,  stage: 'Closing',   description: 'Admitted / converted' },
  { id: 'not_interested',       label: 'Not Interested',  color: '#ff5c6c', icon: <XCircle size={13} />,       stage: 'Closing',   description: 'Declined' },
  { id: 'closed_lost',          label: 'Lost / Dropped',  color: '#ff5c6c', icon: <XCircle size={13} />,       stage: 'Closing',   description: 'Joined elsewhere or dropped', legacy: true },
]

const statusMap = Object.fromEntries(STATUS_DEFINITIONS.map(s => [s.id, s])) as Record<string, typeof STATUS_DEFINITIONS[number]>

const istNow = () => new Date(Date.now() + 5.5 * 3600 * 1000)
const MONTH_OPTIONS = Array.from({ length: 6 }, (_, i) => {
  const n = istNow()
  const d = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() - i, 1))
  return { value: d.toISOString().slice(0, 7), label: d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' }) }
})
const shortMonth = (ym: string) => new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-IN', { month: 'short', timeZone: 'UTC' })
const prevMonth = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return new Date(Date.UTC(y, m - 2, 1)).toISOString().slice(0, 7)
}

const chartTooltip = {
  contentStyle: { background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 10, fontSize: 12, color: 'var(--text-primary)', boxShadow: 'var(--shadow-md)' },
  labelStyle: { color: 'var(--text-muted)', marginBottom: 2 },
  cursor: { fill: 'color-mix(in srgb, var(--brand-primary) 8%, transparent)' },
}

// ─── Status drill-down drawer ─────────────────────────────────────────────
function Drawer({ title, subtitle, icon, color, count, onClose, children }: {
  title: string; subtitle: string; icon: React.ReactNode; color: string; count: number; onClose: () => void; children: React.ReactNode
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])
  return (
    <div className="drawer-overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <aside className="drawer" role="dialog" aria-label={title}>
        <header className="drawer-header">
          <span className="drawer-icon" style={{ color, background: `color-mix(in srgb, ${color} 14%, transparent)`, boxShadow: `0 0 20px -6px ${color}` }}>{icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{title}</h3>
              <span className="badge" style={{ color, borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}>{count}</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </header>
        {children}
      </aside>
    </div>
  )
}

function StatusDrilldownDrawer({ statusId, leads, repName, onClose }: { statusId: string; leads: LeadInStatus[]; repName: string; onClose: () => void }) {
  const [search, setSearch] = useState('')
  const cfg = statusMap[statusId] || statusMap['new']
  const q = search.toLowerCase()
  const filtered = leads.filter(l =>
    l.client_name.toLowerCase().includes(q) || l.phone.includes(search) ||
    (l.email || '').toLowerCase().includes(q) || (l.industry || '').toLowerCase().includes(q)
  )

  return (
    <Drawer title={`${cfg.label} leads`} subtitle={`${repName} · ${cfg.description}`} icon={cfg.icon} color={cfg.color} count={leads.length} onClose={onClose}>
      <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="form-input" autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone or program…" style={{ paddingLeft: 32 }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filtered.length === 0 ? (
          <div className="empty-state"><p>No leads match your search</p></div>
        ) : filtered.map(lead => (
          <div key={lead.id} className="card" style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                <Avatar name={lead.client_name} size="sm" />
                <div style={{ minWidth: 0 }}>
                  <p className="truncate-1" style={{ fontWeight: 600, fontSize: '0.875rem' }}>{lead.client_name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Added {formatDate(lead.created_at, 'dd MMM yyyy')}{lead.platform ? ` via ${lead.platform}` : ''}
                  </p>
                </div>
              </div>
              {lead.industry && <span className="badge tone-violet">{lead.industry}</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
              <a href={`tel:${lead.phone}`} style={{ fontSize: '0.78rem', color: 'var(--brand-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 550 }}>
                <Phone size={12} /> {lead.phone}
              </a>
              {lead.email && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={11} /> {lead.email}</span>}
            </div>
            {lead.notes && <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-inset)', padding: '0.4rem 0.6rem', borderRadius: 6 }}>{lead.notes}</p>}
          </div>
        ))}
      </div>
    </Drawer>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────
type Tab = 'visits' | 'funnel' | 'enrolled' | 'team' | 'activity'

export default function SalesSection({ profile }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(MONTH_OPTIONS[0].value)
  const [selectedRep, setSelectedRep] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<Tab>('visits')
  const [teamData, setTeamData] = useState<EmployeeData[]>([])
  const [repOptions, setRepOptions] = useState<{ id: string; name: string }[]>([])
  const [visitTrend, setVisitTrend] = useState<{ month: string; visits: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [workingDays, setWorkingDays] = useState(0)
  const [searchEnrolled, setSearchEnrolled] = useState('')
  const [searchVisits, setSearchVisits] = useState('')
  const [drilldown, setDrilldown] = useState<{ id: string; repName: string; leads: LeadInStatus[] } | null>(null)

  const isAdmin = profile.role === 'admin'

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('rushi_token') || ''
    if (!token) return
    setLoading(true)
    setError('')
    let url = `/api/sales?month=${selectedMonth}`
    if (isAdmin && selectedRep !== 'all') url += `&rep=${selectedRep}`
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      const team: EmployeeData[] = data.team ?? []
      setTeamData(team)
      setWorkingDays(data.workingDaysSoFar || 0)
      setVisitTrend(data.visitTrend ?? [])
      if (selectedRep === 'all') setRepOptions(team.map(t => ({ id: t.employee.id, name: t.employee.full_name })))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [selectedMonth, selectedRep, isAdmin])

  useEffect(() => { fetchData() }, [fetchData])

  const aggregate = useMemo(() => {
    const sum = (f: (e: EmployeeData) => number) => teamData.reduce((s, e) => s + f(e), 0)
    const totalLeads = sum(e => e.totalLeads)
    const totalEnrolled = sum(e => e.convertedCount)
    const allVisits: VisitLead[] = teamData.flatMap(e => (e.visitsDoneLeads ?? []).map(v => ({ ...v, rep_name: e.employee.full_name })))
      .sort((a, b) => b.visit_done_at.localeCompare(a.visit_done_at))
    const statusCounts: Record<string, number> = {}
    const statusLeadsMap: Record<string, LeadInStatus[]> = {}
    for (const def of STATUS_DEFINITIONS) {
      statusCounts[def.id] = sum(e => e.statusBreakdown[def.id] || 0)
      statusLeadsMap[def.id] = teamData.flatMap(e => e.leadsByStatus[def.id] || [])
    }
    return {
      totalLeads,
      totalEnrolled,
      activePipeline: sum(e => e.activeLeads),
      visitsScheduled: sum(e => e.visitsScheduled ?? 0),
      visitsDone: allVisits.length,
      visitToEnrol: allVisits.filter(v => v.status === 'closed_won').length,
      convRate: totalLeads > 0 ? Math.round((totalEnrolled / totalLeads) * 100) : 0,
      avgReportRate: teamData.length ? Math.round(sum(e => e.reportRate) / teamData.length) : 0,
      allEnrolled: teamData.flatMap(e => e.convertedLeads.map(l => ({ ...l, rep_name: e.employee.full_name }))),
      allVisits,
      statusCounts,
      statusLeadsMap,
    }
  }, [teamData])

  const trendData = useMemo(() => {
    const byMonth = new Map(visitTrend.map(r => [r.month, r.visits]))
    const months: string[] = []
    let m = selectedMonth
    for (let i = 0; i < 6; i++) { months.unshift(m); m = prevMonth(m) }
    return months.map(ym => ({ ym, month: shortMonth(ym), visits: byMonth.get(ym) ?? 0 }))
  }, [visitTrend, selectedMonth])

  const lastMonthVisits = trendData[trendData.length - 2]?.visits ?? 0
  const visitDelta = aggregate.visitsDone - lastMonthVisits

  const filteredEnrolled = useMemo(() => {
    const q = searchEnrolled.toLowerCase()
    return aggregate.allEnrolled.filter(l =>
      l.client_name.toLowerCase().includes(q) || l.phone.includes(searchEnrolled) ||
      (l.industry || '').toLowerCase().includes(q) || (l.rep_name || '').toLowerCase().includes(q))
  }, [aggregate.allEnrolled, searchEnrolled])

  const filteredVisits = useMemo(() => {
    const q = searchVisits.toLowerCase()
    return aggregate.allVisits.filter(v =>
      v.client_name.toLowerCase().includes(q) || v.phone.includes(searchVisits) ||
      (v.industry || '').toLowerCase().includes(q) || (v.rep_name || '').toLowerCase().includes(q))
  }, [aggregate.allVisits, searchVisits])

  const csv = (rows: string[][], name: string) => {
    const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`
    const blob = new Blob([rows.map(r => r.map(esc).join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const handleExport = () => {
    if (activeTab === 'visits') {
      csv([
        ['Student Name', 'Phone', 'Program', 'Sales Executive', 'Visit Date', 'Current Status'],
        ...aggregate.allVisits.map(v => [v.client_name, v.phone, v.industry || '', v.rep_name || '', v.visit_done_at.replace('T', ' '), statusMap[v.status]?.label || v.status]),
      ], `visits_done_${selectedMonth}.csv`)
    } else {
      csv([
        ['Student Name', 'Phone Number', 'Email', 'Program / Course', 'Sales Representative', 'Enrollment Date', 'Notes'],
        ...aggregate.allEnrolled.map(l => [l.client_name, l.phone, l.email || '', l.industry || '', l.rep_name || '', l.enrolled_at, l.notes || '']),
      ], `enrolled_students_${selectedMonth}.csv`)
    }
  }
  const exportDisabled = activeTab === 'visits' ? aggregate.allVisits.length === 0 : aggregate.allEnrolled.length === 0

  const monthLabel = MONTH_OPTIONS.find(m => m.value === selectedMonth)?.label || selectedMonth
  const monthName = monthLabel.split(' ')[0]

  const repVisitRows = [...teamData].sort((a, b) => (b.visitsDone ?? 0) - (a.visitsDone ?? 0))
  const maxRepVisits = Math.max(1, ...repVisitRows.map(r => r.visitsDone ?? 0))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <p className="eyebrow">Sales intelligence · {monthLabel}</p>
          <h1 style={{ marginTop: '0.4rem' }}>Sales Analytics</h1>
          <p>Visits, conversions, pipeline health and rep performance.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Calendar size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="form-select" style={{ paddingLeft: 30, height: 36, minHeight: 36, width: 'auto' }} aria-label="Month">
              {MONTH_OPTIONS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
          {isAdmin && repOptions.length > 0 && (
            <div style={{ position: 'relative' }}>
              <Filter size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <select value={selectedRep} onChange={e => setSelectedRep(e.target.value)} className="form-select" style={{ paddingLeft: 30, height: 36, minHeight: 36, width: 'auto' }} aria-label="Sales executive">
                <option value="all">All sales executives ({repOptions.length})</option>
                {repOptions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          )}
          <button onClick={handleExport} disabled={exportDisabled} className="btn btn-secondary">
            <Download size={14} /> Export {activeTab === 'visits' ? 'visits' : 'enrolled'}
          </button>
          <button onClick={fetchData} className="icon-btn bordered" aria-label="Refresh"><RefreshCw size={15} /></button>
        </div>
      </div>

      {error && <div className="alert-strip tone-danger"><span className="alert-strip-icon"><XCircle size={16} /></span><span>Couldn’t load sales data: {error}</span></div>}

      <div className="sales-kpis">
        <KpiCard
          label={`Visits done · ${monthName}`}
          value={aggregate.visitsDone}
          icon={MapPinCheck}
          tone="brand"
          active={activeTab === 'visits'}
          onClick={() => setActiveTab('visits')}
          foot={
            <>
              <span className={visitDelta >= 0 ? 'trend-up' : 'trend-down'} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {visitDelta >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{Math.abs(visitDelta)}
              </span>
              vs {shortMonth(prevMonth(selectedMonth))}
            </>
          }
        />
        <KpiCard label="Visits scheduled" value={aggregate.visitsScheduled} icon={CalendarCheck} tone="info" foot="Upcoming campus visits" onClick={() => aggregate.visitsScheduled > 0 && setDrilldown({ id: 'visit_scheduled', repName: selectedRep === 'all' ? 'Entire team' : teamData[0]?.employee.full_name || '', leads: aggregate.statusLeadsMap['visit_scheduled'] })} />
        <KpiCard label="Enrolled" value={aggregate.totalEnrolled} icon={Award} tone="warning" foot={`${aggregate.convRate}% of all leads`} onClick={() => setActiveTab('enrolled')} active={activeTab === 'enrolled'} />
        <KpiCard label="Active pipeline" value={aggregate.activePipeline} icon={TrendingUp} foot={`${aggregate.totalLeads} leads assigned`} onClick={() => setActiveTab('funnel')} active={activeTab === 'funnel'} />
        <KpiCard label="Report compliance" value={aggregate.avgReportRate} suffix="%" icon={Activity} foot={`${workingDays} working days`} onClick={() => setActiveTab('activity')} active={activeTab === 'activity'} />
      </div>

      <div className="segmented" role="tablist" style={{ alignSelf: 'flex-start', overflowX: 'auto', maxWidth: '100%' }}>
        {([
          { id: 'visits', label: 'Visits', icon: <MapPinCheck size={13} />, count: aggregate.visitsDone },
          { id: 'funnel', label: 'Funnel', icon: <Layers size={13} />, count: aggregate.totalLeads },
          { id: 'enrolled', label: 'Enrolled', icon: <Award size={13} />, count: aggregate.totalEnrolled },
          { id: 'team', label: 'Scorecards', icon: <Users size={13} />, count: teamData.length },
          { id: 'activity', label: 'Activity logs', icon: <FileText size={13} />, count: null },
        ] as const).map(tab => (
          <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
            {tab.icon}{tab.label}
            {tab.count !== null && <span className="tabular" style={{ color: 'var(--text-faint)', fontWeight: 500 }}>{tab.count}</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '0.875rem' }}>Crunching sales data…</span>
        </div>
      ) : (
        <>
          {activeTab === 'visits' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="sales-split">
                <section className="card">
                  <div className="card-header">
                    <div>
                      <div className="card-title">Visits done per month</div>
                      <div className="card-subtitle">Counted on the day a lead is marked “Visit Done”</div>
                    </div>
                  </div>
                  <div style={{ padding: '1rem 1rem 0.5rem' }}>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={trendData} margin={{ top: 16, right: 8, left: -18, bottom: 0 }}>
                        <defs>
                          <linearGradient id="visitBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={1} />
                            <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0.55} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                        <Tooltip {...chartTooltip} formatter={(v) => [`${v} visits`, 'Visits done']} />
                        <Bar dataKey="visits" radius={[6, 6, 2, 2]} maxBarSize={44} label={{ position: 'top', fill: 'var(--text-secondary)', fontSize: 11 }}>
                          {trendData.map(d => (
                            <Cell key={d.ym} fill={d.ym === selectedMonth ? 'url(#visitBar)' : 'color-mix(in srgb, var(--text-muted) 30%, transparent)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="card">
                  <div className="card-header">
                    <div>
                      <div className="card-title">Visits by sales executive</div>
                      <div className="card-subtitle">{monthLabel}</div>
                    </div>
                  </div>
                  <div style={{ padding: '0.5rem 0.75rem 0.9rem' }}>
                    {repVisitRows.length === 0 ? (
                      <div className="empty-state"><p>No sales executives found</p></div>
                    ) : repVisitRows.map(rep => {
                      const done = rep.visitsDone ?? 0
                      const enrolledAfterVisit = (rep.visitsDoneLeads ?? []).filter(v => v.status === 'closed_won').length
                      return (
                        <div key={rep.employee.id} className="rep-visit-row">
                          <Avatar name={rep.employee.full_name} src={rep.employee.avatar_url} size="sm" />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                              <span className="truncate-1" style={{ fontWeight: 550, fontSize: '0.875rem' }}>{rep.employee.full_name}</span>
                              <span className="tabular" style={{ fontWeight: 650, fontSize: '1rem' }}>{done}</span>
                            </div>
                            <div className="progress-bar" style={{ height: 5, margin: '6px 0 5px' }}>
                              <div className="progress-fill" style={{ width: `${(done / maxRepVisits) * 100}%`, background: 'var(--brand-gradient)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '0.9rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              <span>{rep.visitsScheduled ?? 0} scheduled</span>
                              <span>{enrolledAfterVisit} enrolled after visit</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              </div>

              <section className="card" style={{ overflow: 'hidden' }}>
                <div className="card-header" style={{ flexWrap: 'wrap' }}>
                  <div>
                    <div className="card-title">Leads who visited · {monthLabel}</div>
                    <div className="card-subtitle">
                      {aggregate.visitsDone} visit{aggregate.visitsDone === 1 ? '' : 's'} · {aggregate.visitToEnrol} already enrolled
                      {aggregate.visitsDone > 0 && ` (${Math.round((aggregate.visitToEnrol / aggregate.visitsDone) * 100)}% visit → enrol)`}
                    </div>
                  </div>
                  <div style={{ position: 'relative', width: 260, maxWidth: '100%' }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input value={searchVisits} onChange={e => setSearchVisits(e.target.value)} placeholder="Search visits…" className="form-input" style={{ paddingLeft: 32, height: 34, minHeight: 34 }} />
                  </div>
                </div>
                {filteredVisits.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon"><MapPinCheck size={20} /></div>
                    <p style={{ fontWeight: 550, color: 'var(--text-secondary)' }}>
                      {aggregate.allVisits.length === 0 ? `No visits recorded in ${monthLabel} yet` : 'No visits match your search'}
                    </p>
                    <p style={{ fontSize: '0.8rem' }}>Mark a lead as <strong>Visit Done</strong> on the Leads page and it will appear here.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr><th>Student</th><th>Contact</th><th>Program</th><th>Sales executive</th><th>Visited on</th><th>Current status</th></tr>
                      </thead>
                      <tbody>
                        {filteredVisits.map(v => {
                          const s = statusMap[v.status]
                          return (
                            <tr key={v.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                  <Avatar name={v.client_name} size="sm" />
                                  <span style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>{v.client_name}</span>
                                </div>
                              </td>
                              <td><a href={`tel:${v.phone}`} style={{ color: 'var(--brand-secondary)', textDecoration: 'none', fontWeight: 550, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{v.phone}</a></td>
                              <td><span className="badge tone-violet">{v.industry || 'General'}</span></td>
                              <td style={{ whiteSpace: 'nowrap' }}>{v.rep_name}</td>
                              <td className="tabular" style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>{formatDate(v.visit_done_at, 'dd MMM, hh:mm a')}</td>
                              <td>
                                <span className="badge" style={{ color: s?.color, borderColor: `color-mix(in srgb, ${s?.color ?? 'gray'} 30%, transparent)`, background: `color-mix(in srgb, ${s?.color ?? 'gray'} 10%, transparent)` }}>
                                  {s?.icon} {s?.label ?? v.status}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === 'funnel' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(['Discovery', 'Nurturing', 'Visit', 'Closing'] as const).map(stage => {
                const defs = STATUS_DEFINITIONS.filter(s => s.stage === stage && (!s.legacy || (aggregate.statusCounts[s.id] || 0) > 0))
                const stageTotal = defs.reduce((s, d) => s + (aggregate.statusCounts[d.id] || 0), 0)
                const stagePct = aggregate.totalLeads > 0 ? Math.round((stageTotal / aggregate.totalLeads) * 100) : 0
                return (
                  <section key={stage} className="card" style={{ padding: '1.1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.9rem' }}>
                      <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>{stage === 'Visit' ? 'Campus visits' : stage}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stageTotal} lead{stageTotal !== 1 ? 's' : ''} · {stagePct}%</span>
                    </div>
                    <div className="funnel-grid">
                      {defs.map(def => {
                        const count = aggregate.statusCounts[def.id] || 0
                        const pct = aggregate.totalLeads > 0 ? Math.round((count / aggregate.totalLeads) * 100) : 0
                        return (
                          <button
                            key={def.id}
                            className="funnel-tile"
                            disabled={count === 0}
                            style={{ '--tone': def.color } as React.CSSProperties}
                            onClick={() => setDrilldown({ id: def.id, repName: selectedRep === 'all' ? 'Entire team' : teamData[0]?.employee.full_name || '', leads: aggregate.statusLeadsMap[def.id] })}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span className="funnel-tile-icon">{def.icon}</span>
                              <span className="tabular" style={{ fontSize: '1.4rem', fontWeight: 650, color: count ? def.color : 'var(--text-faint)' }}>{count}</span>
                            </div>
                            <span style={{ fontSize: '0.8125rem', fontWeight: 550, color: 'var(--text-primary)' }}>{def.label}</span>
                            <div className="progress-bar" style={{ height: 3 }}><div className="progress-fill" style={{ width: `${pct}%`, background: def.color }} /></div>
                            <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {pct}% of leads {count > 0 && <ChevronRight size={12} />}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </section>
                )
              })}
            </div>
          )}

          {activeTab === 'enrolled' && (
            <section className="card" style={{ overflow: 'hidden' }}>
              <div className="card-header" style={{ flexWrap: 'wrap' }}>
                <div>
                  <div className="card-title">Enrolled students · {monthLabel}</div>
                  <div className="card-subtitle">Leads marked Enrolled this month</div>
                </div>
                <div style={{ position: 'relative', width: 260, maxWidth: '100%' }}>
                  <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input value={searchEnrolled} onChange={e => setSearchEnrolled(e.target.value)} placeholder="Search students…" className="form-input" style={{ paddingLeft: 32, height: 34, minHeight: 34 }} />
                </div>
              </div>
              {filteredEnrolled.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon"><Award size={20} /></div>
                  <p>{aggregate.allEnrolled.length === 0 ? `No enrolments recorded for ${monthLabel} yet` : 'No student matches your search'}</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead><tr><th>#</th><th>Student</th><th>Contact</th><th>Program</th><th>Sales executive</th><th>Platform</th><th>Date</th><th>Notes</th></tr></thead>
                    <tbody>
                      {filteredEnrolled.map((lead, idx) => (
                        <tr key={lead.id}>
                          <td className="tabular" style={{ color: 'var(--text-muted)' }}>{idx + 1}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                              <Avatar name={lead.client_name} size="sm" />
                              <span style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>{lead.client_name}</span>
                            </div>
                          </td>
                          <td>
                            <a href={`tel:${lead.phone}`} style={{ color: 'var(--brand-secondary)', textDecoration: 'none', fontWeight: 550, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{lead.phone}</a>
                            {lead.email && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lead.email}</div>}
                          </td>
                          <td><span className="badge tone-violet">{lead.industry || 'General'}</span></td>
                          <td style={{ whiteSpace: 'nowrap' }}>{lead.rep_name}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{lead.platform || 'Facebook'}</td>
                          <td className="tabular" style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>{lead.enrolled_at}</td>
                          <td style={{ maxWidth: 200, fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lead.notes || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeTab === 'team' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
              {teamData.map(rep => (
                <section key={rep.employee.id} className="card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Avatar name={rep.employee.full_name} src={rep.employee.avatar_url} size="md" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rep.employee.full_name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rep.employee.designation || 'Sales Executive'}</p>
                    </div>
                    <span className={`badge ${rep.reportRate >= 80 ? 'tone-success' : 'tone-warning'}`}>{rep.reportRate}% logs</span>
                  </div>
                  <div className="scorecard-stats">
                    {[
                      { label: 'Assigned', value: rep.totalLeads },
                      { label: 'Visits', value: rep.visitsDone ?? 0, accent: true },
                      { label: 'Enrolled', value: rep.convertedCount },
                      { label: 'Conv.', value: `${rep.conversionRate}%` },
                    ].map(s => (
                      <div key={s.label}>
                        <p className={`tabular ${s.accent ? 'text-gradient' : ''}`} style={{ fontSize: '1.25rem', fontWeight: 650 }}>{s.value}</p>
                        <p className="kpi-label" style={{ fontSize: '0.625rem' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {Object.keys(rep.metrics).length > 0 && (
                    <div>
                      <p className="kpi-label" style={{ marginBottom: '0.5rem' }}>Quota progress · {workingDays} days</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {Object.entries(rep.metrics).map(([title, m]) => {
                          const pct = m.monthlyTarget > 0 ? Math.min(100, Math.round((m.total / m.monthlyTarget) * 100)) : 0
                          return (
                            <div key={title} style={{ fontSize: '0.78rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, gap: 8 }}>
                                <span className="truncate-1" style={{ color: 'var(--text-secondary)' }}>{title}</span>
                                <span className="tabular" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{m.total} / {m.monthlyTarget} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({pct}%)</span></span>
                              </div>
                              <div className="progress-bar" style={{ height: 4 }}><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <section className="card" style={{ overflow: 'hidden' }}>
              <div className="card-header">
                <div>
                  <div className="card-title">Daily report submissions</div>
                  <div className="card-subtitle">Work logs recorded in {monthLabel}</div>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead><tr><th>Sales executive</th><th>Date</th><th>Total activity</th><th>Breakdown</th><th>Notes</th></tr></thead>
                  <tbody>
                    {teamData.flatMap(e => e.daily.map((d, i) => (
                      <tr key={`${e.employee.id}-${d.date}-${i}`}>
                        <td style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>{e.employee.full_name}</td>
                        <td className="tabular" style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>{d.date}</td>
                        <td className="tabular" style={{ fontWeight: 600 }}>{d.totalCount}</td>
                        <td>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {Array.isArray(d.entries) && d.entries.map((entry, k) => (
                              <span key={k} className="badge">{entry.description}: <strong style={{ color: 'var(--text-primary)' }}>{entry.count}</strong></span>
                            ))}
                          </div>
                        </td>
                        <td style={{ maxWidth: 240, fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.note || '—'}</td>
                      </tr>
                    )))}
                  </tbody>
                </table>
                {teamData.every(e => e.daily.length === 0) && <div className="empty-state"><p>No reports submitted in {monthLabel}</p></div>}
              </div>
            </section>
          )}
        </>
      )}

      {drilldown && (
        <StatusDrilldownDrawer statusId={drilldown.id} leads={drilldown.leads} repName={drilldown.repName} onClose={() => setDrilldown(null)} />
      )}
    </div>
  )
}
