# Handoff: John Hickok portfolio site

## Overview

A personal portfolio and practice site for a UX leader — homepage, project/framework
collection, long-form artifact reading, a hybrid Connect form, an Experience (resume)
screen, and per-project galleries. The visual system is glass: translucent, blurred
panes over photographic and generative media, governed by a measured legibility
contract rather than by taste.

The site's organising metaphor is a **museum**: artifacts (projects, frameworks,
writing) live in a collection, are viewed individually, and relate to one another
across categories rather than sitting in folders.

## About the design files

**The stack is settled:** Next.js (App Router), plain CSS, Zod, Playwright. See
`COMPONENT_INVENTORY.md` for the component mapping and the server/client boundary,
`content.schema.ts` for the frontmatter contract, and `conformance.spec.ts` for the
check that runs in CI.

**The files in this bundle are design references created in HTML.** They are
prototypes that show intended look, structure and behaviour. They are not production
code and should not be copied into the app as-is.

The task is to **recreate these designs in Next.js**, following App Router conventions
and the boundary laid out in `COMPONENT_INVENTORY.md`.

The one exception is `_ds_fork/frostwork-blur-first.css`. That file is not a
reference; it is **the amendment itself**, and its derivations must survive the port
intact. Read it before touching any glass surface. Port it as CSS, or reimplement it
in whatever styling layer the codebase uses, but do not drop its rules.

## Fidelity

**Mixed, and the distinction matters.**

- **High fidelity — the glass system.** Every number in the glass layer (fill alpha,
  blur radius, scrim alpha, contrast ratios, ink roles) is measured or derived and
  should be reproduced exactly. These are not aesthetic preferences. Changing them
  changes whether the site meets WCAG AA.
- **High fidelity — layout, type scale, spacing, motion.** Sizes, weights, the 8px
  spacing unit, the 38.2% scrim band, animation durations and easings are all
  intentional.
- **Low fidelity — copy and imagery.** Bracketed text (`[Framing line — …]`) is a
  deliberate hole to be filled by the CMS, not placeholder text to be invented. The
  photographs in `media/` are the design system's own calibration stills standing in
  for real project photography.
- **Zero fidelity — the artifact screenshots.** `media/artifact-*` are placeholders,
  included as *reference only*: they show roughly what kind of image lands in each slot
  and let you see the glass contract under real pixels. They are not direction. Do not
  match their subject, crop, palette, or aspect ratio, and do not treat any layout
  decision that appears to follow from one of them as intentional. Real project stills
  replace them wholesale.

## The glass contract — read this first

This is the part most likely to be broken by a well-meaning refactor.

### The rule

> **Blur wins wherever AA holds.** An opaque fill is the *last* resort, taken only
> when a measurement shows AA cannot be met with the filter on — never as a response
> to uncertainty, and never as a response to a thin margin.

### How the system is built

Three layers, and a surface never decides anything:

1. **Stage** owns the media and publishes its facts once, in markup: the sampled tone
   (`--stage-tone-rgb`), the chrome mode, and (legacy) a density attribute.
2. **Surface** consumes those facts. Its fill is an achromatic base plus a wash of the
   media's real colour, at a single fixed alpha.
3. **Text** roles follow chrome, deterministically.

Shipped values, both modes: `--glass-thickness: .50`, `--glass-blur-fixed: 32px`.
Alpha is solved, not judged — it is the value at which the *muted* role (always the
binding one) clears 4.5:1 against the worst background its mode may face.

### The contract is one-sided

- **Light chrome is unconstrained.** Half of an L95% fill already clears AA over pure
  black, so no background can drag it under.
- **Dark chrome requires a background below ~.18 relative luminance.** Its fill
  contributes almost nothing, so half of a bright background swamps it.

This asymmetry is physics, not a defect. Surviving a white background in dark chrome
would need α ≈ .96 — an opaque plate.

### What the fork changes

The shipped design system is **v0.3**, which already implements most of the rule.
The fork (`_ds_fork/frostwork-blur-first.css`) changes exactly two things:

