'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import { 
  Plus, Search, X, Loader2, TrendingUp, Phone, Mail, Edit2, Trash2, 
  MapPin, HelpCircle, UserCheck, MessageSquare, History, PhoneCall, CheckCircle, Clock
} from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'

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
  whatsapp_visit_msg_sent?: boolean
  whatsapp_msg_status?: string | null
  created_at: string
  assigned_to_profile?: { id: string; full_name: string }
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

const INDUSTRIES = ['Digital Marketing', 'Share Market', 'AI Course', 'BBA/MBA', 'Other']
const CALL_STATUSES = [
  { id: 'new', label: 'New Lead', color: '#6366f1' },
  { id: 'ringing', label: 'Ringing / No Answer', color: '#f59e0b' },
  { id: 'not_connected', label: 'Not Connected', color: '#ef4444' },
  { id: 'switched_off', label: 'Switched Off', color: '#6b7280' },
  { id: 'not_logical', label: 'Not Logical / Invalid', color: '#9ca3af' },
  { id: 'busy_callback', label: 'Busy / Call Back', color: '#8b5cf6' },
  { id: 'interested', label: 'Interested', color: '#06b6d4' },
  { id: 'visit_scheduled', label: 'Visit Scheduled', color: '#ec4899' },
  { id: 'closed_won', label: 'Enrolled (Closed)', color: '#10b981' },
  { id: 'closed_lost', label: 'Lost / Dropped', color: '#dc2626' },
]

const SOURCES = ['facebook_lead_ad', 'walk_in', 'referral', 'social_media', 'website', 'cold_call', 'other']
const CHART_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

