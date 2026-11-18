'use client'

import StarBorder from '@/components/fx/StarBorder'
import { useTheme } from '@/lib/ThemeContext'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }

// Primary call-to-action: brand gradient button with an orbiting star border.
export default function GlowButton({ children, style, disabled, ...rest }: Props) {
  const { theme } = useTheme()
  return (
    <StarBorder
      as="button"
      theme={theme}
      color={theme === 'dark' ? '#b8fff0' : '#ffffff'}
      trailColor={theme === 'dark' ? '#3ee6a8' : '#9fe8ff'}
      backgroundColor="var(--brand-gradient)"
      textColor="var(--brand-on-primary)"
      borderColor="transparent"
      radius={9}
      thickness={1.5}
      duration={4}
      glow={0.7}
      hover="brighten"
      disabled={disabled}
      style={{ height: 36, padding: '0 1rem', fontSize: '0.8125rem', fontWeight: 600, whiteSpace: 'nowrap', ...style }}
      {...rest}
    >
      {children}
    </StarBorder>
  )
}
