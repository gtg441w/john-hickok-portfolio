/* Regenerates the static brand files from the same geometry the components use, so
 * the SVGs in public/brand and the icon at app/icon.svg can never drift from the
 * mark on the page.
 *
 *   node --no-warnings scripts/build-brand-assets.mts   (Node 22.18+; this repo pins 24)
 *
 * Run it after changing anything in components/brand/logo-geometry.ts or
 * wordmark-paths.ts, and commit the output. */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { MARK, markGeometry, type MarkWeight } from '../components/brand/logo-geometry.ts'
import { WORDMARK as W } from '../components/brand/wordmark-paths.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = (p: string, body: string) => writeFileSync(join(root, p), body)
mkdirSync(join(root, 'public/brand'), { recursive: true })

const open = (viewBox: string, title: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${title}">`

const mark = (weight: MarkWeight) => {
  const g = markGeometry(weight)
  return {
    g,
    body:
      `<g fill="none" stroke="currentColor" stroke-width="${g.stroke}" stroke-linecap="round" stroke-linejoin="round">` +
      `<path d="${g.ring}"/><path d="${g.spine}"/><path d="${g.bar}"/><path d="${g.stem}"/></g>`,
  }
}

for (const weight of ['regular', 'bold'] as const) {
  const { g, body } = mark(weight)
  out(`public/brand/hickok-design-mark-${weight}.svg`, `${open(g.viewBox, 'Hickok Design mark')}${body}</svg>\n`)
}

const words =
  `<g fill="currentColor">` +
  `<path d="${W.hickok.d}" transform="translate(${W.hickok.x} ${-W.baseline})"/>` +
  `<path d="${W.design.d}" transform="translate(${W.design.x} ${-W.baseline})"/></g>`

out(
  'public/brand/hickok-design-wordmark.svg',
  `${open(`0 ${W.capCentre - W.height / 2} ${W.width} ${W.height}`, 'Hickok Design')}${words}</svg>\n`,
)

// The lockup: mark first, then 18 units of space, then the words; centred on y = 0.
const GAP = 18
const total = MARK.size + GAP + W.width
out(
  'public/brand/hickok-design-lockup.svg',
  `${open(`0 ${-MARK.size / 2} ${total.toFixed(2)} ${MARK.size}`, 'Hickok Design')}` +
    `<g transform="translate(${MARK.size / 2} 0)">${mark('regular').body}</g>` +
    `<g transform="translate(${MARK.size + GAP} ${-W.capCentre})">${words}</g></svg>\n`,
)

// The tab icon: the bold cut, because it is the small-size cut, with the ink following
// the visitor's colour scheme. Next picks app/icon.svg up on its own.
const f = markGeometry('bold')
out(
  'app/icon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-34 -34 68 68"><style>g{fill:none;stroke:#14181b;stroke-width:${f.stroke};stroke-linecap:round;stroke-linejoin:round}@media (prefers-color-scheme:dark){g{stroke:#eef1f2}}</style><g><path d="${f.ring}"/><path d="${f.spine}"/><path d="${f.bar}"/><path d="${f.stem}"/></g></svg>\n`,
)

console.log('brand assets written')