**1. It finishes the density retirement.** v0.3's CSS retired the density ladder —
`[data-density="0"]` and `[data-density="2"]` resolve identically. Its **JavaScript did
not**: `components/surfaces/media-registry.js` still ships the older measured table
with `density: "2"` verdicts, and `stageFacts()` still publishes density 2 for any
image with no registry entry — which is every image a CMS will ever supply.

That verdict no longer changes pane thickness, but it *does* still swap the ink roles
to the opaque-path overrides, which were solved against a fill that is not there. The
fork re-points those roles at chrome and leaves the override for the two genuinely
opaque paths.

> **Port note:** if you rebuild the stage component rather than porting it, simply do
> not publish a density attribute at all. The whole mechanism is retired; the fork
> exists because the shipped JS has not caught up.

**2. It adds the scrim.** Derived, not judged:

```
composite = (1 − a) × 255,  required relative luminance ≤ .18
→ a ≥ .5386
```

`--scrim: .62` ships — worst case (pure white photograph) lands at .119 against a .18
ceiling. Full-height bottom-up ramp, solid across the pane band, then ramping to
nothing at the top of the still.

An earlier pass used `.78`, **guessed**. It cost every good photograph about a third
of its contrast for nothing. Solve, then measure, then publish.

**3. It bounds the media on artifact cards.** Ink is never set over a photograph. The
media bleeds to the card's left, right and top edges and stops at the text band; the
band is the card's own glass, reading the site backdrop. Legibility stops being a
property of the image and becomes a property of the mode. Hero and rail card are one
composition at two sizes. Enforced by check 16, not by convention.

### Standing rules for anyone touching glass

- **A structural guarantee beats a measured one** wherever the structure is available.
  Bounding the media is cheaper and stronger than measuring the still under the ink.
  Where the structure is not available — the backdrop stage — measure and scrim.
- **Measure against the composite** — the fill over the media *as blurred by the pane's
  own radius*, not the raw image — and use the worst local window, not the average.
  Record the number.
- **AAA is never a reason to escalate**, and neither is a thin margin. 4.66:1 is a pass.
- **Chrome mode is the first lever.** Flipping a bright still to light chrome flips the
  ink roles and recovers more contrast than thickening the pane, at no transmission cost.
- **Never nest blur.** A `.glass` inside a `.glass` has its filter stripped. This is
  deliberate — it doubles the most expensive operation in the system for no visual gain.
- **The scrim is opt-in by class.** Calibration specimens must stay bare; scrimming a
  measurement frame means measuring the scrim.
- **The opaque escapes stay.** `prefers-reduced-transparency`, `prefers-contrast` and an
  authored `data-glass-fill` are a *user or author asking* for the guaranteed state. The
  rule is about the system not giving up on their behalf — not about refusing them.
- **Contrast arithmetic does not model stroke thinning.** Type below ~12px over a moving
  field wants review by eye even when the ratio passes.

### Measured ratios on file

The `light-ice` still, light chrome, worst local window:

| Role | Size | Ratio | AA needs |
|---|---|---|---|
| Title | 22px / 600 | 7.97:1 | 3:1 |
| Micro label | 10px | 7.97:1 | 4.5:1 |
| Muted body | 12px | **4.66:1** | 4.5:1 |

The muted tier is the thinnest margin in the system and the first thing that breaks.
If a change drops it below 4.5:1, the change is wrong — not the floor.

## Screens

The storyboard is a single file with a left rail that switches frames. Each frame is a
screen of the real site (or a comparison sheet for a decision).

### Journey — the real screens

| Frame | Purpose |
|---|---|
| **Homepage** | Generative backdrop, featured artifact (C3 hero), framework rail, project rail, practice cards |
| **Collection** | Browsable grid of all artifacts, cross-category |
| **Artifact · reading** | Long-form reading view for a project or framework |
| **Search modal** | Semantic search overlay; results cross categories, not folders |
| **Connect** | Hybrid contact — segmented selector reshapes the whole experience |
| **Experience** | Resume screen — altitude lens, timeline, recognition, education, tools |
| **Project gallery** | Per-project selected stills |

### Narrow

**Mobile homepage** and **Mobile artifact** — phone frames with their own in-frame
header and bottom bar. The desktop site header is deliberately suppressed on these two
frames; stacking desktop chrome above a phone mock reads as a breakpoint contradiction.

### Decision sheets (not screens to build)

