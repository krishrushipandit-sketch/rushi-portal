'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Profile } from '@/lib/database.types'
import {
  Phone, Users, TrendingUp, CheckCircle2, AlertCircle, Search,
  ChevronDown, ChevronUp, X, Calendar, Target, BarChart3,
  UserCheck, PhoneOff, PhoneMissed, PhoneCall, Clock, XCircle,
  Loader2, Award, Filter
} from 'lucide-react'
import { getInitials } from '@/lib/utils'

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

// All 10 call statuses with visual config
const STATUS_CONFIG = [
  { id: 'new',            label: 'New',            color: '#6366f1', icon: '🆕', description: 'Fresh lead, not yet called' },
  { id: 'ringing',        label: 'Ringing',         color: '#f59e0b', icon: '📞', description: 'Called but no answer' },
  { id: 'not_connected',  label: 'Not Connected',   color: '#ef4444', icon: '❌', description: 'Could not reach' },
  { id: 'switched_off',   label: 'Switched Off',    color: '#6b7280', icon: '📵', description: 'Phone is off' },
  { id: 'not_logical',    label: 'Not Logical',     color: '#9ca3af', icon: '🚫', description: 'Invalid / irrelevant lead' },
  { id: 'busy_callback',  label: 'Busy / Callback', color: '#8b5cf6', icon: '⏰', description: 'Busy, asked to call back' },
  { id: 'interested',     label: 'Interested',      color: '#06b6d4', icon: '✨', description: 'Expressed interest' },
  { id: 'visit_scheduled',label: 'Visit Scheduled', color: '#ec4899', icon: '📅', description: 'Office visit booked' },
  { id: 'closed_won',     label: 'Enrolled ✅',     color: '#10b981', icon: '🏆', description: 'Successfully enrolled!' },
  { id: 'closed_lost',    label: 'Lost / Dropped',  color: '#dc2626', icon: '💔', description: 'Lost lead' },
]

const MONTHS: string[] = []
const now = new Date()
for (let i = 0; i < 6; i++) {
  let y = now.getFullYear()
  let m = now.getMonth() - i + 1
  if (m <= 0) { m += 12; y -= 1 }
  MONTHS.push(`${y}-${String(m).padStart(2, '0')}`)
}

function monthLabel(m: string) {
  const [y, mo] = m.split('-')
  return new Date(parseInt(y), parseInt(mo) - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
}

function ProgressRing({ pct, color, size = 48 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 5
  const circ = 2 * Math.PI * r
  const dash = Math.min(1, pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }} />
    </svg>
  )
}

