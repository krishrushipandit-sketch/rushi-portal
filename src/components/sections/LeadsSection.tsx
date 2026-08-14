'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import {
  Plus, Search, X, Loader2, Phone, Mail, Edit2, Trash2,
  MessageSquare, PhoneCall, Clock, ChevronDown, ChevronRight,
  User, Building2, Layers, RadioTower, Calendar, FileText,
  SlidersHorizontal, ArrowUpDown, CircleDot, TrendingUp,
  CheckCircle, XCircle, PhoneOff, PhoneMissed, Voicemail,
  AlertCircle, Zap, MapPin, Activity, BarChart2, Filter,
  ClipboardList, Send, RefreshCw
} from 'lucide-react'

interface Props { profile: Profile }

interface Lead {
  id: string
  client_name: string
  phone: string
  email: string | null
  category: string
  industry?: string | null
  platform?: string | null
  status: string
  source: string | null
  notes: string | null
  follow_up_date: string | null
  qualification_answers?: Record<string, any> | null
  followup_count?: number
  last_followup_at?: string | null
  next_followup_at?: string | null
  created_at: string
  assigned_to_profile?: { id: string; full_name: string; email?: string }
}

interface FollowupRecord {
  id: string
  followup_number: number
  call_status: string
  notes: string | null
  scheduled_at: string | null
  completed_at: string
  sales_rep?: { full_name: string }
}

const INDUSTRIES = ['Digital Marketing', 'Share Market', 'AI Course', 'Amazon', 'BBA/MBA', 'Other']
const SOURCES = ['facebook_lead_ad', 'walk_in', 'referral', 'social_media', 'website', 'cold_call', 'other']

const STATUS_CONFIG: {
  id: string; label: string; color: string; bg: string;
  icon: React.ReactNode; group: 'active' | 'hot' | 'closed'
}[] = [
  { id: 'new',             label: 'New Lead',          color: '#6366f1', bg: 'rgba(99,102,241,0.08)',  icon: <CircleDot size={12} />,   group: 'active' },
  { id: 'ringing',         label: 'Ringing',           color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  icon: <Phone size={12} />,       group: 'active' },
  { id: 'not_connected',   label: 'Not Connected',     color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   icon: <PhoneOff size={12} />,    group: 'active' },
  { id: 'switched_off',    label: 'Switched Off',      color: '#6b7280', bg: 'rgba(107,114,128,0.08)', icon: <PhoneMissed size={12} />, group: 'active' },
  { id: 'not_logical',     label: 'Not Logical',       color: '#9ca3af', bg: 'rgba(156,163,175,0.08)', icon: <XCircle size={12} />,     group: 'closed' },
  { id: 'busy_callback',   label: 'Busy / Callback',   color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',  icon: <Voicemail size={12} />,   group: 'active' },
  { id: 'interested',      label: 'Interested',        color: '#06b6d4', bg: 'rgba(6,182,212,0.08)',   icon: <Zap size={12} />,         group: 'hot'    },
  { id: 'visit_scheduled', label: 'Visit Scheduled',   color: '#ec4899', bg: 'rgba(236,72,153,0.08)',  icon: <Calendar size={12} />,    group: 'hot'    },
  { id: 'closed_won',      label: 'Enrolled',          color: '#10b981', bg: 'rgba(16,185,129,0.08)',  icon: <CheckCircle size={12} />, group: 'closed' },
  { id: 'closed_lost',     label: 'Lost',              color: '#dc2626', bg: 'rgba(220,38,38,0.08)',   icon: <XCircle size={12} />,     group: 'closed' },
]

const statusMap = STATUS_CONFIG.reduce((a, s) => ({ ...a, [s.id]: s }), {} as Record<string, typeof STATUS_CONFIG[0]>)

// ─── Status Badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cfg = statusMap[status] || { label: status, color: '#6366f1', bg: 'rgba(99,102,241,0.08)', icon: <CircleDot size={12} /> }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '3px 10px', borderRadius: '99px',
      background: cfg.bg, color: cfg.color,
      fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap',
      border: `1px solid ${cfg.color}25`
    }}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

