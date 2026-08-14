'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
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

export type ActiveSection =
  | 'overview'
  | 'tasks'
  | 'leads'
  | 'sales'
  | 'reports'
  | 'performance'
  | 'employees'
  | 'notifications'
  | 'strategy'
  | 'settings'
  | 'leaderboard'
  | 'attendance'

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

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Initialize sidebar collapsed state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rp-sidebar-collapsed')
      if (saved === 'true') setSidebarCollapsed(true)
    } catch { /* silent */ }
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const next = !prev
      try { localStorage.setItem('rp-sidebar-collapsed', String(next)) } catch { /* silent */ }
      return next
    })
  }

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('rushi_token')
      const userStr = localStorage.getItem('rushi_user')

      if (!token || !userStr) {
        router.push('/')
        return
      }

      // Verify token is still valid
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!res.ok) {
        localStorage.removeItem('rushi_token')
        localStorage.removeItem('rushi_user')
        router.push('/')
        return
      }

      const { user } = await res.json()

      // Fetch full profile
      const profileRes = await fetch(`/api/employees/${user.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (profileRes.ok) {
        const profileData = await profileRes.json()
        setProfile(profileData)
      } else {
        // Build profile from JWT data
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
      const res = await fetch('/api/notifications?unread=true', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUnreadCount(Array.isArray(data) ? data.filter((n: {is_read: boolean}) => !n.is_read).length : 0)
      }
    } catch { /* silent */ }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (!profile) return
    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [profile, fetchUnreadCount])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid var(--border-default)',
            borderTopColor: 'var(--brand-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem',
          }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading portal...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!profile) return null

  const canAccessLeads =
    profile.role === 'admin' || profile.department?.toLowerCase() === 'sales'

  const renderSection = () => {
    const props = { profile }
    switch (activeSection) {
      case 'overview': return <OverviewSection {...props} onNavigate={setActiveSection} />
      case 'tasks': return <TasksSection {...props} />
      case 'reports': return <ReportsSection {...props} />
      case 'leads': return canAccessLeads
        ? <LeadsSection {...props} />
        : <OverviewSection {...props} onNavigate={setActiveSection} />
      case 'sales': return canAccessLeads ? <SalesSection {...props} /> : null
      case 'performance': return <PerformanceSection {...props} />
      case 'employees': return profile.role === 'admin' ? <EmployeesSection {...props} /> : null
      case 'notifications': return <NotificationsSection {...props} onRead={fetchUnreadCount} />
      case 'strategy': return <StrategySection {...props} />
      case 'settings': return <SettingsSection {...props} />
      case 'leaderboard': return <LeaderboardSection {...props} />
      case 'attendance': return <AttendanceSection {...props} />
      default: return <OverviewSection {...props} onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="page-layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        profile={profile}
        activeSection={activeSection}
        onNavigate={(section) => {
          setActiveSection(section as ActiveSection)
          setSidebarOpen(false)
        }}
        isOpen={sidebarOpen}
        collapsed={sidebarCollapsed}
        unreadCount={unreadCount}
      />

      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Topbar
          profile={profile}
          unreadCount={unreadCount}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          onNotificationsClick={() => setActiveSection('notifications')}
        />
        <div className="page-container animate-fade-in">
          {renderSection()}
        </div>
      </div>

      {/* Real-time Lead Audio Chime & Desktop Push Notification Listener */}
      <RealtimeLeadAlert
        onViewLead={() => setActiveSection('leads')}
        userRole={profile.role}
      />
    </div>
  )
}
