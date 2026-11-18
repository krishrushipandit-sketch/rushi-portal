'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight, ShieldCheck, FastForward, Volume2, VolumeX, Clock } from 'lucide-react'
import Aurora from '@/components/fx/Aurora'
import GradientText from '@/components/fx/GradientText'
import ShinyText from '@/components/fx/ShinyText'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(false)

  // Video Payload State
  const [showVideoPayload, setShowVideoPayload] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('session') === 'expired') {
        setSessionExpiredNotice(true)
      }
    }
  }, [])

  const proceedToDashboard = () => {
    if (isUnlocking) return
    setIsUnlocking(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 750)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSessionExpiredNotice(false)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid email or password. Please try again.')
        setLoading(false)
        return
      }

      if (data.token) {
        localStorage.setItem('rushi_token', data.token)
        localStorage.setItem('rushi_user', JSON.stringify(data.user))
        const istDateStr = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().split('T')[0]
        localStorage.setItem('rushi_login_date', istDateStr)
        setLoggedInUser(data.user)
      }

      // Trigger post-login video payload
      setShowVideoPayload(true)
    } catch {
      setError('Connection error. Please try again.')
      setLoading(false)
    }
  }

  // If login is successful, render the video payload intro
  if (showVideoPayload) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <style>{`
          @keyframes fillProgress {
            from { width: 0%; }
            to { width: 100%; }
          }
          @keyframes unlockPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(16,185,129,0.5); }
            50% { transform: scale(1.08); box-shadow: 0 0 45px rgba(16,185,129,0.9); }
          }
        `}</style>

        {/* Top Control Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
          zIndex: 20,
          opacity: isUnlocking ? 0 : 1,
          transition: 'opacity 0.4s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }} />
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#ffffff'
            }}>
              RushiPandit Organization Vision
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Audio Mute Toggle */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted
                  setIsMuted(videoRef.current.muted)
                }
              }}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.15s'
              }}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              {isMuted ? 'Unmute' : 'Mute'}
            </button>

            {/* Skip to Dashboard Button */}
            <button
              onClick={proceedToDashboard}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                color: '#ffffff',
                padding: '7px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.15s'
              }}
            >
              Enter Portal <FastForward size={14} />
            </button>
          </div>
        </div>

        {/* Fullscreen Edge-to-Edge Cinematic Video Player */}
        <video
          ref={videoRef}
          src="/System_opening_cinematic_animation_202608181747.mp4"
          autoPlay
          playsInline
          controls={false}
          onEnded={proceedToDashboard}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            display: 'block',
            zIndex: 1,
            transform: isUnlocking ? 'scale(1.05)' : 'scale(1)',
            filter: isUnlocking ? 'brightness(1.3) blur(10px)' : 'none',
            opacity: isUnlocking ? 0 : 1,
            transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Bottom Hint */}
        {!isUnlocking && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '6px 16px',
            borderRadius: '99px',
            backdropFilter: 'blur(8px)',
            zIndex: 10,
            letterSpacing: '0.02em',
            transition: 'opacity 0.3s'
          }}>
            Redirecting to dashboard automatically after video...
          </div>
        )}

        {/* ── Cinematic Smooth Unlock Overlay ── */}
        {isUnlocking && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, rgba(14,61,53,0.94) 0%, rgba(3,10,8,0.98) 100%)',
            backdropFilter: 'blur(16px)',
            gap: '1.25rem',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(16, 185, 129, 0.6)',
              animation: 'unlockPulse 1.2s infinite ease-in-out'
            }}>
              <ShieldCheck size={32} color="#ffffff" />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.35rem' }}>
                Welcome to RushiPandit Portal
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0 }}>
                {loggedInUser?.name ? `Signed in as ${loggedInUser.name} · Launching workspace...` : 'Launching workspace...'}
              </p>
            </div>

            {/* Glowing Progress Bar */}
            <div style={{
              width: '240px',
              height: '4px',
              borderRadius: '99px',
              background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
              marginTop: '0.5rem'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #10b981, #34d399, #6366f1)',
                animation: 'fillProgress 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                boxShadow: '0 0 12px #10b981'
              }} />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="login-shell">
      <div className="login-aurora" aria-hidden>
        <Aurora colorStops={['#0f6b55', '#3ee6a8', '#2a7bd6']} amplitude={1.2} blend={0.6} speed={0.7} opacity={0.95} dpr={1} />
      </div>
      <div className="login-grid" aria-hidden />

      <section className="login-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo-mark.png" alt="" width={40} height={40} style={{ borderRadius: '50%', boxShadow: '0 0 0 1px rgba(255,255,255,0.15), 0 0 30px rgba(62,230,168,0.35)' }} />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 650, fontSize: '0.95rem', color: '#eef3f7' }}>RushiPandit</div>
            <div style={{ fontSize: '0.75rem', color: '#8b97a3' }}>Institute of Business &amp; AI</div>
          </div>
        </div>

        <div>
          <div className="login-chip">
            <span className="live-dot" />
            <ShinyText text="STAFF COMMAND CENTER · v2" color="#8b97a3" shineColor="#eafff6" speed={3} />
          </div>
          <h1 className="login-headline">
            Run the institute
            <br />
            <GradientText colors={['#3ee6a8', '#2fd0d8', '#4aa8ff', '#3ee6a8']} animationSpeed={6}>at the speed of AI.</GradientText>
          </h1>
          <p className="login-lede">
            Leads, visits, daily reports, attendance and performance — one live workspace for the whole RushiPandit team.
          </p>
          <div className="login-stats">
            {[
              ['Pipeline', 'Live lead tracking'],
              ['Visits', 'Monthly visit analytics'],
              ['Reports', 'AI-assisted daily logs'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3ee6a8' }}>{k}</div>
                <div style={{ fontSize: '0.8125rem', color: '#aeb9c4', marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#5d6976' }}>© {new Date().getFullYear()} RushiPandit Institute · Internal use only</p>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div style={{ marginBottom: '1.75rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#77838f' }}>Secure sign-in</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 650, letterSpacing: '-0.03em', color: '#eef3f7', marginTop: '0.4rem' }}>Welcome back</h2>
            <p style={{ fontSize: '0.875rem', color: '#8b97a3', marginTop: '0.3rem' }}>Sign in with your work account to continue.</p>
          </div>

          {sessionExpiredNotice && (
            <div className="login-notice">
              <Clock size={15} style={{ flexShrink: 0 }} />
              <span>Your daily session ended at 12:00 AM. Sign in again to start today’s workspace.</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="login-field">
              <span>Work email</span>
              <div className="login-input">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="you@rushipandit.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </label>

            <label className="login-field">
              <span>Password</span>
              <div className="login-input">
                <Lock size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {error && <div className="login-error" role="alert">{error}</div>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? (
                <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Signing in…</>
              ) : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="login-foot">
            <ShieldCheck size={14} color="#3ee6a8" />
            <span>Encrypted session · auto sign-out at midnight IST</span>
          </div>
        </div>
      </section>
    </div>
  )
}