**Hero · 3 ways**, **Browsing · 3 ways**, **Reading · 3 ways**, **Panel · behavior**,
**Dark & light side by side**, and the calibration frames (blur ladder, composition,
media). These exist to justify decisions. Do not ship them; do read them when you
wonder why something is the way it is.

## Key components

### Persistent site header

Above every screen except the two phone mocks. Single row, wraps only at genuinely
narrow widths.

- Logo slot: `flex: 1 1 0; min-width: 0`, caption truncates with ellipsis
- Nav pill: `.glass[data-glass-level="nav"]`, `flex: 0 1 auto; min-width: 0`,
  `border-radius: 999px`, `padding: 8px 16px`
- Nav items: About Me / Resume / Connect. Active state is
  `color-mix(in oklab, currentColor 14%, transparent)` + `font-weight: 600`;
  hover is the same mix at 12%
- Theme toggle: 46×46 circular glass button

> The washes derive from `currentColor` specifically so they invert with chrome mode.
> Do not hardcode `rgba(255,255,255,…)` here — it breaks light mode silently.

### Theme toggle

- Default is the system preference via `prefers-color-scheme`
- Follows live OS changes **until the user clicks**; after that the explicit choice wins
- Glyph ◐ dark / ◑ light, `aria-pressed`, label "Switch to light/dark mode"
- The glyph's ink centre sits **8.5% of an em below** its line-box centre, so it needs
  `transform: translateY(-0.085em)` to look centred. Measured, and it scales with
  font-size.

### The artifact card — the hero and rail pattern

The site's signature composition, and a **codified rule** rather than a recipe: see
`_ds_fork/frostwork-blur-first.css` § 3 for the geometry and
`_ds_fork/frostwork-rules-addendum.js` for the rule as data plus check 16, which
measures it on the rendered page. Port both.

**Media is bounded. No ink is ever set over the photograph.**

- Card: `[data-artifact-card]`, `padding: 0`, `overflow: hidden`, two grid rows
  (`minmax(0,1fr) auto`)
- Media row: `[data-artifact-media]`, bleeds to the card's **left, right and top**
  edges, clipped by the card's own corners, `background-image` + `cover`
- Band: `[data-artifact-band]`, declares **no fill and no filter** — it is a window
  onto the card's own glass, transmitting the site backdrop. Hairline top edge marks
  the seam.
- Content: micro label, title, framing line (2-line clamp), meta line
- Hero: `min-height: clamp(392px, 48vh, 496px)`, radius 24, band padding 16
- Rail: `[data-artifact-size="sm"]`, 16:9, radius 16, band padding 10/12/12

> **Why bounded, and do not undo this.** The earlier composition set a glass pane over
> the lower 38.2% of the still. That made legibility a property of the *photograph*:
> every new still reopened the question, and the scrim could only bound it, never solve
> it. With the media bounded, the band reads only the backdrop — which the site owns, in
> both modes — so contrast is a property of the **mode**. The worst case that motivated
> the whole per-still apparatus (a dark still under light chrome) cannot arise, because
> the still is under no ink. A structural guarantee beats a measured one wherever the
> structure is available.

> **Transmission is unchanged.** The band is full glass at `--glass-thickness: .50` and
> 32px blur with the tone wash. Nothing here trades translucency for contrast; it
> relocates what the translucency is looking at.

> **The artifact card is not a stage.** It publishes no tone and takes no scrim — there
> is no ink over its media, so there is no contract for a scrim to hold. Only the site's
> own backdrop is a stage. Rail cards previously declared themselves stages and
> published hand-written tones for media they no longer put text on; that is the drift
> the single codified composition exists to prevent.

### The backdrop stage — where the scrim still lives

The one surface that still carries text over media, and the only caller of the scrim.

- `.stage-scrim::before`, absolute inset 0, `pointer-events: none`,
  `border-radius: inherit`
- `--scrim: .62`, full-height bottom-up ramp, solid across the bottom **38.2%**

> **The scrim must be a pseudo-element, not a background layer.** The stage sets its
> photograph with an inline `background:` shorthand, so a class declaring
> `background-image` loses to it unconditionally and the scrim silently never paints.
> `::before` rather than `::after`: both scrim and pane are positioned with auto
> z-index, so paint order follows DOM order — `::before` is the first child and the
> pane comes later, putting the pane above the scrim without either naming a z-index.
> `::after` would frost the text instead of the photograph.

