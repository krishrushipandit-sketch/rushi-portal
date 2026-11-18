'use client'

import AnimatedContent from '@/components/fx/AnimatedContent'

// Entrance animation for page blocks. Don't wrap non-portaled modals: the transform during the animation traps position:fixed.
export default function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <AnimatedContent trigger="mount" distance={14} duration={0.55} blur={4} ease="power3.out" delay={delay} className={className}>
      {children}
    </AnimatedContent>
  )
}
