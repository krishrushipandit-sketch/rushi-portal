'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { canAccessLeads, findNavItem, type ActiveSection } from '@/lib/navigation'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import CommandPalette from '@/components/CommandPalette'
import OverviewSection from '@/components/sections/OverviewSection'
import TasksSection from '@/components/sections/TasksSection'
import LeadsSection from '@/components/sections/LeadsSection'
import SalesSection from '@/components/sections/SalesSection'
import PerformanceSection from '@/components/sections/PerformanceSection'
import EmployeesSection from '@/components/sections/EmployeesSection'
import NotificationsSection from '@/components/sections/NotificationsSection'
import ReportsSection from '@/components/sections/ReportsSection'
import StrategySection from '@/components/sections/StrategySection'
import SettingsSection from '@/components/sections/SettingsSection'
import LeaderboardSection from '@/components/sections/LeaderboardSection'
import AttendanceSection from '@/components/sections/AttendanceSection'
import RealtimeLeadAlert from '@/components/RealtimeLeadAlert'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import MobileBottomNav from '@/components/MobileBottomNav'
import ClickSpark from '@/components/fx/ClickSpark'

export type { ActiveSection } from '@/lib/navigation'

/** Get the stored JWT token for API calls */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('rushi_token')
}

/** Auth headers helper */
export function authHeaders(): HeadersInit {
  const token = getAuthToken()
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
}

