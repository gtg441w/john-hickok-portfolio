import type { CSSProperties } from 'react'

import LogoMark from './LogoMark'
import Wordmark from './Wordmark'
import type { MarkWeight } from './logo-geometry'
import type { LogoMotion } from './logo-motion'

type Props = {
  /** Height of the mark and of the wordmark's artwork box, in px. */
  size?: number
  /** Leave the words out and render the mark alone. */
  wordmark?: boolean
  markWeight?: MarkWeight
  /** Behaviours the lockup runs: any of LOGO_MOTIONS. `reveal` is the words'; the rest
   * are the mark's. Default none. */
  motion?: readonly LogoMotion[]
  /** Passed to the mark as data-state, for script-driven states. */
  state?: string
  className?: string
}

/* The lockup: the mark first, then the words. It only arranges the two; each can be
 * used by itself (LogoMark, Wordmark) and each is styled and animated on its own.
 *
 * Both halves are decorative here. A lockup is nearly always the content of a link,
 * and the link is what carries the accessible name, so the pieces stay out of the
 * accessibility tree rather than announcing the same name twice.
 *
 * `--logo-size` is the single scale knob, set inline so the lockup renders at the
 * right size before any stylesheet loads and so CSS can override it per breakpoint.
 *
 * The mark answers hover, focus and press and takes `state`; the words do none of that.
 * They have one behaviour, `reveal`, which runs once on a full page load, briefly, while
 * the mark's fill is still going. */
export default function Logo({ size = 32, wordmark = true, markWeight, motion, state, className }: Props) {
  return (
    <span
      className={['logo', className].filter(Boolean).join(' ')}
      style={{ '--logo-size': `${size}px` } as CSSProperties}
    >
      <LogoMark size={size} weight={markWeight} motion={motion} state={state} />
      {wordmark ? <Wordmark size={size} reveal={motion?.includes('reveal')} /> : null}
    </span>
  )
}
