'use client'

import { useRouter } from 'next/navigation'
import { getInitials } from '@/lib/utils'
import type { Profile } from '@/lib/database.types'
import { useTheme } from '@/lib/ThemeContext'
import {
  LayoutDashboard, CheckSquare, TrendingUp, Users,
  Bell, LogOut, Building2, BarChart3, ClipboardList, Clapperboard, Settings, Trophy, Calendar
} from 'lucide-react'
import PointsLeaderboard from './PointsLeaderboard'

interface SidebarProps {
  profile: Profile
  activeSection: string
  onNavigate: (section: string) => void
  isOpen: boolean
  collapsed?: boolean
  unreadCount: number
}

const baseEmployeeNavItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, salesOnly: false, mediaOnly: false },
  { id: 'leads', label: 'Leads & Pipeline', icon: TrendingUp, salesOnly: true, mediaOnly: false },
  { id: 'sales', label: 'Sales Metrics', icon: BarChart3, salesOnly: true, mediaOnly: false },
  { id: 'tasks', label: 'My Tasks', icon: CheckSquare, salesOnly: false, mediaOnly: false },
  { id: 'reports', label: 'Daily Report', icon: ClipboardList, salesOnly: false, mediaOnly: false },
  { id: 'attendance', label: 'Attendance', icon: Calendar, salesOnly: false, mediaOnly: false },
  { id: 'strategy', label: 'Client Work', icon: Clapperboard, salesOnly: false, mediaOnly: true },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: true, salesOnly: false, mediaOnly: false },
  { id: 'settings', label: 'Settings', icon: Settings, badge: false, salesOnly: false, mediaOnly: false },
]

const adminNavItems = [
  { id: 'overview',      label: 'Overview',           icon: LayoutDashboard, badge: false },
  { id: 'leads',         label: 'Inbound Leads',      icon: TrendingUp,      badge: false },
  { id: 'tasks',         label: 'Task Management',    icon: CheckSquare,     badge: false },
  { id: 'reports',       label: 'Daily Reports',      icon: ClipboardList,   badge: false },
  { id: 'sales',         label: 'Sales Metrics',      icon: BarChart3,       badge: false },
  { id: 'strategy',      label: 'Strategy Panel',     icon: Clapperboard,    badge: false },
  { id: 'attendance',    label: 'Attendance',         icon: Calendar,        badge: false },
  { id: 'performance',   label: 'Performance',        icon: BarChart3,       badge: false },
  { id: 'leaderboard',   label: 'Leaderboard',        icon: Trophy,          badge: false },
  { id: 'employees',     label: 'Employees',          icon: Users,           badge: false },
  { id: 'notifications', label: 'Notifications',      icon: Bell,            badge: true  },
  { id: 'settings',      label: 'Settings',           icon: Settings,        badge: false },
]

const isSalesEmployee = (p: Profile) => p.department?.toLowerCase() === 'sales'

