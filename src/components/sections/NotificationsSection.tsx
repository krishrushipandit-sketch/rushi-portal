'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Profile } from '@/lib/database.types'
import { timeAgo } from '@/lib/utils'
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle2, Clock, AlertCircle, MessageSquare } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Reveal from '@/components/ui/Reveal'

interface Props { profile: Profile; onRead: () => void }

interface Notification {
  id: string
  title: string
  message: string
  type: string
  is_read: boolean
  task_id: string | null
  created_at: string
}

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  info: { icon: Info, color: '#2f9bff' },
  warning: { icon: AlertTriangle, color: '#f5a524' },
  success: { icon: CheckCircle2, color: '#22c55e' },
  reminder: { icon: Clock, color: '#8b5cf6' },
  alert: { icon: AlertCircle, color: '#ef4757' },
  comment: { icon: MessageSquare, color: '#14b8a0' },
}

export default function NotificationsSection({ onRead }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const token = () => localStorage.getItem('rushi_token') || ''

  const fetchNotifications = useCallback(async () => {
    const t = localStorage.getItem('rushi_token')
    if (!t) return
    const data = await fetch('/api/notifications', { headers: { Authorization: `Bearer ${t}` } }).then(r => r.json())
    if (Array.isArray(data)) setNotifications(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchNotifications() }, [fetchNotifications])

  const markRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ id }),
    })
    onRead()
  }

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ mark_all: true }),
    })
    onRead()
  }

  const unreadCount = notifications.filter(n => !n.is_read).length
  const filtered = filter === 'unread' ? notifications.filter(n => !n.is_read) : notifications

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <PageHeader
        live={unreadCount > 0}
        eyebrow={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        title="Notifications"
        description="Task reminders, lead alerts and feedback on your reports."
        actions={unreadCount > 0 && <button className="btn btn-secondary" onClick={markAllRead}><CheckCheck size={15} /> Mark all read</button>}
      />

      <Reveal>
        <section className="card list">
          <div className="list-toolbar">
            <div className="segmented">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All <span className="tabular" style={{ color: 'var(--text-faint)' }}>{notifications.length}</span></button>
              <button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>Unread <span className="tabular" style={{ color: 'var(--text-faint)' }}>{unreadCount}</span></button>
            </div>
          </div>
          {loading ? (
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 60 }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Bell size={20} /></div>
              <p style={{ fontWeight: 550, color: 'var(--text-secondary)' }}>{filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}</p>
              <p style={{ fontSize: '0.8rem' }}>{filter === 'unread' ? 'You’re all caught up.' : 'They’ll appear here as things happen.'}</p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none' }}>
              {filtered.map(n => {
                const cfg = typeConfig[n.type] || typeConfig.info
                const Icon = cfg.icon
                return (
                  <li key={n.id}>
                    <button className={`notif-row ${n.is_read ? '' : 'unread'}`} style={{ '--tone': cfg.color } as React.CSSProperties} onClick={() => !n.is_read && markRead(n.id)}>
                      <span className="notif-icon"><Icon size={16} /></span>
                      <span style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                        <span className="notif-title">{n.title}</span>
                        <span className="notif-msg">{n.message}</span>
                      </span>
                      <span className="notif-time">{timeAgo(n.created_at)}</span>
                      {!n.is_read && <span className="notif-dot" aria-label="Unread" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </Reveal>
    </div>
  )
}
