'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { playLeadChime, requestNotificationPermission, showDesktopLeadNotification } from '@/lib/sound'
import { BellRing, PhoneCall, X, Sparkles, Volume2, VolumeX, ShieldAlert } from 'lucide-react'

interface NewLeadAlert {
  id: string
  name: string
  phone: string
  industry: string
  platform: string
  created_at: string
}

interface Props {
  onViewLead: () => void
  userRole?: string
}

export default function RealtimeLeadAlert({ onViewLead, userRole }: Props) {
  const [activeAlert, setActiveAlert] = useState<NewLeadAlert | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const lastKnownLeadIdRef = useRef<string | null>(null)
  const isInitialLoadRef = useRef(true)

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  // Request browser notification permission once
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  // Poll for latest leads every 6 seconds
  const checkNewLeads = useCallback(async () => {
    const token = getToken()
    if (!token) return

    try {
      const res = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) return

      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) return

      const latest = data[0]

      // On initial load, record latest ID without alerting
      if (isInitialLoadRef.current) {
        lastKnownLeadIdRef.current = latest.id
        isInitialLoadRef.current = false
        return
      }

      // If a brand new lead arrives
      if (lastKnownLeadIdRef.current && latest.id !== lastKnownLeadIdRef.current) {
        lastKnownLeadIdRef.current = latest.id

        const newLead: NewLeadAlert = {
          id: latest.id,
          name: latest.client_name || latest.name || 'New Candidate',
          phone: latest.phone || 'Not provided',
          industry: latest.industry || latest.category || 'Digital Marketing',
          platform: latest.platform || latest.source || 'Facebook',
          created_at: latest.created_at || new Date().toISOString()
        }

        // 1. Play Web Audio Chime
        if (soundEnabled) {
          playLeadChime()
        }

        // 2. Trigger Desktop Push Notification
        showDesktopLeadNotification(
          newLead.name,
          newLead.industry,
          newLead.platform,
          onViewLead
        )

        // 3. Set In-App Floating Toast
        setActiveAlert(newLead)
      }
    } catch (e) {
      /* silent poll error */
    }
  }, [soundEnabled, onViewLead])

  useEffect(() => {
    checkNewLeads()
    const interval = setInterval(checkNewLeads, 6000)
    return () => clearInterval(interval)
  }, [checkNewLeads])

  if (!activeAlert) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '24px',
        zIndex: 9999,
        maxWidth: '380px',
        width: '100%',
        animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{
        background: 'var(--bg-elevated)',
        borderRadius: '16px',
        border: '1px solid #6366f1',
        boxShadow: '0 20px 50px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(99, 102, 241, 0.4)',
        padding: '1.25rem',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #6366f1, #06b6d4, #10b981)'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          {/* Pulsing Bell Icon */}
          <div style={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            animation: 'pulseGlow 2s infinite'
          }}>
            <BellRing size={18} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ⚡ New Inbound Lead
              </span>
              <button
                onClick={() => setActiveAlert(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
              >
                <X size={15} />
              </button>
            </div>

            <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', margin: '3px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeAlert.name}
            </h4>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              {activeAlert.industry} &nbsp;·&nbsp; <strong style={{ color: '#1877F2' }}>{activeAlert.platform}</strong>
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                onClick={() => {
                  onViewLead()
                  setActiveAlert(null)
                }}
                className="btn btn-primary btn-sm"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
              >
                <PhoneCall size={12} /> View &amp; Call Lead
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>
    </div>
  )
}
