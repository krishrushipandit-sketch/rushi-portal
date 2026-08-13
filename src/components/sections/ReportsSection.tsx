'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { getInitials, formatDate } from '@/lib/utils'
import DailyReportForm from './EmployeeReportForm'
import {
  ClipboardList, Plus, CheckCircle2,
  ChevronDown, ChevronUp, AlertTriangle, Edit2,
  Calendar, Users, CheckCircle
} from 'lucide-react'

const today = () => {
  const d = new Date()
  const offset = d.getTimezoneOffset() * 60000
  const istTime = new Date(d.getTime() + offset + (330 * 60000))
  return istTime.toISOString().slice(0, 10)
}

interface DailyReport {
  id: string; employee_id: string; report_date: string
  entries: ReportEntry[]; note: string; submitted_at: string
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

interface ReportEntry { description: string; count: number; notes?: string }

export default function ReportsSection({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [reports, setReports] = useState<DailyReport[]>([]) // For Employee View
  const [summary, setSummary] = useState<EmpSummary[]>([]) // For Admin View
  const [targetDate, setTargetDate] = useState(today())
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editReport, setEditReport] = useState<DailyReport | undefined>()
  const [editEmployeeId, setEditEmployeeId] = useState<string | undefined>()
  
  const isAdmin = profile.role === 'admin'

  const getToken = () => {
    const token = localStorage.getItem('rushi_token')
    if (!token) {
      router.push('/')
      return null
    }
    return token
  }

  const load = useCallback(async () => {
    const token = getToken()
    if (!token) return
    const h = { Authorization: `Bearer ${token}` }
    if (isAdmin) {
      // Daily summary for all employees
      const r1 = await fetch(`/api/reports?target_date=${targetDate}`, { headers: h })
      const d1 = await r1.json()
      setSummary(Array.isArray(d1.summary) ? d1.summary : [])
    } else {
      // Employee: own reports
      const r = await fetch('/api/reports', { headers: h })
      const d = await r.json()
      setReports(Array.isArray(d) ? d : [])
    }
    setLoading(false)
  }, [isAdmin, targetDate, router])

  useEffect(() => { load() }, [load])

  const todayReport = reports.find(r => r.report_date === today())

  if (loading) return <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }} />

  /* ══════════════ EMPLOYEE VIEW ══════════════ */
  if (!isAdmin) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>Daily Report</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditReport(todayReport); setShowForm(true) }}>
            <Plus size={16} />
            {todayReport ? "Update Today's Report" : "Fill Today's Report"}
          </button>
        </div>

        {/* Status card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.25rem',
          marginBottom: '1.5rem', borderRadius: 'var(--radius-lg)',
          background: todayReport ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
          border: `1px solid ${todayReport ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
        }}>
          {todayReport
            ? <CheckCircle2 size={22} style={{ color: '#10b981', flexShrink: 0 }} />
            : <AlertTriangle size={22} style={{ color: '#f59e0b', flexShrink: 0 }} />}
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', color: todayReport ? '#10b981' : '#f59e0b' }}>
              {todayReport ? "Today's report submitted ✓" : "You haven't submitted today's report yet"}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {todayReport
                ? `${todayReport.entries?.length || 0} items logged — tap Edit to update`
                : 'Takes less than 1 minute. Use 🎤 mic for faster entry.'}
            </p>
          </div>
          {todayReport && (
            <button className="btn btn-secondary btn-sm" onClick={() => { setEditReport(todayReport); setShowForm(true) }}>
              <Edit2 size={13} /> Edit
            </button>
          )}
        </div>

        {/* My past reports */}
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>My Reports</h3>
        <ReportCards
          reports={reports} isAdmin={false}
          expandedId={expandedId} setExpandedId={setExpandedId}
          onEdit={r => { setEditReport(r); setShowForm(true) }}
        />

        {showForm && (
          <DailyReportForm
            existingReport={editReport}
            onClose={() => setShowForm(false)}
            onSaved={() => { setShowForm(false); load() }}
          />
        )}
      </div>
    )
  }

  /* ══════════════ ADMIN VIEW ══════════════ */
  const submittedCount = summary.filter(s => s.submitted).length

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>Daily Reports</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Check what your team is working on today
          </p>
        </div>
        <input type="date" className="form-input" value={targetDate} max={today()}
          onChange={e => setTargetDate(e.target.value)}
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.82rem' }} />
      </div>

      {/* KPIs */}
      <div className="grid-3" style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {[
          { label: 'Total Employees', value: summary.length, icon: Users, color: '#6366f1' },
          { label: 'Submitted Reports', value: submittedCount, icon: CheckCircle, color: '#10b981' },
          { label: 'Selected Date', value: formatDate(targetDate, 'dd MMM yyyy'), icon: Calendar, color: '#f59e0b' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="metric-value" style={{ color }}>{value}</div>
                <div className="metric-label">{label}</div>
              </div>
              <div style={{ width: '38px', height: '38px', background: `${color}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                <Icon size={17} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Employee list — click to expand */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-default)' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Team Reports — {formatDate(targetDate, 'dd MMMM yyyy')}</h3>
        </div>

        {summary.length === 0 ? (
          <div className="empty-state" style={{ padding: '2.5rem' }}>
            <ClipboardList size={28} style={{ color: 'var(--text-muted)', margin: '0 auto 0.5rem' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No employees found.</p>
          </div>
        ) : (
          <div>
            {summary.map(emp => {
              const isExp = expandedId === emp.employee.id
              const report = emp.report

              return (
                <div key={emp.employee.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {/* Row Header */}
                  <div
                    onClick={() => setExpandedId(isExp ? null : emp.employee.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.25rem', cursor: 'pointer', transition: 'background 0.15s', background: isExp ? 'var(--bg-elevated)' : 'transparent' }}
                    onMouseEnter={e => { if(!isExp) e.currentTarget.style.background = 'var(--bg-elevated)' }}
                    onMouseLeave={e => { if(!isExp) e.currentTarget.style.background = 'transparent' }}
                  >
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      {emp.employee.avatar_url ? (
                        <img 
                          src={emp.employee.avatar_url} 
                          alt="" 
                          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                      ) : (
                        getInitials(emp.employee.full_name)
                      )}
                    </div>

                    {/* Name + role */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {emp.employee.full_name}
                        {emp.submitted && <CheckCircle2 size={13} style={{ color: '#10b981' }} />}
                      </p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{emp.employee.designation}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* Timing badge — admin only */}
                      {emp.submitted && report && (report.check_in_time || report.check_out_time) && (
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          {report.check_in_time && (
                            <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '99px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', fontWeight: 600 }}>
                              🕐 {report.check_in_time.slice(0, 5)}
                            </span>
                          )}
                          {report.check_out_time && (
                            <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '99px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', fontWeight: 600 }}>
                              🕕 {report.check_out_time.slice(0, 5)}
                            </span>
                          )}
                          {report.check_in_time && report.check_out_time && (() => {
                            const [ih, im] = report.check_in_time.split(':').map(Number)
                            const [oh, om] = report.check_out_time.split(':').map(Number)
                            const mins = (oh * 60 + om) - (ih * 60 + im)
                            if (mins > 0) {
                              const h = Math.floor(mins / 60), m = mins % 60
                              return <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>⏱ {h}h {m}m</span>
                            }
                            return null
                          })()}
                        </div>
                      )}
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: emp.submitted ? '#10b981' : 'var(--text-muted)' }}>
                        {emp.submitted ? (report?.entries?.length || 0) + ' items logged' : 'No report'}
                      </span>
                      {isExp ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExp && (
                    <div style={{ padding: '0 1.25rem 1.25rem 4rem', background: 'var(--bg-elevated)' }}>
                      {!emp.submitted ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Has not submitted a report for this day.</p>
                          <button className="btn btn-secondary btn-sm" onClick={() => { setEditReport(undefined); setEditEmployeeId(emp.employee.id); setShowForm(true) }}>
                            <Plus size={14} /> Add Report Manually
                          </button>
                        </div>
                      ) : (
                        <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-default)' }}>
                          <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>What they did</span>
                            <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }} onClick={() => { setEditReport(report!); setEditEmployeeId(emp.employee.id); setShowForm(true) }}>
                              <Edit2 size={13} /> Edit
                            </button>
                          </div>
                          
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                              {report?.entries?.map((e, i) => (
                                <tr key={i} style={{ borderBottom: i === report.entries.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
                                  <td style={{ padding: '0.75rem 1rem', width: '25%', verticalAlign: 'top' }}>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{e.description}</span>
                                  </td>
                                  <td style={{ padding: '0.75rem 1rem', verticalAlign: 'top' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{e.notes || '—'}</p>
                                  </td>
                                  <td style={{ padding: '0.75rem 1rem', width: '80px', textAlign: 'center', verticalAlign: 'top' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)' }}>{e.count > 0 ? e.count : '—'}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {report?.note && (
                            <div style={{ padding: '0.75rem 1rem', background: 'rgba(99,102,241,0.05)', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              <strong style={{ color: 'var(--brand-primary)' }}>Blocker/Note:</strong> {report.note}
                            </div>
                          )}
                          <AdminCommentBox report={report} onCommentAdded={load} />
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

      {showForm && (
        <DailyReportForm
          existingReport={editReport}
          isAdmin={true}
          targetDate={targetDate}
          targetEmployeeId={editEmployeeId}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load() }}
        />
      )}
    </div>
  )
}

/* ── Report Cards (Used for Employee View Only) ── */
function ReportCards({ reports, isAdmin, expandedId, setExpandedId, onEdit }: {
  reports: DailyReport[]; isAdmin: boolean
  expandedId: string | null; setExpandedId: (id: string | null) => void
  onEdit: (r: DailyReport) => void
}) {
  if (reports.length === 0) {
    return (
      <div className="glass-card">
        <div className="empty-state">
          <div className="empty-state-icon"><ClipboardList size={22} /></div>
          <p style={{ fontWeight: 600 }}>No reports yet</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {!isAdmin ? 'Submit your first report using the button above' : 'No reports found'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {reports.map(report => {
        const isExp = expandedId === report.id
        const isToday = report.report_date === today()
        const count = report.entries?.length || 0

        return (
          <div key={report.id} className="glass-card" style={{ overflow: 'hidden' }}>
            <div onClick={() => setExpandedId(isExp ? null : report.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.25rem', cursor: 'pointer', flexWrap: 'wrap' }}>

              <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                {formatDate(report.report_date, 'dd MMM yyyy')}
              </span>

              {isToday && <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '1px 7px', borderRadius: '99px', background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>Today</span>}
              {report.updated_by_admin && <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '1px 7px', borderRadius: '99px', background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>Admin edit</span>}

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: count > 0 ? 'rgba(16,185,129,0.1)' : 'rgba(148,163,184,0.1)', color: count > 0 ? '#10b981' : 'var(--text-muted)' }}>
                  {count > 0 ? `${count} item${count !== 1 ? 's' : ''}` : 'Empty'}
                </span>
                {(isAdmin || isToday) && (
                  <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }} onClick={e => { e.stopPropagation(); onEdit(report) }}>
                    <Edit2 size={12} />
                  </button>
                )}
                {isExp ? <ChevronUp size={15} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={15} style={{ color: 'var(--text-muted)' }} />}
              </div>
            </div>

            {isExp && (
              <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-elevated)' }}>
                      <th style={{ padding: '0.45rem 1.25rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>What I Did</th>
                      <th style={{ padding: '0.45rem 1rem', textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', width: '80px' }}>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.entries?.map((e, i) => (
                      <tr key={i} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle2 size={12} style={{ color: '#10b981', flexShrink: 0 }} />
                          <div>
                            <strong>{e.description}</strong>: {e.notes || '—'}
                          </div>
                        </td>
                        <td style={{ padding: '0.5rem 1rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                          {e.count > 0 ? e.count : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {report.note && (
                  <div style={{ padding: '0.625rem 1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
                    <strong>Note:</strong> {report.note}
                  </div>
                )}
                {report.admin_comment && (
                  <div style={{ padding: '0.625rem 1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: '#d97706', background: 'rgba(245,158,11,0.05)' }}>
                    <strong>Admin Comment:</strong> {report.admin_comment}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Admin Comment Box ── */
function AdminCommentBox({ report, onCommentAdded }: { report: DailyReport | null, onCommentAdded: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [comment, setComment] = useState(report?.admin_comment || '')
  const [isSaving, setIsSaving] = useState(false)

  if (!report) return null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem('rushi_token')
      if (!token) {
        window.location.href = '/' // Quick router fallback
        return
      }
      const res = await fetch('/api/reports/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ report_id: report.id, admin_comment: comment })
      })
      if (!res.ok) {
        const err = await res.json()
        if (err.error?.includes('SQL migration') || err.error?.includes('column "admin_comment" of relation "daily_reports" does not exist')) {
          alert('Please run the provided SQL command in Supabase to add the admin_comment column first.')
        } else {
          alert(err.error || 'Failed to save comment')
        }
        setIsSaving(false)
        return
      }
      onCommentAdded()
      setIsEditing(false)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-subtle)', background: 'rgba(245,158,11,0.05)' }}>
      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <textarea
            className="form-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment or feedback..."
            rows={2}
            style={{ fontSize: '0.8rem' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Comment'}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '0.8rem' }}>
            <strong style={{ color: '#d97706' }}>Admin Comment:</strong>{' '}
            {report.admin_comment ? (
              <span style={{ color: 'var(--text-secondary)' }}>{report.admin_comment}</span>
            ) : (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No comment yet</span>
            )}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ padding: '2px 6px', height: 'auto', fontSize: '0.75rem' }} onClick={() => setIsEditing(true)}>
            <Edit2 size={12} style={{ marginRight: '4px' }} /> {report.admin_comment ? 'Edit' : 'Add'}
          </button>
        </div>
      )}
    </div>
  )
}
