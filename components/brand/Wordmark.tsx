import { WORDMARK } from './wordmark-paths'

type Props = {
  /** Height of the artwork's box in px; the width follows. This is the same `size`
   * LogoMark takes, so the two scale together when they share a value. */
  size?: number
  /** Gives the wordmark an accessible name. Left off, it is decorative. */
  title?: string
  className?: string
}

/* "Hickok Design" on its own: no mark. Outlined letterforms in `currentColor`, so
 * the words follow the surrounding text colour and need no font to load.
 *
 * The artwork box is as tall as the mark's, with the capital letters centred in it.
 * That is deliberate: set the two side by side with align-items: center and the
 * cap-height midpoint lands on the mark's centre with no per-size adjustment. */
export default function Wordmark({ size = 32, title, className }: Props) {
  const { width, height, capCentre, baseline, hickok, design } = WORDMARK
  const a11y = title
    ? ({ role: 'img', 'aria-label': title } as const)
    : ({ 'aria-hidden': true, focusable: 'false' } as const)

  return (
    <svg
      className={['logo-wordmark', className].filter(Boolean).join(' ')}
      viewBox={`0 ${capCentre - height / 2} ${width} ${height}`}
      width={(size * width) / height}
      height={size}
      {...a11y}
    >
      <path d={hickok.d} transform={`translate(${hickok.x} ${-baseline})`} />
      <path d={design.d} transform={`translate(${design.x} ${-baseline})`} />
    </svg>
  )
}
