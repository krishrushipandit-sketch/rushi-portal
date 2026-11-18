'use client'

import BlurText from '@/components/fx/BlurText'

export default function PageHeader({ eyebrow, title, description, actions, live }: {
  eyebrow?: React.ReactNode
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  live?: boolean
}) {
  return (
    <div className="page-header" style={{ marginBottom: 0 }}>
      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <p className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {live && <span className="live-dot" />}{eyebrow}
          </p>
        )}
        {/* BlurText renders a <p>, so the heading role sits on a wrapper instead of an <h1> */}
        <div role="heading" aria-level={1} className="page-title" style={{ marginTop: eyebrow ? '0.4rem' : 0 }}>
          <BlurText key={title} text={title} animateBy="words" direction="top" delay={70} trigger="load" />
        </div>
        {description && <p className="page-subtitle">{description}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>{actions}</div>}
    </div>
  )
}
