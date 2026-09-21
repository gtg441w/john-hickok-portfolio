import Link from 'next/link'
import type { Clip, Still } from '@/lib/content.schema'

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
  size?: 'lg' | 'sm'
}

/* THE CLIP IS THE MEDIA ELEMENT, NOT SOMETHING INSIDE IT. Nothing may render inside
 * [data-artifact-media], so the <video> carries the attribute itself and takes the
 * media row's place. Check 16 is geometric and tag-agnostic — two children, media
 * bleeding to three edges, no ink over it — so the composition it enforces is the same
 * one, with a moving still in it.
 *
 * IT STARTS AND ENDS ON THE HERO STILL. The poster is the hero still, and the clip is
 * the same shape and opens and closes on the same image, so the browser crops the
 * first and last frames exactly as it crops the still. The card looks like the hero
 * before, after, and for anyone who never sees the motion.
 *
 * It plays once and stops: autoplay, no loop, under five seconds. The card is a link,
 * so a pause button cannot live in it (a control inside a link is invalid), and
 * WCAG 2.2.2 requires one only for motion running longer than five seconds.
 *
 * TWO CUTS, CHOSEN BY THE BROWSER. The card is a thin letterbox from 720px up and close
 * to 16:9 below it, and one framing cannot keep the motion both uncropped on the
 * first and readable on the second. The first matching <source> wins, so the narrow
 * cut is listed first and scoped to narrow viewports.
 *
 * REDUCED MOTION WITHOUT SCRIPT. Every <source> requires
 * (prefers-reduced-motion: no-preference). A reader who asks for reduced motion
 * matches none, so no video loads and the poster — the hero still — stays.
 *
 * aria-hidden because the still version is a CSS background, which assistive tech
 * never sees: the card is named by its band text, and the media is decoration of a
 * link whose purpose that text already carries. */
function ClipMedia({ clip }: { clip: Clip }) {
  const motion = '(prefers-reduced-motion: no-preference)'
  return (
    <video
      data-artifact-media=""
      autoPlay
      muted
      playsInline
      disablePictureInPicture
      preload="auto"
      poster={clip.poster.src}
      aria-hidden="true"
    >
      {clip.narrowSrc && (
        <source src={clip.narrowSrc} type="video/mp4" media={`${motion} and (max-width: 719px)`} />
      )}
      <source src={clip.src} type="video/mp4" media={motion} />
    </video>
  )
}

export default function ArtifactCard({
  href,
  title,
  kind,
  framing,
  meta,
  featured = false,
  still,
  clip,
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
      {clip ? (
        <ClipMedia clip={clip} />
      ) : (
        <div data-artifact-media style={{ backgroundImage: `url(${still.src})` }} />
      )}
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
