'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { Video, PlayCircle, Grid3x3, Plus, CheckCircle2, AlertCircle, Pencil, Trash2, X, UserPlus, Edit2, Upload, Image } from 'lucide-react'

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
  if (type === 'YouTube') return <PlayCircle size={13} />
  if (type === 'Static Post') return <Grid3x3 size={13} />
  return <Video size={13} />
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
    { content_type: 'Reel', monthly_target: '' },
    { content_type: 'YouTube', monthly_target: '' },
    { content_type: 'Static Post', monthly_target: '' },
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
    const res = await fetch(`/api/client-progress?month=${month}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (data.clients) setClients(data.clients)
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

  // Upload logo via server-side API
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
      { content_type: 'Reel', monthly_target: '' },
      { content_type: 'YouTube', monthly_target: '' },
      { content_type: 'Static Post', monthly_target: '' },
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

  const handleDelete = async (logId: string) => {
    if (!confirm('Delete this entry?')) return
    const token = getToken()
    if (!token) return
    setDeleting(logId)
    await fetch(`/api/client-progress?id=${logId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    setDeleting(null)
    // Reload data and update the modal's deliverable reference
    const res = await fetch(`/api/client-progress?month=${month}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (data.clients) {
      setClients(data.clients)
      if (editModal) {
        const updClient = data.clients.find((c: Client) => c.id === editModal.client.id)
        if (updClient) {
          const updDel = updClient.deliverables.find((d: Deliverable) => d.id === editModal.deliverable.id)
          if (updDel) setEditModal({ client: updClient, deliverable: updDel })
        }
      }
    }
  }

  if (!isAdmin && !isMediaEmployee) return null

  const monthLabel = new Date(`${month}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  // Correct days-in-month: day 0 of next month = last day of current month
  const d0 = new Date(`${month}-01T00:00:00`)
  const totalDays = new Date(d0.getFullYear(), d0.getMonth() + 1, 0).getDate()
  const todayDay = new Date().getDate()
  const monthProgress = Math.min(100, Math.round((todayDay / totalDays) * 100))

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>
            {isAdmin ? 'Strategy Panel' : 'My Client Work'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {isAdmin ? 'VoodooMedia client production tracker' : 'Log your editing work for each client'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {canManageClients && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setAddClientModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
            >
              <UserPlus size={15} />
              Add Client
            </button>
          )}
          <input
            type="month" className="form-input" value={month}
            max={new Date().toISOString().slice(0, 7)}
            onChange={e => setMonth(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
          />
        </div>
      </div>

      {/* Month progress bar */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700 }}>{monthLabel}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Day {todayDay} of {totalDays} — {monthProgress}% through month</p>
        </div>
        <div style={{ height: '6px', borderRadius: '99px', background: 'var(--border-subtle)' }}>
          <div style={{ height: '6px', borderRadius: '99px', width: `${monthProgress}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
        </div>
      </div>

      {/* Client cards */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '220px', borderRadius: 'var(--radius-lg)' }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {clients.map(client => (
            <div key={client.id} className="glass-card" style={{ overflow: 'hidden', borderTop: `3px solid ${client.color}` }}>

              {/* Client header */}
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  {/* Logo or initials */}
                  {client.logo_url ? (
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${client.color}40` }}
                    />
                  ) : (
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${client.color}20`, border: `1px solid ${client.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: client.color }}>{client.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '0.95rem' }}>{client.name}</p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      {client.deliverables.reduce((s, d) => s + d.completed, 0)} / {client.deliverables.reduce((s, d) => s + d.monthly_target, 0)} total
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {canManageClients && (
                    <button
                      onClick={() => openEditClient(client)}
                      style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6366f1', padding: 0 }}
                      title="Edit client"
                    >
                      <Edit2 size={13} />
                    </button>
                  )}
                  {(() => {
                    const total = client.deliverables.reduce((s, d) => s + d.monthly_target, 0)
                    const done = client.deliverables.reduce((s, d) => s + d.completed, 0)
                    const pct = total > 0 ? Math.round((done / total) * 100) : 0
                    const color = pct >= 100 ? '#10b981' : pct >= monthProgress ? '#6366f1' : '#f59e0b'
                    return <div style={{ textAlign: 'right' }}><div style={{ fontSize: '1.5rem', fontWeight: 800, color }}>{pct}%</div><div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>complete</div></div>
                  })()}
                </div>
              </div>

              {/* Deliverables */}
              <div style={{ padding: '0.875rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {client.deliverables.map(deliv => {
                  const color = contentTypeColor(deliv.content_type)
                  const isComplete = deliv.completed >= deliv.monthly_target
                  const isBehind = deliv.percent < monthProgress && !isComplete
                  const hasLogs = deliv.logs && deliv.logs.length > 0

                  return (
                    <div key={deliv.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color }}>
                          {contentTypeIcon(deliv.content_type)}
                          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{deliv.content_type}</span>
                          {isComplete && <CheckCircle2 size={12} style={{ color: '#10b981' }} />}
                          {isBehind && <AlertCircle size={12} style={{ color: '#f59e0b' }} />}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: isComplete ? '#10b981' : 'var(--text-primary)' }}>
                            {deliv.completed} / {deliv.monthly_target}
                          </span>
                          {/* Edit logs button — admin always, employee if they have logs */}
                          {hasLogs && (
                            <button
                              onClick={() => setEditModal({ client, deliverable: deliv })}
                              style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6366f1', padding: 0 }}
                              title="View / delete entries"
                            >
                              <Pencil size={11} />
                            </button>
                          )}
                          {/* Add log — employee only */}
                          {!isAdmin && (
                            <button
                              onClick={() => setLogModal({ client, deliverable: deliv })}
                              style={{ width: '22px', height: '22px', borderRadius: '50%', background: color + '20', border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color, padding: 0 }}
                              title="Log completed work"
                            >
                              <Plus size={13} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div style={{ position: 'relative', height: '8px', borderRadius: '99px', background: 'var(--border-subtle)', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: `${monthProgress}%`, width: '2px', height: '100%', background: 'rgba(255,255,255,0.3)', zIndex: 2 }} />
                        <div style={{
                          height: '8px', borderRadius: '99px', transition: 'width 0.4s ease', width: `${deliv.percent}%`,
                          background: isComplete ? 'linear-gradient(90deg,#10b981,#06b6d4)' : isBehind ? 'linear-gradient(90deg,#f59e0b,#fb923c)' : `linear-gradient(90deg,${color},${color}99)`
                        }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{deliv.percent}% done</span>
                        <span style={{ fontSize: '0.62rem', color: isBehind ? '#f59e0b' : 'var(--text-muted)' }}>
                          {deliv.remaining} remaining{isBehind && ' ⚠️'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add Client Modal ── */}
      {addClientModal && (
        <div className="modal-overlay" onClick={() => setAddClientModal(false)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Add New Client</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>Set the client name, color, and monthly production targets</p>
              </div>
              <button onClick={() => setAddClientModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}><X size={16} /></button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Client Name */}
              <div>
                <label className="form-label">Client Name *</label>
                <input
                  type="text" className="form-input"
                  placeholder="e.g. Amazon, MBC, CA Sir"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                  style={{ width: '100%' }}
                  autoFocus
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="form-label">Brand Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#06b6d4','#ec4899','#84cc16','#f97316'].map(c => (
                    <div
                      key={c}
                      onClick={() => setNewClientColor(c)}
                      style={{
                        width: '26px', height: '26px', borderRadius: '50%', background: c,
                        cursor: 'pointer', flexShrink: 0,
                        border: newClientColor === c ? '3px solid white' : '3px solid transparent',
                        boxShadow: newClientColor === c ? `0 0 0 2px ${c}` : 'none',
                        transition: 'all 0.15s'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="form-label">Client Logo (optional)</label>
                <input
                  ref={logoInputRef}
                  type="file" accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const url = await uploadLogo(file)
                      setNewClientLogo(url)
                    } catch (err: any) {
                      alert(err.message || 'Upload failed')
                    }
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {newClientLogo ? (
                    <img src={newClientLogo} alt="logo" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-default)' }} />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bg-elevated)', border: '1px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image size={18} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  )}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => logoInputRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Upload size={13} /> Upload File
                  </button>
                  {newClientLogo && <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }} onClick={() => setNewClientLogo('')}>Remove</button>}
                </div>
                <input
                  type="url" className="form-input"
                  placeholder="Or paste image URL (https://...)"
                  value={newClientLogo}
                  onChange={e => setNewClientLogo(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.8rem' }}
                />
              </div>

              {/* Monthly Targets */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.6rem', display: 'block' }}>Monthly Targets</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {newDeliverables.map((d, i) => (
                    <div key={d.content_type} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', padding: '0.6rem 0.875rem', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '110px', color: contentTypeColor(d.content_type) }}>
                        {contentTypeIcon(d.content_type)}
                        <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{d.content_type}</span>
                      </div>
                      <input
                        type="number" min="0" max="999"
                        className="form-input"
                        placeholder="0 = skip"
                        value={d.monthly_target}
                        onChange={e => {
                          const updated = [...newDeliverables]
                          updated[i] = { ...updated[i], monthly_target: e.target.value }
                          setNewDeliverables(updated)
                        }}
                        style={{ width: '90px', padding: '0.35rem 0.6rem', textAlign: 'center' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ month</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Leave target as 0 to skip that content type for this client.</p>
              </div>
            </div>

            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setAddClientModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handleAddClient}
                disabled={submitting || !newClientName.trim()}
              >
                {submitting ? 'Creating...' : '+ Create Client'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Client Modal ── */}
      {editClientModal && (
        <div className="modal-overlay" onClick={() => setEditClientModal(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Edit Client — {editClientModal.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>Update name, logo, color, and monthly targets</p>
              </div>
              <button onClick={() => setEditClientModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}><X size={16} /></button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Client Name */}
              <div>
                <label className="form-label">Client Name *</label>
                <input type="text" className="form-input" value={editClientName} onChange={e => setEditClientName(e.target.value)} style={{ width: '100%' }} autoFocus />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="form-label">Client Logo</label>
                <input ref={editLogoInputRef} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={async e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try { const url = await uploadLogo(file); setEditClientLogo(url) } catch (err: any) { alert(err.message || 'Upload failed') }
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {editClientLogo ? (
                    <img src={editClientLogo} alt="logo" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-default)' }} />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bg-elevated)', border: '1px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image size={18} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  )}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => editLogoInputRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Upload size={13} /> {editClientLogo ? 'Change File' : 'Upload File'}
                  </button>
                  {editClientLogo && <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }} onClick={() => setEditClientLogo('')}>Remove</button>}
                </div>
                <input
                  type="url" className="form-input"
                  placeholder="Or paste image URL (https://...)"
                  value={editClientLogo}
                  onChange={e => setEditClientLogo(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.8rem' }}
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="form-label">Brand Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#06b6d4','#ec4899','#84cc16','#f97316'].map(c => (
                    <div key={c} onClick={() => setEditClientColor(c)} style={{ width: '26px', height: '26px', borderRadius: '50%', background: c, cursor: 'pointer', flexShrink: 0, border: editClientColor === c ? '3px solid white' : '3px solid transparent', boxShadow: editClientColor === c ? `0 0 0 2px ${c}` : 'none', transition: 'all 0.15s' }} />
                  ))}
                </div>
              </div>

              {/* Monthly Targets */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.6rem', display: 'block' }}>Monthly Targets</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {editDeliverables.map((d, i) => (
                    <div key={d.content_type} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', padding: '0.6rem 0.875rem', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '110px', color: contentTypeColor(d.content_type) }}>
                        {contentTypeIcon(d.content_type)}
                        <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{d.content_type}</span>
                      </div>
                      <input type="number" min="0" max="999" className="form-input" placeholder="0 = skip" value={d.monthly_target}
                        onChange={e => { const u = [...editDeliverables]; u[i] = { ...u[i], monthly_target: e.target.value }; setEditDeliverables(u) }}
                        style={{ width: '90px', padding: '0.35rem 0.6rem', textAlign: 'center' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ month</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Set target to 0 to remove that content type.</p>
              </div>
            </div>

            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setEditClientModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleEditClient} disabled={submitting || !editClientName.trim()}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Log Work Modal ── */}
      {logModal && (
        <div className="modal-overlay" onClick={() => setLogModal(null)}>
          <div className="modal-content" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Log Completed Work</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>{logModal.client.name} — {logModal.deliverable.content_type}</p>
              </div>
              <button onClick={() => setLogModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">How many completed today?</label>
                <input type="number" className="form-input" value={logCount} min="1" max="50"
                  onChange={e => setLogCount(e.target.value)} style={{ width: '100%' }} autoFocus />
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Currently: {logModal.deliverable.completed} / {logModal.deliverable.monthly_target} this month
                </p>
              </div>
              <div>
                <label className="form-label">Notes (optional)</label>
                <input type="text" className="form-input" value={logNote} placeholder="e.g. CA Reel 3 — grading done"
                  onChange={e => setLogNote(e.target.value)} style={{ width: '100%' }} />
              </div>
            </div>
            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setLogModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleLogWork} disabled={submitting}>
                {submitting ? 'Saving...' : `Log ${logCount} ${logModal.deliverable.content_type}${Number(logCount) > 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit / Delete Logs Modal ── */}
      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(null)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>
                  {editModal.client.name} — {editModal.deliverable.content_type} Logs
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                  {editModal.deliverable.completed} / {editModal.deliverable.monthly_target} completed · delete wrong entries below
                </p>
              </div>
              <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}><X size={16} /></button>
            </div>

            <div style={{ padding: '0.75rem 0', maxHeight: '400px', overflowY: 'auto' }}>
              {editModal.deliverable.logs.length === 0 ? (
                <p style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>No entries for this month</p>
              ) : (
                editModal.deliverable.logs.map(log => (
                  <div key={log.id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.15s'
                  }}>
                    {/* Date */}
                    <div style={{ minWidth: '72px' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        {new Date(log.log_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        {new Date(log.log_date).toLocaleDateString('en-IN', { weekday: 'short' })}
                      </p>
                    </div>

                    {/* Count badge */}
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{log.count}</span>
                    </div>

                    {/* Notes */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {log.notes || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>No notes</span>}
                      </p>
                      {log.employee && (
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{(log.employee as any).full_name}</p>
                      )}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(log.id)}
                      disabled={deleting === log.id}
                      style={{
                        width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0, padding: 0,
                        background: deleting === log.id ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: deleting === log.id ? 'wait' : 'pointer', color: '#ef4444', transition: 'all 0.15s'
                      }}
                      title="Delete this entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setEditModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
