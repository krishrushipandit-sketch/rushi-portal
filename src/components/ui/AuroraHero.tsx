'use client'

import Aurora from '@/components/fx/Aurora'
import { useTheme } from '@/lib/ThemeContext'

export default function AuroraHero({ children, height = 260 }: { children: React.ReactNode; height?: number }) {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  return (
    <section className="aurora-hero card">
      <div className="aurora-hero-bg" style={{ height }} aria-hidden>
        <Aurora
          colorStops={dark ? ['#0f6b55', '#3ee6a8', '#2a7bd6'] : ['#7fe0c0', '#9fd8ff', '#c6f2df']}
          amplitude={1.1}
          blend={0.55}
          speed={0.6}
          opacity={dark ? 0.9 : 0.75}
          lightMode={!dark}
          dpr={1}
        />
      </div>
      <div className="aurora-hero-content">{children}</div>
    </section>
  )
}
