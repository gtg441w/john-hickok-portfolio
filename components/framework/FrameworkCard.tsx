import Link from 'next/link'

type FrameworkCardProps = {
  href: string
  index: number
  title: string
  subtitle: string
}

/* Numbered-spine card — distinct from ArtifactCard. No media, no band; just a
 * big mono index number beside a title/subtitle stack. */
export default function FrameworkCard({ href, index, title, subtitle }: FrameworkCardProps) {
  return (
    <Link
      href={href}
      className="glass"
      data-glass-level="card"
      data-glass-interactive=""
      style={{
        padding: 16,
        borderRadius: 16,
        display: 'grid',
        gridTemplateColumns: '34px minmax(0,1fr)',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <span className="mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--glass-text-muted)' }}>
        {String(index).padStart(2, '0')}
      </span>
      <span style={{ display: 'grid', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--glass-text)' }}>{title}</span>
        <span style={{ fontSize: 11, color: 'var(--glass-text-muted)' }}>{subtitle}</span>
      </span>
    </Link>
  )
}
