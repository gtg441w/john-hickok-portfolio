/* Hickok Design mark: construction.
 *
 * The mark is drawn, not traced. Four strokes of one weight, all round-capped:
 *
 *   ring   the big arc: over the top, down the right, round the bottom (the D's bowl)
 *   stem   a short arc on the left, the H's left stem
 *   bar    the H's crossbar, from the stem to the spine
 *   spine  the slanted line through the middle: the H's right stem and the D's back
 *
 * Everything is derived from the constants below, so the mark can be rebuilt at any
 * weight without redrawing it, and the numbers in docs/BRAND.md are the numbers that
 * ship. One unit is 1/64.8 of the mark's height.
 *
 * Two weights exist on purpose. `regular` (6) is the master, matched to the wordmark's
 * stems. `bold` (8) is the small-size cut: below about 28px a 6-unit stroke drops
 * under 3px and the H starts to fill in, so the stroke gets heavier while the outer
 * size, the 8-unit gaps and the 15° spine stay exactly the same. */

export const MARK = {
  /** Outer size, in units. The mark is a square. */
  size: 64.8,
  /** Outer radius of the ring. */
  outer: 32.4,
  /** Clear space between the stem and the ring, top and bottom. Edge to edge. */
  gap: 8,
  /** The spine's lean from vertical, in degrees. Shared with the 2.0c family. */
  slant: 15,
  /** Where the spine's centreline crosses y = 0. */
  spineX: -0.55,
  /** Centreline of the crossbar. A hair above centre, which reads as centred. */
  barY: -2.15,
  /** How far the stem's outer edge reaches above and below centre. */
  stemReach: 13.6,
} as const

export const WEIGHTS = { regular: 6, bold: 8 } as const
export type MarkWeight = keyof typeof WEIGHTS

/** Below this rendered size the bold cut takes over. */
export const BOLD_BELOW_PX = 28

const n = (v: number) => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2)

export function markGeometry(weight: MarkWeight) {
  const w = WEIGHTS[weight]
  const rc = MARK.outer - w / 2 // centreline radius of the ring and the stem
  const t = Math.tan((MARK.slant * Math.PI) / 180)

  // The stem is a short arc of the same ring, centred on the left (180°).
  const phi = Math.asin((MARK.stemReach - w / 2) / rc)
  // The ring stops short of the stem by `gap` of clear space; the two ends are round
  // caps, so the centre-to-centre distance is the gap plus one stroke.
  const delta = 2 * Math.asin((MARK.gap + w) / (2 * rc))

  const pt = (a: number): [number, number] => [rc * Math.cos(a), -rc * Math.sin(a)]
  const stemA = pt(Math.PI - phi)
  const stemB = pt(Math.PI + phi)
  const ringA = pt(Math.PI - (phi + delta))
  const ringB = pt(-(Math.PI - (phi + delta)))

  // Spine: x = spineX - t·y, trimmed where it meets the ring's centreline.
  const a = 1 + t * t
  const b = -2 * MARK.spineX * t
  const c = MARK.spineX * MARK.spineX - rc * rc
  const root = Math.sqrt(b * b - 4 * a * c)
  const yTop = (-b - root) / (2 * a)
  const yBot = (-b + root) / (2 * a)
  const spineAt = (y: number) => MARK.spineX - t * y

  // Bar: from the stem's centreline to the spine.
  const barStart = -Math.sqrt(rc * rc - MARK.barY * MARK.barY)

  return {
    stroke: w,
    viewBox: `${-MARK.size / 2} ${-MARK.size / 2} ${MARK.size} ${MARK.size}`,
    stem: `M${n(stemA[0])} ${n(stemA[1])}A${n(rc)} ${n(rc)} 0 0 0 ${n(stemB[0])} ${n(stemB[1])}`,
    ring: `M${n(ringA[0])} ${n(ringA[1])}A${n(rc)} ${n(rc)} 0 1 1 ${n(ringB[0])} ${n(ringB[1])}`,
    spine: `M${n(spineAt(yTop))} ${n(yTop)}L${n(spineAt(yBot))} ${n(yBot)}`,
    bar: `M${n(barStart)} ${n(MARK.barY)}L${n(spineAt(MARK.barY))} ${n(MARK.barY)}`,
  }
}
