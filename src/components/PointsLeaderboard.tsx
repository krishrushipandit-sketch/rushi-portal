'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getInitials } from '@/lib/utils'
import { Trophy, Award } from 'lucide-react'

interface LeaderRow {
  employee: { id: string; full_name: string; designation: string | null; avatar_url?: string | null }
  totalPoints: number
}

interface StarPerformer {
  rank: number
  total_points: number
  employee: { id: string; full_name: string; designation: string | null; avatar_url?: string | null }
}

interface Props {
  isLight: boolean
}

export default function PointsLeaderboard({ isLight }: Props) {
  const router = useRouter()
  const [leaderboard, setLeaderboard] = useState<LeaderRow[]>([])
  const [stars, setStars] = useState<StarPerformer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPoints = async () => {
      const token = localStorage.getItem('rushi_token')
      if (!token) {
        router.push('/')
        return
      }
      
      try {
        const res = await fetch('/api/points', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        })
        const data = await res.json()
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard.slice(0, 5))
          setStars(data.stars || [])
        }
      } catch (err) {
        console.error('Failed to fetch points:', err)
      }
      setLoading(false)
    }
    fetchPoints()
  }, [router])

  const textColor = isLight ? '#0f172a' : 'var(--text-primary)'
  const mutedColor = isLight ? '#64748b' : 'var(--text-muted)'
  const borderColor = isLight ? '#e2e8f0' : 'var(--border-subtle)'
  const cardBg = isLight ? '#f8fafc' : 'var(--bg-elevated)'

  const rankColors = ['#d97706', '#64748b', '#b45309']

  if (loading) {
    return (
      <div style={{ padding: '0.75rem 1rem', borderTop: `1px solid ${borderColor}` }}>
        <div style={{ height: '12px', background: isLight ? 'rgba(255,255,255,0.1)' : 'var(--border-subtle)', borderRadius: '4px', marginBottom: '0.5rem' }} />
        {[1,2,3].map(i => (
          <div key={i} style={{ height: '32px', background: isLight ? 'rgba(255,255,255,0.07)' : 'var(--bg-elevated)', borderRadius: '6px', marginBottom: '4px' }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ borderTop: `1px solid ${borderColor}`, padding: '0.75rem 0.875rem' }}>
      {/* Star Performers Banner */}
      {stars.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(251,191,36,0.04))',
          border: '1px solid rgba(245,158,11,0.22)',
          borderRadius: '8px', padding: '0.625rem 0.75rem', marginBottom: '0.75rem'
        }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#f59e0b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Award size={11} /> Top Performers
          </p>
          {stars.map(s => (
            <div key={s.rank} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: rankColors[s.rank - 1] || '#f59e0b', width: '14px' }}>
                #{s.rank}
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: textColor, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.employee.full_name}
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f59e0b' }}>{s.total_points}pts</span>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.5rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Trophy size={12} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <p style={{ fontSize: '0.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: mutedColor }}>
            Leaderboard
          </p>
        </div>
        <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.07em', color: isLight ? '#059669' : 'var(--brand-primary)' }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', year: '2-digit' }).toUpperCase()}
        </p>
      </div>

      {leaderboard.length === 0 ? (
        <p style={{ fontSize: '0.72rem', color: mutedColor, fontStyle: 'italic' }}>No points logged yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {leaderboard.map((row, i) => (
            <div key={row.employee.id} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '5px 8px', borderRadius: '7px', background: i === 0 ? 'rgba(245,158,11,0.1)' : cardBg,
              border: i === 0 ? '1px solid rgba(245,158,11,0.2)' : `1px solid ${borderColor}`
            }}>
              {/* Rank Badge */}
              <span style={{
                fontSize: '0.65rem', fontWeight: 800,
                color: rankColors[i] || mutedColor,
                minWidth: '16px', textAlign: 'center'
              }}>
                #{i + 1}
              </span>
              {/* Avatar */}
              {row.employee.avatar_url ? (
                <img src={row.employee.avatar_url} alt="Avatar" style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? 'rgba(245,158,11,0.25)' : (isLight ? 'rgba(255,255,255,0.15)' : 'rgba(99,102,241,0.2)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.58rem', fontWeight: 700,
                  color: i === 0 ? '#f59e0b' : (isLight ? 'rgba(255,255,255,0.7)' : 'var(--brand-primary)')
                }}>
                  {getInitials(row.employee.full_name)}
                </div>
              )}
              {/* Name */}
              <span style={{ flex: 1, fontSize: '0.72rem', fontWeight: 600, color: textColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {row.employee.full_name.split(' ')[0]}
              </span>
              {/* Points */}
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: i === 0 ? '#f59e0b' : mutedColor }}>
                {row.totalPoints}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
