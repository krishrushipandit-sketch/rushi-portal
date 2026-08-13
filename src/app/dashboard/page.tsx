'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
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


export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchProfile = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/')
      return
    }

    let { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    // If profile doesn't exist yet, create it (handles admin created before schema)
    if (error && error.code === 'PGRST116') {
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
          role: 'employee',
        })
        .select()
        .single()

      if (insertError) {
        console.error('Could not create profile:', insertError.message)
        await supabase.auth.signOut()
        router.push('/')
        return
      }
      data = newProfile
    } else if (error) {
      console.error('Profile fetch error:', error.message)
      await supabase.auth.signOut()
      router.push('/')
      return
    }

    if (!data) {
      router.push('/')
      return
    }

    setProfile(data)
    setLoading(false)
  }, [router])

  const fetchUnreadCount = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const { count } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('is_read', false)
    setUnreadCount(count || 0)
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (!profile) return
    fetchUnreadCount()
    // Poll for new notifications every 60 seconds
    const interval = setInterval(fetchUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [profile, fetchUnreadCount])

  // Real-time notification subscription
  useEffect(() => {
    if (!profile) return
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${profile.id}`,
      }, () => {
        fetchUnreadCount()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
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
      case 'sales': return profile.role === 'admin' ? <SalesSection {...props} /> : null

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
        unreadCount={unreadCount}
      />

      <div className="main-content">
        <Topbar
          profile={profile}
          unreadCount={unreadCount}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onNotificationsClick={() => setActiveSection('notifications')}
        />
        <div className="page-container animate-fade-in">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
