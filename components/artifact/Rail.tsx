import type { ReactNode } from 'react'

type RailProps = {
  title: string
  caption?: string
  minColumnWidth?: number
  children: ReactNode
}

export default function Rail({ title, caption, minColumnWidth = 248, children }: RailProps) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--glass-text)' }}>
          {title}
        </span>
        {caption && (
          <span
            className="mono glass-micro"
            style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--glass-text-muted)' }}
          >
            {caption}
          </span>
        )}
      </div>
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: `minmax(${minColumnWidth}px,1fr)`,
          gap: 16,
          overflowX: 'auto',
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>
  )
}
