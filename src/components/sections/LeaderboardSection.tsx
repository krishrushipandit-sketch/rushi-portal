'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getInitials } from '@/lib/utils'
import type { Profile } from '@/lib/database.types'
import { Trophy, Star, ChevronLeft, ChevronRight, Medal, Crown, Zap } from 'lucide-react'

interface LeaderRow {
  employee: { id: string; full_name: string; designation: string | null; avatar_url?: string | null }
  totalPoints: number
  dailyHistory: { date: string; points: number }[]
}

interface StarPerformer {
  rank: number
  total_points: number
  month: string
  employee: { id: string; full_name: string; designation: string | null; avatar_url?: string | null }
}

interface Props {
  profile: Profile
}

const MONTHS: string[] = []
const now = new Date()
// Ensure we are getting the month in local timezone properly
for (let i = 0; i < 6; i++) {
  let y = now.getFullYear()
  let m = now.getMonth() - i + 1
  if (m <= 0) {
    m += 12
    y -= 1
  }
  const formatted = `${y}-${m.toString().padStart(2, '0')}`
  MONTHS.push(formatted)
}

function monthLabel(m: string) {
  const [year, month] = m.split('-')
  return new Date(parseInt(year), parseInt(month) - 1, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function LeaderboardSection({ profile }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0])
  const [leaderboard, setLeaderboard] = useState<LeaderRow[]>([])
  const [stars, setStars] = useState<StarPerformer[]>([])
  const [pastStars, setPastStars] = useState<Record<string, StarPerformer[]>>({})
  const [loading, setLoading] = useState(true)

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || ''
  }

  const fetchMonth = async (month: string) => {
    setLoading(true)
    const token = await getToken()
    const res = await fetch(`/api/points?month=${month}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setLeaderboard(data.leaderboard || [])
    setStars(data.stars || [])
    setLoading(false)
  }

  const fetchPastStars = async () => {
    const token = await getToken()
    const pastMonths = MONTHS.slice(1) // skip current month
    const results: Record<string, StarPerformer[]> = {}
    await Promise.all(pastMonths.map(async (m) => {
      const res = await fetch(`/api/points?month=${m}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.stars && data.stars.length > 0) {
        results[m] = data.stars
      }
    }))
    setPastStars(results)
  }

  useEffect(() => {
    fetchMonth(selectedMonth)
  }, [selectedMonth])

  useEffect(() => {
    fetchPastStars()
  }, [])

  const monthIdx = MONTHS.indexOf(selectedMonth)
  const rankColors = ['#f59e0b', '#94a3b8', '#cd7f32']
  const rankEmojis = ['🥇', '🥈', '🥉']
  const rankBg = ['rgba(245,158,11,0.1)', 'rgba(148,163,184,0.08)', 'rgba(205,127,50,0.08)']
  const rankBorder = ['rgba(245,158,11,0.3)', 'rgba(148,163,184,0.2)', 'rgba(205,127,50,0.2)']

  const isCurrentMonth = selectedMonth === MONTHS[0]

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(245,158,11,0.3)'
            }}>
              <Trophy size={22} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Leaderboard</h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Employee points &amp; top performers</p>
            </div>
          </div>
        </div>

        {/* Month Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setSelectedMonth(MONTHS[Math.min(monthIdx + 1, MONTHS.length - 1)])}
            disabled={monthIdx >= MONTHS.length - 1}
            style={{
              width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-default)',
              background: 'var(--bg-elevated)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', opacity: monthIdx >= MONTHS.length - 1 ? 0.4 : 1
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div style={{
            padding: '0.4rem 1rem', background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)', borderRadius: '8px',
            fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', minWidth: '140px', textAlign: 'center'
          }}>
            {monthLabel(selectedMonth)}
            {isCurrentMonth && (
              <span style={{
                marginLeft: '6px', fontSize: '0.6rem', background: '#10b981',
                color: 'white', padding: '1px 5px', borderRadius: '99px', fontWeight: 700
              }}>LIVE</span>
            )}
          </div>

          <button
            onClick={() => setSelectedMonth(MONTHS[Math.max(monthIdx - 1, 0)])}
            disabled={monthIdx <= 0}
            style={{
              width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-default)',
              background: 'var(--bg-elevated)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', opacity: monthIdx <= 0 ? 0.4 : 1
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div style={{
            width: '40px', height: '40px', border: '3px solid var(--border-subtle)',
            borderTopColor: '#f59e0b', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>

          {/* ── TOP 3 PODIUM ── */}
          {leaderboard.length > 0 && (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {isCurrentMonth ? '🏆 Current Standings' : `🏆 ${monthLabel(selectedMonth)} Results`}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                {[1, 0, 2].map((rank, i) => {
                  const row = leaderboard[rank]
                  if (!row) return null
                  const heights = ['140px', '180px', '120px']
                  const isTop = rank === 0
                  return (
                    <div key={row.employee.id} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                      animation: 'fade-in 0.5s ease'
                    }}>
                      {/* Crown for 1st */}
                      {rank === 0 && <Crown size={22} color="#f59e0b" fill="#f59e0b" />}

                      {/* Avatar */}
                      {row.employee.avatar_url ? (
                        <img src={row.employee.avatar_url} alt={row.employee.full_name}
                          style={{ width: isTop ? '64px' : '52px', height: isTop ? '64px' : '52px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${rankColors[rank]}` }} />
                      ) : (
                        <div style={{
                          width: isTop ? '64px' : '52px', height: isTop ? '64px' : '52px', borderRadius: '50%',
                          background: `${rankColors[rank]}25`, border: `3px solid ${rankColors[rank]}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: isTop ? '1.1rem' : '0.9rem', fontWeight: 800, color: rankColors[rank]
                        }}>
                          {getInitials(row.employee.full_name)}
                        </div>
                      )}

                      <span style={{ fontSize: isTop ? '0.9rem' : '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {row.employee.full_name.split(' ')[0]}
                      </span>

                      {/* Podium block */}
                      <div style={{
                        width: isTop ? '100px' : '80px', height: heights[i],
                        background: `linear-gradient(180deg, ${rankColors[rank]}30, ${rankColors[rank]}10)`,
                        border: `1px solid ${rankColors[rank]}40`,
                        borderRadius: '10px 10px 0 0',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px'
                      }}>
                        <span style={{ fontSize: '1.6rem' }}>{rankEmojis[rank]}</span>
                        <span style={{ fontSize: isTop ? '1.4rem' : '1.1rem', fontWeight: 900, color: rankColors[rank] }}>
                          {row.totalPoints}
                        </span>
                        <span style={{ fontSize: '0.6rem', color: rankColors[rank], opacity: 0.7 }}>pts</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── FULL RANKINGS TABLE ── */}
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Medal size={16} color="#6366f1" />
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Full Rankings</h3>
            </div>

            {leaderboard.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                No points recorded for {monthLabel(selectedMonth)} yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {leaderboard.map((row, i) => (
                  <div key={row.employee.id} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.875rem 1.5rem',
                    borderBottom: i < leaderboard.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    background: i < 3 ? rankBg[i] : 'transparent',
                    borderLeft: i < 3 ? `3px solid ${rankColors[i]}` : '3px solid transparent'
                  }}>
                    {/* Rank */}
                    <div style={{ minWidth: '36px', textAlign: 'center' }}>
                      {i < 3
                        ? <span style={{ fontSize: '1.2rem' }}>{rankEmojis[i]}</span>
                        : <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>#{i + 1}</span>
                      }
                    </div>

                    {/* Avatar */}
                    {row.employee.avatar_url ? (
                      <img src={row.employee.avatar_url} alt={row.employee.full_name}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: i < 3 ? `2px solid ${rankColors[i]}` : '2px solid var(--border-default)' }} />
                    ) : (
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                        background: i < 3 ? `${rankColors[i]}20` : 'rgba(99,102,241,0.1)',
                        border: i < 3 ? `2px solid ${rankColors[i]}` : '2px solid var(--border-default)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 800, color: i < 3 ? rankColors[i] : 'var(--brand-primary)'
                      }}>
                        {getInitials(row.employee.full_name)}
                      </div>
                    )}

                    {/* Name & Designation */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                        {row.employee.full_name}
                      </p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                        {row.employee.designation || 'Employee'}
                      </p>
                    </div>

                    {/* Daily history pills */}
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '200px' }}>
                      {row.dailyHistory.slice(-7).map(dh => (
                        <div key={dh.date} title={`${dh.date}: ${dh.points}pts`} style={{
                          width: '28px', height: '28px', borderRadius: '6px',
                          background: dh.points >= 20 ? 'rgba(245,158,11,0.15)' : dh.points >= 10 ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.1)',
                          border: `1px solid ${dh.points >= 20 ? 'rgba(245,158,11,0.3)' : dh.points >= 10 ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.2)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.55rem', fontWeight: 800,
                          color: dh.points >= 20 ? '#f59e0b' : dh.points >= 10 ? '#10b981' : '#6366f1'
                        }}>
                          {dh.points}
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div style={{ minWidth: '60px', textAlign: 'right' }}>
                      <span style={{
                        fontSize: '1.3rem', fontWeight: 900,
                        color: i < 3 ? rankColors[i] : 'var(--text-primary)'
                      }}>
                        {row.totalPoints}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: '2px' }}>pts</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── PAST MONTHS STAR PERFORMERS HISTORY ── */}
          {Object.keys(pastStars).length > 0 && (
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Past Star Performers</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {Object.entries(pastStars)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([month, performers]) => (
                    <div key={month} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                      <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        📅 {monthLabel(month)}
                      </p>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {performers.map(p => (
                          <div key={p.rank} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 0.875rem', borderRadius: '99px',
                            background: rankBg[p.rank - 1] || 'var(--bg-elevated)',
                            border: `1px solid ${rankBorder[p.rank - 1] || 'var(--border-subtle)'}`,
                          }}>
                            <span style={{ fontSize: '1rem' }}>{rankEmojis[p.rank - 1] || `#${p.rank}`}</span>
                            {p.employee.avatar_url ? (
                              <img src={p.employee.avatar_url} alt={p.employee.full_name}
                                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{
                                width: '24px', height: '24px', borderRadius: '50%',
                                background: `${rankColors[p.rank - 1] || '#6366f1'}20`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.55rem', fontWeight: 800, color: rankColors[p.rank - 1] || '#6366f1'
                              }}>
                                {getInitials(p.employee.full_name)}
                              </div>
                            )}
                            <div>
                              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                                {p.employee.full_name.split(' ')[0]}
                              </p>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: rankColors[p.rank - 1] || 'var(--text-muted)' }}>
                              {p.total_points}pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ── CURRENT MONTH STAR PERFORMERS BANNER ── */}
          {isCurrentMonth && stars.length > 0 && (
            <div className="glass-card" style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(251,191,36,0.03))',
              border: '1px solid rgba(245,158,11,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Zap size={16} color="#f59e0b" fill="#f59e0b" />
                <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#f59e0b', margin: 0 }}>
                  This Month&apos;s Announced Star Performers
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {stars.map(s => (
                  <div key={s.rank} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 1rem', borderRadius: '99px',
                    background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)'
                  }}>
                    <span>{rankEmojis[s.rank - 1]}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s.employee.full_name}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#f59e0b' }}>{s.total_points}pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
