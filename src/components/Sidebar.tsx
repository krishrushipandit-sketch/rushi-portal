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
  unreadCount: number
}

const baseEmployeeNavItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, salesOnly: false, mediaOnly: false },
  { id: 'leads', label: 'Leads & Follow-ups', icon: TrendingUp, salesOnly: true, mediaOnly: false },
  { id: 'tasks', label: 'My Tasks', icon: CheckSquare, salesOnly: false, mediaOnly: false },
  { id: 'reports', label: 'Daily Report', icon: ClipboardList, salesOnly: false, mediaOnly: false },
  { id: 'attendance', label: 'Attendance', icon: Calendar, salesOnly: false, mediaOnly: false },
  { id: 'strategy', label: 'Client Work', icon: Clapperboard, salesOnly: false, mediaOnly: true },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: true, salesOnly: false, mediaOnly: false },
  { id: 'settings', label: 'Settings', icon: Settings, badge: false, salesOnly: false, mediaOnly: false },
]

const adminNavItems = [
  { id: 'overview',      label: 'Overview',           icon: LayoutDashboard, badge: false },
  { id: 'leads',         label: 'FB Leads & Follow-ups', icon: TrendingUp,   badge: false },
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

export default function Sidebar({ profile, activeSection, onNavigate, isOpen, unreadCount }: SidebarProps) {
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

  const handleLogout = () => {
    localStorage.removeItem('rushi_token')
    router.push('/')
  }

  // ---- THEMING ----
  const sidebarBg = isLight ? '#0e3d35' : 'var(--bg-surface)'
  const logoBorderColor = isLight ? 'rgba(255,255,255,0.1)' : 'var(--border-default)'
  const logoIconBg = isLight ? 'rgba(255,179,63,0.2)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)'
  const logoIconColor = isLight ? '#ffb33f' : 'white'
  const nameColor = isLight ? '#ffffff' : 'var(--text-primary)'
  const subColor = isLight ? 'rgba(255,255,255,0.45)' : 'var(--text-muted)'
  const sectionLabelColor = isLight ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)'
  const sidebarBorderRight = isLight ? 'none' : '1px solid var(--border-default)'
  const sidebarBoxShadow = isLight ? '4px 0 20px rgba(14,61,53,0.2)' : 'none'
  const profileBorderColor = isLight ? 'rgba(255,255,255,0.1)' : 'var(--border-default)'
  const profileNameColor = isLight ? '#ffffff' : 'var(--text-primary)'
  const profileRoleColor = isLight ? 'rgba(255,255,255,0.45)' : 'var(--text-muted)'
  const logoutBtnColor = isLight ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)'

  const getNavItemStyle = (id: string) => {
    const isActive = activeSection === id
    if (isLight) {
      return {
        background: isActive ? 'rgba(255,179,63,0.18)' : 'transparent',
        color: isActive ? '#ffb33f' : 'rgba(255,255,255,0.68)',
        border: `1px solid ${isActive ? 'rgba(255,179,63,0.28)' : 'transparent'}`,
      }
    }
    return {
      background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
      color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
      border: `1px solid ${isActive ? 'rgba(99,102,241,0.2)' : 'transparent'}`,
    }
  }

  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : ''}`}
      style={{
        background: sidebarBg,
        borderRight: sidebarBorderRight,
        boxShadow: sidebarBoxShadow,
      }}
    >
      {/* Logo */}
      <div className="sidebar-logo" style={{ borderBottomColor: logoBorderColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem 1rem' }}>
        <img
          src="/logo.png"
          alt="Logo"
          className="sidebar-logo-img"
          style={{
            width: '130px',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="nav-section-label" style={{ color: sectionLabelColor }}>Navigation</p>
        {navItems.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            className="nav-item"
            style={{
              width: '100%', textAlign: 'left', position: 'relative',
              ...getNavItemStyle(id),
            }}
            onClick={() => onNavigate(id)}
          >
            <Icon size={17} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{label}</span>
            {badge && unreadCount > 0 && (
              <span style={{
                background: isLight ? '#ffb33f' : 'var(--brand-primary)',
                color: isLight ? '#0a1f1c' : 'white',
                fontSize: '0.65rem', fontWeight: 700,
                padding: '1px 6px', borderRadius: '99px',
                minWidth: '18px', textAlign: 'center',
              }}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Points Leaderboard — admin only */}
      {profile.role === 'admin' && (
        <PointsLeaderboard isLight={isLight} />
      )}

      {/* User Profile at Bottom */}
      <div style={{
        padding: '1rem',
        borderTop: `1px solid ${profileBorderColor}`,
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt="Profile" className="avatar avatar-sm" style={{ objectFit: 'cover' }} />
        ) : (
          <div className="avatar avatar-sm">
            {getInitials(profile.full_name)}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '0.8rem', fontWeight: 600, color: profileNameColor,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {profile.full_name}
          </p>
          <p style={{ fontSize: '0.65rem', color: profileRoleColor, textTransform: 'capitalize' }}>
            {profile.role === 'admin' ? 'Administrator' : (profile.designation || 'Employee')}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0.375rem', color: logoutBtnColor,
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center',
          }}
          data-tooltip="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}
