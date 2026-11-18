export default function Pill({ color, icon, children, dot }: { color: string; icon?: React.ReactNode; children: React.ReactNode; dot?: boolean }) {
  return (
    <span className={`badge tone ${dot ? 'badge-dot' : ''}`} style={{ '--tone': color } as React.CSSProperties}>
      {icon}{children}
    </span>
  )
}
