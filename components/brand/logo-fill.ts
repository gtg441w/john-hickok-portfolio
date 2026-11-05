/* Hickok Design mark: how it fills in.
 *
 * The draw-in is an injection moulding. The sprue is at the top-left of the ring, where
 * the ring's start is. Fluid is pumped in at a constant rate and follows the mark's
 * strokes as channels:
 *
 *   1. It runs clockwise round the ring, over the top.
 *   2. At the spine's top end the channel forks: one front carries on round the ring, one
 *      runs down the spine.
 *   3. At the crossbar the spine forks again: one front carries on down the spine, one
 *      runs left along the bar.
 *   4. The spine reaches the ring's bottom and the ring fills from there as well, one
 *      front round the bottom-left tip, one back up to meet the front still coming round
 *      the right. They meet at a weld line.
 *   5. The bar reaches the stem, the last cavity, and fills it upward and downward.
 *
 * Constant volumetric flow means every fork slows the fronts: they share the flow, so
 * a front moves at its share of it. Ring and spine are the main channels and take a full
 * share each; the crossbar and the stem are side branches and take half a share. That
 * resistance is what makes the stem fill last, as a dead-end branch does in a real mould,
 * and without it the ring's closing gap would be the last thing to fill.
 *
 * The result is one segment per piece of stroke, each with a start, a duration and, where
 * forks changed its front's speed on the way, an easing curve that reproduces the changes.
 * Times are fractions of the whole fill, so the real duration is one token in logo.css.
 *
 * Everything is derived from the same numbers as the drawing (logo-geometry.ts), so it
 * stays right at either weight. Pure arithmetic, run once per weight on the server. */

import { MARK, fmt, ringPoint, solveMark, type MarkWeight } from './logo-geometry'

/** The share of the flow a side branch (the crossbar, the stem) takes, against 1 for the
 *  ring and the spine. Lower and the stem lands later, and more of the fill is spent on
 *  the main channels first. */
const BRANCH_SHARE = 0.5

export type FillSegment = {
  key: string
  /** Path data, drawn in the direction the fluid flows. */
  d: string
  /** When this segment starts, as a fraction of the whole fill. */
  start: number
  /** How long it takes, as a fraction of the whole fill. */
  duration: number
  /** A CSS linear() easing, only when the front changed speed along this segment. */
  ease?: string
}

export type MarkFill = {
  ring: FillSegment[]
  spine: FillSegment[]
  bar: FillSegment[]
  stem: FillSegment[]
}

type Front = { pos: number; goal: number; share: number; hist: [number, number][] }

const EPS = 1e-7
const cache = new Map<MarkWeight, MarkFill>()
const r4 = (v: number) => Number(v.toFixed(4))

