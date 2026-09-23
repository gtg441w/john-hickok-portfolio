# Component inventory

Frames in `IA Storyboard.dc.html` → components in the Next.js app. This is the mapping
the README's prose only implied.

**Stack decisions settled at handoff:** Next.js App Router, plain CSS (the fork ported
as a global stylesheet imported once in the root layout), Zod for content validation,
Playwright for the conformance check. Do not introduce a CSS-in-JS layer or a second
component library — see *What is deliberately not on this list* in `BUILD_PLAN.md`.

## The server/client boundary

**Minimal islands.** Pages and content are server components. Four things are client
components, and nothing else needs to be.

The prototype looks like one big stateful app, but that is an artifact of being a
single file with a frame switcher — not a design decision. The real site is six mostly
static documents. The glass contract is CSS and costs nothing at runtime; the expensive
thing on the page is `backdrop-filter`, not hydration, so there is no benefit to
shipping the content as JS.

| Client component | Why it must be |
|---|---|
| `ThemeToggle` | Reads and writes the explicit choice, listens to `matchMedia` |
| `SlideOverPanel` | Focus trapping, `inert`, Escape, mount-preserving overlay |
| `SearchModal` | Input state, keyboard nav, cross-category results |
| `ConnectForm` | Segmented selector reshapes the view; the Client path submits |
| `Walkthrough` | A guided, in-order tour: holds position, progress and what the reader has opened. Rendered for `layout: walkthrough`; the full text stays server-rendered beneath it |
| `BackdropSlot` | Only when filled with something animated — see below |

`ScrollProbe` is a fifth candidate: the header and backdrop respond to `scrollY`. Do it
with CSS (`position: sticky`, a scroll-driven animation) before adding a client
component for it. If it must be JS, it is a single listener in the root layout, not a
state provider.

### Theme, and the one way to get it wrong

`theme` has **three** states: `null` (follow the OS), `'dark'`, `'light'`. Collapsing
`null` into a concrete default silently breaks system-preference following, which is
the default experience for most visitors.

In App Router this needs a **blocking inline script in `<head>`** that reads the stored
choice and sets `data-theme` on `<html>` before first paint. Without it the page
renders in one mode and corrects in the other — a flash on every load, on a site whose
entire identity is the difference between those two modes. The `ThemeToggle` client
component then only handles clicks and OS-change events; it does not own first paint.

## Components

### `SiteHeader` — server, with two client children

Above every screen except the two phone mocks. Single row, wraps only at genuinely
narrow widths.

| Part | Spec |
|---|---|
| Logo slot | `flex: 1 1 0; min-width: 0`, caption truncates with ellipsis |
| Nav pill | `.glass[data-glass-level="nav"]`, `flex: 0 1 auto; min-width: 0`, `border-radius: 999px`, `padding: 8px 16px` |
| Nav items | About Me / Resume / Connect |
| Active state | `color-mix(in oklab, currentColor 14%, transparent)` + `font-weight: 600` |
| Hover | the same mix at 12% |
| Theme toggle | 46×46 circular glass button |

> The washes derive from `currentColor` so they invert with chrome mode. Hardcoding
> `rgba(255,255,255,…)` here breaks light mode silently.

### `ThemeToggle` — client

Props: none. Glyph ◐ dark / ◑ light, `aria-pressed`, label "Switch to light/dark mode".

> The glyph's ink centre sits **8.5% of an em below** its line-box centre, so it needs
> `transform: translateY(-0.085em)` to look centred. Measured, and it scales with
> font-size.

### `ArtifactCard` — server

**The codified composition.** One component, two sizes. Read
`_ds_fork/frostwork-blur-first.css` § 3 before changing anything here; check 16
enforces it.

```ts
type ArtifactCardProps = {
  href: string
  title: string
  kind: string            // "Project · NCR Voyix"
  framing?: string        // 2-line clamp; omit on rail
  meta?: string           // "18 min · applies Altitude"
  featured?: boolean      // the accent micro label
  still: Still            // see CONTENT_SCHEMA.md
  size?: 'lg' | 'sm'      // lg = hero, sm = rail
}
```

Renders exactly three elements, and the structure is the contract:

```html
<a data-artifact-card data-artifact-size="sm" class="glass" data-glass-level="card">
  <div data-artifact-media style="background-image:url(…)"></div>
  <div data-artifact-band>…ink…</div>
</a>
```

- **Nothing may be rendered inside `[data-artifact-media]`.** Not a badge, not a play
  icon, not a duration chip. That is the rule, and check 16 fails on it.
- The band declares no fill and no filter; it is a window onto the card's own glass.
- `lg`: `min-height: clamp(392px, 48vh, 496px)`, radius 24, band padding 16.
- `sm`: 16:9, radius 16, band padding 10/12/12.
- Geometry comes from the stylesheet, not from props. Do not re-declare padding,
  `grid-template-rows`, `overflow` or `border-radius` inline.