// ─── Qualification Answers Panel (dynamic, scalable) ──────────────────────
function QualificationPanel({ answers }: { answers: Record<string, any> }) {
  const entries = Object.entries(answers)
  if (entries.length === 0) return null
  return (
    <div style={{
      borderRadius: '10px', border: '1px solid var(--border-default)',
      background: 'var(--bg-surface)', overflow: 'hidden'
    }}>
      <div style={{
        padding: '0.5rem 0.875rem', background: 'rgba(99,102,241,0.05)',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex', alignItems: 'center', gap: '0.5rem'
      }}>
        <ClipboardList size={13} color="#6366f1" />
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Form Responses
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          {entries.length} field{entries.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {entries.map(([key, val], i) => (
          <div key={key} style={{
            padding: '0.625rem 0.875rem',
            borderRight: i % 2 === 0 ? '1px solid var(--border-default)' : 'none',
            borderBottom: i < entries.length - 2 ? '1px solid var(--border-default)' : 'none'
          }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
              {key}
            </p>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', margin: '3px 0 0', wordBreak: 'break-word' }}>
              {String(val) || '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Lead Card (expandable row in table) ──────────────────────────────────
function LeadRow({
  lead, isAdmin,
  onFollowup, onEdit, onDelete, onWhatsapp
}: {
  lead: Lead; isAdmin: boolean
  onFollowup: () => void; onEdit: () => void
  onDelete: () => void; onWhatsapp: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const qual = lead.qualification_answers || {}
  const qualCount = Object.keys(qual).length
  const industry = lead.industry || lead.category || '—'
  const cfg = statusMap[lead.status] || statusMap['new']

  return (
    <>
      <tr style={{ borderTop: '1px solid var(--border-default)', transition: 'background 0.1s' }}>
        {/* Lead identity */}
        <td style={{ padding: '0.875rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
            {/* Avatar circle with initial */}
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: `${cfg.color}18`, color: cfg.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0
            }}>
              {lead.client_name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap' }}>
                {lead.client_name}
              </p>
              <div style={{ display: 'flex', gap: '0.625rem', marginTop: '3px', flexWrap: 'wrap' }}>
                <a href={`tel:${lead.phone}`} style={{
                  fontSize: '0.75rem', color: '#6366f1', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600
                }}>
                  <Phone size={11} /> {lead.phone}
                </a>
                {lead.email && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Mail size={10} /> {lead.email}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <RadioTower size={10} /> {lead.platform || 'Facebook'}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {formatDate(lead.created_at, 'dd MMM yyyy')}
                </span>
              </div>
            </div>
          </div>
        </td>

        {/* Course / Industry */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '0.75rem', fontWeight: 600, padding: '3px 9px',
            borderRadius: '6px', background: 'rgba(99,102,241,0.08)', color: '#6366f1',
            border: '1px solid rgba(99,102,241,0.15)', whiteSpace: 'nowrap'
          }}>
            <Layers size={11} /> {industry}
          </span>
        </td>

        {/* Form responses — dynamic */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          {qualCount === 0 ? (
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No form data</span>
          ) : (
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 600, padding: '3px 9px',
                borderRadius: '6px', background: 'rgba(6,182,212,0.08)', color: '#06b6d4',
                border: '1px solid rgba(6,182,212,0.2)', cursor: 'pointer'
              }}
            >
              <ClipboardList size={11} />
              {qualCount} response{qualCount !== 1 ? 's' : ''}
              <ChevronRight size={11} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          )}
        </td>

        {/* Status */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          <StatusBadge status={lead.status} />
        </td>

        {/* Follow-ups */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            <Activity size={12} color="var(--text-muted)" />
            {lead.followup_count || 0}
          </div>
          {lead.next_followup_at && (
            <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
              <Clock size={9} /> {formatDate(lead.next_followup_at, 'dd MMM, hh:mm a')}
            </div>
          )}
        </td>

        {/* Assigned — admin only */}
        {isAdmin && (
          <td style={{ padding: '0.875rem 0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              {lead.assigned_to_profile?.full_name || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Unassigned</span>}
            </span>
          </td>
        )}

        {/* Actions */}
        <td style={{ padding: '0.875rem 1rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
            <button
              onClick={onFollowup}
              title="Log Followup"
              style={{
                padding: '5px 10px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: '0.75rem',
                fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px',
                transition: 'background 0.15s'
              }}
            >
              <PhoneCall size={12} /> Call
            </button>
            <button
              onClick={onWhatsapp}
              title="Send WhatsApp"
              style={{
                padding: '5px 8px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                background: 'rgba(37,211,102,0.08)', color: '#25D366', display: 'flex', alignItems: 'center',
                transition: 'background 0.15s'
              }}
            >
              <MessageSquare size={13} />
            </button>
            <button
              onClick={onEdit}
              title="Edit"
              style={{
                padding: '5px 8px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                background: 'var(--bg-surface)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
                transition: 'background 0.15s'
              }}
            >
              <Edit2 size={13} />
            </button>
            {isAdmin && (
              <button
                onClick={onDelete}
                title="Delete"
                style={{
                  padding: '5px 8px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                  background: 'rgba(239,68,68,0.07)', color: '#ef4444', display: 'flex', alignItems: 'center',
                  transition: 'background 0.15s'
                }}
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Expandable qualification answers row */}
      {expanded && qualCount > 0 && (
        <tr>
          <td colSpan={isAdmin ? 7 : 6} style={{ padding: '0 1rem 0.875rem', background: 'var(--bg-surface)' }}>
            <QualificationPanel answers={qual} />
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Followup Side Panel ───────────────────────────────────────────────────
function FollowupPanel({
  lead, onClose, onSaved
}: {
  lead: Lead; onClose: () => void; onSaved: () => void
}) {
  const [history, setHistory] = useState<FollowupRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [callStatus, setCallStatus] = useState(lead.status === 'new' ? 'ringing' : lead.status)
  const [notes, setNotes] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [saving, setSaving] = useState(false)

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  useEffect(() => {
    const token = getToken()
    if (!token) return
    fetch(`/api/leads/${lead.id}/followups`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setHistory(d) })
      .finally(() => setLoading(false))
  }, [lead.id])

  const handleSave = async () => {
    setSaving(true)
    const token = getToken()
    const res = await fetch(`/api/leads/${lead.id}/followups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ call_status: callStatus, notes, scheduled_at: scheduledAt || null })
    })
    if (res.ok) {
      setNotes(''); setScheduledAt('')
      const updated = await fetch(`/api/leads/${lead.id}/followups`, { headers: { Authorization: `Bearer ${token}` } })
      const d = await updated.json()
      if (Array.isArray(d)) setHistory(d)
      onSaved()
    }
    setSaving(false)
  }

  const qual = lead.qualification_answers || {}
  const qualEntries = Object.entries(qual)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'flex-end'
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        width: '100%', maxWidth: '520px', height: '100%',
        background: 'var(--bg-elevated)', display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
        borderLeft: '1px solid var(--border-default)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem'
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
            background: `${(statusMap[lead.status] || statusMap['new']).color}18`,
            color: (statusMap[lead.status] || statusMap['new']).color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 700
          }}>
            {lead.client_name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>{lead.client_name}</h3>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Phone size={11} /> {lead.phone}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Layers size={11} /> {lead.industry || lead.category}
              </span>
              {lead.assigned_to_profile && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <User size={11} /> {lead.assigned_to_profile.full_name}
                </span>
              )}
            </div>
            <div style={{ marginTop: '6px' }}>
              <StatusBadge status={lead.status} />
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', borderRadius: '8px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Dynamic Qualification Answers */}
          {qualEntries.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                <ClipboardList size={14} color="#6366f1" />
                <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Form Responses
                </h4>
              </div>
              <div style={{ borderRadius: '10px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                {qualEntries.map(([key, val], i) => (
                  <div key={key} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    padding: '0.625rem 0.875rem', gap: '1rem',
                    borderBottom: i < qualEntries.length - 1 ? '1px solid var(--border-default)' : 'none',
                    background: i % 2 === 0 ? 'var(--bg-surface)' : 'transparent'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{key}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right' }}>{String(val) || '—'}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Log New Followup */}
          <section style={{ borderRadius: '12px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
            <div style={{
              padding: '0.75rem 1rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              <PhoneCall size={14} color="#6366f1" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Log Call — Followup #{(lead.followup_count || 0) + 1}
              </span>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                  Call Outcome
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {STATUS_CONFIG.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setCallStatus(s.id)}
                      style={{
                        padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                        border: `1px solid ${callStatus === s.id ? s.color + '60' : 'var(--border-default)'}`,
                        background: callStatus === s.id ? s.bg : 'transparent',
                        display: 'flex', alignItems: 'center', gap: '6px',
                        color: callStatus === s.id ? s.color : 'var(--text-muted)',
                        fontSize: '0.75rem', fontWeight: callStatus === s.id ? 700 : 400,
                        transition: 'all 0.15s'
                      }}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                  Notes / Remarks
                </label>
                <textarea
                  rows={3}
                  placeholder="Customer response, key details, next steps..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{
                    width: '100%', padding: '0.625rem 0.75rem', borderRadius: '8px',
                    border: '1px solid var(--border-default)', background: 'var(--bg-surface)',
                    color: 'var(--text-primary)', fontSize: '0.82rem', resize: 'vertical',
                    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                  Schedule Next Followup
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={e => setScheduledAt(e.target.value)}
                  style={{
                    width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px',
                    border: '1px solid var(--border-default)', background: 'var(--bg-surface)',
                    color: 'var(--text-primary)', fontSize: '0.82rem',
                    outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  width: '100%', padding: '0.625rem', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600,
                  fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  opacity: saving ? 0.7 : 1, transition: 'opacity 0.15s'
                }}
              >
                {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
                Save Outcome
              </button>
            </div>
          </section>

          {/* Followup History Timeline */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Activity size={14} color="var(--text-muted)" />
              <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Call History
              </h4>
              {history.length > 0 && (
                <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{history.length} call{history.length !== 1 ? 's' : ''}</span>
              )}
            </div>

            {loading ? (
              <div style={{ height: '80px', borderRadius: '10px', background: 'var(--bg-surface)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ) : history.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '10px', border: '1px dashed var(--border-default)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No followups recorded yet
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {history.map((item, idx) => {
                  const s = statusMap[item.call_status] || { color: '#6366f1', bg: 'rgba(99,102,241,0.08)', label: item.call_status, icon: <CircleDot size={12} /> }
                  return (
                    <div key={item.id} style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
                      {/* Timeline line */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, marginTop: '14px', flexShrink: 0, boxShadow: `0 0 0 3px ${s.color}20` }} />
                        {idx < history.length - 1 && (
                          <div style={{ width: '1px', flex: 1, background: 'var(--border-default)', margin: '4px 0' }} />
                        )}
                      </div>
                      <div style={{
                        flex: 1, borderRadius: '10px', border: '1px solid var(--border-default)',
                        padding: '0.625rem 0.875rem', marginBottom: '0.5rem', background: 'var(--bg-surface)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                          <StatusBadge status={item.call_status} />
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                            {formatDate(item.completed_at, 'dd MMM, hh:mm a')}
                          </span>
                        </div>
                        {item.notes && (
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0 0', lineHeight: '1.5' }}>{item.notes}</p>
                        )}
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <User size={9} /> {item.sales_rep?.full_name || 'Sales Rep'} &nbsp;·&nbsp; Followup #{item.followup_number}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function LeadsSection({ profile }: Props) {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')

  const [showModal, setShowModal] = useState(false)
  const [editLead, setEditLead] = useState<Lead | null>(null)
  const [saving, setSaving] = useState(false)

  const [followupLead, setFollowupLead] = useState<Lead | null>(null)

  const [form, setForm] = useState({
    client_name: '', phone: '', email: '',
    industry: 'Digital Marketing', category: 'Digital Marketing',
    status: 'new', source: 'facebook_lead_ad', notes: '', follow_up_date: '', platform: 'Facebook'
  })

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  const fetchLeads = useCallback(async () => {
    const token = getToken()
    if (!token) { router.push('/login'); return }
    const res = await fetch('/api/leads', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setLeads(data)
    setLoading(false)
  }, [router])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const openCreate = () => {
    setEditLead(null)
    setForm({ client_name: '', phone: '', email: '', industry: 'Digital Marketing', category: 'Digital Marketing', status: 'new', source: 'facebook_lead_ad', notes: '', follow_up_date: '', platform: 'Facebook' })
    setShowModal(true)
  }
  const openEdit = (lead: Lead) => {
    setEditLead(lead)
    setForm({
      client_name: lead.client_name, phone: lead.phone, email: lead.email || '',
      industry: lead.industry || lead.category || 'Digital Marketing',
      category: lead.category || lead.industry || 'Digital Marketing',
      status: lead.status, source: lead.source || 'facebook_lead_ad',
      notes: lead.notes || '', follow_up_date: lead.follow_up_date || '', platform: lead.platform || 'Facebook'
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (!form.client_name || !form.phone) return
    setSaving(true)
    const token = getToken()
    if (editLead) {
      await fetch(`/api/leads/${editLead.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) })
    }
    setShowModal(false)
    fetchLeads()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this lead and all followup history?')) return
    const token = getToken()
    await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchLeads()
  }

  const handleWhatsapp = (lead: Lead) => {
    const msg = `Hello ${lead.client_name}, thank you for your interest in RushiPandit Institute (${lead.industry || 'Digital Marketing'})! Your personal counselling session has been scheduled. Please find our institute location here: https://maps.google.com. Looking forward to meeting you!`
    window.open(`https://api.whatsapp.com/send?phone=${encodeURIComponent(lead.phone)}&text=${encodeURIComponent(msg)}`, '_blank')
  }

  // Computed metrics
  const total = leads.length
  const enrolled = leads.filter(l => l.status === 'closed_won').length
  const pipeline = leads.filter(l => ['interested', 'visit_scheduled', 'busy_callback'].includes(l.status)).length
  const convRate = total > 0 ? Math.round((enrolled / total) * 100) : 0

  const filtered = leads.filter(l => {
    const matchSearch = l.client_name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search) || (l.email || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    const matchIndustry = filterIndustry === 'all' || (l.industry || l.category) === filterIndustry
    return matchSearch && matchStatus && matchIndustry
  })

  const isAdmin = profile.role === 'admin'

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1280px', margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {isAdmin ? 'Leads Pipeline' : 'My Leads'}
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Manage leads, log calls, track qualification responses end-to-end
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={fetchLeads}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid var(--border-default)', background: 'var(--bg-elevated)', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
          <button
            onClick={openCreate}
            style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} /> Add Lead
          </button>
        </div>
      </div>

      {/* ── Metric Bar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Leads', value: total,    color: '#6366f1', icon: <BarChart2 size={16} /> },
          { label: 'Active Pipeline', value: pipeline, color: '#06b6d4', icon: <TrendingUp size={16} /> },
          { label: 'Enrolled',   value: enrolled,  color: '#10b981', icon: <CheckCircle size={16} /> },
          { label: 'Conv. Rate', value: `${convRate}%`, color: '#f59e0b', icon: <Activity size={16} /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} style={{
            padding: '0.875rem 1rem', borderRadius: '12px',
            background: `${color}08`, border: `1px solid ${color}20`,
            display: 'flex', alignItems: 'center', gap: '0.75rem'
          }}>
            <div style={{ width: 34, height: 34, borderRadius: '9px', background: `${color}15`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {icon}
            </div>
            <div>
              <p style={{ fontSize: '1.35rem', fontWeight: 800, color, margin: 0, lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            placeholder="Search by name, phone or email..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', paddingLeft: '34px', padding: '0.5rem 0.75rem 0.5rem 34px',
              borderRadius: '10px', border: '1px solid var(--border-default)',
              background: 'var(--bg-elevated)', color: 'var(--text-primary)',
              fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Filter size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <select
            value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            style={{ paddingLeft: '28px', padding: '0.5rem 0.75rem 0.5rem 28px', borderRadius: '10px', border: '1px solid var(--border-default)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none', minWidth: '160px' }}
          >
            <option value="all">All Statuses</option>
            {STATUS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div style={{ position: 'relative' }}>
          <Layers size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <select
            value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)}
            style={{ paddingLeft: '28px', padding: '0.5rem 0.75rem 0.5rem 28px', borderRadius: '10px', border: '1px solid var(--border-default)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none', minWidth: '160px' }}
          >
            <option value="all">All Courses</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading leads...</span>
        </div>
      ) : (
        <div style={{ borderRadius: '14px', border: '1px solid var(--border-default)', background: 'var(--bg-elevated)', overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <TrendingUp size={36} style={{ opacity: 0.2, margin: '0 auto 0.75rem', display: 'block' }} />
              <p style={{ fontSize: '0.875rem' }}>No leads found</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface)' }}>
                    {[
                      { label: 'Lead', icon: <User size={12} /> },
                      { label: 'Course', icon: <Layers size={12} /> },
                      { label: 'Form Responses', icon: <ClipboardList size={12} /> },
                      { label: 'Status', icon: <CircleDot size={12} /> },
                      { label: 'Followups', icon: <Activity size={12} /> },
                      ...(isAdmin ? [{ label: 'Assigned To', icon: <User size={12} /> }] : []),
                      { label: 'Actions', icon: null },
                    ].map(({ label, icon }) => (
                      <th key={label} style={{
                        padding: '0.625rem 0.75rem', textAlign: 'left',
                        fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
                        borderBottom: '1px solid var(--border-default)'
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          {icon} {label}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(lead => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      isAdmin={isAdmin}
                      onFollowup={() => setFollowupLead(lead)}
                      onEdit={() => openEdit(lead)}
                      onDelete={() => handleDelete(lead.id)}
                      onWhatsapp={() => handleWhatsapp(lead)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filtered.length > 0 && (
            <div style={{ padding: '0.625rem 1rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Showing {filtered.length} of {total} leads
                {search || filterStatus !== 'all' || filterIndustry !== 'all' ? ' (filtered)' : ''}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Followup Side Panel ── */}
      {followupLead && (
        <FollowupPanel
          lead={followupLead}
          onClose={() => setFollowupLead(null)}
          onSaved={fetchLeads}
        />
      )}

      {/* ── Create / Edit Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 998, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: 'var(--bg-elevated)', borderRadius: '16px', width: '100%', maxWidth: '560px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>{editLead ? 'Edit Lead' : 'Add New Lead'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', borderRadius: '8px' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                  <input value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} placeholder="Lead full name" style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Phone *</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="lead@email.com" style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Course / Industry</label>
                  <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value, category: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Call Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}>
                    {STATUS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Source</label>
                  <select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}>
                    {SOURCES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Follow-up Date</label>
                  <input type="date" value={form.follow_up_date} onChange={e => setForm({ ...form, follow_up_date: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Internal Notes</label>
                <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Internal notes about this lead..." style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-default)', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '9px', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSubmit} disabled={saving || !form.client_name || !form.phone} style={{ padding: '0.5rem 1.25rem', borderRadius: '9px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', opacity: saving ? 0.7 : 1 }}>
                {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                {editLead ? 'Update Lead' : 'Create Lead'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }`}</style>
    </div>
  )
}
