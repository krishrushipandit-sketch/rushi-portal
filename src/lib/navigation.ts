import {
  LayoutDashboard, TrendingUp, BarChart3, CheckSquare, ListChecks,
  ClipboardList, Users, Trophy, Bell, Settings, CalendarDays, Clapperboard,
  type LucideIcon,
} from 'lucide-react'
import type { Profile } from '@/lib/database.types'

export type ActiveSection =
  | 'overview' | 'tasks' | 'my-tasks' | 'leads' | 'sales' | 'reports' | 'performance'
  | 'employees' | 'notifications' | 'strategy' | 'settings' | 'leaderboard' | 'attendance'

export interface NavItem {
  id: ActiveSection
  label: string
  icon: LucideIcon
  badge?: boolean
  keywords?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

const includesName = (p: Profile, name: string) =>
  p.full_name?.toLowerCase().includes(name) || p.email?.toLowerCase().includes(name)

export const isSalesEmployee = (p: Profile) => p.department?.toLowerCase() === 'sales'

export function isMediaEmployee(p: Profile): boolean {
  const dept = p.department?.toLowerCase() ?? ''
  const desig = p.designation?.toLowerCase() ?? ''
  return (
    ['media', 'client_management', 'strategy', 'design'].includes(dept) ||
    ['video', 'editor', 'client', 'strategy', 'design'].some(k => desig.includes(k)) ||
    includesName(p, 'kedar') || includesName(p, 'suyog') || includesName(p, 'rohan')
  )
}

export function canAccessLeads(p: Profile): boolean {
  return p.role === 'admin' || isSalesEmployee(p)
}

export function getNavGroups(p: Profile): NavGroup[] {
  if (p.role === 'admin') {
    return [
      { label: 'Workspace', items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, keywords: 'home dashboard' },
        { id: 'my-tasks', label: 'My Tasks', icon: CheckSquare, keywords: 'todo' },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: true, keywords: 'inbox alerts' },
      ] },
      { label: 'Sales', items: [
        { id: 'leads', label: 'Leads & Pipeline', icon: TrendingUp, keywords: 'crm inbound calls visits' },
        { id: 'sales', label: 'Sales Analytics', icon: BarChart3, keywords: 'metrics visits enrolments conversion' },
      ] },
      { label: 'Team', items: [
        { id: 'tasks', label: 'Task Management', icon: ListChecks, keywords: 'assign' },
        { id: 'reports', label: 'Daily Reports', icon: ClipboardList, keywords: 'eod report' },
        { id: 'attendance', label: 'Attendance', icon: CalendarDays, keywords: 'leave wfh biometric' },
        { id: 'performance', label: 'Performance', icon: BarChart3, keywords: 'kpi review' },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, keywords: 'points ranking' },
        { id: 'employees', label: 'Employees', icon: Users, keywords: 'staff people team' },
      ] },
      { label: 'Content', items: [
        { id: 'strategy', label: 'Strategy Panel', icon: Clapperboard, keywords: 'clients reels media' },
      ] },
      { label: 'System', items: [
        { id: 'settings', label: 'Settings', icon: Settings, keywords: 'profile password' },
      ] },
    ]
  }

  const groups: NavGroup[] = [
    { label: 'Workspace', items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard, keywords: 'home dashboard' },
      { id: 'tasks', label: 'My Tasks', icon: CheckSquare, keywords: 'todo' },
      { id: 'reports', label: 'Daily Report', icon: ClipboardList, keywords: 'eod report' },
      { id: 'attendance', label: 'Attendance', icon: CalendarDays, keywords: 'leave wfh check in' },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: true, keywords: 'inbox alerts' },
    ] },
  ]
  if (isSalesEmployee(p)) {
    groups.push({ label: 'Sales', items: [
      { id: 'leads', label: 'Leads & Pipeline', icon: TrendingUp, keywords: 'crm calls visits' },
      { id: 'sales', label: 'Sales Analytics', icon: BarChart3, keywords: 'metrics visits enrolments' },
    ] })
  }
  if (isMediaEmployee(p)) {
    groups.push({ label: 'Content', items: [
      { id: 'strategy', label: 'Strategy Panel', icon: Clapperboard, keywords: 'clients reels media' },
    ] })
  }
  groups.push({ label: 'System', items: [
    { id: 'settings', label: 'Settings', icon: Settings, keywords: 'profile password' },
  ] })
  return groups
}

export function findNavItem(p: Profile, id: ActiveSection): { group: string; item: NavItem } | null {
  for (const g of getNavGroups(p)) {
    const item = g.items.find(i => i.id === id)
    if (item) return { group: g.label, item }
  }
  return null
}

export async function signOut(navigate: (path: string) => void) {
  localStorage.removeItem('rushi_token')
  localStorage.removeItem('rushi_user')
  localStorage.removeItem('rushi_login_date')
  await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
  navigate('/')
}
