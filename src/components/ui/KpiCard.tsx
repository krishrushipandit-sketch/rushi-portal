'use client'

import type { LucideIcon } from 'lucide-react'
import SpotlightCard from '@/components/fx/SpotlightCard'
import CountUp from '@/components/fx/CountUp'
import { useTheme } from '@/lib/ThemeContext'

type Tone = 'default' | 'brand' | 'danger' | 'warning' | 'info'

const TONE_VAR: Record<Tone, string> = {
  default: 'var(--text-primary)',
  brand: 'var(--brand-primary)',
  danger: 'var(--status-danger)',
  warning: 'var(--status-warning)',
  info: 'var(--status-info)',
}

interface Props {
  label: string
  value: number
  icon?: LucideIcon
  foot?: React.ReactNode
  tone?: Tone
  suffix?: string
  onClick?: () => void
  active?: boolean
  compact?: boolean
}

export default function KpiCard({ label, value, icon: Icon, foot, tone = 'default', suffix, onClick, active, compact }: Props) {
  const { theme } = useTheme()
  const color = TONE_VAR[tone]
  const spot = tone === 'default' ? (theme === 'dark' ? '#9fdcff' : '#0f7a5a') : color

  return (
    <SpotlightCard
      theme={theme}
      spotlightColor={spot}
      intensity={theme === 'dark' ? 0.16 : 0.5}
      spotlightSize={220}
      borderGlow={0.8}
      className="kpi-spot"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
      style={{
        '--spotlight-card-surface': 'var(--bg-card)',
        '--spotlight-card-border': active ? `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 25%, transparent))` : 'var(--hairline)',
        '--spotlight-card-shadow': active ? `0 0 0 1px color-mix(in srgb, ${color} 30%, transparent), 0 10px 30px -12px ${color}` : 'var(--shadow-sm)',
        padding: compact ? '0.9rem 1rem' : '1.1rem 1.2rem',
        borderRadius: 'var(--radius-lg)',
        cursor: onClick ? 'pointer' : undefined,
      } as React.CSSProperties}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '0.45rem' : '0.65rem', position: 'relative', zIndex: 2 }}>
        <div className="kpi-head">
          <span className="kpi-label">{label}</span>
          {Icon && (
            <span className="kpi-icon" style={tone !== 'default' ? { color, background: `color-mix(in srgb, ${color} 12%, transparent)`, borderColor: `color-mix(in srgb, ${color} 25%, transparent)` } : undefined}>
              <Icon size={15} />
            </span>
          )}
        </div>
        <span className="kpi-value" style={{ color: tone === 'default' ? undefined : color, fontSize: compact ? '1.5rem' : undefined }}>
          <CountUp to={value} duration={1.1} separator="," />
          {suffix && <span style={{ fontSize: '0.55em', marginLeft: 2, color: 'var(--text-muted)' }}>{suffix}</span>}
        </span>
        {foot && <span className="kpi-foot">{foot}</span>}
      </div>
    </SpotlightCard>
  )
}
