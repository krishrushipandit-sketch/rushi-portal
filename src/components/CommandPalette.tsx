'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CornerDownLeft, LogOut, Maximize2, Moon, Search, Sun, type LucideIcon } from 'lucide-react'
import type { Profile } from '@/lib/database.types'
import { useTheme } from '@/lib/ThemeContext'
import { getNavGroups, signOut, type ActiveSection } from '@/lib/navigation'

interface Command {
  id: string
  group: string
  label: string
  icon: LucideIcon
  keywords?: string
  run: () => void
}

interface Props {
  open: boolean
  onClose: () => void
  profile: Profile
  onNavigate: (section: ActiveSection) => void
}

export default function CommandPalette({ open, onClose, profile, onNavigate }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const commands = useMemo<Command[]>(() => {
    const nav = getNavGroups(profile).flatMap(g => g.items.map(item => ({
      id: `nav-${item.id}`,
      group: 'Go to',
      label: item.label,
      icon: item.icon,
      keywords: `${g.label} ${item.keywords ?? ''}`,
      run: () => onNavigate(item.id),
    })))
    return [
      ...nav,
      { id: 'theme', group: 'Actions', label: theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance', icon: theme === 'dark' ? Sun : Moon, keywords: 'theme mode dark light', run: toggleTheme },
      { id: 'fullscreen', group: 'Actions', label: 'Toggle full screen', icon: Maximize2, keywords: 'immersive', run: () => {
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
        else document.documentElement.requestFullscreen().catch(() => {})
      } },
      { id: 'signout', group: 'Actions', label: 'Sign out', icon: LogOut, keywords: 'logout exit', run: () => signOut(p => router.push(p)) },
    ]
  }, [profile, theme, toggleTheme, onNavigate, router])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(c => `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => { setIndex(0) }, [query])

  useEffect(() => {
    listRef.current?.querySelector('.cmdk-item.selected')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  if (!open) return null

  const execute = (cmd?: Command) => {
    if (!cmd) return
    onClose()
    cmd.run()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); execute(results[index]) }
    else if (e.key === 'Escape') { e.preventDefault(); onClose() }
  }

  let lastGroup = ''
  return (
    <div className="cmdk-overlay" onMouseDown={onClose}>
      <div className="cmdk" role="dialog" aria-label="Command menu" onMouseDown={e => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="cmdk-input-row">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages and actions…"
            aria-label="Search pages and actions"
          />
          <kbd>esc</kbd>
        </div>
        <div className="cmdk-list" ref={listRef}>
          {results.length === 0 && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No results for “{query}”
            </div>
          )}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null
            lastGroup = cmd.group
            const Icon = cmd.icon
            return (
              <div key={cmd.id}>
                {header && <div className="cmdk-group">{header}</div>}
                <button
                  className={`cmdk-item ${i === index ? 'selected' : ''}`}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => execute(cmd)}
                >
                  <Icon size={16} />
                  {cmd.label}
                  {i === index && <span className="cmdk-hint"><ArrowRight size={14} /></span>}
                </button>
              </div>
            )
          })}
        </div>
        <div className="cmdk-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd><CornerDownLeft size={10} /></kbd> open</span>
          <span style={{ marginLeft: 'auto' }}>RushiPandit Portal</span>
        </div>
      </div>
    </div>
  )
}
