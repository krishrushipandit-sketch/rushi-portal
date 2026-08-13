'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import type { ActiveSection } from '@/app/dashboard/page'
import { CheckSquare, Clock, AlertTriangle, TrendingUp, BarChart3, Users, Star, Trophy } from 'lucide-react'
import { formatDate, getStatusColor, getPriorityColor } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface Props {
  profile: Profile
  onNavigate: (section: ActiveSection) => void
}

interface Task {
  id: string
  title: string
  status: string
  priority: string
  deadline: string | null
  task_type: string
}

interface GlobalStats {
  total_tasks: number
  completed: number
  in_progress: number
  overdue: number
  total_leads: number
  leads_closed_won: number
  enrollments?: Record<string, number>
}

export default function OverviewSection({ profile, onNavigate }: Props) {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [stats, setStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState<{ employee: { full_name: string }; totalPoints: number }[]>([])
  const [stars, setStars] = useState<{ rank: number; total_points: number; employee: { full_name: string; designation: string | null } }[]>([])

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

    const [tasksRes, perfRes, pointsRes] = await Promise.all([
      fetch('/api/tasks', { headers }),
      profile.role === 'admin' ? fetch('/api/performance', { headers }) : Promise.resolve(null),
      profile.role === 'admin' ? fetch('/api/points', { headers }) : Promise.resolve(null),
    ])

    const tasksData = await tasksRes.json()
    if (Array.isArray(tasksData)) setTasks(tasksData.slice(0, 5))

    if (perfRes) {
      const perfData = await perfRes.json()
      if (perfData.globalStats) setStats(perfData.globalStats)
    }

    if (pointsRes) {
      const pointsData = await pointsRes.json()
      if (pointsData.leaderboard) setLeaderboard(pointsData.leaderboard)
      if (pointsData.stars) setStars(pointsData.stars)
    }

    setLoading(false)
  }, [profile.role, router])

  useEffect(() => { fetchData() }, [fetchData])

  // Employee stats derived from their tasks
  const myCompleted = tasks.filter(t => t.status === 'completed').length
  const myInProgress = tasks.filter(t => t.status === 'in_progress').length
  const myPending = tasks.filter(t => t.status === 'pending').length
  const myOverdue = tasks.filter(t =>
    t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed'
  ).length

  const adminCards = stats ? [
    { label: 'Total Tasks', value: stats.total_tasks, icon: CheckSquare, color: '#6366f1', sub: `${stats.completed} completed` },
    { label: 'In Progress', value: stats.in_progress, icon: Clock, color: '#3b82f6', sub: 'Active tasks' },
    { label: 'Overdue', value: stats.overdue, icon: AlertTriangle, color: '#ef4444', sub: 'Needs attention' },
    { 
      label: 'Monthly Enrollments', 
      value: (stats.enrollments?.['DM Enrollment'] || 0) + (stats.enrollments?.['SM Enrollment'] || 0) + (stats.enrollments?.['Amazon Enrollment'] || 0), 
      icon: Users, 
      color: '#10b981', 
      sub: `DM: ${stats.enrollments?.['DM Enrollment'] || 0} · SM: ${stats.enrollments?.['SM Enrollment'] || 0} · AZ: ${stats.enrollments?.['Amazon Enrollment'] || 0}` 
    },
  ] : []

  const employeeCards = [
    { label: 'My Tasks', value: tasks.length, icon: CheckSquare, color: '#6366f1', sub: 'Total assigned' },
    { label: 'In Progress', value: myInProgress, icon: Clock, color: '#3b82f6', sub: 'Working on' },
    { label: 'Completed', value: myCompleted, icon: BarChart3, color: '#10b981', sub: 'Done' },
    { label: 'Overdue', value: myOverdue, icon: AlertTriangle, color: '#ef4444', sub: 'Needs attention' },
  ]

  const statCards = profile.role === 'admin' ? adminCards : employeeCards

  if (loading) {
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <div className="skeleton" style={{ height: '28px', width: '220px', marginBottom: '8px' }} />
          <div className="skeleton" style={{ height: '16px', width: '300px' }} />
        </div>
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="skeleton" style={{ height: '100px' }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            {profile.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {statCards.map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div className="metric-value">{value}</div>
                <div className="metric-label">{label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{sub}</div>
              </div>
              <div style={{
                width: '44px', height: '44px',
                background: `${color}18`,
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color,
                border: `1px solid ${color}22`,
              }}>
                <Icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>
            {profile.role === 'admin' ? 'Recent Tasks' : 'My Recent Tasks'}
          </h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onNavigate('tasks')}
          >
            View all
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><CheckSquare size={24} /></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No tasks yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {tasks.map(task => (
              <div key={task.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                gap: '1rem',
                flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                    background: task.status === 'completed' ? '#10b981' :
                      task.status === 'in_progress' ? '#3b82f6' :
                      task.status === 'overdue' ? '#ef4444' : '#64748b',
                  }} />
                  <p style={{
                    fontSize: '0.875rem', fontWeight: 500,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {task.title}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
                  <span className={`badge ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`badge ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                  {task.deadline && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {formatDate(task.deadline, 'dd MMM')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Points Chart (Admin Only) */}
      {profile.role === 'admin' && (
        <div style={{ marginTop: '1.5rem' }}>
          {/* Star Performers Banner */}
          {stars.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(251,191,36,0.03))',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={20} fill="#f59e0b" color="#f59e0b" />
                <div>
                  <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f59e0b' }}>Star Performers of the Month</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
                {stars.map(s => (
                  <div key={s.rank} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', background: s.rank === 1 ? 'rgba(245,158,11,0.15)' : 'var(--bg-elevated)', border: `1px solid ${s.rank === 1 ? 'rgba(245,158,11,0.3)' : 'var(--border-subtle)'}` }}>
                    <span style={{ fontSize: '1.25rem' }}>{s.rank === 1 ? '🥇' : '🥈'}</span>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.employee.full_name}</p>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.total_points} pts total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Points Leaderboard Chart */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <Trophy size={18} style={{ color: '#f59e0b' }} />
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Monthly Points Leaderboard</h2>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            {leaderboard.length === 0 ? (
              <div className="empty-state" style={{ height: '160px' }}>
                <div className="empty-state-icon"><Trophy size={22} /></div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Points will appear here once employees submit reports</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={leaderboard.map(row => ({
                    name: row.employee.full_name.split(' ')[0],
                    Points: row.totalPoints,
                  }))}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} allowDecimals={false} />
                  <Tooltip
                    formatter={(v) => [`${v} pts`]}
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '0.8rem' }}
                  />
                  <Bar dataKey="Points" radius={[6, 6, 0, 0]}>
                    {leaderboard.map((_, i) => (
                      <Cell key={i} fill={
                        i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : '#6366f1'
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
