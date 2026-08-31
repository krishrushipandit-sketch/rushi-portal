'use client'

import { useState, useEffect } from 'react'
import {
  Bell, Sun, Moon, LogOut, Maximize2, Minimize2,
  PanelLeft, Search, Plus, Sparkles
} from 'lucide-react'
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
  const [searchValue, setSearchValue] = useState('')

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
    <header
      className="topbar"
      style={{
        height: '64px',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Left: Sidebar Toggle + User Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        {/* Toggle Sidebar Icon Button */}
        <button
          onClick={onToggleSidebar}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            flexShrink: 0
          }}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse to Mini Rail'}
        >
          <PanelLeft size={17} />
        </button>

        {/* User Greeting (Good morning/afternoon, Name) */}
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1.2 }}>
            {greeting},
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {profile.full_name}
          </span>
        </div>
      </div>

      {/* Right Side: Quick Stats, Theme, Fullscreen, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Role Badge */}
        <span
          className="badge hidden-mobile"
          style={{
            background: isLight 
              ? (profile.role === 'admin' ? 'rgba(14, 61, 53, 0.1)' : 'rgba(16, 185, 129, 0.12)')
              : 'rgba(255, 255, 255, 0.08)',
            color: isLight 
              ? (profile.role === 'admin' ? '#0e3d35' : '#16a34a')
              : '#ffffff',
            border: isLight 
              ? `1px solid ${profile.role === 'admin' ? 'rgba(14, 61, 53, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`
              : '1px solid rgba(255, 255, 255, 0.2)',
            fontWeight: 700,
            fontSize: '0.75rem',
            padding: '4px 10px'
          }}
        >
          {profile.role === 'admin' ? 'Administrator' : profile.designation || 'Staff Portal'}
        </span>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="hidden-mobile"
          style={{
            width: '36px', height: '36px', borderRadius: '8px',
            border: '1px solid var(--border-default)', background: 'var(--bg-surface)',
            color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}
          title={isFullscreen ? 'Exit Fullscreen' : 'Immersive Fullscreen (F11)'}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>

        {/* Theme Switcher Toggle */}
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
            padding: '2px',
          }}
        >
          <Moon
            size={14}
            style={{ color: !isLight ? '#ffffff' : '#94a3b8', transition: 'color 0.2s', flexShrink: 0 }}
          />
          <div
            style={{
              width: '42px',
              height: '22px',
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
                left: isLight ? 'calc(100% - 19px)' : '2px',
                width: '16px',
                height: '16px',
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
                ? <Sun size={9} style={{ color: '#d97706' }} />
                : <Moon size={9} style={{ color: '#6366f1' }} />
              }
            </div>
          </div>
          <Sun
            size={14}
            style={{ color: isLight ? '#d97706' : '#64748b', transition: 'color 0.2s', flexShrink: 0 }}
          />
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onNotificationsClick}
          style={{
            width: '36px', height: '36px', borderRadius: '8px',
            border: '1px solid var(--border-default)', background: 'var(--bg-surface)',
            color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative'
          }}
          title="Notifications"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt="Profile" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.78rem', fontWeight: 800
          }}>
            {getInitials(profile.full_name)}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: '36px', height: '36px', borderRadius: '8px',
            border: '1px solid var(--border-default)', background: 'var(--bg-surface)',
            color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}
