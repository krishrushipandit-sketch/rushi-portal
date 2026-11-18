'use client'

import { Fragment, useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import { useTheme } from '@/lib/ThemeContext'
import {
  Plus, X, Loader2, Phone, Edit2, Trash2, PhoneCall, ChevronDown, ChevronRight,
  CircleDot, TrendingUp, CheckCircle, XCircle, PhoneMissed, Voicemail, Zap, Calendar,
  BarChart2, Send, RefreshCw, CalendarDays, BellRing, CalendarClock,
  CalendarCheck, Check, MapPinCheck, GraduationCap, Search, StickyNote, ClipboardList,
} from 'lucide-react'
import KpiCard from '@/components/ui/KpiCard'
import PageHeader from '@/components/ui/PageHeader'
import GlowButton from '@/components/ui/GlowButton'
import Reveal from '@/components/ui/Reveal'
import Avatar from '@/components/ui/Avatar'
import Pill from '@/components/ui/Pill'
import SidePanel, { KeyValues, PanelSection } from '@/components/ui/SidePanel'

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
  qualification_answers?: Record<string, unknown> | null
  followup_count?: number
  last_followup_at?: string | null
  next_followup_at?: string | null
  created_at: string
  assigned_to_profile?: { id: string; full_name: string; email?: string; avatar_url?: string | null }
  whatsapp_ringing_sent?: boolean | null
  whatsapp_msg_status?: string | null
  visit_done_at?: string | null
  wa_last?: WaEvent | null
  _waPending?: boolean
}

