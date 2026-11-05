# Brand: the Hickok Design logo

The logo is two separate things, a mark and a wordmark, and a lockup that sets them
side by side. Each is a component; each can be used alone.

| Piece | Component | Use |
|---|---|---|
| Mark | `LogoMark` | Alone where the words would be redundant or will not fit (tab icon, avatar, app icon) |
| Wordmark | `Wordmark` | Alone where the mark is already on screen |
| Lockup | `Logo` | The default: mark first, then the words. The site header uses it. |

All three live in `components/brand/` and are imported from `@/components/brand`.

## Where it lives, and why it is not in Frostworks

The logo is a **brand asset of this site**, not part of the Frostworks glass system.

- Frostworks makes brand an optional slot on purpose (`tokens/brand.css`): left empty,
  the system is complete and neutral. A logo inside it would turn that optional slot
  into a dependency.
- `styles/_ds/` is vendored, copied verbatim out of the handoff. `styles/PATCHES.md`
  says a re-export silently drops anything changed there. A logo kept there would be
  at risk on the next one.
- The dependency runs one way. The logo borrows timing from Frostworks (`--ease-glass`)
  and ink from the page (`currentColor`). Frostworks knows nothing about the logo.

If a second site ever needs the same logo, the move is to lift `components/brand/`
into its own small package, not to push it into the design system.

## Anatomy

Four strokes of one weight, all round-capped, derived from `logo-geometry.ts`:

- **ring** the big arc (the D's bowl)
- **stem** a short arc on the left (the H's left stem)
- **bar** the H's crossbar
- **spine** the slanted line through the middle: the H's right stem and the D's back

| Constant | Value | Meaning |
|---|---|---|
| `size` | 64.8 | Outer square, in units. One unit is 1/64.8 of the mark's height. |
| `outer` | 32.4 | Outer radius of the ring |
| `gap` | 8 | Clear space between stem and ring, top and bottom, edge to edge |
| `slant` | 15° | The spine's lean. Same as the 2.0c family. |
| `spineX` | -0.55 | Where the spine's centreline crosses y = 0 |
| `barY` | -2.15 | Crossbar centreline, a hair above centre, which reads as centred |

### Two weights

| Weight | Stroke | Use |
|---|---|---|
| `regular` | 6 | The master. Matched to the wordmark's stems (6.3 to 7.0). |
| `bold` | 8 | The small-size cut. Below 28px a 6-unit stroke falls under 3px and the H fills in. |

`LogoMark` picks the bold cut automatically below 28px; pass `weight` to override.
Outer size, gaps and slant do not change between weights, only the stroke.

## Lockup rules

- Mark first, then the words. The mark is not placed between "Hickok" and "Design":
  that splits the name, and the D in the mark sits right before the D in "Design".
- The space between mark and words is 18 units, a fixed proportion of the mark's
  height at every size (`gap` in `.logo`, `components/brand/logo.css`).
- The wordmark's artwork box is as tall as the mark, with the capital letters centred
  in it, so `align-items: center` aligns the two with no per-size adjustment.
- Smallest sizes tested: mark alone 16px (bold); lockup with the mark at 20px.

## Colour

None. Everything draws in `currentColor`, so the logo takes the ink its parent sets and
inverts with chrome mode for free. There is no brand hue, and none should be added
without a decision: the system's rule is that hue belongs only on things that respond to
input or report status, and a logo does neither.

## Motion

Four behaviours, called recipes. Three are on the mark. One, `reveal`, is on the words, and
it is the only thing that ever moves them. None are on anything blurred. Timing comes from `--ease-glass`. Everything is CSS, in
`components/brand/logo.css`, so the components stay server components, in line with the
minimal-client-islands rule in `CLAUDE.md`.

| Recipe | Trigger | What happens |
|---|---|---|
| `draw` | Full page load | The mark fills like fluid injected into a mould, 1.5s from first fluid to last. It enters at the top-left of the ring, forks at the spine's top and again at the crossbar, fills the ring from the bottom as well, and fills the H's left stem last. Does not replay on client-side navigation, because the header never remounts. |
| `resolve` | Hover or keyboard focus on the trigger | The spine straightens from 15° to upright over 420ms and leans back on release. The slanted H and D become plain, level letters. |
| `press` | The trigger is held | The mark scales to 94% over 140ms. |
| `reveal` | Full page load | The twelve letters of the words fill from the bottom, one after another, left to right, each taking 240ms, the first starting with the mark's fill and the last ending at 500ms. Deliberately brief, so the mark's fill, which runs to 1.5s, stays the main event. Plays once and answers nothing; the words never respond to hover, focus or press. |

### Built to be changed

The logo's behaviour is meant to be revisited, so it is split along the lines you will
want to change it on:

- **Tokens.** Every number (durations, angle, scale) is a custom property at the
  top of `logo.css`. Retuning a feel is a one-line edit.
- **Recipes are independent.** Each is one block in `logo.css`, keyed on its name in
  `data-motion`. Changing or removing one cannot affect the others.
- **Which ones run is a prop.** `<Logo motion={LOGO_MOTIONS} />` runs all four;
  `motion={['resolve']}` runs one; leaving it off keeps the mark still. `LOGO_MOTIONS`
  (`logo-motion.ts`) is the single list of names.
- **The trigger is explicit.** `data-logo-trigger` on the link is what the visitor
  hovers, focuses or presses, so the hit area is the link's, not the drawing's.
- **The parts are addressable.** `.logo-mark__ring`, `__spine`, `__bar` and `__stem`. Each
  is a path, or, with `draw` on, a group of timed segments (`.logo-mark__seg`), because the
  fill forks and one stroke cannot. The class is on the part either way.
- **The fill is worked out, not authored.** `logo-fill.ts` simulates constant-rate flow
  through the strokes, sharing it between fronts at every fork, and hands each segment its
  `--start`, `--dur` and `--ease` as fractions of the whole fill. It reads the same numbers
  as the drawing, so it holds at both weights.
- **There is a hook for state.** `data-state` on the mark is for script to set (loading,
  error). No recipe reads it yet; `logo.css` ends with a template for the first.
- **Tests pin behaviour, not timing.** `e2e/logo.spec.ts` checks that hover and focus
  straighten the spine, that it stays inside the mark, and that reduced motion removes
  the animation. It reads the angle from its token and waits for animations to finish,
  so retuning does not break it.

| To... | Edit |
|---|---|
| Speed up or slow down the resolve | `--logo-resolve-duration` |
| Turn the spine further, or less | `--logo-resolve-angle` |
| Speed up or slow down the draw | `--intro-duration` in `globals.css`. The mark's fill and the header's bar both end on it. |
| Start the words earlier or later, make the reveal longer or shorter, or give each letter more time | `--logo-reveal-start`, `--logo-reveal-duration`, `--logo-reveal-letter`. To finish the words with the mark, set the start to 1000ms. |
| Change what fills last, or how long the side branches wait | `BRANCH_SHARE` in `logo-fill.ts`: the share of the flow the crossbar and the stem take, against 1 for the ring and spine. Lower and the stem lands later. |
| Make the press stronger or softer | `--logo-press-scale` |
| Turn a behaviour off everywhere | Remove its name from the `motion` prop in `SiteHeader.tsx` |
| Run different behaviours in different places | Pass a different `motion` list to each `<Logo>` |
| Add a behaviour | Follow the template at the bottom of `logo.css`, then add the name to `logo-motion.ts` |
| React to something script knows (route change, form state) | Set `data-state` on the mark and write the recipe. Setting it needs a small client component, which `CLAUDE.md` limits, so that is a decision. |

Rules that hold whatever you change:

- Leave the words still. Motion on type reads as a loading state. The one exception is `reveal`, once, on a full page load: nothing else about the words may move, and nothing about them may answer the visitor.
- Never animate blur or `backdrop-filter`, and never scale a blurred surface
  (`motion.css`). The logo is not glass, so scale is allowed on it, but keep it off
  anything blurred that it sits inside.
- Fail safe. Nothing may stay hidden if a script does not run. A CSS animation cannot be
  left half-run, which is why the draw-in is CSS.

### Reduced motion

`prefers-reduced-motion: reduce` removes the draw-in and the reveal entirely (the mark and
the words are simply there) and makes hover and focus change state at once instead of easing. The mark still
answers; it does not travel to do it. Verified in the browser: animation `none`,
transition `0s`.

## Accessibility

- The accessible name lives on the link, `aria-label="Hickok Design, home"`, not on the
  logo. The mark and the wordmark inside are decorative, so a screen reader hears one
  name once.
- It begins with the visible words on purpose (WCAG 2.5.3, label in name), so a
  voice-control user can say "click Hickok Design".
- Keyboard focus is a 2px outline in the logo's own ink, offset 6px, visible in both
  chrome modes and repainted by the browser in forced-colors.
- Used alone, `LogoMark` and `Wordmark` accept a `title` that turns them into a named
  image. Without it they are decorative.

## Files

| Path | What it is |
|---|---|
| `components/brand/logo-geometry.ts` | The construction: constants and the four paths for each weight |
| `components/brand/wordmark-paths.ts` | The outlined wordmark, generated once from the approved artwork. Do not hand-edit. |
| `components/brand/wordmark-letters.ts` | Which contours of those paths make which letter, as lists of numbers, so `reveal` can fill letters one at a time. If the artwork is regenerated and the contour count changes, the reveal switches itself off until this is redone. |
| `components/brand/{Logo,LogoMark,Wordmark}.tsx` | The three components |
| `components/brand/logo.css` | The logo's layout, colour inheritance and every behaviour: tokens, structure, recipes |
| `components/brand/logo-motion.ts` | The list of behaviour names (`LOGO_MOTIONS`) |
| `app/globals.css` § Home mark | The link around the logo: no underline, focus outline |
| `e2e/logo.spec.ts` | Pins the logo's behaviour. Run against the built site: `npx playwright test logo.spec.ts` |
| `public/brand/*.svg` | Static copies for decks, docs and handoff: mark (both weights), wordmark, lockup. Use `currentColor`, so inside an `<img>` they render black. |
| `app/icon.svg` | The tab icon: the bold cut, ink follows the visitor's colour scheme |
| `scripts/build-brand-assets.mts` | Regenerates the SVGs above from the geometry. `node --no-warnings scripts/build-brand-assets.mts` |

## Open items

- **The name** is Hickok Design. The page title (`app/layout.tsx`) and the collection and
  work-page titles carry it. The person's name stays where it names the person: the About
  bio, the Experience heading, the walkthrough signature and the meta description
  ("Portfolio and practice record of John Hickok, UX leader."). Say if the description
  should lead with the studio name instead.
- **The wordmark's typeface** is the approved artwork, not Outfit or Open Sans. It is
  outlined, so it never depends on a font loading, but it is a third face on the page.
- **No social image yet.** `app/opengraph-image` is not set up; the lockup in
  `public/brand/` is the source for it.
