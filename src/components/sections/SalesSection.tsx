'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import type { Profile } from '@/lib/database.types'
import {
  Users, Award, TrendingUp, Target, Calendar, Filter, Search,
  Download, RefreshCw, ChevronRight, X, Phone, Mail, Clock,
  FileText, Activity, Layers, CheckCircle2, XCircle, PhoneOff,
  PhoneMissed, Voicemail, Zap, CircleDot, User, ArrowUpRight,
  RadioTower, Sparkles, Building2, ShieldCheck, Loader2
} from 'lucide-react'
import { getInitials, formatDate } from '@/lib/utils'

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

interface EmployeeData {
  employee: { id: string; full_name: string; designation: string | null; department: string | null; avatar_url: string | null }
  responsibilities: { title: string; daily_target: number }[]
  metrics: Record<string, { total: number; dailyTarget: number; monthlyTarget: number; entries: any[] }>
  daysReported: number
  workingDaysSoFar: number
  reportRate: number
  daily: { date: string; entries: any[]; note: string; totalCount: number }[]
  totalLeads: number
  convertedCount: number
  conversionRate: number
  activeLeads: number
  statusBreakdown: Record<string, number>
  leadsByStatus: Record<string, LeadInStatus[]>
  convertedLeads: ConvertedLead[]
}

