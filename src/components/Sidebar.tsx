'use client'

import { useRouter } from 'next/navigation'
import { getInitials } from '@/lib/utils'
import type { Profile } from '@/lib/database.types'
import { useTheme } from '@/lib/ThemeContext'
import {
  LayoutDashboard, CheckSquare, TrendingUp, Users,
  Bell, LogOut, BarChart3, ClipboardList, Clapperboard, Settings, Trophy, Calendar
} from 'lucide-react'

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
  { id: 'strategy', label: 'Strategy Panel', icon: Clapperboard, salesOnly: false, mediaOnly: true },
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

  const isMediaEmployee = (
    profile.department?.toLowerCase() === 'media' ||
    profile.department?.toLowerCase() === 'client_management' ||
    profile.department?.toLowerCase() === 'strategy' ||
    profile.full_name?.toLowerCase().includes('kedar') ||
    profile.email?.toLowerCase().includes('kedar') ||
    profile.designation?.toLowerCase().includes('video') ||
    profile.designation?.toLowerCase().includes('editor') ||
    profile.designation?.toLowerCase().includes('client') ||
    profile.designation?.toLowerCase().includes('strategy')
  ) && !profile.full_name?.toLowerCase().includes('suyog')

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

  // ---- SIGNATURE GREEN THEME TOKENS ----
  const sidebarBg = isLight ? '#0e3d35' : 'var(--bg-surface)'
  const sidebarBorderColor = isLight ? 'rgba(255,255,255,0.08)' : 'var(--border-default)'
  const sectionLabelColor = isLight ? 'rgba(255,255,255,0.45)' : 'var(--text-muted)'
  const profileNameColor = isLight ? '#ffffff' : 'var(--text-primary)'
  const profileRoleColor = isLight ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)'
  const logoutBtnColor = isLight ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)'

  const getNavItemStyle = (id: string) => {
    const isActive = activeSection === id
    if (isLight) {
      return {
        background: isActive ? 'rgba(255, 179, 63, 0.18)' : 'transparent',
        color: isActive ? '#ffb33f' : 'rgba(255, 255, 255, 0.78)',
        border: `1px solid ${isActive ? 'rgba(255, 179, 63, 0.3)' : 'transparent'}`,
        fontWeight: isActive ? 700 : 500
      }
    }
    return {
      background: isActive ? 'rgba(99,102,241,0.14)' : 'transparent',
      color: isActive ? '#818cf8' : 'var(--text-secondary)',
      border: `1px solid ${isActive ? 'rgba(99,102,241,0.25)' : 'transparent'}`,
      fontWeight: isActive ? 700 : 500
    }
  }

  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed-rail' : ''}`}
      style={{
        background: sidebarBg,
        borderRight: `1px solid ${sidebarBorderColor}`,
        width: collapsed ? '68px' : '250px',
        transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        overflow: 'hidden',
        boxShadow: isLight ? '4px 0 24px rgba(14, 61, 53, 0.25)' : 'none'
      }}
    >
      {/* ── Logo Header ── */}
      <div
        style={{
          padding: collapsed ? '1rem 0' : '1.25rem 1.25rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          flexShrink: 0,
        }}
      >
        {collapsed ? (
          <div
            title="RushiPandit Institute"
            style={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '0.88rem',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              cursor: 'pointer'
            }}
          >
            RP
          </div>
        ) : (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '0.5rem 0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            <img
              src="/logo.png"
              alt="RushiPandit Logo"
              style={{
                width: '120px',
                height: 'auto',
                maxHeight: '34px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        )}
      </div>

      {/* ── Navigation Links ── */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? '0.75rem 0.5rem' : '0.5rem 0.75rem 1rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        {!collapsed && (
          <p
            style={{
              color: sectionLabelColor,
              paddingLeft: '0.625rem',
              marginBottom: '0.5rem',
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0.25rem 0 0.5rem 0'
            }}
          >
            NAVIGATION
          </p>
        )}

        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              title={collapsed ? label : undefined}
              style={{
                width: '100%',
                height: collapsed ? '44px' : '42px',
                borderRadius: '9px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '0' : '0 0.875rem',
                gap: '0.75rem',
                position: 'relative',
                transition: 'all 0.15s ease',
                ...getNavItemStyle(id),
              }}
              onClick={() => onNavigate(id)}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />

              {!collapsed && (
                <span style={{ flex: 1, textAlign: 'left', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {label}
                </span>
              )}

              {badge && unreadCount > 0 && (
                <span style={{
                  position: collapsed ? 'absolute' : 'static',
                  top: collapsed ? '3px' : 'auto',
                  right: collapsed ? '6px' : 'auto',
                  background: isLight ? '#ffb33f' : 'var(--brand-primary)',
                  color: isLight ? '#0a1f1c' : 'white',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '99px',
                  minWidth: '18px',
                  textAlign: 'center',
                }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* ── User Profile Footer (Height ~64px) ── */}
      <div
        style={{
          borderTop: `1px solid ${sidebarBorderColor}`,
          padding: collapsed ? '0.75rem 0.5rem' : '0.875rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          flexShrink: 0,
          background: isLight ? 'rgba(0, 0, 0, 0.15)' : 'var(--bg-card)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0, position: 'relative' }}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: isLight ? 'rgba(255, 179, 63, 0.25)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: isLight ? '#ffb33f' : 'white',
              border: isLight ? '1px solid rgba(255, 179, 63, 0.4)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, flexShrink: 0
            }}>
              {getInitials(profile.full_name)}
            </div>
          )}

          {/* Active status indicator green dot */}
          <div style={{
            position: 'absolute', bottom: '-1px', left: collapsed ? '22px' : '23px',
            width: '9px', height: '9px', borderRadius: '50%', background: '#10b981',
            border: `2px solid ${isLight ? '#0e3d35' : 'var(--bg-surface)'}`
          }} />

          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: profileNameColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {profile.full_name}
              </p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: profileRoleColor, textTransform: 'capitalize' }}>
                {profile.role === 'admin' ? 'Administrator' : profile.designation || 'Staff Portal'}
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
              color: logoutBtnColor,
              padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              transition: 'color 0.15s'
            }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  )
}
