'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { timeAgo } from '@/lib/utils'
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle2, Clock, AlertCircle, MessageSquare } from 'lucide-react'

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

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  info: { icon: Info, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)' },
  warning: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
  success: { icon: CheckCircle2, color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
  reminder: { icon: Clock, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' },
  alert: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },
  comment: { icon: MessageSquare, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)' },
}

export default function NotificationsSection({ profile, onRead }: Props) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  const fetchNotifications = useCallback(async () => {
    const token = getToken()
    if (!token) return
    const res = await fetch('/api/notifications', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setNotifications(data)
    setLoading(false)
  }, [router])

  useEffect(() => { fetchNotifications() }, [fetchNotifications])

  const markRead = async (id: string) => {
    const token = getToken()
    if (!token) return
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    })
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    onRead()
  }

  const markAllRead = async () => {
    const token = getToken()
    if (!token) return
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ mark_all: true }),
    })
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    onRead()
  }

  const filtered = filter === 'unread'
    ? notifications.filter(n => !n.is_read)
    : notifications

  const unreadCount = notifications.filter(n => !n.is_read).length

  if (loading) {
    return (
      <div>
        {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '72px', marginBottom: '8px' }} />)}
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Notifications</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ display: 'flex', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '3px', border: '1px solid var(--border-default)' }}>
            {(['all', 'unread'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.3rem 0.875rem',
                  borderRadius: 'calc(var(--radius-md) - 2px)',
                  background: filter === f ? 'var(--brand-primary)' : 'transparent',
                  color: filter === f ? 'white' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={markAllRead}>
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card">
          <div className="empty-state">
            <div className="empty-state-icon"><Bell size={24} /></div>
            <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {filter === 'unread' ? "You're all caught up!" : 'Notifications will appear here'}
            </p>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {filtered.map((notif, idx) => {
            const config = typeConfig[notif.type] || typeConfig.info
            const IconComp = config.icon
            return (
              <div
                key={notif.id}
                onClick={() => !notif.is_read && markRead(notif.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.125rem 1.25rem',
                  borderBottom: idx < filtered.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  background: !notif.is_read ? 'rgba(99, 102, 241, 0.03)' : 'transparent',
                  cursor: !notif.is_read ? 'pointer' : 'default',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', flexShrink: 0,
                  background: config.bg,
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: config.color,
                }}>
                  <IconComp size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: !notif.is_read ? 600 : 500 }}>
                      {notif.title}
                    </p>
                    {!notif.is_read && (
                      <span style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: 'var(--brand-primary)', flexShrink: 0,
                      }} />
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {notif.message}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                    {timeAgo(notif.created_at)}
                  </p>
                </div>
                {!notif.is_read && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0, paddingTop: '0.1rem' }}>
                    Tap to mark read
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
