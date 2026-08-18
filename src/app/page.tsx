'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight, ShieldCheck, Play, FastForward, Volume2, VolumeX, Clock } from 'lucide-react'

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
    router.push('/dashboard')
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
          zIndex: 10
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

        {/* Fullscreen Edge-to-Edge MP4 Video Player */}
        <video
          ref={videoRef}
          src="/vision.mp4"
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
            zIndex: 1
          }}
        />

        {/* Bottom Hint */}
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
          letterSpacing: '0.02em'
        }}>
          Redirecting to dashboard automatically after video...
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'radial-gradient(ellipse at top, #0e241f 0%, #081411 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(14, 30, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
        padding: '2.5rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Brand Logo & Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '0.65rem 1.25rem',
            display: 'inline-flex',
            alignItems: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '1.25rem'
          }}>
            <img
              src="/logo.png"
              alt="RushiPandit Logo"
              style={{
                height: '32px',
                width: 'auto',
                maxWidth: '170px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
          <h2 style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: '0 0 0.35rem'
          }}>
            Staff &amp; Admin Portal
          </h2>
          <p style={{
            fontSize: '0.82rem',
            color: '#94a3b8',
            margin: 0
          }}>
            Sign in to access your CRM, sales leads &amp; reports
          </p>
        </div>

        {sessionExpiredNotice && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#fbbf24',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <Clock size={16} style={{ flexShrink: 0 }} />
            <span>Daily session ended at 12:00 AM. Please sign in with your password to start today&apos;s workspace.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1' }}>
              Work Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="email"
                className="form-input"
                placeholder="your.name@rushipandit.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  paddingLeft: '38px',
                  height: '44px',
                  fontSize: '0.875rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: '#ffffff'
                }}
                required
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  pointerEvents: 'none',
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  paddingLeft: '38px',
                  paddingRight: '40px',
                  height: '44px',
                  fontSize: '0.875rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: '#ffffff'
                }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: 0,
                  display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              fontSize: '0.8rem',
              color: '#f87171',
              fontWeight: 600
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              height: '46px',
              fontSize: '0.92rem',
              fontWeight: 800,
              borderRadius: '10px',
              marginTop: '0.5rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderColor: '#059669',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)'
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Signing in...
              </>
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security / Help Footer */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          color: '#64748b',
          fontSize: '0.75rem'
        }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Encrypted internal system access</span>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