// 10 Status definitions with clear colors and professional Lucide icons
const STATUS_DEFINITIONS: {
  id: string
  label: string
  color: string
  bg: string
  icon: React.ReactNode
  stage: 'Discovery' | 'Nurturing' | 'Closing'
  description: string
}[] = [
  { id: 'new',             label: 'New Lead',        color: '#6366f1', bg: 'rgba(99,102,241,0.08)',  icon: <CircleDot size={13} />,   stage: 'Discovery', description: 'Fresh inbound lead, awaiting first contact' },
  { id: 'ringing',         label: 'Ringing',         color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  icon: <Phone size={13} />,       stage: 'Discovery', description: 'Call initiated but unanswered' },
  { id: 'not_connected',   label: 'Not Connected',   color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   icon: <PhoneOff size={13} />,    stage: 'Discovery', description: 'Network issue or unreachable' },
  { id: 'switched_off',    label: 'Switched Off',    color: '#6b7280', bg: 'rgba(107,114,128,0.08)', icon: <PhoneMissed size={13} />, stage: 'Discovery', description: 'Device powered off' },
  { id: 'not_logical',     label: 'Not Logical',     color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', icon: <XCircle size={13} />,     stage: 'Discovery', description: 'Invalid number or wrong requirement' },
  { id: 'busy_callback',   label: 'Busy / Callback', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',  icon: <Voicemail size={13} />,   stage: 'Nurturing', description: 'Lead requested a call back later' },
  { id: 'interested',      label: 'Interested',      color: '#06b6d4', bg: 'rgba(6,182,212,0.08)',   icon: <Zap size={13} />,         stage: 'Nurturing', description: 'Expressed interest in syllabus & fees' },
  { id: 'visit_scheduled', label: 'Visit Scheduled', color: '#ec4899', bg: 'rgba(236,72,153,0.08)',  icon: <Calendar size={13} />,    stage: 'Nurturing', description: 'Campus counselling visit booked' },
  { id: 'closed_won',      label: 'Enrolled (Won)',  color: '#10b981', bg: 'rgba(16,185,129,0.08)',  icon: <CheckCircle2 size={13} />, stage: 'Closing',   description: 'Successfully admitted / converted' },
  { id: 'closed_lost',     label: 'Lost / Dropped',  color: '#dc2626', bg: 'rgba(220,38,38,0.08)',   icon: <XCircle size={13} />,     stage: 'Closing',   description: 'Decided against or joined elsewhere' },
]

const statusMap = STATUS_DEFINITIONS.reduce((acc, s) => ({ ...acc, [s.id]: s }), {} as Record<string, typeof STATUS_DEFINITIONS[0]>)

// Generate last 6 months list
const MONTH_OPTIONS: { value: string; label: string }[] = []
const currentDate = new Date()
for (let i = 0; i < 6; i++) {
  let y = currentDate.getFullYear()
  let m = currentDate.getMonth() - i + 1
  if (m <= 0) { m += 12; y -= 1 }
  const val = `${y}-${String(m).padStart(2, '0')}`
  const lbl = new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  MONTH_OPTIONS.push({ value: val, label: lbl })
}

// ─── Status Drill-Down Slide-Over Drawer ──────────────────────────────────
function StatusDrilldownDrawer({
  statusId,
  leads,
  repName,
  onClose
}: {
  statusId: string
  leads: LeadInStatus[]
  repName: string
  onClose: () => void
}) {
  const [search, setSearch] = useState('')
  const cfg = statusMap[statusId] || statusMap['new']

  const filtered = leads.filter(l =>
    l.client_name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    (l.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.industry || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', justifyContent: 'flex-end', animation: 'fadeIn 0.15s ease'
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%', maxWidth: '580px', height: '100%',
          background: 'var(--bg-elevated)', display: 'flex', flexDirection: 'column',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.5)', borderLeft: '1px solid var(--border-default)',
          animation: 'slideLeft 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
          <div style={{
            width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
            background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {cfg.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {cfg.label} Leads
              </h3>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                {leads.length}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '3px 0 0' }}>
              {repName} • {cfg.description}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', borderRadius: '8px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Filter */}
        <div style={{ padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads by name, phone or program..."
              style={{
                width: '100%', paddingLeft: '32px', padding: '0.5rem 0.75rem 0.5rem 32px',
                borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-elevated)',
                color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Lead List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No leads match your search
            </div>
          ) : (
            filtered.map((lead) => (
              <div
                key={lead.id}
                style={{
                  padding: '0.875rem 1rem', borderRadius: '10px',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(99,102,241,0.12)', color: '#6366f1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.68rem', fontWeight: 700
                    }}>
                      {getInitials(lead.client_name)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', margin: 0 }}>
                        {lead.client_name}
                      </p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                        Added {formatDate(lead.created_at, 'dd MMM yyyy')}
                        {lead.platform ? ` via ${lead.platform}` : ''}
                      </p>
                    </div>
                  </div>
                  {lead.industry && (
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)', whiteSpace: 'nowrap' }}>
                      {lead.industry}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.25rem' }}>
                  <a
                    href={`tel:${lead.phone}`}
                    style={{
                      fontSize: '0.78rem', color: '#6366f1', textDecoration: 'none',
                      display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600
                    }}
                  >
                    <Phone size={12} /> {lead.phone}
                  </a>
                  {lead.email && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Mail size={11} /> {lead.email}
                    </span>
                  )}
                </div>

                {lead.notes && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', background: 'var(--bg-elevated)', padding: '0.375rem 0.625rem', borderRadius: '6px', margin: 0, fontStyle: 'italic' }}>
                    {lead.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main SalesSection Component ──────────────────────────────────────────
export default function SalesSection({ profile }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(MONTH_OPTIONS[0].value)
  const [selectedRep, setSelectedRep] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'funnel' | 'enrolled' | 'team' | 'activity'>('funnel')
  const [teamData, setTeamData] = useState<EmployeeData[]>([])
  const [loading, setLoading] = useState(true)
  const [workingDays, setWorkingDays] = useState(0)
  const [searchEnrolled, setSearchEnrolled] = useState('')
  const [selectedStatusDrilldown, setSelectedStatusDrilldown] = useState<{ id: string; repName: string; leads: LeadInStatus[] } | null>(null)

  const isAdmin = profile.role === 'admin'
  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  const fetchData = useCallback(async () => {
    const token = getToken()
    if (!token) return
    setLoading(true)

    let url = `/api/sales?month=${selectedMonth}`
    if (isAdmin && selectedRep !== 'all') url += `&rep=${selectedRep}`

    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (data.team) {
        setTeamData(data.team)
        setWorkingDays(data.workingDaysSoFar || 0)
      }
    } catch (err) {
      console.error('Failed to load sales data:', err)
    } finally {
      setLoading(false)
    }
  }, [selectedMonth, selectedRep, isAdmin])

  useEffect(() => { fetchData() }, [fetchData])

  // Aggregate stats across visible teamData
  const aggregate = useMemo(() => {
    const totalLeads = teamData.reduce((s, e) => s + e.totalLeads, 0)
    const totalEnrolled = teamData.reduce((s, e) => s + e.convertedCount, 0)
    const activePipeline = teamData.reduce((s, e) => s + e.activeLeads, 0)
    const convRate = totalLeads > 0 ? Math.round((totalEnrolled / totalLeads) * 100) : 0
    const avgReportRate = teamData.length > 0 ? Math.round(teamData.reduce((s, e) => s + e.reportRate, 0) / teamData.length) : 0

    // Combine all converted leads with salesperson name
    const allEnrolled: ConvertedLead[] = teamData.flatMap(e =>
      e.convertedLeads.map(l => ({ ...l, rep_name: e.employee.full_name }))
    )

    // Combine status breakdown totals
    const statusCounts: Record<string, number> = {}
    const statusLeadsMap: Record<string, LeadInStatus[]> = {}
    for (const def of STATUS_DEFINITIONS) {
      statusCounts[def.id] = teamData.reduce((sum, e) => sum + (e.statusBreakdown[def.id] || 0), 0)
      statusLeadsMap[def.id] = teamData.flatMap(e => e.leadsByStatus[def.id] || [])
    }

    return {
      totalLeads,
      totalEnrolled,
      activePipeline,
      convRate,
      avgReportRate,
      allEnrolled,
      statusCounts,
      statusLeadsMap
    }
  }, [teamData])

  // Filtered enrolled leads for directory
  const filteredEnrolled = useMemo(() => {
    return aggregate.allEnrolled.filter(l =>
      l.client_name.toLowerCase().includes(searchEnrolled.toLowerCase()) ||
      l.phone.includes(searchEnrolled) ||
      (l.industry || '').toLowerCase().includes(searchEnrolled.toLowerCase()) ||
      (l.rep_name || '').toLowerCase().includes(searchEnrolled.toLowerCase())
    )
  }, [aggregate.allEnrolled, searchEnrolled])

  // Export enrolled leads as CSV
  const handleExportCSV = () => {
    if (aggregate.allEnrolled.length === 0) return
    const headers = ['Student Name', 'Phone Number', 'Email', 'Program / Course', 'Sales Representative', 'Enrollment Date', 'Notes']
    const rows = aggregate.allEnrolled.map(l => [
      `"${l.client_name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.industry || ''}"`,
      `"${l.rep_name || ''}"`,
      `"${l.enrolled_at}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ])
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `enrolled_students_${selectedMonth}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const selectedMonthLabel = MONTH_OPTIONS.find(m => m.value === selectedMonth)?.label || selectedMonth

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Page Header & Controls ── */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Sales & Conversion Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            {selectedMonthLabel} • Performance tracking, enrollment conversion, and pipeline velocity
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
          {/* Month Selector */}
          <div style={{ position: 'relative' }}>
            <Calendar size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="form-select"
              style={{ paddingLeft: '30px', fontSize: '0.82rem', height: '36px' }}
            >
              {MONTH_OPTIONS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>

          {/* Sales Rep Selector (Admin Only) */}
          {isAdmin && teamData.length > 0 && (
            <div style={{ position: 'relative' }}>
              <Filter size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <select
                value={selectedRep}
                onChange={e => setSelectedRep(e.target.value)}
                className="form-select"
                style={{ paddingLeft: '30px', fontSize: '0.82rem', height: '36px' }}
              >
                <option value="all">All Sales Executives ({teamData.length})</option>
                {teamData.map(e => (
                  <option key={e.employee.id} value={e.employee.id}>{e.employee.full_name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            disabled={aggregate.allEnrolled.length === 0}
            className="btn btn-secondary btn-sm"
            style={{ height: '36px', opacity: aggregate.allEnrolled.length === 0 ? 0.5 : 1 }}
            data-tooltip="Export enrolled student list as CSV"
          >
            <Download size={13} /> Export CSV
          </button>

          {/* Refresh Button */}
          <button
            onClick={fetchData}
            className="btn btn-ghost btn-sm"
            style={{ height: '36px' }}
            data-tooltip="Refresh data"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* ── KPI Metric Strip ── */}
      <div className="grid-4" style={{ gap: '1rem' }}>
        {/* Total Leads */}
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Inbound Leads
            </span>
            <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(99,102,241,0.12)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={14} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {aggregate.totalLeads}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Assigned during {selectedMonthLabel.split(' ')[0]}
          </p>
        </div>

        {/* Enrolled Students */}
        <div className="stat-card" style={{ padding: '1.25rem', border: '1px solid rgba(16,185,129,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Enrolled (Closed Won)
            </span>
            <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={14} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>
              {aggregate.totalEnrolled}
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
              {aggregate.convRate}% rate
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Confirmed student admissions
          </p>
        </div>

        {/* Active Pipeline */}
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Pipeline
            </span>
            <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(6,182,212,0.12)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={14} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#06b6d4', lineHeight: 1 }}>
            {aggregate.activePipeline}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Interested + Scheduled Visits
          </p>
        </div>

        {/* Report Compliance */}
        <div className="stat-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Daily Log Compliance
            </span>
            <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={14} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {aggregate.avgReportRate}%
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Across {workingDays} working days
          </p>
        </div>
      </div>

      {/* ── Tabbed Navigation Bar ── */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-default)', gap: '1.5rem' }}>
        {[
          { id: 'funnel', label: 'Funnel & Pipeline Breakdown', count: aggregate.totalLeads, icon: <Layers size={14} /> },
          { id: 'enrolled', label: 'Enrolled Students Directory', count: aggregate.totalEnrolled, icon: <Award size={14} /> },
          { id: 'team', label: 'Sales Rep Scorecards', count: teamData.length, icon: <Users size={14} /> },
          { id: 'activity', label: 'Daily Activity Logs', count: null, icon: <FileText size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.75rem 0.25rem 0.875rem', display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab.id ? '2px solid var(--brand-primary)' : '2px solid transparent',
              transition: 'all 0.15s'
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== null && (
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '99px',
                background: activeTab === tab.id ? 'rgba(99,102,241,0.15)' : 'var(--bg-elevated)',
                color: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--text-muted)'
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Main Tab Content ── */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '0.875rem' }}>Aggregating sales intelligence...</span>
        </div>
      ) : (
        <>
          {/* TAB 1: FUNNEL & PIPELINE BREAKDOWN */}
          {activeTab === 'funnel' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Funnel Stage Grouping */}
              {(['Discovery', 'Nurturing', 'Closing'] as const).map(stageName => {
                const stageStatuses = STATUS_DEFINITIONS.filter(s => s.stage === stageName)
                const stageTotal = stageStatuses.reduce((s, def) => s + (aggregate.statusCounts[def.id] || 0), 0)
                const stagePct = aggregate.totalLeads > 0 ? Math.round((stageTotal / aggregate.totalLeads) * 100) : 0

                return (
                  <div key={stageName} className="glass-card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {stageName} Stage
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          • {stageTotal} lead{stageTotal !== 1 ? 's' : ''} ({stagePct}% of volume)
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                      {stageStatuses.map(def => {
                        const count = aggregate.statusCounts[def.id] || 0
                        const leadList = aggregate.statusLeadsMap[def.id] || []
                        const pctOfTotal = aggregate.totalLeads > 0 ? Math.round((count / aggregate.totalLeads) * 100) : 0

                        return (
                          <div
                            key={def.id}
                            onClick={() => count > 0 && setSelectedStatusDrilldown({ id: def.id, repName: selectedRep === 'all' ? 'Entire Team' : teamData[0]?.employee.full_name || '', leads: leadList })}
                            style={{
                              padding: '1rem', borderRadius: '12px',
                              background: count > 0 ? 'var(--bg-surface)' : 'rgba(255,255,255,0.02)',
                              border: `1px solid ${count > 0 ? def.color + '30' : 'var(--border-default)'}`,
                              cursor: count > 0 ? 'pointer' : 'default',
                              transition: 'all 0.15s ease',
                              opacity: count === 0 ? 0.45 : 1
                            }}
                            className={count > 0 ? 'hover:scale-[1.02]' : ''}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <div style={{ width: 26, height: 26, borderRadius: '7px', background: def.bg, color: def.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {def.icon}
                              </div>
                              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: def.color, lineHeight: 1 }}>
                                {count}
                              </span>
                            </div>

                            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px' }}>
                              {def.label}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                              <span>{pctOfTotal}% of pipeline</span>
                              {count > 0 && <ChevronRight size={11} color={def.color} />}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* TAB 2: ENROLLED STUDENTS DIRECTORY (100% ACCURATE ROSTER) */}
          {activeTab === 'enrolled' && (
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              {/* Directory Filter Bar */}
              <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Official Enrolled Student Roster — {selectedMonthLabel}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                    100% verified lead conversions logged as Closed Won
                  </p>
                </div>

                <div style={{ position: 'relative', width: '260px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    value={searchEnrolled}
                    onChange={e => setSearchEnrolled(e.target.value)}
                    placeholder="Search student name, phone, program..."
                    className="form-input"
                    style={{ paddingLeft: '32px', height: '34px', fontSize: '0.8rem' }}
                  />
                </div>
              </div>

              {filteredEnrolled.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <Award size={24} color="#10b981" />
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {aggregate.allEnrolled.length === 0
                      ? `No student enrollments recorded for ${selectedMonthLabel} yet`
                      : 'No student matches your search'}
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Student Details</th>
                        <th>Contact</th>
                        <th>Enrolled Program</th>
                        <th>Sales Executive</th>
                        <th>Platform</th>
                        <th>Enrolled Date</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrolled.map((lead, idx) => (
                        <tr key={lead.id}>
                          <td style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
                            {idx + 1}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                                background: 'rgba(16,185,129,0.15)', color: '#10b981',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.68rem', fontWeight: 700
                              }}>
                                {getInitials(lead.client_name)}
                              </div>
                              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                {lead.client_name}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <a href={`tel:${lead.phone}`} style={{ fontSize: '0.8rem', color: '#6366f1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                                <Phone size={11} /> {lead.phone}
                              </a>
                              {lead.email && (
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Mail size={10} /> {lead.email}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <span style={{
                              fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '6px',
                              background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.18)',
                              whiteSpace: 'nowrap'
                            }}>
                              {lead.industry || 'General'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {lead.rep_name || 'Sales Rep'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {lead.platform || 'Facebook'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                              {lead.enrolled_at}
                            </span>
                          </td>
                          <td style={{ maxWidth: '180px' }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              {lead.notes || '—'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SALES REP SCORECARDS */}
          {activeTab === 'team' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {teamData.map(rep => (
                <div key={rep.employee.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Rep Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    {rep.employee.avatar_url ? (
                      <img src={rep.employee.avatar_url} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div className="avatar avatar-md">
                        {getInitials(rep.employee.full_name)}
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        {rep.employee.full_name}
                      </h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                        {rep.employee.designation || 'Sales Executive'}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '99px',
                      background: rep.reportRate >= 80 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      color: rep.reportRate >= 80 ? '#10b981' : '#f59e0b',
                      border: `1px solid ${rep.reportRate >= 80 ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`
                    }}>
                      {rep.reportRate}% compliance
                    </span>
                  </div>

                  {/* Stat Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6366f1', margin: 0 }}>{rep.totalLeads}</p>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', margin: '2px 0 0' }}>Assigned</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', margin: 0 }}>{rep.convertedCount}</p>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', margin: '2px 0 0' }}>Enrolled</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b', margin: 0 }}>{rep.conversionRate}%</p>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', margin: '2px 0 0' }}>Conv. Rate</p>
                    </div>
                  </div>

                  {/* Daily Report Activity Targets */}
                  {Object.keys(rep.metrics).length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                        Quota Progress ({workingDays} Days)
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {Object.entries(rep.metrics).map(([title, m]) => {
                          const pct = m.monthlyTarget > 0 ? Math.min(100, Math.round((m.total / m.monthlyTarget) * 100)) : 0
                          const color = title.toLowerCase().includes('enroll') ? '#10b981' : '#6366f1'
                          return (
                            <div key={title} style={{ fontSize: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{title}</span>
                                <span style={{ fontWeight: 700, color }}>{m.total} / {m.monthlyTarget} ({pct}%)</span>
                              </div>
                              <div className="progress-bar" style={{ height: '4px' }}>
                                <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DAILY ACTIVITY LOGS */}
          {activeTab === 'activity' && (
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-default)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Sales Team Daily Report Submissions
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                  Audited work logs recorded for {selectedMonthLabel}
                </p>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Sales Executive</th>
                      <th>Date</th>
                      <th>Total Activity Count</th>
                      <th>Task Breakdown</th>
                      <th>Notes / Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.flatMap(e =>
                      e.daily.map((d, i) => (
                        <tr key={`${e.employee.id}-${d.date}-${i}`}>
                          <td style={{ fontWeight: 600 }}>{e.employee.full_name}</td>
                          <td style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>{d.date}</td>
                          <td style={{ fontWeight: 700, color: '#6366f1' }}>{d.totalCount} calls / tasks</td>
                          <td>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {Array.isArray(d.entries) && d.entries.map((entry: any, k: number) => (
                                <span key={k} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                                  {entry.description}: {entry.count}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td style={{ maxWidth: '240px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {d.note || '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Status Drilldown Slide-Over Drawer ── */}
      {selectedStatusDrilldown && (
        <StatusDrilldownDrawer
          statusId={selectedStatusDrilldown.id}
          leads={selectedStatusDrilldown.leads}
          repName={selectedStatusDrilldown.repName}
          onClose={() => setSelectedStatusDrilldown(null)}
        />
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  )
}
