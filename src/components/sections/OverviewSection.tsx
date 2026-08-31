'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import type { ActiveSection } from '@/app/dashboard/page'
import { useTheme } from '@/lib/ThemeContext'
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
  const { theme } = useTheme()
  const isLight = theme === 'light'
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
      value: 0, 
      icon: Users, 
      color: '#10b981', 
      sub: `DM: 0 · SM: 0 · AZ: 0` 
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
            {profile.role === 'admin' ? 'Admin Dashboard' : `Welcome, ${profile.full_name.split(' ')[0]} 👋`}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* ── Organization Vision & Leadership Banner (Glowing & Eye-Catching) ── */}
      <style>{`
        @keyframes visionGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.5);
            border-color: rgba(255, 255, 255, 0.18);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.15), 0 4px 24px rgba(0, 0, 0, 0.7);
            border-color: rgba(255, 255, 255, 0.35);
          }
        }
        @keyframes sparkleBlink {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 4px #ffffff);
          }
          50% {
            transform: scale(1.22) rotate(12deg);
            filter: drop-shadow(0 0 10px #ffffff);
          }
        }
        @keyframes livePulseDot {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
      <div
        style={{
          background: isLight
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: isLight ? '1.5px solid rgba(16, 185, 129, 0.45)' : '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '16px',
          padding: '1.125rem 1.35rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden',
          animation: 'visionGlow 4s ease-in-out infinite',
          backdropFilter: 'blur(10px)',
          boxShadow: isLight ? '0 4px 20px rgba(16, 185, 129, 0.12)' : '0 4px 24px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Glowing Sparkle Icon Badge */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: isLight ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: isLight ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: isLight ? '0 2px 10px rgba(16, 185, 129, 0.2)' : '0 0 14px rgba(255, 255, 255, 0.1)'
          }}
        >
          <span style={{
            fontSize: '1.35rem',
            display: 'inline-block',
            animation: 'sparkleBlink 2.5s ease-in-out infinite'
          }}>
            ✨
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'inline-block',
              boxShadow: '0 0 8px #ffffff',
              animation: 'livePulseDot 1.8s infinite'
            }} />
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: isLight ? '#065f46' : '#ffffff',
              textShadow: isLight ? 'none' : '0 0 12px rgba(255, 255, 255, 0.4)'
            }}>
              Our Collective Vision &amp; Growth
            </span>
          </div>
          <p style={{
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            margin: 0,
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>
            &ldquo;We&apos;re building an organization that can become one of India&apos;s leading AI, Business Transformation, and Digital Growth companies, including Stock Advisory. Every one of you has the opportunity to grow into a leader as we scale together.&rdquo;
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {statCards.map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="stat-card" style={{
            background: isLight 
              ? '#ffffff' 
              : `linear-gradient(145deg, #121215 0%, #0d0d0f 100%)`,
            border: isLight ? '1px solid #cbd5e1' : `1px solid rgba(255, 255, 255, 0.12)`,
            borderTop: isLight ? '1px solid #cbd5e1' : `3px solid rgba(255, 255, 255, 0.35)`,
            boxShadow: isLight ? '0 2px 6px rgba(15, 23, 42, 0.04)' : `0 4px 20px rgba(0, 0, 0, 0.4)`
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div className="metric-value" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{value}</div>
                <div className="metric-label" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '2px' }}>{label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>{sub}</div>
              </div>
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff',
                border: `1px solid rgba(255, 255, 255, 0.14)`,
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
