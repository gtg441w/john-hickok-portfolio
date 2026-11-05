import type { CSSProperties } from 'react'

import { WORDMARK } from './wordmark-paths'
import { wordmarkLetters } from './wordmark-letters'

type Props = {
  /** Height of the artwork's box in px; the width follows. This is the same `size`
   * LogoMark takes, so the two scale together when they share a value. */
  size?: number
  /** Gives the wordmark an accessible name. Left off, it is decorative. */
  title?: string
  /** Fill the letters in one at a time on a full page load: the `reveal` recipe in
   * logo.css. Off, the words are simply there. */
  reveal?: boolean
  className?: string
}

/* "Hickok Design" on its own: no mark. Outlined letterforms in `currentColor`, so
 * the words follow the surrounding text colour and need no font to load.
 *
 * The artwork box is as tall as the mark's, with the capital letters centred in it.
 * That is deliberate: set the two side by side with align-items: center and the
 * cap-height midpoint lands on the mark's centre with no per-size adjustment.
 *
 * With `reveal` on, the two word paths are regrouped into twelve letters
 * (wordmark-letters.ts) so each can fill in its own time. Same shapes, same place; only
 * the grouping differs. Off, or if the artwork no longer matches the grouping, it is
 * the two plain paths. */
export default function Wordmark({ size = 32, title, reveal = false, className }: Props) {
  const { width, height, capCentre, baseline, hickok, design } = WORDMARK
  const letters = reveal ? wordmarkLetters() : null
  const a11y = title
    ? ({ role: 'img', 'aria-label': title } as const)
    : ({ 'aria-hidden': true, focusable: 'false' } as const)

  return (
    <svg
      className={['logo-wordmark', className].filter(Boolean).join(' ')}
      viewBox={`0 ${capCentre - height / 2} ${width} ${height}`}
      width={(size * width) / height}
      height={size}
      data-motion={letters ? 'reveal' : undefined}
      style={letters ? ({ '--n': letters.length } as CSSProperties) : undefined}
      {...a11y}
    >
      {letters ? (
        letters.map((letter, i) => (
          <g key={i} className="logo-wordmark__letter" style={{ '--i': i } as CSSProperties}>
            <path d={letter.d} transform={`translate(${WORDMARK[letter.word].x} ${-baseline})`} />
          </g>
        ))
      ) : (
        <>
          <path d={hickok.d} transform={`translate(${hickok.x} ${-baseline})`} />
          <path d={design.d} transform={`translate(${design.x} ${-baseline})`} />
        </>
      )}
    </svg>
  )
}
