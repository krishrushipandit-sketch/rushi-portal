'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Cpu, Award } from 'lucide-react'

const VISION_TEXT = "We're building an organization that can become one of India's leading AI, Business Transformation, and Digital Growth companies, including Stock Advisory. Every one of you has the opportunity to grow into a leader as we scale together."

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Typewriter effect state
  const [typedText, setTypedText] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)

  useEffect(() => {
    let index = 0
    setTypedText('')
    setIsTypingDone(false)

    const timer = setInterval(() => {
      if (index < VISION_TEXT.length) {
        setTypedText(VISION_TEXT.slice(0, index + 1))
        index++
      } else {
        setIsTypingDone(true)
        clearInterval(timer)
      }
    }, 28) // smooth typing speed

    return () => clearInterval(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
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
        return
      }

      if (data.token) {
        localStorage.setItem('rushi_token', data.token)
        localStorage.setItem('rushi_user', JSON.stringify(data.user))
      }

      router.push('/dashboard')
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'radial-gradient(ellipse at top left, #0f172a 0%, #090d16 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient lighting effects */}
      <div style={{
        position: 'absolute',
        top: '-180px',
        left: '15%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        right: '15%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main Container Container */}
      <div style={{
        width: '100%',
        maxWidth: '1020px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>

        {/* ── LEFT PANEL: Animated Vision & Mission with Typewriter Cursor ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '1rem 0.5rem'
        }}>
          {/* Brand Logo Card */}
          <div>
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '0.6rem 1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
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
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              margin: '0 0 0.5rem'
            }}>
              RushiPandit <span style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Growth Portal</span>
            </h1>
            <p style={{
              fontSize: '0.88rem',
              color: '#94a3b8',
              margin: 0
            }}>
              Internal operating system for Sales, Media, Strategy &amp; AI operations.
            </p>
          </div>

          {/* Typewriter Mission Box */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Mission Header Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                  padding: '4px 10px',
                  borderRadius: '99px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}>
                  <Sparkles size={12} /> Our Vision &amp; Purpose
                </span>
              </div>
              <span style={{
                fontSize: '0.7rem',
                color: isTypingDone ? '#10b981' : '#f59e0b',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isTypingDone ? '#10b981' : '#f59e0b',
                  display: 'inline-block'
                }} />
                {isTypingDone ? 'Vision Ready' : 'Streaming Payload...'}
              </span>
            </div>

            {/* Typewriter Animated Content */}
            <p style={{
              fontSize: '1rem',
              fontWeight: 500,
              lineHeight: 1.65,
              color: '#e2e8f0',
              margin: 0,
              minHeight: '100px',
              letterSpacing: '-0.01em'
            }}>
              {typedText}
              <span className="typewriter-cursor">|</span>
            </p>

            {/* Mission Pillars Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8',
                background: 'rgba(56, 189, 248, 0.1)', padding: '4px 9px',
                borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.25)'
              }}>
                <Cpu size={12} /> AI Transformation
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 700, color: '#34d399',
                background: 'rgba(52, 211, 153, 0.1)', padding: '4px 9px',
                borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.25)'
              }}>
                <TrendingUp size={12} /> Digital Growth
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 700, color: '#fbbf24',
                background: 'rgba(251, 191, 36, 0.1)', padding: '4px 9px',
                borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.25)'
              }}>
                <Award size={12} /> Stock Advisory
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Sign In Card ── */}
        <div style={{
          width: '100%',
          maxWidth: '430px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          padding: '2.25rem 2rem',
          position: 'relative'
        }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: '0 0 0.35rem'
            }}>
              Sign In to Your Workspace
            </h2>
            <p style={{
              fontSize: '0.82rem',
              color: '#94a3b8',
              margin: 0
            }}>
              Enter your registered staff credentials to proceed
            </p>
          </div>

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
                    background: 'rgba(30, 41, 59, 0.8)',
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
                    background: 'rgba(30, 41, 59, 0.8)',
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
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                borderColor: '#4f46e5',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)'
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

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          display: inline-block;
          font-weight: 800;
          color: #38bdf8;
          margin-left: 2px;
          animation: blinkCursor 0.85s infinite;
        }
      `}</style>
    </div>
  )
}