export function markFill(weight: MarkWeight): MarkFill {
  const hit = cache.get(weight)
  if (hit) return hit

  const { rc, phi, delta, yTop, yBot, spineAt, barStart } = solveMark(weight)
  const TAU = Math.PI * 2

  // ── The channels, each measured as a distance along itself ──────────────────────
  // Ring: clockwise from the sprue, the top-left end.
  const a0 = Math.PI - (phi + delta)
  const ringLen = rc * (TAU - 2 * (phi + delta))
  const ringAt = (s: number) => ringPoint(rc, a0 - s / rc)
  const ringS = (x: number, y: number) => {
    let d = (a0 - Math.atan2(-y, x)) % TAU
    if (d < 0) d += TAU
    return rc * d
  }
  const sTop = ringS(spineAt(yTop), yTop) // where the spine meets the ring, top
  const sBot = ringS(spineAt(yBot), yBot) // and bottom

  // Spine: from the top.
  const spineLen = Math.hypot(spineAt(yBot) - spineAt(yTop), yBot - yTop)
  const spineAtDist = (u: number): [number, number] => {
    const y = yTop + (yBot - yTop) * (u / spineLen)
    return [spineAt(y), y]
  }
  const uBar = Math.hypot(spineAt(MARK.barY) - spineAt(yTop), MARK.barY - yTop) // the crossbar's fork

  // Bar: from the spine to the stem.
  const barLen = spineAt(MARK.barY) - barStart

  // Stem: forks at the bar and fills both ways.
  const aJ = Math.PI - Math.asin(-MARK.barY / rc)
  const stemUp = rc * (aJ - (Math.PI - phi))
  const stemDown = rc * (Math.PI + phi - aJ)

  // ── The fill ─────────────────────────────────────────────────────────────────────
  let t = 0
  const live = new Map<string, Front>()
  const all: Record<string, Front> = {}
  const spawn = (id: string, share: number, goal: number) => {
    const f: Front = { pos: 0, goal, share, hist: [[t, 0]] }
    live.set(id, f)
    all[id] = f
  }
  const reached = (f: Front, x: number) => f.pos >= x - EPS

  spawn('cw', 1, ringLen)
  let spineSpawned = false
  let barSpawned = false

  while (live.size) {
    let total = 0
    for (const f of live.values()) total += f.share
    const rate = (f: Front) => f.share / total

    // The next thing that happens: a front arrives, or forks, or two meet.
    let dt = Infinity
    for (const [id, f] of live) {
      dt = Math.min(dt, (f.goal - f.pos) / rate(f))
      if (id === 'cw' && !spineSpawned) dt = Math.min(dt, (sTop - f.pos) / rate(f))
      if (id === 'sp' && !barSpawned) dt = Math.min(dt, (uBar - f.pos) / rate(f))
    }
    const cw = live.get('cw')
    const back = live.get('rbCcw')
    if (cw && back) dt = Math.min(dt, (sBot - cw.pos - back.pos) / (rate(cw) + rate(back)))
    dt = Math.max(dt, 0)

    for (const f of live.values()) f.pos += rate(f) * dt
    t += dt
    for (const f of live.values()) f.hist.push([t, f.pos])

    // What that did.
    const ringFront = live.get('cw')
    if (ringFront && !spineSpawned && reached(ringFront, sTop)) {
      spineSpawned = true
      spawn('sp', 1, spineLen)
    }
    const spineFront = live.get('sp')
    if (spineFront && !barSpawned && reached(spineFront, uBar)) {
      barSpawned = true
      spawn('bar', BRANCH_SHARE, barLen)
    }
    for (const [id, f] of [...live]) {
      if (id === 'rbCcw') {
        const c = live.get('cw')
        if (c && c.pos + f.pos >= sBot - EPS) {
          live.delete('rbCcw')
          live.delete('cw') // the weld line: both fronts stop where they met
        }
      } else if (reached(f, f.goal)) {
        live.delete(id)
        if (id === 'bar') {
          spawn('tu', BRANCH_SHARE, stemUp)
          spawn('td', BRANCH_SHARE, stemDown)
        } else if (id === 'sp') {
          const c = live.get('cw')
          if (c && c.pos < sBot - EPS) {
            spawn('rbCw', 1, ringLen - sBot)
            spawn('rbCcw', 1, Infinity)
          }
        }
      }
    }
  }
  const T = t

  // ── One segment per piece of stroke ──────────────────────────────────────────────
  const P = (p: [number, number]) => `${fmt(p[0])} ${fmt(p[1])}`
  const line = (a: [number, number], b: [number, number]) => `M${P(a)}L${P(b)}`
  const arc = (a: [number, number], b: [number, number], sweep: 0 | 1, large: 0 | 1) =>
    `M${P(a)}A${fmt(rc)} ${fmt(rc)} 0 ${large} ${sweep} ${P(b)}`
  const ringArc = (s1: number, s2: number) =>
    arc(ringAt(s1), ringAt(s2), s2 > s1 ? 1 : 0, Math.abs(s2 - s1) / rc > Math.PI ? 1 : 0)

  /** The part of a front's journey from distance p0 to p1, as a timed segment. */
  const piece = (key: string, f: Front, p0: number, p1: number, d: string): FillSegment => {
    const pts: [number, number][] = []
    for (const [tt, p] of f.hist) {
      if (p < p0 - EPS || p > p1 + EPS) continue
      if (pts.length && Math.abs(pts[pts.length - 1][0] - tt) < EPS) continue
      pts.push([tt, p])
    }
    const t0 = pts[0][0]
    const t1 = pts[pts.length - 1][0]
    const seg: FillSegment = { key, d, start: r4(t0 / T), duration: r4((t1 - t0) / T) }
    if (pts.length > 2) {
      const stops = pts.map(([tt, p]) => `${r4((p - p0) / (p1 - p0))} ${r4(((tt - t0) / (t1 - t0)) * 100)}%`)
      seg.ease = `linear(${stops.join(', ')})`
    }
    return seg
  }

  const ringEnd = all.cw.pos
  const ring = [piece('ring-1', all.cw, 0, sTop, ringArc(0, sTop)), piece('ring-2', all.cw, sTop, ringEnd, ringArc(sTop, ringEnd))]
  if (all.rbCw && all.rbCcw) {
    ring.push(piece('ring-3', all.rbCcw, 0, all.rbCcw.pos, ringArc(sBot, sBot - all.rbCcw.pos)))
    ring.push(piece('ring-4', all.rbCw, 0, ringLen - sBot, ringArc(sBot, ringLen)))
  }

  const barFrom: [number, number] = [spineAt(MARK.barY), MARK.barY]
  const fill: MarkFill = {
    ring,
    spine: [
      piece('spine-1', all.sp, 0, uBar, line(spineAtDist(0), spineAtDist(uBar))),
      piece('spine-2', all.sp, uBar, spineLen, line(spineAtDist(uBar), spineAtDist(spineLen))),
    ],
    bar: [piece('bar', all.bar, 0, barLen, line(barFrom, [barStart, MARK.barY]))],
    stem: [
      piece('stem-1', all.tu, 0, stemUp, arc(ringPoint(rc, aJ), ringPoint(rc, Math.PI - phi), 1, 0)),
      piece('stem-2', all.td, 0, stemDown, arc(ringPoint(rc, aJ), ringPoint(rc, Math.PI + phi), 0, 0)),
    ],
  }

  cache.set(weight, fill)
  return fill
}