const sectionFromHash = (): ActiveSection | null => {
  if (typeof window === 'undefined') return null
  const h = window.location.hash.replace('#', '')
  return (h || null) as ActiveSection | null
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [navBadges, setNavBadges] = useState<Record<string, number | 'dot'>>({})

  useEffect(() => {
    try {
      if (localStorage.getItem('rp-sidebar-collapsed') === 'true') setSidebarCollapsed(true)
    } catch { /* silent */ }
  }, [])

  const navigate = useCallback((section: ActiveSection) => {
    setActiveSection(section)
    setSidebarOpen(false)
    if (window.location.hash !== `#${section}`) {
      window.history.replaceState(null, '', section === 'overview' ? window.location.pathname : `#${section}`)
    }
    window.scrollTo({ top: 0 })
  }, [])

  // ── Auto Logout at 12:00 AM Midnight IST ──
  useEffect(() => {
    const handleMidnightExpiry = () => {
      localStorage.removeItem('rushi_token')
      localStorage.removeItem('rushi_user')
      localStorage.removeItem('rushi_login_date')
      document.cookie = 'rushi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      router.push('/?session=expired')
    }

    const checkMidnightLogout = () => {
      const now = new Date()
      const istOffsetMs = 5.5 * 60 * 60 * 1000
      const istTime = new Date(now.getTime() + istOffsetMs)
      const storedLoginDate = localStorage.getItem('rushi_login_date')
      const currentIstDateStr = istTime.toISOString().split('T')[0]

      if (!storedLoginDate) {
        localStorage.setItem('rushi_login_date', currentIstDateStr)
      } else if (storedLoginDate !== currentIstDateStr) {
        handleMidnightExpiry()
        return 0
      }

      const nextMidnightIST = new Date(Date.UTC(
        istTime.getUTCFullYear(), istTime.getUTCMonth(), istTime.getUTCDate() + 1, 0, 0, 0, 0
      ))
      return (nextMidnightIST.getTime() - istOffsetMs) - now.getTime()
    }

    const msUntilMidnight = checkMidnightLogout()
    let timer: NodeJS.Timeout | null = null
    if (msUntilMidnight > 0 && msUntilMidnight < 2147483647) {
      timer = setTimeout(handleMidnightExpiry, msUntilMidnight)
    }
    // Catch-up check in case the device slept through midnight
    const interval = setInterval(checkMidnightLogout, 15000)
    return () => {
      if (timer) clearTimeout(timer)
      clearInterval(interval)
    }
  }, [router])

  const handleToggleSidebar = useCallback(() => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(prev => !prev)
    } else {
      setSidebarCollapsed(prev => {
        const next = !prev
        try { localStorage.setItem('rp-sidebar-collapsed', String(next)) } catch { /* silent */ }
        return next
      })
    }
  }, [])

  // ⌘K / Ctrl+K opens the command palette; "[" toggles the sidebar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
        return
      }
      const target = e.target as HTMLElement
      const typing = target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      if (!typing && e.key === '[' && !e.metaKey && !e.ctrlKey) handleToggleSidebar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleToggleSidebar])

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('rushi_token')
      const userStr = localStorage.getItem('rushi_user')
      if (!token || !userStr) {
        router.push('/')
        return
      }

      const res = await fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
      if (!res.ok) {
        localStorage.removeItem('rushi_token')
        localStorage.removeItem('rushi_user')
        router.push('/')
        return
      }

      const { user } = await res.json()
      const profileRes = await fetch(`/api/employees/${user.userId}`, { headers: { 'Authorization': `Bearer ${token}` } })

      if (profileRes.ok) {
        setProfile(await profileRes.json())
      } else {
        setProfile({
          id: user.userId,
          email: user.email,
          full_name: user.name,
          role: user.role,
          department: null,
          designation: null,
          phone: null,
          whatsapp_number: null,
          avatar_url: null,
          is_active: true,
          created_at: new Date().toISOString(),
        } as Profile)
      }
      setLoading(false)
    } catch (err) {
      console.error('Session error:', err)
      router.push('/')
    }
  }, [router])

  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('rushi_token')
      if (!token) return
      const res = await fetch('/api/notifications?unread=true', { headers: { 'Authorization': `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setUnreadCount(Array.isArray(data) ? data.filter((n: { is_read: boolean }) => !n.is_read).length : 0)
      }
    } catch { /* silent */ }
  }, [])

  // Employee reminders in the nav: report not yet submitted today, tasks due today or overdue
  const fetchBadges = useCallback(async () => {
    const token = localStorage.getItem('rushi_token')
    if (!token || !profile || profile.role === 'admin') return
    const headers = { Authorization: `Bearer ${token}` }
    try {
      const [reports, tasks] = await Promise.all([
        fetch('/api/reports', { headers }).then(r => (r.ok ? r.json() : [])),
        fetch('/api/tasks', { headers }).then(r => (r.ok ? r.json() : [])),
      ])
      const today = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10)
      const endOfToday = new Date(); endOfToday.setHours(23, 59, 59, 999)
      const reportDone = Array.isArray(reports) && reports.some((r: { report_date: string }) => String(r.report_date).slice(0, 10) === today)
      const due = Array.isArray(tasks)
        ? tasks.filter((t: { status: string; deadline: string | null }) => t.deadline && !['completed', 'cancelled'].includes(t.status) && new Date(t.deadline) <= endOfToday).length
        : 0
      setNavBadges({ reports: reportDone ? 0 : 'dot', tasks: due })
    } catch { /* badges are best-effort */ }
  }, [profile])

  useEffect(() => {
    if (!profile || profile.role === 'admin') return
    fetchBadges()
    const interval = setInterval(fetchBadges, 120000)
    const onRefresh = () => fetchBadges()
    window.addEventListener('rp:refresh-badges', onRefresh)
    return () => { clearInterval(interval); window.removeEventListener('rp:refresh-badges', onRefresh) }
  }, [profile, fetchBadges, activeSection])

  useEffect(() => { fetchProfile() }, [fetchProfile])

  useEffect(() => {
    const onProfile = () => fetchProfile()
    window.addEventListener('rp:profile-updated', onProfile)
    return () => window.removeEventListener('rp:profile-updated', onProfile)
  }, [fetchProfile])

  // Restore the section from the URL once we know what this user may see
  useEffect(() => {
    if (!profile) return
    const fromHash = sectionFromHash()
    if (fromHash && findNavItem(profile, fromHash)) setActiveSection(fromHash)
    const onHash = () => {
      const s = sectionFromHash()
      if (s && findNavItem(profile, s)) setActiveSection(s)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [profile])

  useEffect(() => {
    if (!profile) return
    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [profile, fetchUnreadCount])

  // Background trigger for task & visit/workshop reminders (throttled to every 15 mins)
  useEffect(() => {
    if (!profile) return
    try {
      const lastCheck = sessionStorage.getItem('rp_last_cron_check')
      const now = Date.now()
      if (!lastCheck || now - parseInt(lastCheck, 10) > 15 * 60 * 1000) {
        sessionStorage.setItem('rp_last_cron_check', String(now))
        const token = localStorage.getItem('rushi_token')
        if (token) {
          fetch('/api/cron/task-reminders', { headers: { 'Authorization': `Bearer ${token}` } }).catch(() => {})
          fetch('/api/cron/visit-reminders', { headers: { 'Authorization': `Bearer ${token}` } }).catch(() => {})
        }
      }
    } catch { /* silent */ }
  }, [profile])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo-mark.png" alt="" width={44} height={44} style={{ borderRadius: '50%', animation: 'pulseGlow 1.6s ease-in-out infinite' }} />
          <div style={{ width: 120, height: 2, borderRadius: 2, overflow: 'hidden', background: 'var(--border-default)' }}>
            <div className="skeleton" style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--brand-primary), transparent)', backgroundSize: '200% 100%' }} />
          </div>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const leadsAllowed = canAccessLeads(profile)

  const renderSection = () => {
    const props = { profile }
    switch (activeSection) {
      case 'overview': return <OverviewSection {...props} onNavigate={navigate} />
      case 'tasks': return <TasksSection {...props} initialTab="all" />
      case 'my-tasks': return <TasksSection {...props} initialTab="my-tasks" />
      case 'reports': return <ReportsSection {...props} />
      case 'leads': return leadsAllowed ? <LeadsSection {...props} /> : <OverviewSection {...props} onNavigate={navigate} />
      case 'sales': return leadsAllowed ? <SalesSection {...props} /> : null
      case 'performance': return <PerformanceSection {...props} />
      case 'employees': return profile.role === 'admin' ? <EmployeesSection {...props} /> : null
      case 'notifications': return <NotificationsSection {...props} onRead={fetchUnreadCount} />
      case 'strategy': return <StrategySection {...props} />
      case 'settings': return <SettingsSection {...props} />
      case 'leaderboard': return <LeaderboardSection {...props} />
      case 'attendance': return <AttendanceSection {...props} />
      default: return <OverviewSection {...props} onNavigate={navigate} />
    }
  }

  return (
    <ClickSpark sparkColor={['#3ee6a8', '#2fd0d8', '#4aa8ff']} sparkSize={8} sparkRadius={18} sparkCount={8} duration={420} style={{ isolation: 'auto' }}>
    <div className="page-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      <Sidebar
        profile={profile}
        activeSection={activeSection}
        onNavigate={navigate}
        onOpenSearch={() => setPaletteOpen(true)}
        isOpen={sidebarOpen}
        collapsed={sidebarCollapsed}
        unreadCount={unreadCount}
        badges={navBadges}
      />

      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Topbar
          profile={profile}
          activeSection={activeSection}
          unreadCount={unreadCount}
          onToggleSidebar={handleToggleSidebar}
          onOpenSearch={() => setPaletteOpen(true)}
          onNavigate={navigate}
        />
        <main className="page-container animate-fade-in" key={activeSection}>
          {renderSection()}
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} profile={profile} onNavigate={navigate} />

      <RealtimeLeadAlert onViewLead={() => navigate('leads')} userRole={profile.role} />
      <PWAInstallPrompt />
      <MobileBottomNav
        profile={profile}
        activeSection={activeSection}
        onNavigate={navigate}
        onToggleMenu={() => setSidebarOpen(prev => !prev)}
        unreadCount={unreadCount}
        badges={navBadges}
      />
    </div>
    </ClickSpark>
  )
}
