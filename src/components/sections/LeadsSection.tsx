'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import {
  Plus, Search, X, Loader2, Phone, Mail, Edit2, Trash2,
  MessageSquare, PhoneCall, Clock, ChevronDown, ChevronRight,
  User, Layers, CircleDot, TrendingUp, CheckCircle, XCircle,
  PhoneOff, PhoneMissed, Voicemail, Zap, Calendar, Activity,
  BarChart2, Filter, ClipboardList, Send, RefreshCw, CalendarDays
} from 'lucide-react'

interface Props { profile: Profile }

interface Lead {
  id: string
  client_name: string
  name?: string
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
const SOURCES = ['facebook_lead_ad', 'instagram_lead_ad', 'walk_in', 'referral', 'social_media', 'website', 'cold_call', 'other']

// ─── 10 Call Status Definitions ──────────────────────────────────────────
const STATUS_CONFIG: {
  id: string; label: string; color: string; bg: string;
  icon: React.ReactNode; group: 'active' | 'hot' | 'closed'
}[] = [
  { id: 'new',             label: 'New Lead',          color: '#4f46e5', bg: 'rgba(79,70,229,0.1)',  icon: <CircleDot size={12} />,   group: 'active' },
  { id: 'ringing',         label: 'Ringing',           color: '#d97706', bg: 'rgba(217,119,6,0.1)',  icon: <Phone size={12} />,       group: 'active' },
  { id: 'not_connected',   label: 'Not Connected',     color: '#dc2626', bg: 'rgba(220,38,38,0.1)',  icon: <PhoneOff size={12} />,    group: 'active' },
  { id: 'switched_off',    label: 'Switched Off',      color: '#475569', bg: 'rgba(71,85,105,0.1)', icon: <PhoneMissed size={12} />, group: 'active' },
  { id: 'not_logical',     label: 'Not Logical',       color: '#64748b', bg: 'rgba(100,116,139,0.1)', icon: <XCircle size={12} />,     group: 'closed' },
  { id: 'busy_callback',   label: 'Busy / Callback',   color: '#7c3aed', bg: 'rgba(124,58,237,0.1)',  icon: <Voicemail size={12} />,   group: 'active' },
  { id: 'interested',      label: 'Interested',        color: '#0284c7', bg: 'rgba(2,132,199,0.1)',   icon: <Zap size={12} />,         group: 'hot'    },
  { id: 'visit_scheduled', label: 'Visit Scheduled',   color: '#db2777', bg: 'rgba(219,39,119,0.1)',  icon: <Calendar size={12} />,    group: 'hot'    },
  { id: 'closed_won',      label: 'Enrolled',          color: '#16a34a', bg: 'rgba(22,163,74,0.1)',  icon: <CheckCircle size={12} />, group: 'closed' },
  { id: 'closed_lost',     label: 'Lost',              color: '#b91c1c', bg: 'rgba(185,28,28,0.1)',   icon: <XCircle size={12} />,     group: 'closed' },
]

const statusMap = STATUS_CONFIG.reduce((a, s) => ({ ...a, [s.id]: s }), {} as Record<string, typeof STATUS_CONFIG[0]>)

// ─── Platform Brand Badges (FB / IG / WEB) ─────────────────────────────────
function PlatformBadge({ platform }: { platform?: string | null }) {
  const p = (platform || 'Facebook').toLowerCase()

  if (p.includes('fb') || p.includes('facebook')) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        padding: '3px 8px', borderRadius: '6px',
        background: 'rgba(24, 119, 242, 0.12)', color: '#1877F2',
        border: '1px solid rgba(24, 119, 242, 0.35)',
        fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em'
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        FB
      </span>
    )
  }

  if (p.includes('ig') || p.includes('instagram')) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        padding: '3px 8px', borderRadius: '6px',
        background: 'rgba(228, 64, 95, 0.12)', color: '#E4405F',
        border: '1px solid rgba(228, 64, 95, 0.35)',
        fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em'
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        IG
      </span>
    )
  }

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 8px', borderRadius: '6px',
      background: 'var(--bg-surface)', color: 'var(--text-secondary)',
      border: '1px solid var(--border-default)',
      fontSize: '0.72rem', fontWeight: 800
    }}>
      {platform?.toUpperCase() || 'WEB'}
    </span>
  )
}

