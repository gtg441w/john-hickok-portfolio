import Link from 'next/link'
import type { Clip, Still } from '@/lib/content.schema'
import type { CardPreview } from '@/lib/media'
import CardMedia from './CardMedia'

type ArtifactCardProps = {
  href: string
  title: string
  kind: string
  framing?: string
  meta?: string
  featured?: boolean
  still: Still
  /** Motion for the media row. Pass it only where this card is the page's hero: one
   *  moving thing per page draws the eye, several make noise. */
  clip?: Clip
  /** The artifact's media, played while the card is hovered or focused. */
  preview?: CardPreview
  size?: 'lg' | 'sm'
}

/* The media row is CardMedia, a small client island: the still at rest, the intro
 * clip on the hero, and the hover slideshow. Everything else here is server-rendered.
 * See CardMedia.tsx for when it moves and why it is only ever one element. */

export default function ArtifactCard({
  href,
  title,
  kind,
  framing,
  meta,
  featured = false,
  still,
  clip,
  preview,
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
      <CardMedia still={still} intro={clip} preview={preview} />
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
