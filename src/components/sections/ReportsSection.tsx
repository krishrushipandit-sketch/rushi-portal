'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Profile } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import DailyReportForm from './EmployeeReportForm'
import {
  ClipboardList, Plus, CheckCircle2, AlertTriangle, Edit2, Calendar, Users, ChevronRight,
  Clock, Lock, MessageSquareText, Building2, Search,
} from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import GlowButton from '@/components/ui/GlowButton'
import Reveal from '@/components/ui/Reveal'
import Avatar from '@/components/ui/Avatar'
import Pill from '@/components/ui/Pill'
import KpiCard from '@/components/ui/KpiCard'
import SidePanel, { KeyValues, PanelSection } from '@/components/ui/SidePanel'

const today = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10)

interface ReportEntry {
  description: string
  count: number
  notes?: string
  clientId?: string
  clientName?: string
}

interface DailyReport {
  id: string
  employee_id: string
  report_date: string
  entries: ReportEntry[]
  note: string
  submitted_at: string
  updated_by_admin: boolean
  check_in_time?: string | null
  check_out_time?: string | null
  admin_comment?: string | null
  employee?: { id: string; full_name: string; designation: string | null; avatar_url?: string | null }
}

interface EmpSummary {
  employee: { id: string; full_name: string; designation: string | null; avatar_url?: string | null }
  submitted: boolean
  report: DailyReport | null
}

const hoursWorked = (r: DailyReport | null) => {
  if (!r?.check_in_time || !r.check_out_time) return null
  const [ih, im] = r.check_in_time.split(':').map(Number)
  const [oh, om] = r.check_out_time.split(':').map(Number)
  const mins = oh * 60 + om - (ih * 60 + im)
  return mins > 0 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : null
}

