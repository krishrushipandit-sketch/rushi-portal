'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title: React.ReactNode
  subtitle?: React.ReactNode
  leading?: React.ReactNode
  actions?: React.ReactNode
  footer?: React.ReactNode
  width?: number
  /** false = Esc and clicking outside don't close it (use for forms with unsaved input) */
  dismissible?: boolean
  children: React.ReactNode
}

// Open panels, newest last: Esc only closes the top one when panels are stacked.
const openStack: symbol[] = []

export default function SidePanel({ open, onClose, title, subtitle, leading, actions, footer, width = 560, dismissible = true, children }: Props) {
  useEffect(() => {
    if (!open) return
    const id = Symbol('panel')
    openStack.push(id)
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible && openStack[openStack.length - 1] === id) onClose()
    }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', esc)
      openStack.splice(openStack.indexOf(id), 1)
      if (openStack.length === 0) document.body.style.overflow = ''
    }
  }, [open, onClose, dismissible])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="drawer-overlay" onMouseDown={e => dismissible && e.target === e.currentTarget && onClose()}>
      <aside className="drawer" role="dialog" aria-modal="true" style={{ maxWidth: width }}>
        <header className="drawer-header">
          {leading}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="drawer-title">{title}</div>
            {subtitle && <div className="drawer-subtitle">{subtitle}</div>}
          </div>
          {actions}
          <button className="icon-btn" onClick={onClose} aria-label="Close panel"><X size={18} /></button>
        </header>
        <div className="drawer-body">{children}</div>
        {footer && <footer className="drawer-footer">{footer}</footer>}
      </aside>
    </div>,
    document.body
  )
}

export function PanelSection({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="panel-section">
      <div className="panel-section-head">
        <span className="eyebrow">{title}</span>
        {aside}
      </div>
      {children}
    </section>
  )
}

export function KeyValues({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="kv-grid">
      {items.map(i => (
        <div key={i.label}>
          <dt>{i.label}</dt>
          <dd>{i.value ?? '—'}</dd>
        </div>
      ))}
    </dl>
  )
}