### Slide-over panel

- Partial: **61.8%** of viewport width (golden major), page dimmed behind
- Full: 100% takeover. Mobile is always takeover.
- In 320ms, out 240ms, from the right
- Page behind stays mounted and keeps scroll position — a layer, never a navigation
- Focus gated with `inert`; Escape closes
- `prefers-reduced-motion`: crossfade only

### Connect — hybrid form

A segmented selector (Client / Recruiter / Colleague) reshapes the experience:

- **Client** — the only path with a real form. Includes a **15-word mission
  constraint**: a filter, not a field.
- **Recruiter** and **Colleague** — pre-filled `mailto:` links with a copy-template
  fallback for webmail users, so they never leave their mail client.

All three carry a left-column explanation of why the paths differ.

### Gallery

One column, full-bleed, captions beneath. Each still keeps its own aspect ratio
(`height: auto`, no crop) so an unknown mix — 4:3 screenshots, tall mobile captures,
wide diagrams — coexists without the grid forcing a shape onto any of them.

> **The gallery needs no scrim and no measurement.** Captions sit outside the image, so
> nothing is set over photography and the glass rule never applies. That is the trade
> against C3: the hero puts text on the image and pays a scrim; the gallery keeps the
> photograph intact and pays a caption line.

Sized for four stills, typical six. No pagination and no lightbox — below about a dozen
images a single column is cheaper than a viewer. A project needing twenty is a signal to
curate.

## Interactions & behaviour

| Behaviour | Spec |
|---|---|
| Card hover | `--glass-thickness` .50 → .62, edge brightens, **cards only** lift `translateY(-4px)` |
| Active press | `translateY(1px) scale(.994)` |
| Glass transitions | 180ms `cubic-bezier(.2,.6,.2,1)`; transform 120ms |
| Screen enter | `wf-rise` 400ms / `wf-grow` 420ms, same easing |
| Panel | in 320ms, out 240ms |
| Escape | closes panel and search modal |
| Reduced motion | all animation and transition suppressed |

**Glass never changes hue on hover** — only alpha and edge brighten. Hover raises
thickness rather than painting a flat tint over the hued fill, so the same colour
deepens instead of going grey.

## State

```
frame        which screen is showing
theme        null = follow system · 'dark' · 'light'
searchOpen   boolean
panel        null | 'partial' | 'full'
who          'client' | 'recruiter' | 'colleague'
scrollY      drives header/backdrop response
```

Theme persistence: `null` means *follow the OS*, and a `matchMedia` listener re-renders
on OS change. Any explicit value pins the choice. Do not collapse `null` into a
concrete default — that silently breaks system-preference following.

**Animation lifecycle:** the generative backdrop only exists on the home frame. Its
rAF loop must be destroyed when its element is unmounted, or it keeps running against a
detached canvas on every other screen and saturates the main thread. This was a real
bug in this prototype; do not reintroduce it.

## Design tokens

All spacing derives from an **8px fundamental unit**. Golden ratio appears twice and
both are load-bearing: **38.2%** (pane band) and **61.8%** (panel width).

### Glass

| Token | Value |
|---|---|
| `--glass-thickness` | `.50` both modes |
| `--glass-blur-fixed` | `32px` |
| `--glass-thickness` (hover) | `.62` |
| `--scrim` | `.62` dark · `.28` light · `.72` increased contrast |
| `--scrim-band` | `38.2%` — the backdrop stage only; artifact cards set no scrim |
| `--glass-fill-l` | `95%` light · `24%` dark |
| `--glass-fill-c` | `.07` light · `.11` dark |
| `--glass-muted-l` | `36%` light · `85%` dark |

### Ink

| Role | Light chrome | Dark chrome |
|---|---|---|
| `--glass-text` | `#141414` | `#f2f2f2` |
| `--glass-text-muted` | `#3a3a3a` | `#d0d0d0` |

### Radius

`button` pill · `nav` md · `card` lg · `modal` xl. Radius is **not** derived from blur
depth — that coupling was retired. Nested surfaces use
`--radius-concentric: max(--radius-sm, --radius-parent − --space-3)`.

