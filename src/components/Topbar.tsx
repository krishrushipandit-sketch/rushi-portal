'use client'

import { useState, useEffect } from 'react'
import { Bell, Menu, Sun, Moon, LogOut, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { getInitials } from '@/lib/utils'
import { useTheme } from '@/lib/ThemeContext'

interface TopbarProps {
  profile: Profile
  unreadCount: number
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  onNotificationsClick: () => void
}

export default function Topbar({
  profile,
  unreadCount,
  sidebarCollapsed,
  onToggleSidebar,
  onNotificationsClick
}: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const isLight = theme === 'light'
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem('rushi_token')
    localStorage.removeItem('rushi_user')
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const greetingHour = new Date().getHours()
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="topbar">
      {/* Left side: Toggle Sidebar & Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onToggleSidebar}
          className="btn btn-ghost"
          style={{
            padding: '0.4rem 0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderRadius: '8px',
            color: 'var(--text-secondary)'
          }}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar to Full Width'}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          <span className="hidden-mobile" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            {sidebarCollapsed ? 'Expand' : 'Collapse'}
          </span>
        </button>

        <div className="hidden-mobile" style={{ borderLeft: '1px solid var(--border-default)', paddingLeft: '0.875rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{greeting},</p>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.2, margin: 0, color: 'var(--text-primary)' }}>
            {profile.full_name}
          </h2>
        </div>
      </div>

      {/* Right side: Actions, Theme, Fullscreen, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        {/* Role Badge */}
        <span className="badge hidden-mobile" style={{
          background: profile.role === 'admin' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          color: profile.role === 'admin' ? '#6366f1' : '#16a34a',
          border: `1px solid ${profile.role === 'admin' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
          fontWeight: 700
        }}>
          {profile.role === 'admin' ? 'Administrator' : profile.designation || 'Employee'}
        </span>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="btn btn-ghost"
          style={{ padding: '0.5rem', color: 'var(--text-secondary)', borderRadius: '8px' }}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
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
          <Moon
            size={14}
            style={{ color: !isLight ? '#6366f1' : '#94a3b8', transition: 'color 0.2s', flexShrink: 0 }}
          />
          <div
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '99px',
              background: isLight ? '#0e3d35' : '#1f2937',
              border: isLight ? '1px solid #0e3d35' : '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              transition: 'background 0.25s ease',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: isLight ? 'calc(100% - 20px)' : '2px',
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
                ? <Sun size={10} style={{ color: '#d97706' }} />
                : <Moon size={10} style={{ color: '#6366f1' }} />
              }
            </div>
          </div>
          <Sun
            size={14}
            style={{ color: isLight ? '#d97706' : '#64748b', transition: 'color 0.2s', flexShrink: 0 }}
          />
        </button>

        {/* Notification Bell */}
        <button
          onClick={onNotificationsClick}
          className="btn btn-ghost"
          style={{ padding: '0.5rem', position: 'relative', borderRadius: '8px', color: 'var(--text-secondary)' }}
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Profile Avatar */}
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt="Profile" className="avatar avatar-sm" style={{ objectFit: 'cover', cursor: 'default' }} />
        ) : (
          <div className="avatar avatar-sm" style={{ cursor: 'default' }}>
            {getInitials(profile.full_name)}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-ghost"
          title="Sign Out"
          style={{ padding: '0.5rem', color: 'var(--text-muted)', borderRadius: '8px' }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}