// ─── Status Leads Drawer ────────────────────────────────────────────────────
function StatusDrawer({
  statusId, leads, onClose
}: { statusId: string; leads: LeadInStatus[]; onClose: () => void }) {
  const cfg = STATUS_CONFIG.find(s => s.id === statusId)!
  const [search, setSearch] = useState('')
  const filtered = leads.filter(l =>
    l.client_name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search)
  )

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-elevated)', borderRadius: '20px',
        border: `1px solid ${cfg.color}33`,
        width: '100%', maxWidth: '560px', maxHeight: '85vh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${cfg.color}22`
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{cfg.icon}</span>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: cfg.color, margin: 0 }}>{cfg.label}</h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>{leads.length} lead{leads.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', borderRadius: '8px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              style={{
                width: '100%', paddingLeft: '32px', padding: '0.5rem 0.75rem 0.5rem 32px',
                background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-primary)',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Lead list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1.5rem 1.25rem' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No leads found
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filtered.map(lead => (
                <div key={lead.id} style={{
                  padding: '0.875rem 1rem', borderRadius: '12px',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem'
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: `${cfg.color}22`, color: cfg.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 700
                  }}>
                    {getInitials(lead.client_name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', margin: 0 }}>{lead.client_name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      📞 {lead.phone}
                      {lead.industry ? ` · ${lead.industry}` : ''}
                      {lead.platform ? ` · via ${lead.platform}` : ''}
                    </p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>Lead added: {lead.created_at}</p>
                    {lead.notes && (
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '4px 0 0', fontStyle: 'italic' }}>
                        "{lead.notes.slice(0, 100)}{lead.notes.length > 100 ? '…' : ''}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Converted Leads Panel ─────────────────────────────────────────────────
function ConvertedLeadsPanel({ leads, month }: { leads: ConvertedLead[]; month: string }) {
  const [search, setSearch] = useState('')
  const filtered = leads.filter(l =>
    l.client_name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    (l.industry || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{
      borderRadius: '16px', background: 'rgba(16,185,129,0.04)',
      border: '1px solid rgba(16,185,129,0.15)', overflow: 'hidden'
    }}>
      <div style={{
        padding: '1rem 1.25rem', background: 'rgba(16,185,129,0.08)',
        borderBottom: '1px solid rgba(16,185,129,0.12)',
        display: 'flex', alignItems: 'center', gap: '0.75rem'
      }}>
        <Award size={18} color="#10b981" />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10b981', margin: 0 }}>
            Enrolled Leads — {monthLabel(month)}
          </h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>
            {leads.length} enrollment{leads.length !== 1 ? 's' : ''} this month · 100% accurate
          </p>
        </div>
        <div style={{ position: 'relative', width: '180px' }}>
          <Search size={13} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..."
            style={{
              width: '100%', paddingLeft: '28px', padding: '0.4rem 0.5rem 0.4rem 28px',
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-primary)',
              outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          {leads.length === 0 ? '🎯 No enrollments recorded this month yet' : 'No results for your search'}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.15)' }}>
                {['#', 'Lead Name', 'Phone', 'Course / Industry', 'Platform', 'Date', 'Notes'].map(h => (
                  <th key={h} style={{
                    padding: '0.5rem 0.875rem', textAlign: 'left', fontSize: '0.65rem',
                    color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
                    whiteSpace: 'nowrap'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, idx) => (
                <tr key={lead.id} style={{
                  borderTop: '1px solid var(--border-default)',
                  transition: 'background 0.15s'
                }}>
                  <td style={{ padding: '0.75rem 0.875rem', fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                    {idx + 1}
                  </td>
                  <td style={{ padding: '0.75rem 0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: 'rgba(16,185,129,0.15)', color: '#10b981',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', fontWeight: 700
                      }}>
                        {getInitials(lead.client_name)}
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                        {lead.client_name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.875rem', fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {lead.phone}
                  </td>
                  <td style={{ padding: '0.75rem 0.875rem' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px',
                      borderRadius: '99px', background: 'rgba(99,102,241,0.12)',
                      color: '#6366f1', whiteSpace: 'nowrap'
                    }}>
                      {lead.industry || 'General'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.875rem', fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {lead.platform || '—'}
                  </td>
                  <td style={{ padding: '0.75rem 0.875rem', fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {lead.enrolled_at}
                  </td>
                  <td style={{ padding: '0.75rem 0.875rem', fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '160px' }}>
                    {lead.notes ? lead.notes.slice(0, 60) + (lead.notes.length > 60 ? '…' : '') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Employee Sales Card ───────────────────────────────────────────────────
function EmployeeSalesCard({ data, month, defaultOpen }: { data: EmployeeData; month: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || false)
  const [activeStatus, setActiveStatus] = useState<string | null>(null)
  const [showConverted, setShowConverted] = useState(false)

  const totalEnrollments = data.convertedCount
  const convRate = data.conversionRate

  return (
    <div style={{
      borderRadius: '16px', border: '1px solid var(--border-default)',
      background: 'var(--bg-elevated)', overflow: 'hidden',
      transition: 'box-shadow 0.2s'
    }}>
      {/* ── Header row ── */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '1.125rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem',
          textAlign: 'left'
        }}
      >
        {/* Avatar */}
        {data.employee.avatar_url ? (
          <img src={data.employee.avatar_url} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '0.78rem', fontWeight: 700
          }}>
            {getInitials(data.employee.full_name)}
          </div>
        )}

        {/* Name & stats */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
            {data.employee.full_name}
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
            {data.employee.designation || 'Sales Executive'}
          </p>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#6366f1', margin: 0, lineHeight: 1 }}>{data.totalLeads}</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Leads</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', margin: 0, lineHeight: 1 }}>{totalEnrollments}</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Enrolled</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b', margin: 0, lineHeight: 1 }}>{data.activeLeads}</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pipeline</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: convRate >= 10 ? '#10b981' : '#f59e0b', margin: 0, lineHeight: 1 }}>{convRate}%</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Rate</p>
          </div>
        </div>

        {open ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
      </button>

      {/* ── Expanded content ── */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border-default)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 10-Status call breakdown */}
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
              Call Status Breakdown — Click to See Lead Names
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', gap: '0.5rem' }}>
              {STATUS_CONFIG.map(cfg => {
                const count = data.statusBreakdown[cfg.id] || 0
                return (
                  <button
                    key={cfg.id}
                    onClick={() => setActiveStatus(cfg.id)}
                    title={cfg.description}
                    style={{
                      padding: '0.625rem 0.75rem', borderRadius: '10px',
                      background: count > 0 ? `${cfg.color}12` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${count > 0 ? cfg.color + '30' : 'var(--border-default)'}`,
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.15s', opacity: count === 0 ? 0.5 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem' }}>{cfg.icon}</span>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: cfg.color, lineHeight: 1 }}>{count}</span>
                    </div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>{cfg.label}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Enrolled Leads this month */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                🏆 Enrolled Leads This Month — Complete Names & Details
              </p>
              <button
                onClick={() => setShowConverted(c => !c)}
                style={{
                  fontSize: '0.72rem', color: '#10b981', background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px',
                  padding: '3px 10px', cursor: 'pointer'
                }}
              >
                {showConverted ? 'Hide' : `Show ${data.convertedLeads.length}`}
              </button>
            </div>
            {showConverted && <ConvertedLeadsPanel leads={data.convertedLeads} month={month} />}
          </div>

          {/* Daily report metrics */}
          {Object.keys(data.metrics).length > 0 && (
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
                📋 Daily Report Activity
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem' }}>
                {Object.entries(data.metrics).map(([title, m]) => {
                  const pct = m.monthlyTarget > 0 ? Math.min(100, Math.round((m.total / m.monthlyTarget) * 100)) : 0
                  const color = title.toLowerCase().includes('enroll') ? '#10b981'
                    : title.toLowerCase().includes('call') ? '#6366f1'
                    : title.toLowerCase().includes('follow') ? '#f59e0b' : '#8b5cf6'
                  return (
                    <div key={title} style={{
                      padding: '0.75rem', borderRadius: '10px',
                      background: `${color}0a`, border: `1px solid ${color}20`,
                      display: 'flex', gap: '0.625rem', alignItems: 'center'
                    }}>
                      <ProgressRing pct={pct} color={color} size={40} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>{title}</p>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color, margin: '2px 0 0', lineHeight: 1 }}>
                          {m.total}<span style={{ fontSize: '0.65rem', fontWeight: 400, color: 'var(--text-muted)' }}>/{m.monthlyTarget}</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status Drawer Modal */}
      {activeStatus && (
        <StatusDrawer
          statusId={activeStatus}
          leads={data.leadsByStatus[activeStatus] || []}
          onClose={() => setActiveStatus(null)}
        />
      )}
    </div>
  )
}

// ─── Main SalesSection ─────────────────────────────────────────────────────
export default function SalesSection({ profile }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0])
  const [selectedRep, setSelectedRep] = useState<string>('all')
  const [teamData, setTeamData] = useState<EmployeeData[]>([])
  const [teamSummary, setTeamSummary] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [workingDays, setWorkingDays] = useState(0)
  const [allEmployees, setAllEmployees] = useState<{ id: string; full_name: string }[]>([])
  const [showConvertedAll, setShowConvertedAll] = useState(false)

  const isAdmin = profile.role === 'admin'

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  const fetchData = useCallback(async () => {
    const token = getToken()
    if (!token) return
    setLoading(true)

    let url = `/api/sales?month=${selectedMonth}`
    if (isAdmin && selectedRep !== 'all') url += `&rep=${selectedRep}`

    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()

    if (data.team) {
      setTeamData(data.team)
      setTeamSummary(data.teamSummary || {})
      setWorkingDays(data.workingDaysSoFar || 0)
      if (allEmployees.length === 0) {
        setAllEmployees(data.team.map((t: EmployeeData) => ({ id: t.employee.id, full_name: t.employee.full_name })))
      }
    }
    setLoading(false)
  }, [selectedMonth, selectedRep, isAdmin])

  useEffect(() => { fetchData() }, [fetchData])

  // Aggregate team metrics
  const totalLeads = teamData.reduce((s, e) => s + e.totalLeads, 0)
  const totalEnrolled = teamData.reduce((s, e) => s + e.convertedCount, 0)
  const totalPipeline = teamData.reduce((s, e) => s + e.activeLeads, 0)
  const teamConvRate = totalLeads > 0 ? Math.round((totalEnrolled / totalLeads) * 100) : 0
  const allConvertedLeads = teamData.flatMap(e => e.convertedLeads.map(l => ({ ...l, rep_name: e.employee.full_name })))

  // Team-wide status totals
  const teamStatusTotals: Record<string, number> = {}
  for (const s of STATUS_CONFIG) {
    teamStatusTotals[s.id] = teamData.reduce((sum, e) => sum + (e.statusBreakdown[s.id] || 0), 0)
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* ── Page Header ── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Sales Metrics
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
          Complete lead tracking, enrollment names & call status breakdown
        </p>
      </div>

      {/* ── Controls ── */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {/* Month picker */}
        <div style={{ position: 'relative' }}>
          <Calendar size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <select
            value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}
            style={{
              paddingLeft: '30px', padding: '0.5rem 0.75rem 0.5rem 30px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
              borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-primary)',
              cursor: 'pointer', outline: 'none', minWidth: '160px'
            }}
          >
            {MONTHS.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
          </select>
        </div>

        {/* Admin rep selector */}
        {isAdmin && allEmployees.length > 0 && (
          <div style={{ position: 'relative' }}>
            <Filter size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select
              value={selectedRep} onChange={e => setSelectedRep(e.target.value)}
              style={{
                paddingLeft: '30px', padding: '0.5rem 0.75rem 0.5rem 30px',
                background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-primary)',
                cursor: 'pointer', outline: 'none', minWidth: '180px'
              }}
            >
              <option value="all">All Sales Representatives</option>
              {allEmployees.map(e => <option key={e.id} value={e.id}>{e.full_name}</option>)}
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading sales data...</span>
        </div>
      ) : (
        <>
          {/* ── Hero Metrics ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.875rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Total Leads', value: totalLeads, color: '#6366f1', icon: <Users size={18} /> },
              { label: `Enrolled (${monthLabel(selectedMonth).split(' ')[0]})`, value: totalEnrolled, color: '#10b981', icon: <Award size={18} /> },
              { label: 'Active Pipeline', value: totalPipeline, color: '#f59e0b', icon: <TrendingUp size={18} /> },
              { label: 'Conversion Rate', value: `${teamConvRate}%`, color: '#ec4899', icon: <Target size={18} /> },
              { label: 'Working Days', value: workingDays, color: '#8b5cf6', icon: <Calendar size={18} /> },
            ].map(({ label, value, color, icon }) => (
              <div key={label} style={{
                padding: '1rem', borderRadius: '14px',
                background: `${color}0d`, border: `1px solid ${color}25`,
                display: 'flex', alignItems: 'center', gap: '0.75rem'
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                  background: `${color}18`, color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color, margin: 0, lineHeight: 1 }}>{value}</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── All Converted Leads (team view) — shown only when viewing all reps ── */}
          {isAdmin && selectedRep === 'all' && allConvertedLeads.length > 0 && (
            <div style={{ marginBottom: '1.5rem', borderRadius: '16px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', overflow: 'hidden' }}>
              <button
                onClick={() => setShowConvertedAll(c => !c)}
                style={{
                  width: '100%', background: 'rgba(16,185,129,0.08)', border: 'none', cursor: 'pointer',
                  padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left',
                  borderBottom: showConvertedAll ? '1px solid rgba(16,185,129,0.12)' : 'none'
                }}
              >
                <Award size={18} color="#10b981" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: '#10b981', margin: 0, fontSize: '0.92rem' }}>
                    🏆 All Enrolled Leads — {monthLabel(selectedMonth)} — {allConvertedLeads.length} Total
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Click to see every converted lead name & details</p>
                </div>
                {showConvertedAll ? <ChevronUp size={16} color="#10b981" /> : <ChevronDown size={16} color="#10b981" />}
              </button>
              {showConvertedAll && (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(0,0,0,0.15)' }}>
                        {['#', 'Lead Name', 'Phone', 'Sales Rep', 'Course', 'Platform', 'Date'].map(h => (
                          <th key={h} style={{
                            padding: '0.5rem 0.875rem', textAlign: 'left', fontSize: '0.65rem',
                            color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap'
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allConvertedLeads.map((lead: any, idx) => (
                        <tr key={lead.id} style={{ borderTop: '1px solid var(--border-default)' }}>
                          <td style={{ padding: '0.7rem 0.875rem', fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>{idx + 1}</td>
                          <td style={{ padding: '0.7rem 0.875rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>
                                {getInitials(lead.client_name)}
                              </div>
                              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{lead.client_name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.7rem 0.875rem', fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{lead.phone}</td>
                          <td style={{ padding: '0.7rem 0.875rem', fontSize: '0.8rem', color: '#6366f1', fontWeight: 600, whiteSpace: 'nowrap' }}>{lead.rep_name}</td>
                          <td style={{ padding: '0.7rem 0.875rem' }}>
                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px', background: 'rgba(99,102,241,0.12)', color: '#6366f1', whiteSpace: 'nowrap' }}>
                              {lead.industry || 'General'}
                            </span>
                          </td>
                          <td style={{ padding: '0.7rem 0.875rem', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{lead.platform || '—'}</td>
                          <td style={{ padding: '0.7rem 0.875rem', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{lead.enrolled_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Individual Rep Cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {teamData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
                <BarChart3 size={40} style={{ opacity: 0.3, margin: '0 auto 0.75rem' }} />
                <p>No sales data for this period</p>
              </div>
            ) : (
              teamData.map((emp, i) => (
                <EmployeeSalesCard key={emp.employee.id} data={emp} month={selectedMonth} defaultOpen={teamData.length === 1 || i === 0} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
