'use client'

import { useState } from 'react'
import { getInitials } from '@/lib/utils'

const SIZE = { xs: 'avatar-xs', sm: 'avatar-sm', md: 'avatar-md', lg: 'avatar-lg' }

interface Props {
  name: string
  src?: string | null
  size?: keyof typeof SIZE
  px?: number
  ring?: string
}

// Shows the profile photo, falling back to initials when there's no photo or the file can't load.
// Rendered as a <span> so it's valid inside text elements like <p>.
export default function Avatar({ name, src, size = 'sm', px, ring }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = !!src && failedSrc !== src
  const style: React.CSSProperties | undefined = px || ring ? {
    ...(px ? { width: px, height: px, fontSize: Math.max(9, Math.round(px * 0.34)) } : {}),
    ...(ring ? { boxShadow: `0 0 0 2px var(--bg-card), 0 0 0 ${px && px > 48 ? 4 : 3.5}px ${ring}` } : {}),
  } : undefined
  return (
    <span className={`avatar ${px ? '' : SIZE[size]}`} title={name} style={style}>
      {showImage
        ? <img src={src!} alt={name} loading="lazy" onError={() => setFailedSrc(src!)} />
        : getInitials(name || '?')}
    </span>
  )
}
