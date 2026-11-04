import type { CSSProperties } from 'react'

import './logo.css'
import { BOLD_BELOW_PX, markGeometry, type MarkWeight } from './logo-geometry'
import type { LogoMotion } from './logo-motion'

type Props = {
  /** Rendered width and height in px. The mark is a square. */
  size?: number
  /** Defaults to the bold cut below 28px, where the regular stroke starts to fill in. */
  weight?: MarkWeight
  /** Which behaviours are on: any of LOGO_MOTIONS. Default is none, so the mark is
   * still unless a caller asks. Each name is a recipe in logo.css. */
  motion?: readonly LogoMotion[]
  /** Free-form state for script to drive (loading, error). No recipe reads it yet;
   * logo.css has a template for the first one that does. */
  state?: string
  /** Gives the mark an accessible name. Left off, the mark is decorative: the place
   * it sits (a link, a heading) is expected to carry the name. */
  title?: string
  className?: string
}

/* The mark on its own: no words. Drawn in `currentColor`, so it takes whatever ink
 * its parent sets and has no colour of its own. A server component: it renders the
 * drawing and states which behaviours are on, and every behaviour itself lives in
 * logo.css, keyed off data-motion and the class names below.
 *
 *   .logo-mark__ring   .logo-mark__spine   .logo-mark__bar   .logo-mark__stem
 *
 * Each path declares pathLength="1" so a stroke can be drawn in with one keyframe at
 * every size and weight. Behaviours that answer the visitor (hover, focus, press) key
 * off a data-logo-trigger element that wraps the mark; see logo.css. */
export default function LogoMark({ size = 32, weight, motion = [], state, title, className }: Props) {
  const w: MarkWeight = weight ?? (size < BOLD_BELOW_PX ? 'bold' : 'regular')
  const g = markGeometry(w)
  const a11y = title
    ? ({ role: 'img', 'aria-label': title } as const)
    : ({ 'aria-hidden': true, focusable: 'false' } as const)

  return (
    <svg
      className={['logo-mark', className].filter(Boolean).join(' ')}
      viewBox={g.viewBox}
      width={size}
      height={size}
      data-weight={w}
      data-motion={motion.length ? motion.join(' ') : undefined}
      data-state={state}
      style={{ strokeWidth: g.stroke } as CSSProperties}
      {...a11y}
    >
      <path className="logo-mark__ring" d={g.ring} pathLength={1} />
      <path className="logo-mark__spine" d={g.spine} pathLength={1} />
      <path className="logo-mark__bar" d={g.bar} pathLength={1} />
      <path className="logo-mark__stem" d={g.stem} pathLength={1} />
    </svg>
  )
}

