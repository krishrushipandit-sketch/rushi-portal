'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import {
  Video, PlayCircle, Grid3x3, Plus, CheckCircle2, AlertCircle,
  Pencil, Trash2, X, UserPlus, Edit2, Upload, Calendar,
  TrendingUp, BarChart2, Check, Clock, Layers, Sparkles, SlidersHorizontal, Settings2
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
  client_type?: 'internal' | 'external'
  deliverables: Deliverable[]
  totalVolume?: number
  totalLogs?: number
  allLogs?: any[]
}

const contentTypeIcon = (type: string) => {
  if (type === 'YouTube') return <PlayCircle size={14} />
  if (type === 'Static Post' || type === 'Carousel') return <Grid3x3 size={14} />
  return <Video size={14} />
}

const contentTypeColor = (type: string) => {
  if (type === 'YouTube') return '#ef4444'
  if (type === 'Static Post') return '#8b5cf6'
  if (type === 'Carousel') return '#ec4899'
  if (type === 'Shooting') return '#f59e0b'
  return '#3b82f6'
}

export default function StrategySection({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'internal' | 'external'>('all')
  const [logModal, setLogModal] = useState<{ client: Client; deliverable: Deliverable } | null>(null)
  const [editModal, setEditModal] = useState<{ client: Client; deliverable: Deliverable } | null>(null)
  
  // Quick Target Editor Modal
  const [quickTargetModal, setQuickTargetModal] = useState<{ client: Client; deliverable: Deliverable } | null>(null)
  const [quickTargetValue, setQuickTargetValue] = useState('')

  const [addClientModal, setAddClientModal] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [newClientColor, setNewClientColor] = useState('#6366f1')
  const [newClientLogo, setNewClientLogo] = useState('')
  const [newClientType, setNewClientType] = useState<'internal' | 'external'>('external')
  const [newCustomFormat, setNewCustomFormat] = useState('')
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
  const [editClientType, setEditClientType] = useState<'internal' | 'external'>('external')
  const [editCustomFormat, setEditCustomFormat] = useState('')
  const [editDeliverables, setEditDeliverables] = useState<{ content_type: string; monthly_target: string }[]>([
    { content_type: 'Reel', monthly_target: '' },
    { content_type: 'YouTube', monthly_target: '' },
    { content_type: 'Static Post', monthly_target: '' },
  ])

  const logoInputRef = useRef<HTMLInputElement>(null)
  const editLogoInputRef = useRef<HTMLInputElement>(null)
  const [logCount, setLogCount] = useState('1')
  const [logNote, setLogNote] = useState('')
  const [logPhase, setLogPhase] = useState<string>('production')
  const [logTitle, setLogTitle] = useState<string>('')
  const [logPlatform, setLogPlatform] = useState<string>('Instagram')
  const [logLiveUrl, setLogLiveUrl] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
  const [expandedClientIds, setExpandedClientIds] = useState<string[]>([])

  const isAdmin = profile.role === 'admin'
  const canManageClients = isAdmin ||
    profile.full_name?.toLowerCase().includes('kedar') ||
    profile.email?.toLowerCase().includes('kedar') ||
    profile.department?.toLowerCase() === 'client_management' ||
    profile.department?.toLowerCase() === 'strategy'
  const isMediaEmployee = profile.role === 'employee' &&
    (profile.department?.toLowerCase() === 'media' ||
     profile.department?.toLowerCase() === 'client_management' ||
     profile.department?.toLowerCase() === 'strategy' ||
     profile.designation?.toLowerCase().includes('video') ||
     profile.designation?.toLowerCase().includes('editor') ||
     profile.full_name?.toLowerCase().includes('kedar') ||
     profile.email?.toLowerCase().includes('kedar'))

  const toggleExpandClient = (clientId: string) => {
    setExpandedClientIds(prev =>
      prev.includes(clientId) ? prev.filter(id => id !== clientId) : [...prev, clientId]
    )
  }

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
  }, [month])

  useEffect(() => {
    load()
  }, [load])

  const handleLogProgress = async () => {
    if (!logModal) return
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
        notes: logNote || undefined,
        task_phase: logPhase,
        title: logTitle || undefined,
        platform: logPlatform,
        live_url: logLiveUrl || undefined,
        status: 'published'
      })
    })
    setLogModal(null)
    setLogCount('1')
    setLogNote('')
    setLogTitle('')
    setLogLiveUrl('')
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
      .filter(d => newClientType === 'internal' || Number(d.monthly_target) > 0)
      .map(d => ({ content_type: d.content_type, monthly_target: Number(d.monthly_target) || 0 }))

    await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: newClientName.trim(),
        color: newClientColor,
        logo_url: newClientLogo || null,
        client_type: newClientType,
        deliverables,
        month
      })
    })

    setAddClientModal(false)
    setNewClientName('')
    setNewClientColor('#6366f1')
    setNewClientLogo('')
    setNewClientType('external')
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
    setEditClientType(client.client_type || 'external')
    setEditCustomFormat('')
    
    // Include all existing deliverables
    const existing = (client.deliverables || []).map(d => ({
      content_type: d.content_type,
      monthly_target: String(d.monthly_target)
    }))
    
    // Add standard types if not present
    const defaultTypes = ['Reel', 'YouTube', 'Static Post', 'Carousel', 'Shooting']
    for (const t of defaultTypes) {
      if (!existing.some(d => d.content_type.toLowerCase() === t.toLowerCase())) {
        existing.push({ content_type: t, monthly_target: '' })
      }
    }
    setEditDeliverables(existing)
  }

  const handleQuickUpdateTarget = async (newTarget: number) => {
    if (!quickTargetModal) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    
    const updatedDeliverables = quickTargetModal.client.deliverables.map(d => ({
      content_type: d.content_type,
      monthly_target: d.id === quickTargetModal.deliverable.id ? newTarget : d.monthly_target
    }))
    
    const res = await fetch(`/api/clients?id=${quickTargetModal.client.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ deliverables: updatedDeliverables, month })
    })
    
    if (!res.ok) {
      const data = await res.json()
      alert(data.error || 'Failed to update target')
    }
    
    setQuickTargetModal(null)
    setSubmitting(false)
    load()
  }

  const handleEditClient = async () => {
    if (!editClientModal) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    const deliverables = editDeliverables
      .filter(d => editClientType === 'internal' || Number(d.monthly_target) > 0)
      .map(d => ({ content_type: d.content_type, monthly_target: Number(d.monthly_target) || 0 }))

    const res = await fetch(`/api/clients?id=${editClientModal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: editClientName.trim(),
        color: editClientColor,
        logo_url: editClientLogo || null,
        client_type: editClientType,
        deliverables,
        month
      })
    })

    if (!res.ok) {
      const data = await res.json()
      alert(data.error || 'Failed to save changes')
    }

    setEditClientModal(null)
    setSubmitting(false)
    load()
  }

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to remove this client from the strategy panel?')) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    const res = await fetch(`/api/clients?id=${clientId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) {
      const data = await res.json()
      alert(data.error || 'Failed to remove client')
    } else {
      setClients(prev => prev.filter(c => c.id !== clientId))
    }
    setEditClientModal(null)
    setSubmitting(false)
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
            {isAdmin ? 'Media Strategy & Production Hub' : 'My Deliverables & Content Calendar'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {isAdmin ? 'Manage internal brand channels (7 properties) & external client monthly targets' : 'Log completed shoots, video edits, posts, carousels, and publishing deliverables'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {canManageClients && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setAddClientModal(true)}
            >
              <UserPlus size={15} /> Add Brand / Client
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

      {/* ── Category Segmented Filter Switcher ── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { id: 'all', label: `🌟 All Channels (${clients.length})` },
          { id: 'internal', label: `🏢 Internal Brands (${clients.filter(c => c.client_type === 'internal').length})` },
          { id: 'external', label: `🤝 External Clients (${clients.filter(c => c.client_type !== 'internal').length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id as any)}
            style={{
              padding: '7px 16px', borderRadius: '99px', border: 'none', cursor: 'pointer',
              fontSize: '0.78rem', fontWeight: 700, transition: 'all 0.15s',
              background: categoryFilter === tab.id
                ? (tab.id === 'internal' ? '#10b981' : tab.id === 'external' ? '#6366f1' : 'var(--brand-primary)')
                : 'var(--bg-elevated)',
              color: categoryFilter === tab.id ? 'white' : 'var(--text-secondary)',
              boxShadow: categoryFilter === tab.id ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Month Pace Banner ── */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} style={{ color: 'var(--brand-primary)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{monthLabel} Production Schedule</span>
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
      ) : (() => {
        const displayedClients = clients.filter(c => {
          if (categoryFilter === 'internal') return c.client_type === 'internal'
          if (categoryFilter === 'external') return c.client_type !== 'internal'
          return true
        })

        if (displayedClients.length === 0) {
          return (
            <div className="glass-card empty-state">
              <div className="empty-state-icon">
                <Layers size={24} />
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                No {categoryFilter === 'internal' ? 'internal brands' : categoryFilter === 'external' ? 'clients' : 'channels'} found.
              </p>
            </div>
          )
        }

        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
            {displayedClients.map(client => {
              const isInternal = client.client_type === 'internal'
              const totalTarget = client.deliverables.reduce((s, d) => s + d.monthly_target, 0)
              const totalDone = client.deliverables.reduce((s, d) => s + d.completed, 0)
              const pct = totalTarget > 0 ? Math.round((totalDone / totalTarget) * 100) : 0
              const paceColor = isInternal ? '#10b981' : (pct >= 100 ? '#16a34a' : pct >= monthProgress ? '#4f46e5' : '#d97706')

              return (
                <div
                  key={client.id}
                  className="glass-card"
                  style={{
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    borderTop: `4px solid ${client.color || (isInternal ? '#10b981' : 'var(--brand-primary)')}`
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
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                            const fallback = (e.target as HTMLElement).parentElement?.querySelector('.logo-fallback');
                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                          }}
                          style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'contain', background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
                        />
                      ) : null}
                      <div
                        className="logo-fallback"
                        style={{
                          display: client.logo_url ? 'none' : 'flex',
                          width: '38px', height: '38px', borderRadius: '10px',
                          background: `${client.color || (isInternal ? '#10b981' : '#6366f1')}15`,
                          border: `1px solid ${client.color || (isInternal ? '#10b981' : '#6366f1')}35`,
                          alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: client.color || (isInternal ? '#10b981' : '#6366f1') }}>
                          {client.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h3 style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)', margin: 0 }}>
                            {client.name}
                          </h3>
                          <span style={{
                            fontSize: '0.58rem', fontWeight: 700, padding: '1px 5px', borderRadius: '4px',
                            background: isInternal ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
                            color: isInternal ? '#10b981' : '#818cf8', flexShrink: 0
                          }}>
                            {isInternal ? 'Internal' : 'Client'}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0', fontWeight: 600 }}>
                          {isInternal
                            ? `Total Volume: ${totalDone} items produced`
                            : `${totalDone} / ${totalTarget} deliverables completed`}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      {canManageClients && (
                        <button
                          onClick={() => openEditClient(client)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center',
                            transition: 'color 0.15s'
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                          title="Edit client details or monthly targets"
                        >
                          <Settings2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', flex: 1 }}>
                    {client.deliverables.length === 0 ? (
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>
                        No content format targets configured.
                      </p>
                    ) : (
                      client.deliverables.map(deliv => {
                        const dPercent = deliv.percent
                        const dColor = contentTypeColor(deliv.content_type)
                        const isDone = !isInternal && deliv.monthly_target > 0 && deliv.completed >= deliv.monthly_target

                        return (
                          <div key={deliv.id || deliv.content_type} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: dColor, display: 'flex', alignItems: 'center' }}>
                                  {contentTypeIcon(deliv.content_type)}
                                </span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                  {deliv.content_type}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: isDone ? '#16a34a' : 'var(--text-primary)' }}>
                                  {deliv.completed} {isInternal ? 'done' : `/ ${deliv.monthly_target}`}
                                </span>

                                <button
                                  onClick={() => {
                                    setLogModal({ client, deliverable: deliv })
                                    setLogCount('1')
                                    setLogNote('')
                                    setLogTitle('')
                                    setLogPhase(
                                      deliv.content_type.toLowerCase().includes('shoot') ? 'shooting' :
                                      deliv.content_type.toLowerCase().includes('reel') || deliv.content_type.toLowerCase().includes('youtube') ? 'editing' :
                                      deliv.content_type.toLowerCase().includes('carousel') || deliv.content_type.toLowerCase().includes('static') ? 'post_creation' :
                                      'posting'
                                    )
                                  }}
                                  style={{
                                    width: '22px', height: '22px', borderRadius: '6px',
                                    background: `${dColor}15`, border: `1px solid ${dColor}35`,
                                    color: dColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', padding: 0
                                  }}
                                  title={`Log work for ${deliv.content_type}`}
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                            </div>

                            {/* Progress bar */}
                            {!isInternal && deliv.monthly_target > 0 && (
                              <div style={{ height: '5px', borderRadius: '99px', background: 'var(--bg-surface)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                                <div
                                  style={{
                                    height: '100%', borderRadius: '99px',
                                    width: `${dPercent}%`,
                                    background: dColor,
                                    transition: 'width 0.4s ease'
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>

                  {/* History Collapsible Section */}
                  {(() => {
                    const allClientLogs = (client.allLogs || client.deliverables.flatMap(d => d.logs || [])).map(l => ({
                      ...l,
                      content_type: l.deliverable_content_type || 'Media Work'
                    }))
                    allClientLogs.sort((a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime())
                    const isExpanded = expandedClientIds.includes(client.id)

                    return (
                      <div style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)' }}>
                        <button
                          onClick={() => toggleExpandClient(client.id)}
                          style={{
                            width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
                            padding: '0.625rem 1.25rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Layers size={13} style={{ color: client.color }} />
                            Production & Deliverables Feed ({allClientLogs.length})
                          </span>
                          <span style={{ color: 'var(--brand-primary)', fontSize: '0.72rem' }}>
                            {isExpanded ? '▲ Hide Details' : '▼ Expand Feed'}
                          </span>
                        </button>

                        {isExpanded && (
                          <div style={{ padding: '0.5rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {allClientLogs.length === 0 ? (
                              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '0.5rem 0' }}>
                                No deliverables logged yet this month. Click &apos;+&apos; above or submit your Daily Report to sync!
                              </p>
                            ) : (
                              allClientLogs.map(log => (
                                <div key={log.id} style={{
                                  background: 'var(--bg-card)', padding: '0.5rem 0.75rem', borderRadius: '8px',
                                  border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                                    <span style={{
                                      fontSize: '0.7rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px',
                                      background: `${contentTypeColor(log.content_type)}20`, color: contentTypeColor(log.content_type)
                                    }}>
                                      {log.content_type} (+{log.count})
                                    </span>
                                    <div>
                                      <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {log.title || log.notes || 'Deliverable logged'}
                                      </p>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                          📅 {log.log_date} • 👤 {log.employee?.full_name || 'Team Member'}
                                        </span>
                                        {log.task_phase && (
                                          <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                                            {log.task_phase}
                                          </span>
                                        )}
                                        {log.live_url && (
                                          <a href={log.live_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700, textDecoration: 'underline' }}>
                                            🔗 Link
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {canManageClients && (
                                    <button
                                      onClick={() => handleDelete(log.id)}
                                      disabled={deleting === log.id}
                                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                      title="Delete log entry"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              )
            })}
          </div>
        )
      })()}

      {/* ── Log Work Modal ── */}
      {logModal && (
        <div className="modal-overlay" onClick={() => setLogModal(null)}>
          <div className="modal-content" style={{ maxWidth: '460px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                Log {logModal.deliverable.content_type} for {logModal.client.name}
              </h3>
              <button onClick={() => setLogModal(null)} className="btn btn-ghost btn-sm"><X size={16} /></button>
            </div>
            <div className="modal-body">
              {/* Phase Selection */}
              <div className="form-group">
                <label className="form-label">Operational Phase</label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'shooting', label: '🎬 Shooting' },
                    { id: 'editing', label: '✂️ Video Editing' },
                    { id: 'post_creation', label: '🎨 Post / Carousel Creation' },
                    { id: 'posting', label: '🚀 Posting / Live' },
                  ].map(ph => (
                    <button
                      key={ph.id}
                      type="button"
                      onClick={() => setLogPhase(ph.id)}
                      style={{
                        padding: '4px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        fontSize: '0.74rem', fontWeight: logPhase === ph.id ? 700 : 500,
                        background: logPhase === ph.id ? 'var(--brand-primary)' : 'var(--bg-elevated)',
                        color: logPhase === ph.id ? 'white' : 'var(--text-secondary)'
                      }}
                    >
                      {ph.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title / Topic */}
              <div className="form-group">
                <label className="form-label">Post / Topic Title (e.g. &quot;Post #14: SEO Tips&quot;)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Topic title or content headline..."
                  value={logTitle}
                  onChange={e => setLogTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Count Completed</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={logCount}
                    onChange={e => setLogCount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Platform</label>
                  <select
                    className="form-input"
                    value={logPlatform}
                    onChange={e => setLogPlatform(e.target.value)}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter / X</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Live URL / Asset Link (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://instagram.com/p/... or Drive link"
                  value={logLiveUrl}
                  onChange={e => setLogLiveUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Remarks / Description</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Additional notes or remarks..."
                  value={logNote}
                  onChange={e => setLogNote(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setLogModal(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleLogProgress} disabled={submitting || !logCount} className="btn btn-primary">
                Save Deliverable Log
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
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>Add New Channel / Client</h3>
              <button onClick={() => setAddClientModal(false)} className="btn btn-ghost btn-sm"><X size={16} /></button>
            </div>
            <div className="modal-body">
              {/* Internal Brand vs External Client Type */}
              <div className="form-group">
                <label className="form-label">Property Category</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setNewClientType('internal')}
                    style={{
                      flex: 1, padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontSize: '0.78rem', fontWeight: 700,
                      background: newClientType === 'internal' ? 'rgba(16,185,129,0.15)' : 'var(--bg-elevated)',
                      color: newClientType === 'internal' ? '#10b981' : 'var(--text-secondary)',
                      outline: newClientType === 'internal' ? '1.5px solid #10b981' : '1px solid var(--border-default)'
                    }}
                  >
                    🏢 Internal Brand
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewClientType('external')}
                    style={{
                      flex: 1, padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontSize: '0.78rem', fontWeight: 700,
                      background: newClientType === 'external' ? 'rgba(99,102,241,0.15)' : 'var(--bg-elevated)',
                      color: newClientType === 'external' ? '#818cf8' : 'var(--text-secondary)',
                      outline: newClientType === 'external' ? '1.5px solid #818cf8' : '1px solid var(--border-default)'
                    }}
                  >
                    🤝 External Client
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Brand / Client Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Amazon, CA Sir, Stock Pro"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                />
              </div>

              {/* Company Logo Upload */}
              <div className="form-group">
                <label className="form-label">Brand / Company Logo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {newClientLogo ? (
                    <img src={newClientLogo} alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain', background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <Upload size={16} />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={logoInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async e => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      try {
                        const url = await uploadLogo(file)
                        setNewClientLogo(url)
                      } catch (err: any) {
                        alert(err.message)
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="btn btn-secondary btn-sm"
                  >
                    <Upload size={13} /> {newClientLogo ? 'Change Logo' : 'Upload Logo'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Monthly Content Calendar Targets</label>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Adjustable anytime per calendar</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.625rem' }}>
                  {newDeliverables.map((d, i) => (
                    <div key={d.content_type} style={{ background: 'var(--bg-surface)', padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--border-default)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>{d.content_type}</label>
                        {i >= 3 && (
                          <button
                            type="button"
                            onClick={() => setNewDeliverables(prev => prev.filter((_, idx) => idx !== i))}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Target (e.g. 8)"
                        value={d.monthly_target}
                        onChange={e => {
                          const copy = [...newDeliverables]
                          copy[i].monthly_target = e.target.value
                          setNewDeliverables(copy)
                        }}
                        style={{ height: '32px', fontSize: '0.8rem' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Add Custom Deliverable Format */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Custom format e.g. Stories, Carousel, Shorts..."
                    value={newCustomFormat}
                    onChange={e => setNewCustomFormat(e.target.value)}
                    style={{ height: '32px', fontSize: '0.78rem', flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newCustomFormat.trim()) return
                      if (newDeliverables.some(d => d.content_type.toLowerCase() === newCustomFormat.trim().toLowerCase())) return
                      setNewDeliverables(prev => [...prev, { content_type: newCustomFormat.trim(), monthly_target: '10' }])
                      setNewCustomFormat('')
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ height: '32px', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                  >
                    <Plus size={12} /> Add Format
                  </button>
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
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                Edit Client: {editClientModal.name}
              </h3>
              <button onClick={() => setEditClientModal(null)} className="btn btn-ghost btn-sm"><X size={16} /></button>
            </div>
            <div className="modal-body">
              {/* Internal Brand vs External Client Type */}
              <div className="form-group">
                <label className="form-label">Property Category</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setEditClientType('internal')}
                    style={{
                      flex: 1, padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontSize: '0.78rem', fontWeight: 700,
                      background: editClientType === 'internal' ? 'rgba(16,185,129,0.15)' : 'var(--bg-elevated)',
                      color: editClientType === 'internal' ? '#10b981' : 'var(--text-secondary)',
                      outline: editClientType === 'internal' ? '1.5px solid #10b981' : '1px solid var(--border-default)'
                    }}
                  >
                    🏢 Internal Brand
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditClientType('external')}
                    style={{
                      flex: 1, padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontSize: '0.78rem', fontWeight: 700,
                      background: editClientType === 'external' ? 'rgba(99,102,241,0.15)' : 'var(--bg-elevated)',
                      color: editClientType === 'external' ? '#818cf8' : 'var(--text-secondary)',
                      outline: editClientType === 'external' ? '1.5px solid #818cf8' : '1px solid var(--border-default)'
                    }}
                  >
                    🤝 External Client
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Brand / Client Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={editClientName}
                  onChange={e => setEditClientName(e.target.value)}
                />
              </div>

              {/* Edit Company Logo */}
              <div className="form-group">
                <label className="form-label">Brand / Company Logo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {editClientLogo ? (
                    <img src={editClientLogo} alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain', background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <Upload size={16} />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={editLogoInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async e => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      try {
                        const url = await uploadLogo(file)
                        setEditClientLogo(url)
                      } catch (err: any) {
                        alert(err.message)
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => editLogoInputRef.current?.click()}
                    className="btn btn-secondary btn-sm"
                  >
                    <Upload size={13} /> {editClientLogo ? 'Change Logo' : 'Upload Logo'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Monthly Content Calendar Targets</label>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Updated for this month</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.625rem' }}>
                  {editDeliverables.map((d, i) => (
                    <div key={d.content_type} style={{ background: 'var(--bg-surface)', padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--border-default)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>{d.content_type}</label>
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...editDeliverables]
                            copy[i].monthly_target = ''
                            setEditDeliverables(copy)
                          }}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontSize: '0.65rem' }}
                          title="Set to 0 to disable"
                        >
                          ✕
                        </button>
                      </div>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Target (e.g. 8)"
                        value={d.monthly_target}
                        onChange={e => {
                          const copy = [...editDeliverables]
                          copy[i].monthly_target = e.target.value
                          setEditDeliverables(copy)
                        }}
                        style={{ height: '32px', fontSize: '0.8rem' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Add Custom Deliverable Format */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Add custom format e.g. Stories, Podcasts, Blogs..."
                    value={editCustomFormat}
                    onChange={e => setEditCustomFormat(e.target.value)}
                    style={{ height: '32px', fontSize: '0.78rem', flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!editCustomFormat.trim()) return
                      if (editDeliverables.some(d => d.content_type.toLowerCase() === editCustomFormat.trim().toLowerCase())) return
                      setEditDeliverables(prev => [...prev, { content_type: editCustomFormat.trim(), monthly_target: '10' }])
                      setEditCustomFormat('')
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ height: '32px', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                  >
                    <Plus size={12} /> Add Format
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              {canManageClients && (
                <button
                  onClick={() => handleDeleteClient(editClientModal.id)}
                  disabled={submitting}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={13} /> {submitting ? 'Removing...' : 'Remove Client'}
                </button>
              )}
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                <button onClick={() => setEditClientModal(null)} className="btn btn-secondary">Cancel</button>
                <button onClick={handleEditClient} disabled={submitting || !editClientName.trim()} className="btn btn-primary">
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Target Adjustment Modal ── */}
      {quickTargetModal && (
        <div className="modal-overlay" onClick={() => setQuickTargetModal(null)}>
          <div className="modal-content" style={{ maxWidth: '380px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
                  Adjust Target: {quickTargetModal.deliverable.content_type}
                </h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                  {quickTargetModal.client.name} · Content Calendar Schedule
                </p>
              </div>
              <button onClick={() => setQuickTargetModal(null)} className="btn btn-ghost btn-sm"><X size={15} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">
                  Monthly Target for {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setQuickTargetValue(v => String(Math.max(1, (Number(v) || 1) - 1)))}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '36px', height: '36px', fontSize: '1rem', fontWeight: 800 }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={quickTargetValue}
                    onChange={e => setQuickTargetValue(e.target.value)}
                    style={{ height: '36px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 800 }}
                  />
                  <button
                    type="button"
                    onClick={() => setQuickTargetValue(v => String((Number(v) || 0) + 1))}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '36px', height: '36px', fontSize: '1rem', fontWeight: 800 }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[6, 8, 10, 12, 15, 20, 30].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setQuickTargetValue(String(val))}
                    style={{
                      padding: '3px 9px',
                      borderRadius: '6px',
                      border: Number(quickTargetValue) === val ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-default)',
                      background: Number(quickTargetValue) === val ? 'rgba(16,185,129,0.15)' : 'var(--bg-surface)',
                      color: Number(quickTargetValue) === val ? '#10b981' : 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setQuickTargetModal(null)} className="btn btn-secondary">Cancel</button>
              <button
                onClick={() => handleQuickUpdateTarget(Number(quickTargetValue))}
                disabled={submitting || !Number(quickTargetValue)}
                className="btn btn-primary"
              >
                {submitting ? 'Updating...' : 'Update Target'}
              </button>
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
