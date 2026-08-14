'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import {
  Video, PlayCircle, Grid3x3, Plus, CheckCircle2, AlertCircle,
  Pencil, Trash2, X, UserPlus, Edit2, Upload, Calendar,
  TrendingUp, BarChart2, Check, Clock, Layers, Sparkles
} from 'lucide-react'

interface LogEntry {
  id: string
  log_date: string
  count: number
  notes: string | null
  employee?: { full_name: string }
}

interface Deliverable {
  id: string
  content_type: string
  monthly_target: number
  completed: number
  remaining: number
  percent: number
  dailyBreakdown: Record<string, number>
  logs: LogEntry[]
}

interface Client {
  id: string
  name: string
  slug: string
  color: string
  logo_url?: string | null
  deliverables: Deliverable[]
}

const contentTypeIcon = (type: string) => {
  if (type === 'YouTube') return <PlayCircle size={14} />
  if (type === 'Static Post') return <Grid3x3 size={14} />
  return <Video size={14} />
}

const contentTypeColor = (type: string) => {
  if (type === 'YouTube') return '#ef4444'
  if (type === 'Static Post') return '#8b5cf6'
  return '#3b82f6'
}

export default function StrategySection({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [logModal, setLogModal] = useState<{ client: Client; deliverable: Deliverable } | null>(null)
  const [editModal, setEditModal] = useState<{ client: Client; deliverable: Deliverable } | null>(null)
  
  const [addClientModal, setAddClientModal] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [newClientColor, setNewClientColor] = useState('#6366f1')
  const [newClientLogo, setNewClientLogo] = useState('')
  const [newDeliverables, setNewDeliverables] = useState([
    { content_type: 'Reel', monthly_target: '15' },
    { content_type: 'YouTube', monthly_target: '8' },
    { content_type: 'Static Post', monthly_target: '20' },
  ])

  // Edit client modal
  const [editClientModal, setEditClientModal] = useState<Client | null>(null)
  const [editClientName, setEditClientName] = useState('')
  const [editClientColor, setEditClientColor] = useState('#6366f1')
  const [editClientLogo, setEditClientLogo] = useState('')
  const [editDeliverables, setEditDeliverables] = useState([
    { content_type: 'Reel', monthly_target: '' },
    { content_type: 'YouTube', monthly_target: '' },
    { content_type: 'Static Post', monthly_target: '' },
  ])

  const logoInputRef = useRef<HTMLInputElement>(null)
  const editLogoInputRef = useRef<HTMLInputElement>(null)
  const [logCount, setLogCount] = useState('1')
  const [logNote, setLogNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))

  const isAdmin = profile.role === 'admin'
  const canManageClients = isAdmin || profile.full_name?.toLowerCase().includes('kedar')
  const isMediaEmployee = profile.role === 'employee' &&
    (profile.department?.toLowerCase() === 'media' ||
     profile.designation?.toLowerCase().includes('video') ||
     profile.designation?.toLowerCase().includes('editor'))

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  const load = useCallback(async () => {
    const token = getToken()
    if (!token) return
    const res = await fetch(`/api/client-progress?month=${month}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (data.clients) {
      // Deduplicate deliverables on frontend as a safety measure
      const cleaned = data.clients.map((c: Client) => {
        const seenTypes = new Set<string>()
        const uniqueDelivs: Deliverable[] = []
        for (const d of (c.deliverables || [])) {
          if (!seenTypes.has(d.content_type)) {
            seenTypes.add(d.content_type)
            uniqueDelivs.push(d)
          }
        }
        return { ...c, deliverables: uniqueDelivs }
      })
      setClients(cleaned)
    }
    setLoading(false)
  }, [month, router])

  useEffect(() => { load() }, [load])

  const handleLogWork = async () => {
    if (!logModal || !logCount) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    
    await fetch('/api/client-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        client_id: logModal.client.id,
        deliverable_id: logModal.deliverable.id,
        count: Number(logCount),
        notes: logNote || undefined
      })
    })
    setLogModal(null); setLogCount('1'); setLogNote('')
    setSubmitting(false)
    load()
  }

  const uploadLogo = async (file: File): Promise<string> => {
    const token = getToken()
    if (!token) throw new Error('Unauthorized')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Upload failed')
    return data.url
  }

  const handleAddClient = async () => {
    if (!newClientName.trim()) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    const deliverables = newDeliverables
      .filter(d => Number(d.monthly_target) > 0)
      .map(d => ({ content_type: d.content_type, monthly_target: Number(d.monthly_target) }))

    await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: newClientName.trim(), color: newClientColor, logo_url: newClientLogo || null, deliverables })
    })

    setAddClientModal(false)
    setNewClientName('')
    setNewClientColor('#6366f1')
    setNewClientLogo('')
    setNewDeliverables([
      { content_type: 'Reel', monthly_target: '15' },
      { content_type: 'YouTube', monthly_target: '8' },
      { content_type: 'Static Post', monthly_target: '20' },
    ])
    setSubmitting(false)
    load()
  }

  const openEditClient = (client: Client) => {
    setEditClientModal(client)
    setEditClientName(client.name)
    setEditClientColor(client.color)
    setEditClientLogo(client.logo_url || '')
    const types = ['Reel', 'YouTube', 'Static Post']
    setEditDeliverables(types.map(ct => {
      const found = client.deliverables.find(d => d.content_type === ct)
      return { content_type: ct, monthly_target: found ? String(found.monthly_target) : '' }
    }))
  }

  const handleEditClient = async () => {
    if (!editClientModal) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    const deliverables = editDeliverables
      .filter(d => Number(d.monthly_target) > 0)
      .map(d => ({ content_type: d.content_type, monthly_target: Number(d.monthly_target) }))

    await fetch(`/api/clients?id=${editClientModal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: editClientName.trim(), color: editClientColor, logo_url: editClientLogo || null, deliverables })
    })

    setEditClientModal(null)
    setSubmitting(false)
    load()
  }

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to remove this client from the strategy panel?')) return
    const token = getToken()
    if (!token) return
    await fetch(`/api/clients?id=${clientId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setEditClientModal(null)
    load()
  }

  const handleDelete = async (logId: string) => {
    if (!confirm('Delete this log entry?')) return
    const token = getToken()
    if (!token) return
    setDeleting(logId)
    await fetch(`/api/client-progress?id=${logId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    setDeleting(null)
    load()
  }

  if (!isAdmin && !isMediaEmployee) return null

  const monthLabel = new Date(`${month}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const d0 = new Date(`${month}-01T00:00:00`)
  const totalDays = new Date(d0.getFullYear(), d0.getMonth() + 1, 0).getDate()
  const todayDay = new Date().getDate()
  const monthProgress = Math.min(100, Math.round((todayDay / totalDays) * 100))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            {isAdmin ? 'Strategy & Production Panel' : 'My Client Deliverables'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {isAdmin ? 'Track monthly social media video, reel, and graphic production targets per client' : 'Log your completed content and editing deliverables'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {canManageClients && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setAddClientModal(true)}
            >
              <UserPlus size={15} /> Add Client
            </button>
          )}
          <input
            type="month"
            className="form-input"
            value={month}
            max={new Date().toISOString().slice(0, 7)}
            onChange={e => setMonth(e.target.value)}
            style={{ width: 'auto', height: '36px', fontSize: '0.82rem', padding: '0 0.75rem' }}
          />
        </div>
      </div>

      {/* ── Month Pace Banner ── */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} style={{ color: 'var(--brand-primary)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{monthLabel} Pace</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Day {todayDay} of {totalDays} &nbsp;·&nbsp; <strong style={{ color: 'var(--text-primary)' }}>{monthProgress}%</strong> of month elapsed
          </span>
        </div>
        <div style={{ height: '7px', borderRadius: '99px', background: 'var(--bg-surface)', overflow: 'hidden', border: '1px solid var(--border-default)' }}>
          <div style={{ height: '100%', borderRadius: '99px', width: `${monthProgress}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* ── Client Cards Grid ── */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card" style={{ height: '260px', opacity: 0.5 }} />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon">
            <Layers size={24} />
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            No clients found. Click &quot;Add Client&quot; to set monthly targets.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
          {clients.map(client => {
            const totalTarget = client.deliverables.reduce((s, d) => s + d.monthly_target, 0)
            const totalDone = client.deliverables.reduce((s, d) => s + d.completed, 0)
            const pct = totalTarget > 0 ? Math.round((totalDone / totalTarget) * 100) : 0
            const paceColor = pct >= 100 ? '#16a34a' : pct >= monthProgress ? '#4f46e5' : '#d97706'

            return (
              <div
                key={client.id}
                className="glass-card"
                style={{
                  display: 'flex', flexDirection: 'column', overflow: 'hidden',
                  borderTop: `4px solid ${client.color || 'var(--brand-primary)'}`
                }}
              >
                {/* Header */}
                <div style={{
                  padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-default)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {client.logo_url ? (
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-default)' }}
                      />
                    ) : (
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '10px',
                        background: `${client.color}15`, border: `1px solid ${client.color}35`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: client.color }}>
                          {client.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                        {client.name}
                      </h3>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 600 }}>
                        {totalDone} / {totalTarget} deliverables finished
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    {canManageClients && (
                      <button
                        onClick={() => openEditClient(client)}
                        className="btn btn-ghost btn-sm"
                        style={{ width: '30px', height: '30px', padding: 0, justifyContent: 'center' }}
                        title="Edit client targets"
                      >
                        <Edit2 size={13} />
                      </button>
                    )}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: paceColor, lineHeight: 1 }}>
                        {pct}%
                      </div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                        complete
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deliverables rows */}
                <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  {client.deliverables.map(deliv => {
                    const color = contentTypeColor(deliv.content_type)
                    const isComplete = deliv.completed >= deliv.monthly_target
                    const isBehind = deliv.percent < monthProgress && !isComplete
                    const hasLogs = deliv.logs && deliv.logs.length > 0

                    return (
                      <div key={deliv.id} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color }}>
                            {contentTypeIcon(deliv.content_type)}
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                              {deliv.content_type}
                            </span>
                            {isComplete && <CheckCircle2 size={13} style={{ color: '#16a34a' }} />}
                            {isBehind && <AlertCircle size={13} style={{ color: '#d97706' }} />}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isComplete ? '#16a34a' : 'var(--text-primary)' }}>
                              {deliv.completed} / {deliv.monthly_target}
                            </span>

                            {/* View / Edit Log History */}
                            {hasLogs && (
                              <button
                                onClick={() => setEditModal({ client, deliverable: deliv })}
                                className="btn btn-ghost btn-sm"
                                style={{ width: '24px', height: '24px', padding: 0, justifyContent: 'center', borderRadius: '6px' }}
                                title="View log history"
                              >
                                <Pencil size={11} />
                              </button>
                            )}

                            {/* Log Work Button */}
                            {!isAdmin && (
                              <button
                                onClick={() => setLogModal({ client, deliverable: deliv })}
                                style={{
                                  width: '24px', height: '24px', borderRadius: '6px',
                                  background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
                                  color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                                title="Log completed work"
                              >
                                <Plus size={13} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ height: '7px', borderRadius: '99px', background: 'var(--bg-surface)', overflow: 'hidden', border: '1px solid var(--border-default)' }}>
                          <div style={{
                            height: '100%', borderRadius: '99px', width: `${deliv.percent}%`,
                            background: isComplete ? '#16a34a' : isBehind ? '#d97706' : color,
                            transition: 'width 0.4s ease'
                          }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {deliv.percent}% finished
                          </span>
                          <span style={{ fontSize: '0.68rem', color: isBehind ? '#d97706' : 'var(--text-muted)', fontWeight: 600 }}>
                            {deliv.remaining} remaining{isBehind && ' (Behind Pace)'}
                          </span>
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

      {/* ── Log Work Modal ── */}
      {logModal && (
        <div className="modal-overlay" onClick={() => setLogModal(null)}>
          <div className="modal-content" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                Log {logModal.deliverable.content_type} for {logModal.client.name}
              </h3>
              <button onClick={() => setLogModal(null)} className="btn btn-ghost btn-sm"><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Count Completed Today</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={logCount}
                  onChange={e => setLogCount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Notes / Links (Optional)</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Video topic, link, or remarks..."
                  value={logNote}
                  onChange={e => setLogNote(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setLogModal(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleLogWork} disabled={submitting || !logCount} className="btn btn-primary">
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Client Modal ── */}
      {addClientModal && (
        <div className="modal-overlay" onClick={() => setAddClientModal(false)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>Add New Client</h3>
              <button onClick={() => setAddClientModal(false)} className="btn btn-ghost btn-sm"><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Amazon, CA Sir, Stock Pro"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Target Deliverables</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
                  {newDeliverables.map((d, i) => (
                    <div key={d.content_type}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{d.content_type}</label>
                      <input
                        type="number"
                        className="form-input"
                        value={d.monthly_target}
                        onChange={e => {
                          const copy = [...newDeliverables]
                          copy[i].monthly_target = e.target.value
                          setNewDeliverables(copy)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setAddClientModal(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleAddClient} disabled={submitting || !newClientName.trim()} className="btn btn-primary">
                Create Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Client Modal ── */}
      {editClientModal && (
        <div className="modal-overlay" onClick={() => setEditClientModal(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                Edit Client: {editClientModal.name}
              </h3>
              <button onClick={() => setEditClientModal(null)} className="btn btn-ghost btn-sm"><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={editClientName}
                  onChange={e => setEditClientName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Target Deliverables</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
                  {editDeliverables.map((d, i) => (
                    <div key={d.content_type}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{d.content_type}</label>
                      <input
                        type="number"
                        className="form-input"
                        value={d.monthly_target}
                        onChange={e => {
                          const copy = [...editDeliverables]
                          copy[i].monthly_target = e.target.value
                          setEditDeliverables(copy)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteClient(editClientModal.id)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={13} /> Remove Client
                </button>
              )}
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                <button onClick={() => setEditClientModal(null)} className="btn btn-secondary">Cancel</button>
                <button onClick={handleEditClient} disabled={submitting || !editClientName.trim()} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Log History Modal ── */}
      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                {editModal.deliverable.content_type} Log History ({editModal.client.name})
              </h3>
              <button onClick={() => setEditModal(null)} className="btn btn-ghost btn-sm"><X size={16} /></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '350px', overflowY: 'auto' }}>
              {editModal.deliverable.logs.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>
                  No logs recorded for this month
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {editModal.deliverable.logs.map(l => (
                    <div
                      key={l.id}
                      style={{
                        padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid var(--border-default)',
                        background: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            +{l.count} {editModal.deliverable.content_type}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{l.log_date}</span>
                        </div>
                        {l.notes && <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>{l.notes}</p>}
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                          Logged by: {l.employee?.full_name || 'Staff'}
                        </p>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(l.id)}
                          disabled={deleting === l.id}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '4px 8px' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={() => setEditModal(null)} className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
