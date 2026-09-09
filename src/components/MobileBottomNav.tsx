'use client'

import { ClipboardList, Calendar, CheckSquare, Clapperboard, Home, Menu, Bell } from 'lucide-react'
import type { ActiveSection } from '@/app/dashboard/page'
import type { Profile } from '@/lib/database.types'

interface MobileBottomNavProps {
  profile: Profile
  activeSection: ActiveSection
  onNavigate: (section: ActiveSection) => void
  onToggleMenu: () => void
  unreadCount?: number
}

export default function MobileBottomNav({
  profile,
  activeSection,
  onNavigate,
  onToggleMenu,
  unreadCount = 0
}: MobileBottomNavProps) {
  const isAdmin = profile.role === 'admin'
  const isKedar = (profile.full_name || '').toLowerCase().includes('kedar') || (profile.email || '').toLowerCase().includes('kedar')
  const isSuyog = (profile.full_name || '').toLowerCase().includes('suyog') || (profile.email || '').toLowerCase().includes('suyog')
  const isRohan = (profile.full_name || '').toLowerCase().includes('rohan') || (profile.email || '').toLowerCase().includes('rohan') || profile.department?.toLowerCase() === 'design'
  const canAccessStrategy = isAdmin || isKedar || isSuyog || isRohan

  const navItems = [
    { id: 'overview' as ActiveSection, label: 'Home', icon: Home },
    { id: 'reports' as ActiveSection, label: 'Report', icon: ClipboardList },
    { id: 'attendance' as ActiveSection, label: 'Attend', icon: Calendar },
    { id: 'my-tasks' as ActiveSection, label: 'Tasks', icon: CheckSquare },
    canAccessStrategy
      ? { id: 'strategy' as ActiveSection, label: 'Strategy', icon: Clapperboard }
      : { id: 'notifications' as ActiveSection, label: 'Alerts', icon: Bell, badge: unreadCount },
  ]

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '62px',
        background: 'rgba(14, 20, 34, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'none', // Controlled via CSS media query
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 990,
        padding: '0 4px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {navItems.map(item => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              height: '100%',
              background: 'transparent',
              border: 'none',
              color: isActive ? '#10b981' : '#94a3b8',
              cursor: 'pointer',
              position: 'relative',
              padding: '4px 0',
              transition: 'color 0.15s ease',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              {item.badge && item.badge > 0 ? (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-6px',
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    borderRadius: '99px',
                    padding: '0 4px',
                    minWidth: '14px',
                    height: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 500 }}>
              {item.label}
            </span>
          </button>
        )
      })}

      {/* Menu drawer button */}
      <button
        type="button"
        onClick={onToggleMenu}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          height: '100%',
          background: 'transparent',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          padding: '4px 0',
        }}
      >
        <Menu size={20} strokeWidth={1.8} />
        <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>
          Menu
        </span>
      </button>
    </nav>
  )
}