interface WaEvent {
  id?: string
  kind: 'status' | 'visit_reminder' | 'workshop_reminder'
  detail: string | null
  status: 'sent' | 'failed'
  error: string | null
  at?: string
  created_at?: string
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
const WHATSAPP_STATUSES = ['ringing', 'callback', 'busy_callback', 'switched_off', 'busy', 'not_connected']
const CLOSED = ['closed_won', 'closed_lost']

const STATUS_CONFIG: { id: string; label: string; color: string; icon: React.ReactNode; requiresDate?: boolean }[] = [
  { id: 'new',                  label: 'New Lead',             color: '#7c83ff', icon: <CircleDot size={13} /> },
  { id: 'ringing',              label: 'Ringing',              color: '#f5a524', icon: <Phone size={13} /> },
  { id: 'connected',            label: 'Connected',            color: '#22b8cf', icon: <PhoneCall size={13} /> },
  { id: 'callback',             label: 'Call Back',            color: '#9b6dff', icon: <Voicemail size={13} />, requiresDate: true },
  { id: 'follow_up',            label: 'Follow Up',            color: '#f59f00', icon: <CalendarClock size={13} />, requiresDate: true },
  { id: 'interested',           label: 'Interested',           color: '#2f9bff', icon: <Zap size={13} /> },
  { id: 'switched_off',         label: 'Switch Off',           color: '#8592a3', icon: <PhoneMissed size={13} /> },
  { id: 'not_interested',       label: 'Not Interested',       color: '#ef4757', icon: <XCircle size={13} /> },
  { id: 'visit_scheduled',      label: 'Visit Schedule',       color: '#e8509a', icon: <CalendarCheck size={13} />, requiresDate: true },
  { id: 'visit_done',           label: 'Visit Done',           color: '#14b8a0', icon: <MapPinCheck size={13} /> },
  { id: 'ai_workshop_saturday', label: 'AI Workshop Saturday', color: '#8b5cf6', icon: <BellRing size={13} /> },
  { id: 'closed_won',           label: 'Enrolled',             color: '#22c55e', icon: <CheckCircle size={13} /> },
]

const statusMap: Record<string, typeof STATUS_CONFIG[number]> = Object.fromEntries(STATUS_CONFIG.map(s => [s.id, s]))
const statusOf = (id: string) => statusMap[id] ?? { id, label: id.replace(/_/g, ' '), color: '#8592a3', icon: <CircleDot size={13} /> }
const leadName = (l: Lead) => l.client_name || l.name || 'Lead'

function platformKey(platform?: string | null): 'fb' | 'ig' | 'web' {
  const p = (platform || 'Facebook').toLowerCase()
  if (p.includes('ig') || p.includes('instagram')) return 'ig'
  if (p.includes('fb') || p.includes('facebook')) return 'fb'
  return 'web'
}

function PlatformBadge({ platform, full }: { platform?: string | null; full?: boolean }) {
  const k = platformKey(platform)
  if (k === 'fb') return <Pill color="#1877F2">{full ? 'Facebook' : 'FB'}</Pill>
  if (k === 'ig') return <Pill color="#E4405F">{full ? 'Instagram' : 'IG'}</Pill>
  const label = (platform || 'Website').replace(/_/g, ' ')
  return <Pill color="var(--text-secondary)">{label.charAt(0).toUpperCase() + label.slice(1, 16)}</Pill>
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// Meta lead-form answers arrive as raw keys/values (e.g. "where_do_you_live": "start_freelancing")
const humanize = (v: unknown) => {
  const raw = v !== null && typeof v === 'object' ? (Array.isArray(v) ? v.join(', ') : JSON.stringify(v)) : String(v ?? '')
  const t = raw.replace(/_/g, ' ').trim()
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : '—'
}
const formAnswers = (l: Lead) => Object.entries(l.qualification_answers || {}).filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== '')

function FormAnswers({ lead }: { lead: Lead }) {
  const entries = formAnswers(lead)
  if (!entries.length) return <div className="empty-inline">Standard form — no extra questions answered</div>
  return (
    <dl className="form-answers">
      {entries.map(([k, v]) => (
        <div key={k}><dt>{humanize(k)}</dt><dd>{humanize(v)}</dd></div>
      ))}
    </dl>
  )
}

// AiSensy error text → short reason the sales team can act on
function waReason(error?: string | null): string {
  const e = (error || '').toLowerCase()
  if (/credit|balance|insufficient|wallet|recharge/.test(e)) return 'Credits exhausted'
  if (/invalid phone|invalid number|destination|not a valid|whatsapp number/.test(e)) return 'Invalid number'
  if (/campaign|template/.test(e)) return 'Template issue'
  if (/api ?key|unauthori|forbidden/.test(e)) return 'API key issue'
  if (/opt.?out|block/.test(e)) return 'Number opted out'
  return error ? error.slice(0, 40) : 'Not delivered'
}

function waLabel(ev: Pick<WaEvent, 'kind' | 'detail'>): string {
  const window = ev.detail === 'today' ? 'today' : ev.detail ? ev.detail.replace('hr', 'h') : ''
  if (ev.kind === 'visit_reminder') return `Visit reminder${window ? ` · ${window}` : ''}`
  if (ev.kind === 'workshop_reminder') return `Workshop reminder${window ? ` · ${window}` : ''}`
  return 'WhatsApp'
}

function waTag(lead: Lead): { color: string; label: string; title: string; failed?: boolean; pending?: boolean } | null {
  if (lead._waPending) return { color: '#f5a524', label: 'WhatsApp sending…', title: 'Waiting for AiSensy to confirm delivery', pending: true }
  const ev = lead.wa_last
  if (ev) {
    const when = ev.at || ev.created_at
    const at = when ? formatDate(when, 'dd MMM, hh:mm a') : ''
    if (ev.status === 'failed') {
      return { color: '#ef4757', label: `${waLabel(ev)} failed · ${waReason(ev.error)}`, title: `${ev.error || 'Failed'}${at ? ` — ${at}` : ''}`, failed: true }
    }
    return { color: '#22c55e', label: `${waLabel(ev)} sent`, title: `Delivered to AiSensy${ev.detail && ev.kind === 'status' ? ` (status: ${ev.detail})` : ''}${at ? ` — ${at}` : ''}` }
  }
  // Leads messaged before the delivery log existed
  if (lead.whatsapp_msg_status?.startsWith('aisensy_error')) {
    const err = lead.whatsapp_msg_status.replace(/^aisensy_error:\s*/, '')
    return { color: '#ef4757', label: `WhatsApp failed · ${waReason(err)}`, title: err, failed: true }
  }
  if (lead.whatsapp_ringing_sent || lead.whatsapp_msg_status === 'aisensy_ringing_sent') {
    return { color: '#22c55e', label: 'WhatsApp sent', title: 'Status message delivered to AiSensy' }
  }
  return null
}

function WhatsAppTag({ lead }: { lead: Lead }) {
  const t = waTag(lead)
  if (!t) return null
  return (
    <span className={`wa-tag ${t.pending ? 'pending' : ''}`} style={{ '--tone': t.color } as React.CSSProperties} title={t.title}>
      {t.pending ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : t.failed ? <XCircle size={11} /> : <WhatsAppIcon size={11} />}
      <span className="truncate-1">{t.label}</span>
    </span>
  )
}

function StatusSelect({ value, onChange }: { value: string; onChange: (s: string) => void }) {
  const cfg = statusOf(value)
  return (
    <div className="status-select" style={{ '--tone': cfg.color } as React.CSSProperties} onClick={e => e.stopPropagation()}>
      <select value={value} onChange={e => onChange(e.target.value)} aria-label="Change call status">
        {!statusMap[value] && <option value={value}>{cfg.label}</option>}
        {STATUS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
      <ChevronDown size={12} />
    </div>
  )
}

function followupInfo(lead: Lead, todayStart: number) {
  const d = lead.next_followup_at || lead.follow_up_date
  if (!d) return null
  const t = new Date(d).getTime()
  const closed = CLOSED.includes(lead.status)
  return {
    date: d,
    overdue: t < todayStart && !closed,
    today: t >= todayStart && t < todayStart + 86400000,
  }
}

const toLocalInput = (iso?: string | null) => {
  if (!iso) return ''
  const d = new Date(iso)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

// ─── Lead detail panel ────────────────────────────────────────────────────
function LeadPanel({ lead, isAdmin, onClose, onSaved, onEdit, onDelete }: {
  lead: Lead
  isAdmin: boolean
  onClose: () => void
  onSaved: (updated: Partial<Lead> & { id?: string }, whatsappQueued?: boolean) => void
  onEdit: () => void
  onDelete: () => void
}) {
  const { theme } = useTheme()
  const [history, setHistory] = useState<FollowupRecord[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [callStatus, setCallStatus] = useState(lead.status || 'new')
  const [notes, setNotes] = useState(lead.notes || '')
  const [scheduledAt, setScheduledAt] = useState(toLocalInput(lead.next_followup_at || lead.follow_up_date))
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [waHistory, setWaHistory] = useState<WaEvent[] | null>(null)
  const [resending, setResending] = useState(false)

  const token = () => localStorage.getItem('rushi_token') || ''

  const loadWhatsApp = useCallback(() => {
    fetch(`/api/leads/${lead.id}/whatsapp`, { headers: { Authorization: `Bearer ${localStorage.getItem('rushi_token') || ''}` } })
      .then(r => r.json())
      .then(d => setWaHistory(Array.isArray(d) ? d : []))
      .catch(() => setWaHistory([]))
  }, [lead.id])

  const waStamp = lead.wa_last?.at || lead.wa_last?.created_at || ''
  useEffect(() => { loadWhatsApp() }, [loadWhatsApp, waStamp])

  const resendWhatsApp = async () => {
    setResending(true)
    try {
      await fetch(`/api/leads/${lead.id}/aisensy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({}),
      })
      loadWhatsApp()
      onSaved({ id: lead.id })
    } finally {
      setResending(false)
    }
  }

  const loadHistory = useCallback(() => {
    fetch(`/api/leads/${lead.id}/followups`, { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setHistory(d) })
      .catch(console.error)
      .finally(() => setLoadingHistory(false))
  }, [lead.id])

  useEffect(() => { loadHistory() }, [loadHistory])

  useEffect(() => {
    setCallStatus(lead.status || 'new')
    setNotes(lead.notes || '')
    setScheduledAt(toLocalInput(lead.next_followup_at || lead.follow_up_date))
    setSavedSuccess(false)
  }, [lead.id, lead.status, lead.notes, lead.next_followup_at, lead.follow_up_date])

  const save = async () => {
    setSaving(true)
    setSavedSuccess(false)
    const iso = scheduledAt ? new Date(scheduledAt).toISOString() : null
    try {
      const res = await fetch(`/api/leads/${lead.id}/followups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ call_status: callStatus, notes: notes.trim() || undefined, scheduled_at: iso }),
      })
      const patchRes = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ status: callStatus, notes: notes.trim(), follow_up_date: iso, next_followup_at: iso }),
      })
      const data = await res.json().catch(() => ({}))
      const patchData = await patchRes.json().catch(() => ({}))
      if (!res.ok || !patchRes.ok) throw new Error(patchData.error || data.error || 'Save failed')

      loadHistory()
      const waEligible = WHATSAPP_STATUSES.includes(callStatus)
      const optimistic: Partial<Lead> = {
        ...lead,
        status: callStatus,
        notes: notes.trim(),
        follow_up_date: iso ?? lead.follow_up_date,
        next_followup_at: iso ?? lead.next_followup_at,
        followup_count: (lead.followup_count || 0) + 1,
        last_followup_at: new Date().toISOString(),
      }
      onSaved({ ...(patchData?.id ? { ...optimistic, ...patchData } : (data.lead || optimistic)), _waPending: waEligible }, waEligible)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 2500)
    } catch (err) {
      alert('Error updating lead: ' + (err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const qualEntries = formAnswers(lead)
  const current = statusOf(lead.status)
  const selected = statusOf(callStatus)
  const dateLabel =
    callStatus === 'visit_scheduled' ? 'Visit date & time' :
    callStatus === 'visit_done' ? 'Next follow-up after visit (optional)' :
    callStatus === 'follow_up' ? 'Follow-up date & time' :
    callStatus === 'callback' ? 'Call back at' : 'Next follow-up (optional)'
  const fmtWhen = (v: string) => `${new Date(v).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} at ${new Date(v).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`

  return (
    <SidePanel
      open
      onClose={onClose}
      width={600}
      leading={<Avatar name={leadName(lead)} size="md" />}
      title={<>{leadName(lead)} <Pill color={current.color} icon={current.icon}>{current.label}</Pill></>}
      subtitle={<>
        <a href={`tel:${lead.phone}`} className="link-strong"><Phone size={12} /> {lead.phone}</a>
        <PlatformBadge platform={lead.platform || lead.source} />
        <span>Added {formatDate(lead.created_at, 'dd MMM yyyy, hh:mm a')}</span>
      </>}
      footer={
        savedSuccess ? (
          <span className="badge tone-success" style={{ height: 36, padding: '0 0.9rem', fontSize: '0.8125rem' }}>
            <Check size={15} /> Saved{WHATSAPP_STATUSES.includes(callStatus) ? ' · WhatsApp queued' : ''}
          </span>
        ) : (
          <>
            <span style={{ marginRight: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              Saving as <Pill color={selected.color} icon={selected.icon}>{selected.label}</Pill>
            </span>
            <button className="btn btn-primary" onClick={save} disabled={saving}>
              {saving ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={15} />}
              {saving ? 'Saving…' : 'Save update'}
            </button>
          </>
        )
      }
    >
      <div className="quick-actions">
        <a className="btn btn-secondary" href={`tel:${lead.phone}`}><PhoneCall size={15} /> Call</a>
        <a
          className="btn btn-secondary"
          style={{ color: '#16a34a' }}
          target="_blank"
          rel="noreferrer"
          href={`https://api.whatsapp.com/send?phone=${encodeURIComponent(lead.phone)}&text=${encodeURIComponent(`Hello ${leadName(lead)}, thank you for contacting RushiPandit Institute for our ${lead.industry || 'Digital Marketing'} program! How can we assist you with your career goals?`)}`}
        >
          <WhatsAppIcon /> WhatsApp
        </a>
        <button className="btn btn-secondary" onClick={onEdit}><Edit2 size={15} /> Edit</button>
        {isAdmin && <button className="btn btn-danger" onClick={onDelete}><Trash2 size={15} /> Delete</button>}
      </div>

      <KeyValues items={[
        { label: 'Program', value: lead.industry || lead.category || '—' },
        { label: 'Email', value: lead.email || '—' },
        { label: 'Calls made', value: `${lead.followup_count || 0}` },
        { label: 'Next follow-up', value: (lead.next_followup_at || lead.follow_up_date) ? formatDate(lead.next_followup_at || lead.follow_up_date, 'dd MMM, hh:mm a') : '—' },
        { label: 'Visit done', value: lead.visit_done_at ? formatDate(lead.visit_done_at, 'dd MMM yyyy') : '—' },
        { label: isAdmin ? 'Assigned to' : 'Email', value: isAdmin ? (lead.assigned_to_profile ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={lead.assigned_to_profile.full_name} src={lead.assigned_to_profile.avatar_url} size="xs" />{lead.assigned_to_profile.full_name}</span> : 'Unassigned') : (lead.email || '—') },
      ]} />

      <PanelSection title={`Form responses${qualEntries.length ? ` · ${qualEntries.length}` : ''}`} aside={<span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>From the {platformKey(lead.platform || lead.source) === 'ig' ? 'Instagram' : platformKey(lead.platform || lead.source) === 'fb' ? 'Facebook' : 'lead'} form</span>}>
        <FormAnswers lead={lead} />
      </PanelSection>

      {lead.notes && (
        <div className="note-box"><StickyNote size={14} /> <span>{lead.notes}</span></div>
      )}

      <PanelSection title="Update call status" aside={<span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>Pick one, then save</span>}>
        <div className="status-grid">
          {STATUS_CONFIG.map(s => (
            <button
              key={s.id}
              type="button"
              className={`status-option ${callStatus === s.id ? 'selected' : ''}`}
              style={{ '--tone': s.color } as React.CSSProperties}
              onClick={() => setCallStatus(s.id)}
            >
              {s.icon}<span className="truncate-1">{s.label}</span>
              {callStatus === s.id && <Check size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Remarks</label>
          <textarea className="form-textarea" rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="What did the student say? Fees discussed, preferred batch, callback time…" />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={13} style={{ color: selected.color }} /> {dateLabel}
            {callStatus === 'visit_scheduled' && <span style={{ color: selected.color }}>*</span>}
          </label>
          <input
            type="datetime-local"
            className="form-input"
            value={scheduledAt}
            onChange={e => setScheduledAt(e.target.value)}
            style={{ colorScheme: theme, borderColor: selected.requiresDate ? `color-mix(in srgb, ${selected.color} 55%, transparent)` : undefined }}
          />
        </div>

        {callStatus === 'visit_done' && (
          <div className="hint-box" style={{ '--tone': selected.color } as React.CSSProperties}>
            <MapPinCheck size={15} />
            <div>
              <strong>{lead.visit_done_at ? `Visit recorded on ${formatDate(lead.visit_done_at, 'dd MMM yyyy')}` : 'Visit will be recorded now'}</strong>
              <p>{lead.visit_done_at
                ? 'Already counted in that month’s visits — saving again won’t count it twice.'
                : `Counts toward ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} visits in Sales Analytics.`}</p>
            </div>
          </div>
        )}
        {callStatus === 'visit_scheduled' && scheduledAt && (
          <div className="hint-box" style={{ '--tone': selected.color } as React.CSSProperties}>
            <BellRing size={15} />
            <div><strong>Visit reminder set</strong><p>{fmtWhen(scheduledAt)}</p></div>
          </div>
        )}
        {(callStatus === 'follow_up' || callStatus === 'callback') && scheduledAt && (
          <div className="hint-box" style={{ '--tone': selected.color } as React.CSSProperties}>
            <BellRing size={15} />
            <div><strong>Reminder</strong><p>{fmtWhen(scheduledAt)}</p></div>
          </div>
        )}
      </PanelSection>

      <PanelSection
        title="WhatsApp messages"
        aside={WHATSAPP_STATUSES.includes(lead.status) && (
          <button className="btn btn-ghost btn-sm" onClick={resendWhatsApp} disabled={resending}>
            {resending ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={13} />} Resend status message
          </button>
        )}
      >
        {waHistory === null ? (
          <div className="skeleton" style={{ height: 44 }} />
        ) : waHistory.length === 0 ? (
          (() => {
            const legacy = waTag({ ...lead, _waPending: false, wa_last: null })
            return legacy
              ? <div className="wa-event" style={{ '--tone': legacy.color } as React.CSSProperties}><WhatsAppTag lead={{ ...lead, _waPending: false, wa_last: null }} /><span className="wa-event-meta">{legacy.title}</span></div>
              : <div className="empty-inline">No automatic WhatsApp messages yet. Ringing, Call Back and Switch Off send one; Visit Schedule and AI Workshop send reminders.</div>
          })()
        ) : (
          <ul className="wa-list">
            {waHistory.map(ev => {
              const failed = ev.status === 'failed'
              return (
                <li key={ev.id} className="wa-event" style={{ '--tone': failed ? '#ef4757' : '#22c55e' } as React.CSSProperties}>
                  <span className="wa-event-icon">{failed ? <XCircle size={14} /> : <Check size={14} />}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {waLabel(ev)}{ev.kind === 'status' && ev.detail ? ` · ${ev.detail}` : ''} — {failed ? 'failed' : 'sent'}
                    </div>
                    {failed && <div style={{ fontSize: '0.75rem', color: 'var(--status-danger)' }}>{waReason(ev.error)} · <span style={{ color: 'var(--text-muted)' }}>{ev.error}</span></div>}
                  </div>
                  <span className="wa-event-meta tabular">{formatDate(ev.created_at || ev.at || '', 'dd MMM, hh:mm a')}</span>
                </li>
              )
            })}
          </ul>
        )}
      </PanelSection>

      <PanelSection title="Activity" aside={history.length > 0 && <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{history.length} logged</span>}>
        {loadingHistory ? (
          <div className="skeleton" style={{ height: 64 }} />
        ) : history.length === 0 ? (
          <div className="empty-inline">No calls logged yet</div>
        ) : (
          <ul className="timeline">
            {history.map(item => {
              const s = statusOf(item.call_status)
              return (
                <li key={item.id} style={{ '--tone': s.color } as React.CSSProperties}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <Pill color={s.color}>{s.label}</Pill>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{formatDate(item.completed_at, 'dd MMM, hh:mm a')}</span>
                  </div>
                  {item.notes && <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginTop: 5, lineHeight: 1.45 }}>{item.notes}</p>}
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: 3 }}>
                    {item.sales_rep?.full_name || 'Sales rep'} · Call #{item.followup_number}
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </PanelSection>
    </SidePanel>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────
export default function LeadsSection({ profile }: Props) {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | 'week' | 'month' | 'custom'>('all')
  const [followupTab, setFollowupTab] = useState<'all' | 'due_today' | 'overdue' | 'upcoming'>('all')
  const [visitsThisMonthOnly, setVisitsThisMonthOnly] = useState(false)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editLead, setEditLead] = useState<Lead | null>(null)
  const [saving, setSaving] = useState(false)
  const [openLeadId, setOpenLeadId] = useState<string | null>(null)
  const [expandedForm, setExpandedForm] = useState<string | null>(null)

  const emptyForm = { client_name: '', phone: '', email: '', industry: 'Digital Marketing', category: 'Digital Marketing', status: 'new', source: 'facebook_lead_ad', notes: '', follow_up_date: '', platform: 'Facebook' }
  const [form, setForm] = useState(emptyForm)

  const isAdmin = profile.role === 'admin'
  const getToken = () => localStorage.getItem('rushi_token') || ''

  const fetchLeads = useCallback(async () => {
    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }
    try {
      const res = await fetch('/api/leads', { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) {
        if (res.status === 401) router.push('/')
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) setLeads(data)
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  // The WhatsApp send runs in the background after a status change; re-read the real result.
  const confirmWhatsApp = useCallback(() => {
    setTimeout(fetchLeads, 3500)
    setTimeout(fetchLeads, 9000)
  }, [fetchLeads])

  const openLead = leads.find(l => l.id === openLeadId) || null

  const handleQuickStatusChange = async (leadId: string, newStatus: string) => {
    const wa = WHATSAPP_STATUSES.includes(newStatus)
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus, _waPending: wa } : l))
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) return fetchLeads()
      const data = await res.json().catch(() => null)
      if (data?.id) setLeads(prev => prev.map(l => l.id === leadId ? { ...l, ...data } : l))
      if (wa) confirmWhatsApp()
    } catch {
      fetchLeads()
    }
  }

  const openCreate = () => {
    setEditLead(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (lead: Lead) => {
    setEditLead(lead)
    setForm({
      client_name: leadName(lead),
      phone: lead.phone,
      email: lead.email || '',
      industry: lead.industry || lead.category || 'Digital Marketing',
      category: lead.category || lead.industry || 'Digital Marketing',
      status: lead.status,
      source: lead.source || 'facebook_lead_ad',
      notes: lead.notes || '',
      follow_up_date: lead.follow_up_date ? lead.follow_up_date.slice(0, 10) : '',
      platform: lead.platform || 'Facebook',
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (!form.client_name || !form.phone) return
    setSaving(true)
    try {
      const body = { ...form, follow_up_date: form.follow_up_date || null }
      if (editLead) {
        setLeads(prev => prev.map(l => l.id === editLead.id ? { ...l, ...form, name: form.client_name } : l))
        await fetch(`/api/leads/${editLead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify(body),
        })
      } else {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify(body),
        })
      }
      setShowModal(false)
      fetchLeads()
    } catch (err) {
      alert('Error saving lead: ' + (err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this lead and its follow-up records?')) return
    await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } })
    setOpenLeadId(null)
    fetchLeads()
  }

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const todayEnd = todayStart + 86400000
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime()

  const isDueToday = useCallback((l: Lead) => {
    if (l.status === 'busy_callback') return true
    const d = l.next_followup_at || l.follow_up_date
    if (!d) return false
    const t = new Date(d).getTime()
    return t >= todayStart && t < todayEnd && !CLOSED.includes(l.status)
  }, [todayStart, todayEnd])
  const isOverdue = useCallback((l: Lead) => {
    const d = l.next_followup_at || l.follow_up_date
    return !!d && new Date(d).getTime() < todayStart && !CLOSED.includes(l.status)
  }, [todayStart])
  const isUpcoming = useCallback((l: Lead) => {
    const d = l.next_followup_at || l.follow_up_date
    return !!d && new Date(d).getTime() >= todayEnd && !CLOSED.includes(l.status)
  }, [todayEnd])

  const dueTodayCount = leads.filter(isDueToday).length
  const overdueCount = leads.filter(isOverdue).length
  const upcomingCount = leads.filter(isUpcoming).length

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    const yesterdayStart = todayStart - 86400000
    const weekStart = todayStart - 7 * 86400000
    return leads.filter(l => {
      if (q && !(leadName(l).toLowerCase().includes(q) || l.phone.includes(search) || (l.email || '').toLowerCase().includes(q))) return false
      if (filterStatus !== 'all' && l.status !== filterStatus) return false
      if (filterIndustry !== 'all') {
        const ind = (l.industry || l.category || '').toLowerCase().trim()
        const ok = (l.industry || l.category) === filterIndustry ||
          (filterIndustry === 'AI Course' && ['ai', 'ai course', 'artificial intelligence', 'ai program'].includes(ind))
        if (!ok) return false
      }
      if (filterPlatform !== 'all') {
        const p = (l.platform || l.source || '').toLowerCase()
        if (filterPlatform === 'fb' && !(p.includes('fb') || p.includes('facebook'))) return false
        if (filterPlatform === 'ig' && !(p.includes('ig') || p.includes('instagram'))) return false
        if (filterPlatform === 'web' && !(p.includes('web') || p.includes('site'))) return false
      }
      const t = new Date(l.created_at).getTime()
      if (dateFilter === 'today' && t < todayStart) return false
      if (dateFilter === 'yesterday' && !(t >= yesterdayStart && t < todayStart)) return false
      if (dateFilter === 'week' && t < weekStart) return false
      if (dateFilter === 'month' && t < monthStart) return false
      if (dateFilter === 'custom') {
        if (customStartDate && t < new Date(customStartDate).getTime()) return false
        if (customEndDate) {
          const end = new Date(customEndDate)
          end.setHours(23, 59, 59, 999)
          if (t > end.getTime()) return false
        }
      }
      if (followupTab === 'due_today' && !isDueToday(l)) return false
      if (followupTab === 'overdue' && !isOverdue(l)) return false
      if (followupTab === 'upcoming' && !isUpcoming(l)) return false
      if (visitsThisMonthOnly && !(l.visit_done_at && new Date(l.visit_done_at).getTime() >= monthStart)) return false
      return true
    })
  }, [leads, search, filterStatus, filterIndustry, filterPlatform, dateFilter, customStartDate, customEndDate, followupTab, visitsThisMonthOnly, todayStart, monthStart, isDueToday, isOverdue, isUpcoming])

  const total = leads.length
  const enrolled = leads.filter(l => l.status === 'closed_won').length
  const pipeline = leads.filter(l => ['interested', 'visit_scheduled', 'visit_done', 'ai_workshop_saturday', 'callback', 'follow_up', 'busy_callback'].includes(l.status)).length
  const convRate = total > 0 ? Math.round((enrolled / total) * 100) : 0
  const visitsThisMonth = leads.filter(l => l.visit_done_at && new Date(l.visit_done_at).getTime() >= monthStart).length
  const visitsScheduled = leads.filter(l => l.status === 'visit_scheduled').length
  const monthName = now.toLocaleDateString('en-IN', { month: 'long' })
  const filtersActive = filterStatus !== 'all' || filterIndustry !== 'all' || filterPlatform !== 'all' || dateFilter !== 'all' || followupTab !== 'all' || visitsThisMonthOnly || !!search

  const cols = isAdmin
    ? 'minmax(170px, 1.6fr) 104px 96px minmax(110px, 1fr) 100px 164px minmax(112px, 1fr) 76px 14px'
    : 'minmax(170px, 1.6fr) 104px 96px minmax(110px, 1fr) 100px 164px minmax(112px, 1fr) 14px'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <PageHeader
        live
        eyebrow="Live pipeline"
        title={isAdmin ? 'Leads & Pipeline' : 'My Leads'}
        description="Click any lead to open its full profile, log a call or mark a visit."
        actions={<>
          <button onClick={fetchLeads} className="icon-btn bordered" aria-label="Refresh leads"><RefreshCw size={15} /></button>
          <GlowButton onClick={openCreate}><Plus size={15} /> Add lead</GlowButton>
        </>}
      />

      <Reveal className="grid-4">
        <KpiCard label="Total leads" value={total} icon={BarChart2} foot={`${leads.filter(l => l.status === 'new').length} still new`} />
        <KpiCard label="Active pipeline" value={pipeline} icon={TrendingUp} tone="info" foot={`${visitsScheduled} visits scheduled`} />
        <KpiCard
          label={`Visits done · ${monthName}`}
          value={visitsThisMonth}
          icon={MapPinCheck}
          tone="brand"
          active={visitsThisMonthOnly}
          foot={visitsThisMonthOnly ? 'Filter on · click to clear' : 'Click to see who visited'}
          onClick={() => setVisitsThisMonthOnly(v => !v)}
        />
        <KpiCard label="Enrolled" value={enrolled} icon={GraduationCap} tone="warning" foot={`All time · ${convRate}% conversion`} />
      </Reveal>

      {(dueTodayCount > 0 || overdueCount > 0) && (
        <div className="alert-strip tone-warning">
          <span className="alert-strip-icon"><BellRing size={16} /></span>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              {dueTodayCount} follow-up{dueTodayCount === 1 ? '' : 's'} due today{overdueCount > 0 ? ` · ${overdueCount} overdue` : ''}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Warm leads cool fast — call them back while they remember you.</p>
          </div>
          <button onClick={() => setFollowupTab(overdueCount > 0 && dueTodayCount === 0 ? 'overdue' : 'due_today')} className="btn btn-sm btn-secondary">
            <PhoneCall size={13} /> Show them
          </button>
        </div>
      )}

      <Reveal delay={0.08}>
      <section className="card list">
        <div className="list-toolbar">
          <div className="segmented" role="tablist" style={{ overflowX: 'auto', maxWidth: '100%' }}>
            {([
              { id: 'all', label: 'All', count: total, tone: '' },
              { id: 'due_today', label: 'Due today', count: dueTodayCount, tone: 'var(--status-warning)' },
              { id: 'overdue', label: 'Overdue', count: overdueCount, tone: 'var(--status-danger)' },
              { id: 'upcoming', label: 'Upcoming', count: upcomingCount, tone: 'var(--status-info)' },
            ] as const).map(tab => (
              <button key={tab.id} role="tab" aria-selected={followupTab === tab.id} className={followupTab === tab.id ? 'active' : ''} onClick={() => setFollowupTab(tab.id)}>
                {tab.tone && <span style={{ width: 6, height: 6, borderRadius: '50%', background: tab.tone }} />}
                {tab.label}
                <span className="tabular" style={{ color: 'var(--text-faint)', fontWeight: 500 }}>{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="segmented" style={{ overflowX: 'auto', maxWidth: '100%', marginLeft: 'auto' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 0.35rem 0 0.5rem', color: 'var(--text-faint)' }}><CalendarDays size={13} /></span>
            {([
              ['all', 'All time'], ['today', 'Today'], ['yesterday', 'Yesterday'], ['week', '7 days'], ['month', 'This month'], ['custom', 'Custom'],
            ] as const).map(([id, label]) => (
              <button key={id} className={dateFilter === id ? 'active' : ''} onClick={() => setDateFilter(id)}>{label}</button>
            ))}
          </div>
        </div>

        <div className="list-toolbar">
          <div className="input-icon">
            <Search size={14} />
            <input className="form-input" placeholder="Search name, phone or email…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select value={filterPlatform} onChange={e => setFilterPlatform(e.target.value)} className="form-select" style={{ width: 'auto' }} aria-label="Source">
            <option value="all">All sources</option>
            <option value="fb">Facebook</option>
            <option value="ig">Instagram</option>
            <option value="web">Website</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="form-select" style={{ width: 'auto' }} aria-label="Status">
            <option value="all">All statuses</option>
            {STATUS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)} className="form-select" style={{ width: 'auto' }} aria-label="Program">
            <option value="all">All programs</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          {dateFilter === 'custom' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="form-input" style={{ width: 'auto' }} aria-label="From" />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>to</span>
              <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="form-input" style={{ width: 'auto' }} aria-label="To" />
            </div>
          )}
          {visitsThisMonthOnly && (
            <span className="badge tone-success" style={{ height: 30 }}>
              <MapPinCheck size={12} /> Visited in {monthName}
              <button onClick={() => setVisitsThisMonthOnly(false)} aria-label="Clear visit filter" className="badge-x"><X size={12} /></button>
            </span>
          )}
        </div>

        {loading ? (
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton" style={{ height: 52 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><TrendingUp size={20} /></div>
            <p style={{ fontWeight: 550, color: 'var(--text-secondary)' }}>{total === 0 ? 'No leads yet' : 'No leads match these filters'}</p>
            {filtersActive && total > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={() => {
                setSearch(''); setFilterStatus('all'); setFilterIndustry('all'); setFilterPlatform('all'); setDateFilter('all'); setFollowupTab('all'); setVisitsThisMonthOnly(false)
              }}>Clear filters</button>
            )}
          </div>
        ) : (
          <div role="list">
            <div className="list-head" style={{ '--cols': cols } as React.CSSProperties}>
              <span>Lead</span><span>Received</span><span>Source</span><span>Program</span><span>Form</span><span>Status</span><span>Follow-up</span>{isAdmin && <span>Owner</span>}<span />
            </div>
            {filtered.map(lead => {
              const f = followupInfo(lead, todayStart)
              const answers = formAnswers(lead)
              return (
                <Fragment key={lead.id}>
                <div
                  role="listitem"
                  tabIndex={0}
                  className={`list-row ${openLeadId === lead.id ? 'selected' : ''}`}
                  style={{ '--cols': cols } as React.CSSProperties}
                  onClick={() => setOpenLeadId(lead.id)}
                  onKeyDown={e => { if (e.key === 'Enter') setOpenLeadId(lead.id) }}
                >
                  <div className="row-main">
                    <Avatar name={leadName(lead)} size="sm" />
                    <div style={{ minWidth: 0 }}>
                      <div className="row-title">{leadName(lead)}</div>
                      <div className="row-sub tabular">{lead.phone}</div>
                      <div className="row-sub show-sm">{formatDate(lead.created_at, 'dd MMM, hh:mm a')} · {lead.industry || lead.category || '—'}</div>
                    </div>
                  </div>
                  <div className="col-hide-sm tabular" style={{ minWidth: 0, lineHeight: 1.3 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 550, color: 'var(--text-primary)' }}>{formatDate(lead.created_at, 'dd MMM yyyy')}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{formatDate(lead.created_at, 'hh:mm a')}</div>
                  </div>
                  <div className="col-hide-sm"><PlatformBadge platform={lead.platform || lead.source} full /></div>
                  <span className="row-cell col-hide-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lead.industry || lead.category || '—'}</span>
                  <span className="col-hide-sm" onClick={e => e.stopPropagation()}>
                    {answers.length > 0 ? (
                      <button className={`form-chip ${expandedForm === lead.id ? 'open' : ''}`} onClick={() => setExpandedForm(expandedForm === lead.id ? null : lead.id)} aria-expanded={expandedForm === lead.id}>
                        <ClipboardList size={12} /> {answers.length} answer{answers.length === 1 ? '' : 's'} <ChevronDown size={12} />
                      </button>
                    ) : <span className="row-cell" style={{ color: 'var(--text-faint)', fontStyle: 'italic', fontSize: '0.75rem' }}>Standard</span>}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, alignItems: 'flex-start' }}>
                    <StatusSelect value={lead.status} onChange={s => handleQuickStatusChange(lead.id, s)} />
                    <WhatsAppTag lead={lead} />
                  </div>
                  <div className="col-hide-sm" style={{ minWidth: 0 }}>
                    {f ? (
                      <span className="row-cell" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: f.overdue ? 'var(--status-danger)' : f.today ? 'var(--status-warning)' : 'var(--text-secondary)', fontWeight: f.overdue || f.today ? 600 : 400 }}>
                        <Calendar size={12} />
                        {f.overdue ? 'Overdue · ' : f.today ? 'Today · ' : ''}{formatDate(f.date, f.today ? 'hh:mm a' : 'dd MMM, hh:mm a')}
                      </span>
                    ) : (
                      <span className="row-cell" style={{ color: 'var(--text-faint)' }}>{lead.followup_count || 0} call{lead.followup_count === 1 ? '' : 's'}</span>
                    )}
                  </div>
                  {isAdmin && (
                    <span className="row-cell col-hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {lead.assigned_to_profile ? <><Avatar name={lead.assigned_to_profile.full_name} src={lead.assigned_to_profile.avatar_url} size="xs" />{lead.assigned_to_profile.full_name.split(' ')[0]}</> : <em style={{ color: 'var(--text-faint)' }}>Unassigned</em>}
                    </span>
                  )}
                  <ChevronRight size={16} className="row-chevron col-hide-sm" />
                </div>
                {expandedForm === lead.id && (
                  <div className="row-expand">
                    <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><ClipboardList size={13} /> Form responses &amp; qualification answers</div>
                    <FormAnswers lead={lead} />
                  </div>
                )}
                </Fragment>
              )
            })}
            <div className="list-foot">
              <span>Showing {filtered.length} of {total} leads</span>
              <span className="hidden-mobile">Tip: press Enter on a row to open it</span>
            </div>
          </div>
        )}
      </section>
      </Reveal>

      {openLead && (
        <LeadPanel
          lead={openLead}
          isAdmin={isAdmin}
          onClose={() => setOpenLeadId(null)}
          onSaved={(updated, waQueued) => {
            setLeads(prev => prev.map(l => l.id === (updated.id || openLead.id) ? { ...l, ...updated } as Lead : l))
            if (waQueued) confirmWhatsApp()
            else fetchLeads()
          }}
          onEdit={() => openEdit(openLead)}
          onDelete={() => handleDelete(openLead.id)}
        />
      )}

      {showModal && (
        <div className="modal-overlay" style={{ zIndex: 1150 }} onMouseDown={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-content" style={{ maxWidth: 580 }}>
            <div className="modal-header">
              <h3>{editLead ? 'Edit lead' : 'Add lead'}</h3>
              <button onClick={() => setShowModal(false)} className="icon-btn" aria-label="Close"><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full name *</label>
                  <input className="form-input" value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} placeholder="Candidate name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="candidate@email.com" />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Program</label>
                  <select className="form-select" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value, category: e.target.value })}>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Call status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    {STATUS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Platform</label>
                  <select className="form-select" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value, source: e.target.value })}>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Website">Website</option>
                    <option value="Walk In">Walk in</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Follow-up date</label>
                  <input type="date" className="form-input" value={form.follow_up_date} onChange={e => setForm({ ...form, follow_up_date: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Internal remarks about this student…" />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleSubmit} disabled={saving || !form.client_name || !form.phone} className="btn btn-primary">
                {saving && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {editLead ? 'Update lead' : 'Create lead'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
