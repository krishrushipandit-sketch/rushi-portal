'use client'

/**
 * Web Audio API Notification Chime Generator
 * High-definition synthetic harmonic chime — 100% offline, zero external asset downloads
 */
export function playLeadChime() {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime

    // ── Primary Tone (F5 -> A5 ascending sparkle) ──
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(698.46, now) // F5
    osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.12) // A5
    osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28) // D6

    gain1.gain.setValueAtTime(0.001, now)
    gain1.gain.linearRampToValueAtTime(0.35, now + 0.04)
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.7)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.7)

    // ── Second Harmonic Bell (Shimmer) ──
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(1046.50, now + 0.1) // C6
    osc2.frequency.exponentialRampToValueAtTime(1396.91, now + 0.25) // F6

    gain2.gain.setValueAtTime(0.001, now + 0.1)
    gain2.gain.linearRampToValueAtTime(0.2, now + 0.14)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now + 0.1)
    osc2.stop(now + 0.8)

    // Auto close context after sound finishes
    setTimeout(() => {
      ctx.close().catch(() => {})
    }, 1200)
  } catch (e) {
    console.error('Audio chime error:', e)
  }
}

/**
 * Request Desktop Push Notification Permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission !== 'denied') {
    const res = await Notification.requestPermission()
    return res === 'granted'
  }
  return false
}

/**
 * Show Native Desktop Notification
 */
export function showDesktopLeadNotification(
  leadName: string,
  industry: string,
  platform: string,
  onClick?: () => void
) {
  if (typeof window === 'undefined' || !('Notification' in window)) return
  if (Notification.permission === 'granted') {
    try {
      const notif = new Notification(`🔥 New Inbound Lead: ${leadName}`, {
        body: `Program: ${industry} | Source: ${platform}. Click to view lead and call!`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'rushi-new-lead',
        requireInteraction: true,
      })
      if (onClick) {
        notif.onclick = () => {
          window.focus()
          onClick()
          notif.close()
        }
      }
    } catch (e) {
      console.error('Desktop notification error:', e)
    }
  }
}