### Type

Display face for headings, UI face for body, mono for micro labels and metadata.
Micro labels: 10px, `letter-spacing: .06–.08em`, uppercase. See the design system's
`tokens/typography.css` for the full scale.

> **A known tension:** the system sets a 16px optical floor, below which type is meant
> to take a guaranteed fill. The 10px micro labels pass contrast but sit under that
> floor. Ratios do not capture stroke thinning at 10px over moving media. Review by eye.

## Assets

- `media/` — two kinds of stand-in, both disposable:
  - the design system's **calibration stills** (`cool-mangosteen`, `light-ice`,
    `plain-pour`, `sat-strawberry`, `split-spectrum`, `warm-citrus`,
    `test-pattern-quad`) — chosen to stress-test the glass contract, not to represent
    the work. Keep them out of the shipped site; keep them around for re-measuring.
  - the **artifact screenshots** (`media/artifact-*`) — placeholders, shipped with this
    package as reference so you can see the panes over real pixels. Reference, not
    direction: nothing about their subject, crop, or palette is a decision. **Replace
    all of them.**
- Fonts ship with the design system under `assets/fonts/`.
- Generative backdrop on the homepage is VANTA.NET over three.js, loaded from CDN in
  the prototype. Decide deliberately whether to keep it — see Open decisions.

## Content model

The CMS owns: **projects** (title, client, framing line, hero still), **article /
writing entries**, **per-project galleries**, and **framework descriptions**.

Hard-coded: resume roles, patents, education, Connect copy.

Bracketed strings in the HTML (`[Framing line — …]`, `[Framework 04]`) are CMS holes,
not placeholder text. `[Framework 04]` is a deliberately empty slot.

### The field the CMS needs that is easy to miss

**`scrimStrength`** — a per-still override, defaulting to the worst case. An editor who
knows a still is calm can dial it down; an unset field must never be the unsafe one.

**`chromeMode`** — per-still. This is a legibility lever, not an atmosphere choice:
flipping a bright still to light chrome recovers more contrast than any amount of
thickening.

## Open decisions

1. **Where AA gets enforced at publish time.** The scrim bounds the problem so nothing
   *fails*, but it is a blunt instrument — it darkens good photography to survive bad.
   A build step that composites fill over blurred media and reports the worst-window
   ratio would let each still use its real value. Not yet built.
2. **Whether the generative backdrop survives.** It is the single largest performance
   cost on the homepage and it competes with the photography.
3. **Per-role NCR dates.** The resume gives one range for the whole tenure, so the
   ladder currently renders as a progression chain. Real dates would restore a stepped
   timeline, which is stronger.
4. **Rail fallback for thin categories** — pad, shrink, or mosaic. Undecided.
5. **C2 as a hero alternative.** C3 shipped; C2 was held.
6. **Phone number.** Deliberately held off the page — a public portfolio is a different
   exposure than a PDF sent to a recruiter. On the resume PDF only.

## Files

| File | What it is |
|---|---|
| `CLAUDE.md` | **Start here. Copy to the root of the site repo** — the contract in short form, for Claude Code |
| `BUILD_PLAN.md` | Ordered build plan, plus the decisions to settle before any code |
| `COMPONENT_INVENTORY.md` | **Frames → components**, props, states, and where the server/client boundary falls |
| `content.schema.ts` | The frontmatter contract as Zod. Parse at build time; a missing field is a failed build |
| `conformance.spec.ts` | Playwright: check 16 and the scrim derivation, in CI, failing the build |
| `IA Storyboard.dc.html` | The full storyboard — every screen and decision sheet |
| `_ds_fork/frostwork-blur-first.css` | **The amendment. Port this, don't just read it.** |
| `_ds_fork/frostwork-rules-addendum.js` | **The bounded-media rule as data, plus check 16 that measures it.** Port with the CSS |
| `GLASS_RULES.md` | The project's standing glass rules, condensed (the design project's own `CLAUDE.md`) |
| `media/` | Stand-in imagery: calibration stills + placeholder artifact screenshots. Reference only — replace all of it |

The storyboard is a single self-contained design component. The left rail switches
frames; everything else is the design.