- **Not a stage.** Publishes no tone, takes no scrim.

### `BackdropStage` — server; `BackdropSlot` — client only if filled

The one surface that still sets text over media, and therefore the only caller of the
scrim. `--scrim: .62`, full-height bottom-up ramp, solid across the bottom 38.2%.

> **The scrim must be a pseudo-element.** The stage sets its photograph with an inline
> `background:` shorthand, so a class declaring `background-image` loses to it
> unconditionally and the scrim silently never paints. `::before`, not `::after`.

**The homepage backdrop is a slot, deliberately.** Gate 0's VANTA decision stays open
without blocking the build:

```ts
type BackdropProps = { children?: ReactNode }  // default: static/CSS stage
```

Default fill is a static or CSS-gradient stage — no client JS, no three.js, nothing to
budget. An animated fill drops in later as a client component behind
`prefers-reduced-motion` and a measured frame budget.

> **If an animated fill lands, its rAF loop must be destroyed on unmount.** This was a
> real bug in the prototype: the loop kept running against a detached canvas on every
> other screen and saturated the main thread. In React that means the cleanup function
> of the effect that starts it, with no exceptions.

### `Rail` — server

Horizontal scroller. `grid-auto-flow: column`, `grid-auto-columns: minmax(248px, 1fr)`,
`scroll-snap-align: start` on children.

Props: `title`, `caption`, `children`. Fallback behaviour for thin categories is still
open (pad / shrink / mosaic) — render what it is given and leave the decision in
`BUILD_PLAN.md`.

### `SlideOverPanel` — client

| Prop | |
|---|---|
| `width` | `'partial'` (61.8% of viewport) \| `'full'` |
| `open` | boolean |
| `onClose` | `() => void` |

- Mobile is always takeover. In 320ms, out 240ms, from the right.
- The page behind **stays mounted and keeps scroll position** — a layer, never a
  navigation. Do not implement this as a route.
- Focus gated with `inert`; Escape closes.
- `prefers-reduced-motion`: crossfade only.
- A slide-over over a stage means two glass surfaces at depth; the nesting rule strips
  the inner filter. Expected, not a bug.

### `SearchModal` — client

Semantic search overlay. Results cross categories rather than folders. Escape closes.
Index source is the content collection; no search service in v1.

### `ConnectForm` — client

Segmented selector (Client / Recruiter / Colleague) reshapes the whole experience.

- **Client** — the only path with a real form. Includes the **15-word mission
  constraint**: a filter, not a field.
- **Recruiter** / **Colleague** — pre-filled `mailto:` with a copy-template fallback
  for webmail users, so they never leave their mail client.
- All three carry a left-column explanation of why the paths differ.
- **One email constant, six usages.** Import it; never retype it.

### `Gallery` — server

One column, full-bleed, captions beneath. Each still keeps its own aspect ratio
(`height: auto`, no crop) so a mix of 4:3 screenshots, tall mobile captures and wide
diagrams coexists.

> **No scrim and no measurement here.** Captions sit outside the image, so nothing is
> set over photography and the glass rule never applies.

Sized for four stills, typical six. No pagination, no lightbox.

## Routes

| Route | Frame | Rendering |
|---|---|---|
| `/` | Homepage | Server, static |
| `/work` | Collection | Server, static |
| `/work/[slug]` | Artifact · reading | Server, static per slug |
| `/work/[slug]/gallery` | Project gallery | Server, static |
| `/experience` | Experience | Server, static |
| `/connect` | Connect | Server shell + client form |
| `/practice` | Practice record | Server, static |

Search and the slide-over panel are **not routes.** Both are layers over the current
page and must not change the URL or unmount what is behind them.

## Frames that are not screens

**Hero · 3 ways**, **Browsing · 3 ways**, **Reading · 3 ways**, **Panel · behavior**,
**Dark & light side by side**, and the calibration frames. Do not build them. Do read
them when you wonder why something is the way it is.

The mobile frames (**Mobile homepage**, **Mobile artifact**) are the responsive
behaviour of `/` and `/work/[slug]`, not separate routes. The desktop site header is
suppressed on them in the storyboard only because stacking desktop chrome above a phone
mock reads as a breakpoint contradiction.

## Interaction spec

| Behaviour | Spec |
|---|---|
| Card hover | `--glass-thickness` .50 → .62, edge brightens, **cards only** lift `translateY(-4px)` |
| Active press | `translateY(1px) scale(.994)` |
| Glass transitions | 180ms `cubic-bezier(.2,.6,.2,1)`; transform 120ms |
| Screen enter | `wf-rise` 400ms / `wf-grow` 420ms, same easing |
| Panel | in 320ms, out 240ms |
| Escape | closes panel and search modal |
| Reduced motion | all animation and transition suppressed |

**Glass never changes hue on hover** — only alpha and edge brighten.
