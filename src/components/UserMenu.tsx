'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Moon, Settings, Sun } from 'lucide-react'
import type { Profile } from '@/lib/database.types'
import { useTheme } from '@/lib/ThemeContext'
import { signOut, type ActiveSection } from '@/lib/navigation'

interface Props {
  profile: Profile
  onNavigate: (section: ActiveSection) => void
  placement: 'sidebar' | 'topbar'
  children: React.ReactNode
}

export default function UserMenu({ profile, onNavigate, placement, children }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const menuStyle: React.CSSProperties = placement === 'sidebar'
    ? { bottom: 'calc(100% - 4px)', left: 12, right: 12, minWidth: 0 }
    : { top: 'calc(100% + 8px)', right: 0 }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer', borderRadius: placement === 'topbar' ? '50%' : 0 }}
      >
        {children}
      </button>
      {open && (
        <div className="menu" role="menu" style={menuStyle}>
          <div style={{ padding: '0.5rem 0.6rem 0.6rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{profile.full_name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.email}</div>
          </div>
          <div className="menu-sep" />
          <button className="menu-item" role="menuitem" onClick={() => { toggleTheme(); setOpen(false) }}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            {theme === 'dark' ? 'Light appearance' : 'Dark appearance'}
          </button>
          <button className="menu-item" role="menuitem" onClick={() => { onNavigate('settings'); setOpen(false) }}>
            <Settings size={15} /> Settings
          </button>
          <div className="menu-sep" />
          <button className="menu-item danger" role="menuitem" onClick={() => signOut(p => router.push(p))}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}