export default function LeadsSection({ profile }: Props) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')
  
  // Modals state
  const [showModal, setShowModal] = useState(false)
  const [editLead, setEditLead] = useState<Lead | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  // Followup Drawer State
  const [selectedLeadForFollowup, setSelectedLeadForFollowup] = useState<Lead | null>(null)
  const [followupHistory, setFollowupHistory] = useState<FollowupRecord[]>([])
  const [loadingFollowups, setLoadingFollowups] = useState(false)
  const [newCallStatus, setNewCallStatus] = useState('ringing')
  const [newFollowupNotes, setNewFollowupNotes] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')

  const [form, setForm] = useState({
    client_name: '', phone: '', email: '', category: 'Digital Marketing', industry: 'Digital Marketing',
    status: 'new', source: 'facebook_lead_ad', notes: '', follow_up_date: '', platform: 'Facebook'
  })

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || ''
  }

  const fetchLeads = useCallback(async () => {
    const token = await getToken()
    const res = await fetch('/api/leads', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setLeads(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const openCreate = () => {
    setEditLead(null)
    setForm({ client_name: '', phone: '', email: '', category: 'Digital Marketing', industry: 'Digital Marketing', status: 'new', source: 'facebook_lead_ad', notes: '', follow_up_date: '', platform: 'Facebook' })
    setShowModal(true)
  }

  const openEdit = (lead: Lead) => {
    setEditLead(lead)
    setForm({
      client_name: lead.client_name,
      phone: lead.phone,
      email: lead.email || '',
      category: lead.category || lead.industry || 'Digital Marketing',
      industry: lead.industry || lead.category || 'Digital Marketing',
      status: lead.status,
      source: lead.source || 'facebook_lead_ad',
      notes: lead.notes || '',
      follow_up_date: lead.follow_up_date || '',
      platform: lead.platform || 'Facebook'
    })
    setShowModal(true)
  }

  const openFollowupModal = async (lead: Lead) => {
    setSelectedLeadForFollowup(lead)
    setNewCallStatus(lead.status === 'new' ? 'ringing' : lead.status)
    setNewFollowupNotes('')
    setScheduledTime('')
    setLoadingFollowups(true)

    const token = await getToken()
    const res = await fetch(`/api/leads/${lead.id}/followups`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (Array.isArray(data)) setFollowupHistory(data)
    setLoadingFollowups(false)
  }

  const handleLogFollowup = async () => {
    if (!selectedLeadForFollowup) return
    setSubmitting(true)
    const token = await getToken()

    const res = await fetch(`/api/leads/${selectedLeadForFollowup.id}/followups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        call_status: newCallStatus,
        notes: newFollowupNotes,
        scheduled_at: scheduledTime || null,
        whatsapp_visit: newCallStatus === 'visit_scheduled'
      })
    })

    if (res.ok) {
      // Re-fetch history & leads
      await openFollowupModal(selectedLeadForFollowup)
      fetchLeads()
    }
    setSubmitting(false)
  }

  const handleSendWhatsAppVisitMsg = (lead: Lead) => {
    const msg = `Hello ${lead.client_name}, thank you for your interest in RushiPandit Institute (${lead.industry || 'Digital Marketing'})! Your personal counselling session has been scheduled. Please find our institute location here: https://maps.google.com. Looking forward to meeting you!`
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(lead.phone)}&text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  const handleSubmit = async () => {
    if (!form.client_name || !form.phone) return
    setSubmitting(true)
    const token = await getToken()

    if (editLead) {
      await fetch(`/api/leads/${editLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
    } else {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
    }

    setShowModal(false)
    fetchLeads()
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    const token = await getToken()
    await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchLeads()
  }

  const filtered = leads.filter(l => {
    const matchSearch = l.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery)
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    const matchIndustry = filterIndustry === 'all' || (l.industry || l.category) === filterIndustry
    return matchSearch && matchStatus && matchIndustry
  })

  // Summary Metrics
  const closedWon = leads.filter(l => l.status === 'closed_won').length
  const conversionRate = leads.length > 0 ? Math.round((closedWon / leads.length) * 100) : 0

  const statusConfigMap = CALL_STATUSES.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {} as Record<string, typeof CALL_STATUSES[0]>)

  if (loading) {
    return <div className="skeleton" style={{ height: '400px' }} />
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            {profile.role === 'admin' ? 'Sales & Live Leads' : 'My Assigned Leads'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {leads.length} total leads — {conversionRate}% conversion rate
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} />
          Add Lead
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Leads', value: leads.length, color: '#6366f1' },
          { label: 'Active Pipeline', value: leads.filter(l => !['closed_won', 'closed_lost', 'not_logical'].includes(l.status)).length, color: '#06b6d4' },
          { label: 'Visits Scheduled', value: leads.filter(l => l.status === 'visit_scheduled').length, color: '#ec4899' },
          { label: 'Enrolled (Closed)', value: closedWon, color: '#10b981' },
        ].map(({ label, value, color }) => (
          <div key={label} className="stat-card">
            <div className="metric-value" style={{ color }}>{value}</div>
            <div className="metric-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input className="form-input" placeholder="Search by lead name or phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
        </div>
        
        <select className="form-select" style={{ width: 'auto' }} value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)}>
          <option value="all">All Industries / Courses</option>
          {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
        </select>

        <select className="form-select" style={{ width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Call Statuses</option>
          {CALL_STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>

      {/* Leads Grid / Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><TrendingUp size={24} /></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No leads found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lead Details</th>
                  <th>Industry</th>
                  <th>Dynamic Qualifications</th>
                  <th>Call Status</th>
                  <th>Follow-ups</th>
                  {profile.role === 'admin' && <th>Assigned To</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => {
                  const statusInfo = statusConfigMap[lead.status] || { label: lead.status, color: '#6366f1' }
                  const qualificationAnswers = lead.qualification_answers || {}
                  const qualEntries = Object.entries(qualificationAnswers)

                  return (
                    <tr key={lead.id}>
                      <td>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lead.client_name}</p>
                          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '3px' }}>
                            <a href={`tel:${lead.phone}`} style={{ fontSize: '0.78rem', color: 'var(--brand-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                              <Phone size={11} /> {lead.phone}
                            </a>
                            {lead.email && (
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Mail size={11} /> {lead.email}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                            Platform: {lead.platform || 'Facebook'} • Received {formatDate(lead.created_at, 'dd MMM, hh:mm a')}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#818cf8', fontWeight: 600 }}>
                          {lead.industry || lead.category || 'Digital Marketing'}
                        </span>
                      </td>
                      <td>
                        <div style={{ maxWidth: '280px' }}>
                          {qualEntries.length === 0 ? (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Standard Form</span>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {qualEntries.slice(0, 2).map(([key, val]) => (
                                <div key={key} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '3px 6px' }}>
                                  <strong style={{ color: 'var(--text-secondary)' }}>{key}:</strong> <span style={{ color: 'var(--text-muted)' }}>{String(val)}</span>
                                </div>
                              ))}
                              {qualEntries.length > 2 && (
                                <span style={{ fontSize: '0.7rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                                  +{qualEntries.length - 2} more answers
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{ background: `${statusInfo.color}20`, color: statusInfo.color, fontWeight: 700 }}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                            <History size={12} /> Follow up #{lead.followup_count || 0}
                          </div>
                          {lead.next_followup_at && (
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Clock size={10} /> Next: {formatDate(lead.next_followup_at, 'dd MMM, hh:mm a')}
                            </div>
                          )}
                        </div>
                      </td>
                      {profile.role === 'admin' && (
                        <td>
                          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                            {lead.assigned_to_profile?.full_name || 'Unassigned'}
                          </span>
                        </td>
                      )}
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => openFollowupModal(lead)}
                            data-tooltip="Call & Log Followup"
                          >
                            <PhoneCall size={13} />
                            Followup
                          </button>
                          
                          <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => handleSendWhatsAppVisitMsg(lead)}
                            data-tooltip="Send WhatsApp Visit Message"
                            style={{ color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.3)' }}
                          >
                            <MessageSquare size={13} />
                          </button>

                          <button className="btn btn-secondary btn-sm" onClick={() => openEdit(lead)} data-tooltip="Edit lead">
                            <Edit2 size={13} />
                          </button>
                          {profile.role === 'admin' && (
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(lead.id)} data-tooltip="Delete lead">
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Followup & Calling Drawer / Modal */}
      {selectedLeadForFollowup && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedLeadForFollowup(null)}>
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  Followup Log: {selectedLeadForFollowup.client_name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>
                  Phone: {selectedLeadForFollowup.phone} • Industry: {selectedLeadForFollowup.industry || 'Digital Marketing'}
                </p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedLeadForFollowup(null)}><X size={18} /></button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Dynamic Qualifications Card */}
              {selectedLeadForFollowup.qualification_answers && Object.keys(selectedLeadForFollowup.qualification_answers).length > 0 && (
                <div style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', padding: '1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#818cf8', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <HelpCircle size={14} /> Form Qualification Answers (Dynamic)
                  </h4>
                  <div className="grid-2" style={{ gap: '0.75rem' }}>
                    {Object.entries(selectedLeadForFollowup.qualification_answers).map(([key, val]) => (
                      <div key={key} style={{ background: 'var(--bg-elevated)', borderRadius: '8px', padding: '0.5rem 0.75rem', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{key}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{String(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Form for Log Call Result */}
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <PhoneCall size={14} style={{ color: 'var(--brand-primary)' }} /> Log Call Outcome (Followup #{ (selectedLeadForFollowup.followup_count || 0) + 1 })
                </h4>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label">Call Result / Status *</label>
                  <select className="form-select" value={newCallStatus} onChange={e => setNewCallStatus(e.target.value)}>
                    {CALL_STATUSES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label">Followup Notes / Remarks</label>
                  <textarea 
                    className="form-textarea" 
                    rows={2} 
                    placeholder="Enter call details, customer response, next steps..."
                    value={newFollowupNotes}
                    onChange={e => setNewFollowupNotes(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label">Schedule Next Followup Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="form-input"
                    value={scheduledTime}
                    onChange={e => setScheduledTime(e.target.value)}
                  />
                </div>

                <button 
                  className="btn btn-primary" 
                  onClick={handleLogFollowup} 
                  disabled={submitting}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {submitting ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : 'Save Followup Outcome'}
                </button>
              </div>

              {/* Timeline History */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <History size={14} /> Followup Timeline History
                </h4>

                {loadingFollowups ? (
                  <div className="skeleton" style={{ height: '80px' }} />
                ) : followupHistory.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No followups recorded yet for this lead.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '220px', overflowY: 'auto' }}>
                    {followupHistory.map(item => {
                      const sInfo = statusConfigMap[item.call_status] || { label: item.call_status, color: '#6366f1' }
                      return (
                        <div key={item.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span className="badge" style={{ background: `${sInfo.color}20`, color: sInfo.color, fontSize: '0.72rem', fontWeight: 700 }}>
                              Followup #{item.followup_number} — {sInfo.label}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {formatDate(item.completed_at, 'dd MMM, hh:mm a')}
                            </span>
                          </div>
                          {item.notes && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0' }}>{item.notes}</p>
                          )}
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            Logged by: {item.sales_rep?.full_name || 'Sales Rep'}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedLeadForFollowup(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{editLead ? 'Edit Lead' : 'Add New Lead'}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input className="form-input" placeholder="Full name" value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" placeholder="client@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Industry / Course *</label>
                  <select className="form-select" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value, category: e.target.value })}>
                    {INDUSTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Call Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    {CALL_STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Source Platform</label>
                  <select className="form-select" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}>
                    {SOURCES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Follow-up Date</label>
                  <input className="form-input" type="date" value={form.follow_up_date} onChange={e => setForm({ ...form, follow_up_date: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" placeholder="Lead notes..." rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting || !form.client_name || !form.phone}>
                {submitting ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : (editLead ? 'Update Lead' : 'Add Lead')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
