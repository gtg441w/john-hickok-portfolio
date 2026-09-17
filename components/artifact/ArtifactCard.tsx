import Link from 'next/link'
import type { Still } from '@/lib/content.schema'

type ArtifactCardProps = {
  href: string
  title: string
  kind: string
  framing?: string
  meta?: string
  featured?: boolean
  still: Still
  size?: 'lg' | 'sm'
}

/* Exactly three elements — the structure is the contract (COMPONENT_INVENTORY.md).
 * Nothing may render inside [data-artifact-media]; the band declares no fill/filter
 * of its own — it's a window onto the card's own glass. */
export default function ArtifactCard({
  href,
  title,
  kind,
  framing,
  meta,
  featured = false,
  still,
  size = 'lg',
}: ArtifactCardProps) {
  return (
    <Link
      href={href}
      className="glass"
      data-glass-level="card"
      data-glass-interactive=""
      data-artifact-card=""
      data-artifact-size={size === 'sm' ? 'sm' : undefined}
      style={
        size === 'lg'
          ? { minHeight: 'clamp(392px,48vh,496px)' }
          : { aspectRatio: '16/9', scrollSnapAlign: 'start' }
      }
    >
      <div data-artifact-media style={{ backgroundImage: `url(${still.src})` }} />
      <div data-artifact-band>
        {size === 'lg' ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {featured && (
                <span
                  className="mono glass-micro"
                  style={{
                    fontSize: 10,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--glass-accent-ink)',
                  }}
                >
                  ● Featured artifact
                </span>
              )}
              <span
                className="mono glass-micro"
                style={{
                  fontSize: 10,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--glass-text-muted)',
                }}
              >
                {kind}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px,2.4vw,30px)',
                lineHeight: 1.04,
                letterSpacing: '-.025em',
                fontWeight: 600,
                color: 'var(--glass-text)',
              }}
            >
              {title}
            </span>
            {framing && (
              <span
                style={{
                  fontSize: 13,
                  lineHeight: 1.4,
                  color: 'var(--glass-text-muted)',
                  maxWidth: '46ch',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {framing}
              </span>
            )}
            {meta && (
              <span
                className="mono glass-micro"
                style={{
                  fontSize: 10,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--glass-text-muted)',
                }}
              >
                {meta}
              </span>
            )}
          </>
        ) : (
          <>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--glass-text)', lineHeight: 1.15 }}>
              {title}
            </span>
            <span
              className="mono glass-micro"
              style={{
                fontSize: 10,
                color: 'var(--glass-text-muted)',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {kind}
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
