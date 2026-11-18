'use client'

import { Bell, CalendarDays, CheckSquare, ClipboardList, Clapperboard, Home, Menu, TrendingUp } from 'lucide-react'
import type { Profile } from '@/lib/database.types'
import { isMediaEmployee, isSalesEmployee, type ActiveSection } from '@/lib/navigation'

interface MobileBottomNavProps {
  profile: Profile
  activeSection: ActiveSection
  onNavigate: (section: ActiveSection) => void
  onToggleMenu: () => void
  unreadCount?: number
  badges?: Record<string, number | 'dot'>
}

export default function MobileBottomNav({ profile, activeSection, onNavigate, onToggleMenu, unreadCount = 0, badges = {} }: MobileBottomNavProps) {
  const isAdmin = profile.role === 'admin'
  const tasksId: ActiveSection = isAdmin ? 'my-tasks' : 'tasks'

  const fifth = isAdmin || isSalesEmployee(profile)
    ? { id: 'leads' as ActiveSection, label: 'Leads', icon: TrendingUp }
    : isMediaEmployee(profile)
      ? { id: 'strategy' as ActiveSection, label: 'Strategy', icon: Clapperboard }
      : { id: 'notifications' as ActiveSection, label: 'Alerts', icon: Bell, badge: unreadCount }

  const items: { id: ActiveSection; label: string; icon: typeof Home; badge?: number }[] = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'reports', label: 'Report', icon: ClipboardList },
    { id: 'attendance', label: 'Attendance', icon: CalendarDays },
    { id: tasksId, label: 'Tasks', icon: CheckSquare },
    fifth,
  ]

  return (
    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      {items.map(({ id, label, icon: Icon, badge }) => {
        const active = activeSection === id
        return (
          <button key={id} type="button" className={`mobile-nav-item ${active ? 'active' : ''}`} onClick={() => onNavigate(id)}>
            <span style={{ position: 'relative', display: 'flex' }}>
              <Icon size={20} strokeWidth={active ? 2.3 : 1.8} />
              {badge ? <span className="mobile-nav-dot">{badge > 9 ? '9+' : badge}</span> : null}
              {!badge && badges[id] === 'dot' && <span className="mobile-nav-dot" style={{ minWidth: 8, width: 8, height: 8, padding: 0, top: -1, right: -2 }} />}
              {!badge && typeof badges[id] === 'number' && (badges[id] as number) > 0 && <span className="mobile-nav-dot" style={{ background: 'var(--status-warning)' }}>{badges[id]}</span>}
            </span>
            {label}
          </button>
        )
      })}
      <button type="button" className="mobile-nav-item" onClick={onToggleMenu}>
        <Menu size={20} strokeWidth={1.8} />
        More
      </button>
    </nav>
  )
}
