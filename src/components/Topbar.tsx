'use client'

import { Bell, Menu, Sun, Moon } from 'lucide-react'
import type { Profile } from '@/lib/database.types'
import { getInitials } from '@/lib/utils'
import { useTheme } from '@/lib/ThemeContext'

interface TopbarProps {
  profile: Profile
  unreadCount: number
  onMenuClick: () => void
  onNotificationsClick: () => void
}

export default function Topbar({ profile, unreadCount, onMenuClick, onNotificationsClick }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  const greetingHour = new Date().getHours()
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn btn-ghost sidebar-toggle" onClick={onMenuClick} style={{ padding: '0.375rem' }}>
          <Menu size={20} />
        </button>
        <div>
          <p className="hidden-mobile" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{greeting},</p>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 }}>
            {profile.full_name}
          </h2>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Role Badge */}
        <span className="badge hidden-mobile" style={{
          background: profile.role === 'admin' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          color: profile.role === 'admin' ? '#6366f1' : '#10b981',
          border: `1px solid ${profile.role === 'admin' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
        }}>
          {profile.role === 'admin' ? 'Administrator' : profile.designation || 'Employee'}
        </span>

        {/* ====== THEME TOGGLE ====== */}
        <button
          onClick={toggleTheme}
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '99px',
          }}
        >
          {/* Moon icon */}
          <Moon
            size={14}
            style={{ color: !isLight ? '#6366f1' : '#94a3b8', transition: 'color 0.2s', flexShrink: 0 }}
          />

          {/* Toggle track */}
          <div
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '99px',
              background: isLight
                ? 'linear-gradient(135deg, #0e3d35, #1a5c4f)'
                : '#1f2937',
              border: isLight ? 'none' : '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              transition: 'background 0.25s ease',
              flexShrink: 0,
              boxShadow: isLight ? '0 2px 8px rgba(14,61,53,0.35)' : 'none',
            }}
          >
            {/* Thumb */}
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: isLight ? 'calc(100% - 19px)' : '3px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isLight
                ? <Sun size={10} style={{ color: '#f59e0b' }} />
                : <Moon size={10} style={{ color: '#6366f1' }} />
              }
            </div>
          </div>

          {/* Sun icon */}
          <Sun
            size={14}
            style={{ color: isLight ? '#f59e0b' : '#64748b', transition: 'color 0.2s', flexShrink: 0 }}
          />
        </button>
        {/* ====== END TOGGLE ====== */}

        {/* Notification Bell */}
        <button
          onClick={onNotificationsClick}
          className="btn btn-ghost"
          style={{ padding: '0.5rem', position: 'relative' }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt="Profile" className="avatar avatar-sm" style={{ objectFit: 'cover', cursor: 'default' }} />
        ) : (
          <div className="avatar avatar-sm" style={{ cursor: 'default' }}>
            {getInitials(profile.full_name)}
          </div>
        )}
      </div>
    </header>
  )
}
