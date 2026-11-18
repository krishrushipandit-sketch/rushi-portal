'use client'

import { Bell, ChevronRight, Moon, PanelLeft, Search, Sun } from 'lucide-react'
import type { Profile } from '@/lib/database.types'
import { useTheme } from '@/lib/ThemeContext'
import { findNavItem, type ActiveSection } from '@/lib/navigation'
import Avatar from '@/components/ui/Avatar'
import UserMenu from '@/components/UserMenu'

interface TopbarProps {
  profile: Profile
  activeSection: ActiveSection
  unreadCount: number
  onToggleSidebar: () => void
  onOpenSearch: () => void
  onNavigate: (section: ActiveSection) => void
}

export default function Topbar({ profile, activeSection, unreadCount, onToggleSidebar, onOpenSearch, onNavigate }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const crumb = findNavItem(profile, activeSection)

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
        <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar" title="Toggle sidebar  [">
          <PanelLeft size={17} />
        </button>
        <div className="topbar-crumbs">
          <span className="crumb-muted hidden-mobile">{crumb?.group ?? 'Workspace'}</span>
          <ChevronRight size={14} className="hidden-mobile" style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
          <span className="crumb-current">{crumb?.item.label ?? 'Overview'}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <button className="topbar-search hidden-mobile" onClick={onOpenSearch}>
          <Search size={14} />
          <span>Search or jump to…</span>
          <kbd>⌘K</kbd>
        </button>
        <button className="icon-btn hidden-desktop" onClick={onOpenSearch} aria-label="Search">
          <Search size={17} />
        </button>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle appearance" title={theme === 'dark' ? 'Light appearance' : 'Dark appearance'}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="icon-btn" onClick={() => onNavigate('notifications')} aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}>
          <Bell size={17} />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
        </button>
        <div style={{ width: 1, height: 20, background: 'var(--border-default)', margin: '0 0.375rem' }} />
        <UserMenu profile={profile} onNavigate={onNavigate} placement="topbar">
          <Avatar name={profile.full_name} src={profile.avatar_url} size="sm" />
        </UserMenu>
      </div>
    </header>
  )
}