// ─── Inline Quick Status Selector ──────────────────────────────────────────
function InlineStatusSelector({
  currentStatus,
  onSelect
}: {
  currentStatus: string
  onSelect: (status: string) => void
}) {
  const cfg = statusMap[currentStatus] || { label: currentStatus, color: 'var(--text-primary)', bg: 'var(--bg-surface)', icon: <CircleDot size={12} /> }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={currentStatus}
        onChange={e => onSelect(e.target.value)}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          padding: '4px 22px 4px 10px',
          borderRadius: '99px',
          background: 'var(--bg-surface)',
          color: cfg.color,
          fontSize: '0.75rem',
          fontWeight: 700,
          border: '1px solid var(--border-default)',
          cursor: 'pointer',
          outline: 'none',
          textAlign: 'left'
        }}
      >
        {STATUS_CONFIG.map(s => (
          <option key={s.id} value={s.id} style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
            {s.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={11}
        style={{ position: 'absolute', right: '7px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}
      />
    </div>
  )
}

// ─── Dynamic Questionnaire Answers Panel ───────────────────────────────────
function QualificationPanel({ answers }: { answers: Record<string, any> }) {
  const entries = Object.entries(answers)
  if (entries.length === 0) return null
  return (
    <div style={{
      borderRadius: '10px', border: '1px solid var(--border-default)',
      background: 'var(--bg-surface)', overflow: 'hidden', marginTop: '6px'
    }}>
      <div style={{
        padding: '0.625rem 0.875rem', background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex', alignItems: 'center', gap: '0.5rem'
      }}>
        <ClipboardList size={13} style={{ color: 'var(--brand-primary)' }} />
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Form Responses & Qualification Answers
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          {entries.length} field{entries.length !== 1 ? 's' : ''} captured
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {entries.map(([key, val]) => (
          <div key={key} style={{
            padding: '0.625rem 0.875rem',
            borderRight: '1px solid var(--border-default)',
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-card)'
          }}>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
              {key}
            </p>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '3px 0 0', wordBreak: 'break-word' }}>
              {String(val) || '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Lead Table Row ────────────────────────────────────────────────────────
function LeadRow({
  lead, isAdmin,
  onFollowup, onEdit, onDelete, onWhatsapp, onStatusChange
}: {
  lead: Lead; isAdmin: boolean
  onFollowup: () => void; onEdit: () => void
  onDelete: () => void; onWhatsapp: () => void
  onStatusChange: (newStatus: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const qual = lead.qualification_answers || {}
  const qualCount = Object.keys(qual).length
  const industry = lead.industry || lead.category || '—'
  const cfg = statusMap[lead.status] || statusMap['new']

  return (
    <>
      <tr style={{ borderTop: '1px solid var(--border-default)', transition: 'background 0.1s' }}>
        {/* 1. Lead Identity & Contact */}
        <td style={{ padding: '0.875rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'var(--bg-surface)', color: 'var(--text-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, border: '1px solid var(--border-default)'
            }}>
              {(lead.client_name || lead.name || 'L').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap' }}>
                {lead.client_name || lead.name}
              </p>
              <div style={{ display: 'flex', gap: '0.625rem', marginTop: '3px', flexWrap: 'wrap' }}>
                <a href={`tel:${lead.phone}`} style={{
                  fontSize: '0.78rem', color: '#4f46e5', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700
                }}>
                  <Phone size={11} /> {lead.phone}
                </a>
                {lead.email && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Mail size={10} /> {lead.email}
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>

        {/* 2. Platform (FB / IG / WEB) */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          <PlatformBadge platform={lead.platform || lead.source} />
        </td>

        {/* 3. Inbound Date & Time */}
        <td style={{ padding: '0.875rem 0.75rem', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {formatDate(lead.created_at, 'dd MMM yyyy')}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
              <Clock size={10} /> {formatDate(lead.created_at, 'hh:mm a')}
            </span>
          </div>
        </td>

        {/* 4. Course / Industry */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '0.75rem', fontWeight: 700, padding: '3px 9px',
            borderRadius: '6px', background: 'var(--bg-surface)', color: 'var(--text-primary)',
            border: '1px solid var(--border-default)', whiteSpace: 'nowrap'
          }}>
            <Layers size={11} /> {industry}
          </span>
        </td>

        {/* 5. Dynamic Form Responses */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          {qualCount === 0 ? (
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Standard Form</span>
          ) : (
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px',
                borderRadius: '6px', background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7',
                border: '1px solid rgba(2, 132, 199, 0.35)', cursor: 'pointer'
              }}
            >
              <ClipboardList size={11} />
              {qualCount} response{qualCount !== 1 ? 's' : ''}
              <ChevronRight size={11} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          )}
        </td>

        {/* 6. Call Status Dropdown */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          <InlineStatusSelector
            currentStatus={lead.status}
            onSelect={onStatusChange}
          />
        </td>

        {/* 7. Followups */}
        <td style={{ padding: '0.875rem 0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 700 }}>
            <Activity size={12} color="var(--text-muted)" />
            {lead.followup_count || 0}
          </div>
          {lead.next_followup_at && (
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
              <Clock size={9} /> {formatDate(lead.next_followup_at, 'dd MMM, hh:mm a')}
            </div>
          )}
        </td>

        {/* 8. Assigned To (Admin only) */}
        {isAdmin && (
          <td style={{ padding: '0.875rem 0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {lead.assigned_to_profile?.full_name || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Unassigned</span>}
            </span>
          </td>
        )}

        {/* 9. Actions */}
        <td style={{ padding: '0.875rem 1rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
            <button
              onClick={onFollowup}
              title="Log Followup"
              className="btn btn-secondary btn-sm"
              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
            >
              <PhoneCall size={12} /> Call
            </button>
            <button
              onClick={onWhatsapp}
              title="Send WhatsApp Message"
              style={{
                padding: '5px 8px', borderRadius: '7px', border: '1px solid #16a34a', cursor: 'pointer',
                background: 'rgba(22,163,74,0.1)', color: '#16a34a', display: 'flex', alignItems: 'center'
              }}
            >
              <MessageSquare size={13} />
            </button>
            <button
              onClick={onEdit}
              title="Edit Lead"
              className="btn btn-ghost btn-sm"
              style={{ padding: '5px 8px' }}
            >
              <Edit2 size={13} />
            </button>
            {isAdmin && (
              <button
                onClick={onDelete}
                title="Delete Lead"
                className="btn btn-danger btn-sm"
                style={{ padding: '5px 8px' }}
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Expandable row for dynamic questionnaire */}
      {expanded && qualCount > 0 && (
        <tr>
          <td colSpan={isAdmin ? 9 : 8} style={{ padding: '0 1rem 0.875rem', background: 'var(--bg-surface)' }}>
            <QualificationPanel answers={qual} />
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Followup Slide-Over Drawer ────────────────────────────────────────────
function FollowupPanel({
  lead,
  onClose,
  onSaved
}: {
  lead: Lead
  onClose: () => void
  onSaved: (newStatus: string) => void
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
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [lead.id])

  const handleSave = async () => {
    setSaving(true)
    const token = getToken()
    try {
      const res = await fetch(`/api/leads/${lead.id}/followups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ call_status: callStatus, notes, scheduled_at: scheduledAt || null })
      })

      if (res.ok) {
        setNotes('')
        setScheduledAt('')
        const updated = await fetch(`/api/leads/${lead.id}/followups`, { headers: { Authorization: `Bearer ${token}` } })
        const d = await updated.json()
        if (Array.isArray(d)) setHistory(d)
        onSaved(callStatus)
      } else {
        const err = await res.json().catch(() => ({}))
        alert('Error saving status: ' + (err.error || 'Server error'))
      }
    } catch (err: any) {
      alert('Failed to connect: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const qual = lead.qualification_answers || {}
  const qualEntries = Object.entries(qual)
  const currentCfg = statusMap[lead.status] || statusMap['new']

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', justifyContent: 'flex-end'
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%', maxWidth: '540px', height: '100%',
          background: 'var(--bg-elevated)', display: 'flex', flexDirection: 'column',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
          borderLeft: '1px solid var(--border-default)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem'
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
            background: 'var(--bg-surface)', color: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, border: '1px solid var(--border-default)'
          }}>
            {(lead.client_name || lead.name || 'L').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
                {lead.client_name || lead.name}
              </h3>
              <PlatformBadge platform={lead.platform || lead.source} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Phone size={11} /> {lead.phone}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} /> {formatDate(lead.created_at, 'dd MMM, hh:mm a')}
              </span>
            </div>
            <div style={{ marginTop: '6px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '3px 10px', borderRadius: '99px',
                background: currentCfg.bg, color: currentCfg.color,
                fontSize: '0.72rem', fontWeight: 700,
                border: `1px solid ${currentCfg.color}35`
              }}>
                {currentCfg.icon} {currentCfg.label}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Dynamic Questionnaire Responses */}
          {qualEntries.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                <ClipboardList size={14} style={{ color: 'var(--brand-primary)' }} />
                <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Form Responses & Survey Data
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
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{key}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'right' }}>{String(val) || '—'}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Log New Followup Action */}
          <section style={{ borderRadius: '12px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
            <div style={{
              padding: '0.75rem 1rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              <PhoneCall size={14} style={{ color: 'var(--brand-primary)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Update Call Status (Followup #{(lead.followup_count || 0) + 1})
              </span>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Select Call Status
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {STATUS_CONFIG.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setCallStatus(s.id)}
                      style={{
                        padding: '7px 10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                        border: `1px solid ${callStatus === s.id ? s.color : 'var(--border-default)'}`,
                        background: callStatus === s.id ? s.bg : 'transparent',
                        display: 'flex', alignItems: 'center', gap: '6px',
                        color: callStatus === s.id ? s.color : 'var(--text-secondary)',
                        fontSize: '0.75rem', fontWeight: callStatus === s.id ? 700 : 500,
                        transition: 'all 0.15s'
                      }}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Followup Notes / Remarks
                </label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Enter customer response, student needs, objections..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Schedule Next Followup Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={e => setScheduledAt(e.target.value)}
                  className="form-input"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
                Save Outcome & Update Status
              </button>
            </div>
          </section>

          {/* Followup History Timeline */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Activity size={14} color="var(--text-muted)" />
              <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Followup History Timeline
              </h4>
              {history.length > 0 && (
                <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {history.length} call{history.length !== 1 ? 's' : ''} logged
                </span>
              )}
            </div>

            {loading ? (
              <div style={{ height: '80px', borderRadius: '10px', background: 'var(--bg-surface)' }} />
            ) : history.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '10px', border: '1px dashed var(--border-default)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No followups recorded yet
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {history.map((item, idx) => {
                  const s = statusMap[item.call_status] || { color: 'var(--text-primary)', bg: 'var(--bg-surface)', label: item.call_status, icon: <CircleDot size={12} /> }
                  return (
                    <div key={item.id} style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
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
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: s.bg, color: s.color, border: `1px solid ${s.color}35` }}>
                            {s.label}
                          </span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                            {formatDate(item.completed_at, 'dd MMM, hh:mm a')}
                          </span>
                        </div>
                        {item.notes && (
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', margin: '4px 0 0', lineHeight: '1.5' }}>{item.notes}</p>
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

// ─── Main LeadsSection Component ──────────────────────────────────────────
export default function LeadsSection({ profile }: Props) {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | 'week' | 'month' | 'custom'>('all')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')

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
    if (!token) { router.push('/'); return }
    try {
      const res = await fetch('/api/leads', { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (Array.isArray(data)) setLeads(data)
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  // Direct quick status change handler
  const handleQuickStatusChange = async (leadId: string, newStatus: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))

    const token = getToken()
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      })
      if (!res.ok) {
        fetchLeads()
      }
    } catch (err) {
      fetchLeads()
    }
  }

  const openCreate = () => {
    setEditLead(null)
    setForm({ client_name: '', phone: '', email: '', industry: 'Digital Marketing', category: 'Digital Marketing', status: 'new', source: 'facebook_lead_ad', notes: '', follow_up_date: '', platform: 'Facebook' })
    setShowModal(true)
  }

  const openEdit = (lead: Lead) => {
    setEditLead(lead)
    setForm({
      client_name: lead.client_name || lead.name || '',
      phone: lead.phone,
      email: lead.email || '',
      industry: lead.industry || lead.category || 'Digital Marketing',
      category: lead.category || lead.industry || 'Digital Marketing',
      status: lead.status,
      source: lead.source || 'facebook_lead_ad',
      notes: lead.notes || '',
      follow_up_date: lead.follow_up_date || '',
      platform: lead.platform || 'Facebook'
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (!form.client_name || !form.phone) return
    setSaving(true)
    const token = getToken()
    try {
      if (editLead) {
        // Optimistic UI update
        setLeads(prev => prev.map(l => l.id === editLead.id ? { ...l, ...form, name: form.client_name } : l))
        await fetch(`/api/leads/${editLead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(form)
        })
      } else {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(form)
        })
      }
      setShowModal(false)
      fetchLeads()
    } catch (err: any) {
      alert('Error saving lead: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this lead and its followup records?')) return
    const token = getToken()
    await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchLeads()
  }

  const handleWhatsapp = (lead: Lead) => {
    const name = lead.client_name || lead.name || 'Student'
    const msg = `Hello ${name}, thank you for contacting RushiPandit Institute for our ${lead.industry || 'Digital Marketing'} program! How can we assist you with your career goals?`
    window.open(`https://api.whatsapp.com/send?phone=${encodeURIComponent(lead.phone)}&text=${encodeURIComponent(msg)}`, '_blank')
  }

  // Filter leads with Date & Multi-attribute filtering
  const filtered = useMemo(() => {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const yesterdayStart = todayStart - 86400000
    const weekStart = todayStart - 7 * 86400000
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime()

    return leads.filter(l => {
      const nameToMatch = (l.client_name || l.name || '').toLowerCase()
      const matchSearch = nameToMatch.includes(search.toLowerCase()) || l.phone.includes(search) || (l.email || '').toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'all' || l.status === filterStatus
      const matchIndustry = filterIndustry === 'all' || (l.industry || l.category) === filterIndustry
      
      const p = (l.platform || l.source || '').toLowerCase()
      let matchPlatform = true
      if (filterPlatform === 'fb') matchPlatform = p.includes('fb') || p.includes('facebook')
      else if (filterPlatform === 'ig') matchPlatform = p.includes('ig') || p.includes('instagram')
      else if (filterPlatform === 'web') matchPlatform = p.includes('web') || p.includes('site')

      // Date Filtering
      const leadTime = new Date(l.created_at).getTime()
      let matchDate = true
      if (dateFilter === 'today') {
        matchDate = leadTime >= todayStart
      } else if (dateFilter === 'yesterday') {
        matchDate = leadTime >= yesterdayStart && leadTime < todayStart
      } else if (dateFilter === 'week') {
        matchDate = leadTime >= weekStart
      } else if (dateFilter === 'month') {
        matchDate = leadTime >= monthStart
      } else if (dateFilter === 'custom') {
        if (customStartDate) {
          matchDate = matchDate && leadTime >= new Date(customStartDate).getTime()
        }
        if (customEndDate) {
          const endD = new Date(customEndDate)
          endD.setHours(23, 59, 59, 999)
          matchDate = matchDate && leadTime <= endD.getTime()
        }
      }

      return matchSearch && matchStatus && matchIndustry && matchPlatform && matchDate
    })
  }, [leads, search, filterStatus, filterIndustry, filterPlatform, dateFilter, customStartDate, customEndDate])

  // Computed metrics
  const total = leads.length
  const enrolled = leads.filter(l => l.status === 'closed_won').length
  const pipeline = leads.filter(l => ['interested', 'visit_scheduled', 'busy_callback'].includes(l.status)).length
  const convRate = total > 0 ? Math.round((enrolled / total) * 100) : 0

  const isAdmin = profile.role === 'admin'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Header ── */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            {isAdmin ? 'Inbound Leads & Pipeline' : 'My Assigned Leads'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Real-time lead capture, dynamic questionnaire answers, and segregated date follow-up tracking
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.625rem' }}>
          <button
            onClick={fetchLeads}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={13} /> Refresh
          </button>
          <button
            onClick={openCreate}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} /> Add Lead
          </button>
        </div>
      </div>

      {/* ── Metric Summary Bar ── */}
      <div className="grid-4" style={{ gap: '1rem' }}>
        {[
          { label: 'Total Inbound Leads', value: total,    color: '#4f46e5', icon: <BarChart2 size={16} /> },
          { label: 'Active Pipeline',     value: pipeline, color: '#0284c7', icon: <TrendingUp size={16} /> },
          { label: 'Enrolled (Won)',      value: enrolled,  color: '#16a34a', icon: <CheckCircle size={16} /> },
          { label: 'Conversion Rate',     value: `${convRate}%`, color: '#d97706', icon: <Activity size={16} /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="stat-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
              </span>
              <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'var(--bg-surface)', color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-default)' }}>
                {icon}
              </div>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color, lineHeight: 1 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Date Segregation & Quick Filter Pills ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.25rem' }}>
          <CalendarDays size={13} style={{ color: 'var(--brand-primary)' }} /> Filter Date:
        </span>

        {[
          { id: 'all', label: 'All Dates' },
          { id: 'today', label: 'Today' },
          { id: 'yesterday', label: 'Yesterday' },
          { id: 'week', label: 'Last 7 Days' },
          { id: 'month', label: 'This Month' },
          { id: 'custom', label: 'Custom Range' },
        ].map(pill => (
          <button
            key={pill.id}
            onClick={() => setDateFilter(pill.id as any)}
            style={{
              padding: '4px 12px', borderRadius: '8px', cursor: 'pointer',
              border: dateFilter === pill.id ? '1px solid var(--brand-primary)' : '1px solid var(--border-default)',
              background: dateFilter === pill.id ? 'var(--bg-surface)' : 'transparent',
              color: dateFilter === pill.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '0.75rem', fontWeight: dateFilter === pill.id ? 800 : 500,
              transition: 'all 0.15s'
            }}
          >
            {pill.label}
          </button>
        ))}

        {/* Custom date range picker if 'custom' is selected */}
        {dateFilter === 'custom' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
            <input
              type="date"
              value={customStartDate}
              onChange={e => setCustomStartDate(e.target.value)}
              className="form-input"
              style={{ height: '30px', fontSize: '0.75rem', padding: '2px 8px', width: 'auto' }}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>to</span>
            <input
              type="date"
              value={customEndDate}
              onChange={e => setCustomEndDate(e.target.value)}
              className="form-input"
              style={{ height: '30px', fontSize: '0.75rem', padding: '2px 8px', width: 'auto' }}
            />
          </div>
        )}
      </div>

      {/* ── Search & Filter Controls ── */}
      <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            placeholder="Search by student name, phone or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '34px', height: '36px', fontSize: '0.82rem' }}
          />
        </div>

        {/* Platform Filter (All / FB / IG) */}
        <div style={{ position: 'relative' }}>
          <select
            value={filterPlatform}
            onChange={e => setFilterPlatform(e.target.value)}
            className="form-select"
            style={{ height: '36px', fontSize: '0.82rem', minWidth: '130px' }}
          >
            <option value="all">All Sources</option>
            <option value="fb">FB (Facebook)</option>
            <option value="ig">IG (Instagram)</option>
            <option value="web">Website</option>
          </select>
        </div>

        {/* Call Status Filter */}
        <div style={{ position: 'relative' }}>
          <Filter size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="form-select"
            style={{ paddingLeft: '28px', height: '36px', fontSize: '0.82rem', minWidth: '150px' }}
          >
            <option value="all">All Statuses</option>
            {STATUS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        {/* Industry / Course Filter */}
        <div style={{ position: 'relative' }}>
          <Layers size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <select
            value={filterIndustry}
            onChange={e => setFilterIndustry(e.target.value)}
            className="form-select"
            style={{ paddingLeft: '28px', height: '36px', fontSize: '0.82rem', minWidth: '150px' }}
          >
            <option value="all">All Courses</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      {/* ── Leads Data Table ── */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading leads...</span>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <TrendingUp size={24} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {total === 0 ? 'No leads received yet' : 'No leads match your filter criteria'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Lead Name & Contact</th>
                    <th>Source</th>
                    <th>Date & Time</th>
                    <th>Program</th>
                    <th>Form Responses</th>
                    <th>Call Status</th>
                    <th>Followups</th>
                    {isAdmin && <th>Assigned To</th>}
                    <th>Actions</th>
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
                      onStatusChange={(newStatus) => handleQuickStatusChange(lead.id, newStatus)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filtered.length > 0 && (
            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Showing {filtered.length} of {total} total leads ({dateFilter === 'all' ? 'All Dates' : dateFilter.toUpperCase()})
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Followup Slide-Over Drawer ── */}
      {followupLead && (
        <FollowupPanel
          lead={followupLead}
          onClose={() => setFollowupLead(null)}
          onSaved={(newStatus) => {
            setFollowupLead(prev => prev ? { ...prev, status: newStatus } : null)
            fetchLeads()
          }}
        />
      )}

      {/* ── Create / Edit Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', margin: 0, color: 'var(--text-primary)' }}>
                {editLead ? 'Edit Lead Details' : 'Add Inbound Lead'}
              </h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    className="form-input"
                    value={form.client_name}
                    onChange={e => setForm({ ...form, client_name: e.target.value })}
                    placeholder="Candidate name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    className="form-input"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="candidate@email.com"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Program / Course</label>
                  <select
                    className="form-select"
                    value={form.industry}
                    onChange={e => setForm({ ...form, industry: e.target.value, category: e.target.value })}
                  >
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Call Status</label>
                  <select
                    className="form-select"
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                  >
                    {STATUS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Lead Platform</label>
                  <select
                    className="form-select"
                    value={form.platform}
                    onChange={e => setForm({ ...form, platform: e.target.value, source: e.target.value })}
                  >
                    <option value="Facebook">FB (Facebook)</option>
                    <option value="Instagram">IG (Instagram)</option>
                    <option value="Website">Website</option>
                    <option value="Walk In">Walk In</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Follow-up Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={form.follow_up_date}
                    onChange={e => setForm({ ...form, follow_up_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Internal Notes</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Internal remarks regarding this student..."
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || !form.client_name || !form.phone}
                className="btn btn-primary"
              >
                {saving && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {editLead ? 'Update Lead' : 'Create Lead'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
