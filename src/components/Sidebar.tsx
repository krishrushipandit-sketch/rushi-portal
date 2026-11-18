'use client'

import { Search } from 'lucide-react'
import type { Profile } from '@/lib/database.types'
import { getNavGroups, type ActiveSection } from '@/lib/navigation'
import Avatar from '@/components/ui/Avatar'
import UserMenu from '@/components/UserMenu'

interface SidebarProps {
  profile: Profile
  activeSection: ActiveSection
  onNavigate: (section: ActiveSection) => void
  onOpenSearch: () => void
  isOpen: boolean
  collapsed?: boolean
  unreadCount: number
  badges?: Record<string, number | 'dot'>
}

export default function Sidebar({ profile, activeSection, onNavigate, onOpenSearch, isOpen, collapsed, unreadCount, badges = {} }: SidebarProps) {
  const groups = getNavGroups(profile)
  const roleLabel = profile.role === 'admin' ? 'Administrator' : profile.designation || profile.department || 'Team member'

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed-rail' : ''}`} aria-label="Main navigation">
      <div className="sidebar-brand">
        <img src="/logo-mark.png" alt="RushiPandit" />
        <div className="sidebar-brand-text">
          <strong>RushiPandit</strong>
          <span>Institute of Business &amp; AI</span>
        </div>
      </div>

      <button className="sidebar-search" onClick={onOpenSearch} data-tip="Search  ⌘K">
        <Search size={15} />
        <span>Search…</span>
        <kbd>⌘K</kbd>
      </button>

      <nav className="sidebar-nav">
        {groups.map(group => (
          <div key={group.label}>
            <p className="nav-section-label">{group.label}</p>
            {group.items.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                data-nav={id}
                data-tip={collapsed ? label : undefined}
                className={`nav-item ${activeSection === id ? 'active' : ''}`}
                aria-current={activeSection === id ? 'page' : undefined}
                onClick={() => onNavigate(id)}
              >
                <Icon size={17} strokeWidth={1.9} />
                <span className="nav-label">{label}</span>
                {badge && unreadCount > 0 && <span className="nav-count">{unreadCount > 99 ? '99+' : unreadCount}</span>}
                {badges[id] === 'dot' && <span className="nav-dot" title="Needs your attention today" />}
                {typeof badges[id] === 'number' && (badges[id] as number) > 0 && <span className="nav-count warn">{badges[id]}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <UserMenu profile={profile} onNavigate={onNavigate} placement="sidebar">
        <div className="sidebar-user">
          <Avatar name={profile.full_name} src={profile.avatar_url} size="sm" />
          <div className="sidebar-user-meta">
            <strong>{profile.full_name}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>
      </UserMenu>
    </aside>
  )
}