function ReportEntries({ report }: { report: DailyReport }) {
  if (!report.entries?.length) return <div className="empty-inline">No items logged</div>
  return (
    <ul className="report-entries">
      {report.entries.map((e, i) => (
        <li key={i}>
          <CheckCircle2 size={14} style={{ color: 'var(--status-success)', flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <strong>{e.description}</strong>
              {(e.clientName || e.clientId) && <Pill color="#8b5cf6" icon={<Building2 size={11} />}>{e.clientName || 'Client work'}</Pill>}
            </div>
            {e.notes && <p>{e.notes}</p>}
          </div>
          <span className="report-count tabular">{e.count > 0 ? e.count : '—'}</span>
        </li>
      ))}
    </ul>
  )
}

function AdminComment({ report, onSaved }: { report: DailyReport; onSaved: () => void }) {
  const [comment, setComment] = useState(report.admin_comment || '')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => { setComment(report.admin_comment || '') }, [report.id, report.admin_comment])

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/reports/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('rushi_token') || ''}` },
        body: JSON.stringify({ report_id: report.id, admin_comment: comment }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        return alert(err.error || 'Failed to save comment')
      }
      setSavedAt(Date.now())
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  return (
    <PanelSection title="Your feedback" aside={savedAt && <span style={{ fontSize: '0.72rem', color: 'var(--status-success)' }}>Saved</span>}>
      <textarea className="form-textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} placeholder="Leave feedback the employee will see on their report…" />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary btn-sm" onClick={save} disabled={saving || comment === (report.admin_comment || '')}>
          {saving ? 'Saving…' : 'Save feedback'}
        </button>
      </div>
    </PanelSection>
  )
}

export default function ReportsSection({ profile }: { profile: Profile }) {
  const isAdmin = profile.role === 'admin'
  const [reports, setReports] = useState<DailyReport[]>([])
  const [summary, setSummary] = useState<EmpSummary[]>([])
  const [targetDate, setTargetDate] = useState(today())
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'submitted' | 'missing'>('all')
  const [showForm, setShowForm] = useState(false)
  const [editReport, setEditReport] = useState<DailyReport | undefined>()
  const [editEmployeeId, setEditEmployeeId] = useState<string | undefined>()

  const load = useCallback(async () => {
    const token = localStorage.getItem('rushi_token')
    if (!token) return
    const h = { Authorization: `Bearer ${token}` }
    if (isAdmin) {
      const d = await fetch(`/api/reports?target_date=${targetDate}`, { headers: h }).then(r => r.json())
      setSummary(Array.isArray(d.summary) ? d.summary : [])
    } else {
      const d = await fetch('/api/reports', { headers: h }).then(r => r.json())
      setReports(Array.isArray(d) ? d : [])
    }
    setLoading(false)
  }, [isAdmin, targetDate])

  useEffect(() => { load() }, [load])

  const openForm = (report?: DailyReport, employeeId?: string) => {
    setEditReport(report)
    setEditEmployeeId(employeeId)
    setShowForm(true)
  }

  const form = showForm && (
    <DailyReportForm
      existingReport={editReport}
      isAdmin={isAdmin}
      targetDate={isAdmin ? targetDate : undefined}
      targetEmployeeId={isAdmin ? editEmployeeId : undefined}
      onClose={() => setShowForm(false)}
      onSaved={() => { setShowForm(false); load(); window.dispatchEvent(new Event('rp:refresh-badges')) }}
    />
  )

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="skeleton" style={{ height: 60, width: 320 }} />
        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 56 }} />)}
      </div>
    )
  }

  /* ── Employee view ── */
  if (!isAdmin) {
    const todayReport = reports.find(r => String(r.report_date).slice(0, 10) === today())
    const open = reports.find(r => r.id === openId) || null
    const cols = 'minmax(160px, 1.2fr) 110px minmax(160px, 2fr) 110px 14px'
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <PageHeader
          eyebrow={new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' })}
          title="Daily Report"
          description="Log what you worked on today. Takes under a minute — use the mic for faster entry."
          actions={<GlowButton onClick={() => openForm(todayReport)}><Plus size={15} /> {todayReport ? 'Update today’s report' : 'Fill today’s report'}</GlowButton>}
        />

        <div className={`alert-strip ${todayReport ? 'tone-success' : 'tone-warning'}`}>
          <span className="alert-strip-icon">{todayReport ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}</span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{todayReport ? 'Today’s report is submitted' : 'You haven’t submitted today’s report yet'}</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {todayReport ? `${todayReport.entries?.length || 0} items logged — you can still edit it today.` : 'Reports lock at midnight.'}
            </p>
          </div>
          {todayReport && <button className="btn btn-secondary btn-sm" onClick={() => openForm(todayReport)}><Edit2 size={13} /> Edit</button>}
        </div>

        <Reveal>
          <section className="card list">
            <div className="card-header"><div className="card-title">My reports</div><span className="card-subtitle">{reports.length} submitted</span></div>
            {reports.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><ClipboardList size={20} /></div>
                <p>No reports yet — submit your first one above.</p>
              </div>
            ) : (
              <div role="list">
                <div className="list-head" style={{ '--cols': cols } as React.CSSProperties}><span>Date</span><span>Items</span><span>Summary</span><span>Status</span><span /></div>
                {reports.map(r => {
                  const isToday = String(r.report_date).slice(0, 10) === today()
                  return (
                    <div key={r.id} role="listitem" tabIndex={0} className={`list-row ${openId === r.id ? 'selected' : ''}`} style={{ '--cols': cols } as React.CSSProperties}
                      onClick={() => setOpenId(r.id)} onKeyDown={e => { if (e.key === 'Enter') setOpenId(r.id) }}>
                      <div>
                        <div className="row-title">{formatDate(r.report_date, 'EEE, dd MMM yyyy')}</div>
                        {r.admin_comment && <div className="row-sub" style={{ color: 'var(--status-warning)' }}>Admin left feedback</div>}
                      </div>
                      <span className="col-hide-sm"><Pill color={(r.entries?.length || 0) > 0 ? '#22c55e' : '#8592a3'}>{r.entries?.length || 0} items</Pill></span>
                      <span className="row-cell col-hide-sm">{r.entries?.map(e => e.description).join(', ') || '—'}</span>
                      <span>{isToday ? <Pill color="#2f9bff">Today · editable</Pill> : <Pill color="#8592a3" icon={<Lock size={11} />}>Locked</Pill>}</span>
                      <ChevronRight size={16} className="row-chevron col-hide-sm" />
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </Reveal>

        {open && (
          <SidePanel
            open
            onClose={() => setOpenId(null)}
            leading={<span className="drawer-icon" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)' }}><ClipboardList size={18} /></span>}
            title={formatDate(open.report_date, 'EEEE, dd MMM yyyy')}
            subtitle={<>{open.entries?.length || 0} items logged{open.updated_by_admin && <Pill color="#8b5cf6">Edited by admin</Pill>}</>}
            footer={String(open.report_date).slice(0, 10) === today() ? <button className="btn btn-primary" onClick={() => openForm(open)}><Edit2 size={14} /> Edit report</button> : undefined}
          >
            <PanelSection title="What I did"><ReportEntries report={open} /></PanelSection>
            {open.note && <div className="note-box"><MessageSquareText size={14} /><span>{open.note}</span></div>}
            {open.admin_comment && (
              <div className="hint-box" style={{ '--tone': 'var(--status-warning)' } as React.CSSProperties}>
                <MessageSquareText size={15} /><div><strong>Admin feedback</strong><p>{open.admin_comment}</p></div>
              </div>
            )}
          </SidePanel>
        )}
        {form}
      </div>
    )
  }

  /* ── Admin view ── */
  const submittedCount = summary.filter(s => s.submitted).length
  const q = search.toLowerCase()
  const rows = summary.filter(s =>
    (!q || s.employee.full_name.toLowerCase().includes(q) || (s.employee.designation || '').toLowerCase().includes(q)) &&
    (filter === 'all' || (filter === 'submitted' ? s.submitted : !s.submitted))
  )
  const open = summary.find(s => s.employee.id === openId) || null
  const cols = 'minmax(200px, 1.8fr) 110px 86px 86px 80px minmax(110px, 1fr) 14px'
  const totalItems = summary.reduce((a, s) => a + (s.report?.entries?.length || 0), 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <PageHeader
        eyebrow={formatDate(targetDate, 'EEEE, dd MMMM yyyy')}
        title="Daily Reports"
        description="Click a team member to read their report, fix it, or leave feedback."
        actions={
          <div style={{ position: 'relative' }}>
            <Calendar size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input type="date" className="form-input" value={targetDate} max={today()} onChange={e => { setTargetDate(e.target.value); setOpenId(null) }} style={{ width: 'auto', paddingLeft: 32 }} aria-label="Report date" />
          </div>
        }
      />

      <Reveal className="grid-4">
        <KpiCard label="Team members" value={summary.length} icon={Users} />
        <KpiCard label="Submitted" value={submittedCount} icon={CheckCircle2} tone="brand" foot={`${summary.length ? Math.round((submittedCount / summary.length) * 100) : 0}% of team`} onClick={() => setFilter('submitted')} active={filter === 'submitted'} />
        <KpiCard label="Missing" value={summary.length - submittedCount} icon={AlertTriangle} tone={summary.length - submittedCount > 0 ? 'danger' : 'default'} foot="Click to see who" onClick={() => setFilter('missing')} active={filter === 'missing'} />
        <KpiCard label="Items logged" value={totalItems} icon={ClipboardList} tone="info" foot="Across all reports" />
      </Reveal>

      <Reveal delay={0.06}>
        <section className="card list">
          <div className="list-toolbar">
            <div className="input-icon">
              <Search size={14} />
              <input className="form-input" placeholder="Search team member…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="segmented">
              {(['all', 'submitted', 'missing'] as const).map(f => (
                <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>{f}</button>
              ))}
            </div>
          </div>
          {rows.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon"><ClipboardList size={20} /></div><p>No one matches this filter.</p></div>
          ) : (
            <div role="list">
              <div className="list-head" style={{ '--cols': cols } as React.CSSProperties}>
                <span>Team member</span><span>Status</span><span>Check-in</span><span>Check-out</span><span>Hours</span><span>Items</span><span />
              </div>
              {rows.map(s => {
                const r = s.report
                return (
                  <div key={s.employee.id} role="listitem" tabIndex={0} className={`list-row ${openId === s.employee.id ? 'selected' : ''}`} style={{ '--cols': cols } as React.CSSProperties}
                    onClick={() => setOpenId(s.employee.id)} onKeyDown={e => { if (e.key === 'Enter') setOpenId(s.employee.id) }}>
                    <div className="row-main">
                      <Avatar name={s.employee.full_name} src={s.employee.avatar_url} size="sm" />
                      <div style={{ minWidth: 0 }}>
                        <div className="row-title">{s.employee.full_name}</div>
                        <div className="row-sub">{s.employee.designation || '—'}</div>
                      </div>
                    </div>
                    <span>{s.submitted ? <Pill color="#22c55e" icon={<CheckCircle2 size={11} />}>Submitted</Pill> : <Pill color="#ef4757" dot>Missing</Pill>}</span>
                    <span className="row-cell col-hide-sm tabular">{r?.check_in_time?.slice(0, 5) || '—'}</span>
                    <span className="row-cell col-hide-sm tabular">{r?.check_out_time?.slice(0, 5) || '—'}</span>
                    <span className="row-cell col-hide-sm tabular">{hoursWorked(r) || '—'}</span>
                    <span className="row-cell col-hide-sm">{s.submitted ? `${r?.entries?.length || 0} items${r?.admin_comment ? ' · feedback' : ''}` : '—'}</span>
                    <ChevronRight size={16} className="row-chevron col-hide-sm" />
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </Reveal>

      {open && (
        <SidePanel
          open
          onClose={() => setOpenId(null)}
          leading={<Avatar name={open.employee.full_name} src={open.employee.avatar_url} size="md" />}
          title={<>{open.employee.full_name} {open.submitted ? <Pill color="#22c55e">Submitted</Pill> : <Pill color="#ef4757">Missing</Pill>}</>}
          subtitle={<>{open.employee.designation || 'Team member'} · {formatDate(targetDate, 'dd MMM yyyy')}</>}
          footer={open.submitted && open.report
            ? <button className="btn btn-secondary" onClick={() => openForm(open.report!, open.employee.id)}><Edit2 size={14} /> Edit report</button>
            : <button className="btn btn-primary" onClick={() => openForm(undefined, open.employee.id)}><Plus size={14} /> Add report manually</button>}
        >
          {!open.submitted || !open.report ? (
            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
              <div className="empty-state-icon"><Clock size={20} /></div>
              <p style={{ fontWeight: 550, color: 'var(--text-secondary)' }}>No report for this day</p>
              <p style={{ fontSize: '0.8rem' }}>You can add one on their behalf using the button below.</p>
            </div>
          ) : (
            <>
              <KeyValues items={[
                { label: 'Check-in', value: open.report.check_in_time?.slice(0, 5) || '—' },
                { label: 'Check-out', value: open.report.check_out_time?.slice(0, 5) || '—' },
                { label: 'Hours worked', value: hoursWorked(open.report) || '—' },
                { label: 'Submitted at', value: open.report.submitted_at ? formatDate(open.report.submitted_at, 'hh:mm a') : '—' },
              ]} />
              <PanelSection title="What they did"><ReportEntries report={open.report} /></PanelSection>
              {open.report.note && <div className="note-box"><MessageSquareText size={14} /><span><strong>Blocker / note:</strong> {open.report.note}</span></div>}
              <AdminComment report={open.report} onSaved={load} />
            </>
          )}
        </SidePanel>
      )}
      {form}
    </div>
  )
}