export default function Sidebar({ profile, activeSection, onNavigate, isOpen, collapsed, unreadCount }: SidebarProps) {
  const router = useRouter()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const isMediaEmployee = (profile.department?.toLowerCase() === 'media' ||
    profile.designation?.toLowerCase().includes('video') ||
    profile.designation?.toLowerCase().includes('editor')) && 
    !profile.full_name?.toLowerCase().includes('suyog')

  const navItems = profile.role === 'admin'
    ? adminNavItems
    : baseEmployeeNavItems.filter(item =>
        (!item.salesOnly || isSalesEmployee(profile)) &&
        (!item.mediaOnly || isMediaEmployee)
      )

  const handleLogout = async () => {
    localStorage.removeItem('rushi_token')
    localStorage.removeItem('rushi_user')
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  // ---- THEMING ----
  const sidebarBg = isLight ? '#0e3d35' : 'var(--bg-surface)'
  const logoBorderColor = isLight ? 'rgba(255,255,255,0.08)' : 'var(--border-default)'
  const sectionLabelColor = isLight ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)'
  const sidebarBorderRight = isLight ? 'none' : '1px solid var(--border-default)'
  const sidebarBoxShadow = isLight ? '4px 0 20px rgba(14,61,53,0.2)' : 'none'
  const profileBorderColor = isLight ? 'rgba(255,255,255,0.08)' : 'var(--border-default)'
  const profileNameColor = isLight ? '#ffffff' : 'var(--text-primary)'
  const profileRoleColor = isLight ? 'rgba(255,255,255,0.45)' : 'var(--text-muted)'

  const getNavItemStyle = (id: string) => {
    const isActive = activeSection === id
    if (isLight) {
      return {
        background: isActive ? 'rgba(255,179,63,0.18)' : 'transparent',
        color: isActive ? '#ffb33f' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${isActive ? 'rgba(255,179,63,0.3)' : 'transparent'}`,
      }
    }
    return {
      background: isActive ? 'rgba(99,102,241,0.14)' : 'transparent',
      color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
      border: `1px solid ${isActive ? 'rgba(99,102,241,0.25)' : 'transparent'}`,
    }
  }

  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed-rail' : ''}`}
      style={{
        background: sidebarBg,
        borderRight: sidebarBorderRight,
        boxShadow: sidebarBoxShadow,
        width: collapsed ? '68px' : '250px',
        transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        overflow: 'hidden'
      }}
    >
      {/* Logo Area */}
      <div
        style={{
          height: '64px',
          borderBottom: `1px solid ${logoBorderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 1.25rem',
          flexShrink: 0,
          gap: '0.625rem'
        }}
      >
        {collapsed ? (
          <div style={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981, #047857)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: '0.9rem',
            boxShadow: '0 2px 10px rgba(16, 185, 129, 0.35)'
          }}>
            RP
          </div>
        ) : (
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: '32px',
              maxWidth: '160px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        )}
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? '0.75rem 0.5rem' : '0.875rem 0.75rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        {!collapsed && (
          <p className="nav-section-label" style={{ color: sectionLabelColor, paddingLeft: '0.5rem', marginBottom: '0.375rem', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Menu
          </p>
        )}

        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              className="nav-item-btn"
              title={collapsed ? label : undefined}
              style={{
                width: '100%',
                height: collapsed ? '44px' : '40px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '0' : '0 0.75rem',
                gap: '0.625rem',
                position: 'relative',
                transition: 'all 0.15s ease',
                ...getNavItemStyle(id),
              }}
              onClick={() => onNavigate(id)}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />

              {!collapsed && (
                <span style={{ flex: 1, textAlign: 'left', fontSize: '0.84rem', fontWeight: isActive ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {label}
                </span>
              )}

              {badge && unreadCount > 0 && (
                <span style={{
                  position: collapsed ? 'absolute' : 'static',
                  top: collapsed ? '4px' : 'auto',
                  right: collapsed ? '6px' : 'auto',
                  background: isLight ? '#ffb33f' : 'var(--brand-primary)',
                  color: isLight ? '#0a1f1c' : 'white',
                  fontSize: '0.62rem', fontWeight: 800,
                  padding: '1px 5px', borderRadius: '99px',
                  minWidth: '16px', textAlign: 'center',
                }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Admin Points Leaderboard (Expanded mode only) */}
      {!collapsed && profile.role === 'admin' && (
        <div style={{ padding: '0 0.75rem 0.5rem' }}>
          <PointsLeaderboard isLight={isLight} />
        </div>
      )}

      {/* User Profile Footer */}
      <div
        style={{
          borderTop: `1px solid ${profileBorderColor}`,
          padding: collapsed ? '0.75rem 0.5rem' : '0.875rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          flexShrink: 0,
          background: isLight ? 'rgba(0,0,0,0.1)' : 'var(--bg-card)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0, position: 'relative' }}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, flexShrink: 0
            }}>
              {getInitials(profile.full_name)}
            </div>
          )}

          {/* Online status indicator green dot */}
          <div style={{
            position: 'absolute', bottom: '0px', left: collapsed ? '22px' : '24px',
            width: '9px', height: '9px', borderRadius: '50%', background: '#10b981',
            border: '2px solid var(--bg-surface)'
          }} />

          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: profileNameColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {profile.full_name}
              </p>
              <p style={{ margin: 0, fontSize: '0.68rem', color: profileRoleColor, textTransform: 'capitalize' }}>
                {profile.role === 'admin' ? 'Administrator' : profile.designation || 'Staff'}
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={handleLogout}
            title="Sign Out"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: isLight ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
              padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center'
            }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  )
}
