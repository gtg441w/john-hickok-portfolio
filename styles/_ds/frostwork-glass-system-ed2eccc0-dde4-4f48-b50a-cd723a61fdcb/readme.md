# Frostwork Glass System — v0.2 (alpha)

Frostwork is **pre-release**. Everything here is 0.x alpha work: the model is expected to change, and
each version supersedes the last outright rather than sitting beside it. There is no v1 and no v2 —
there is the current version, v0.2, and there is 1.0, which will be the first release the system asks
anyone to build against.

It is a **focused exploration of one thing**: how translucent, blurred surfaces sit over background
media on a portfolio site. The surfaces carry **no accent color in their fill or their edges** — hue
reaches them from the media, and identity enters only as ink (see *Accent, decided*).

**What v0.2 changed.** v0.1 asked `backdrop-filter` to transmit ambience, protect legibility and
encode depth all at once, and needed a six-rung escalation ladder to arbitrate between those jobs at
runtime — because no surface knew what was behind it. v0.2 supplies the missing fact: the stage
publishes its media's sampled color and measured luminance, and the surface decides nothing. The
ladder is gone, replaced by one two-state `density` knob. See **THE GLASS MODEL** below; the
retired v0.1 recipe is not shipped.

## Building with this — read this section first

**Read order.** `SKILL.md` routes you here. This file is the contract and is the only one you need to
build. `guidelines/rules.js` is the same rules as data — read it instead of this file when you want
the machine-readable version. `decisions.md` is the post-mortem behind every rule; read it only when
you want to *change* a rule. Don't read all three.

**Where the truth lives, in order of authority.** `tokens/*.css` (the values) → `guidelines/rules.js`
(the rules, as data) → the 15 runtime checks in `ui_kits/conformance/` (the enforcement) → this file
(the explanation). If prose and code disagree, the code is right and check 12 should have caught it.

**Cards are grouped by whether they bind you.** *Foundations, Glass, Colors, Type, Spacing, Media,
Brand, Components, Forms, Primitives* are the spec. *Glass Lab* holds live instruments — the
conformance harness, the blur-budget rig, the density ladder, the comparison sheet, the choreography
spec. *Closed explorations* is process: A/B sheets and candidate studies whose decisions already
landed in the rules. Read those last, or not at all; they exist so a settled decision is not
re-litigated from scratch, not to be built from.

**Start from a template, not from this document.** `templates/` holds four working starting points.
Two are the defaults, and one of them fits most work: **`app-shell`** (dashboard — and the reference
for the functional/content split, so it is the one to read if you only read one) and **`glass-hero`**
(marketing or portfolio page). `settings-panel` (forms) and `live-stage` (motion under glass) are
narrower — reach for them when the shape matches. Copy the closest one and edit.
Each loads the system through a single `ds-base.js`, so re-pointing one line rebinds the whole thing.

**Run the harness in your project, not just in this one.** The 15 checks are runtime — they measure a
rendered page, so they work on *your* pages, which is the entire point. A design system that can only
be verified inside its own repo is a style guide. Porting it takes four things:

1. Copy **both** `ui_kits/conformance/checks.js` and `guidelines/rules.js`. `checks.js` reads
   `window.FrostworkRules` and `window.FrostworkRetired` from that second file and degrades *silently*
   without it — `coverage()` finds no rules and the retirement registry reads empty, so the harness
   reports a confident zero. That is the vacuous pass it exists to prevent.
2. Load `styles.css` and `_ds_bundle.js` on the host page. The checks measure real components against
   the real cascade; without either, they measure nothing.
3. Set `window.FrostworkDocs` before `checks.js` loads, so check 12 reads *your* documents:
   ```js
   window.FrostworkDocs = { base: '_ds/frostwork/', readme: 'DESIGN.md', decisions: false, cards: false };
   ```
   `base` prefixes every document path. Set any document to `false` to declare it out of scope — that
   reports as a skip rather than a failure, because "we have no post-mortem file" and "the harness
   could not read the post-mortem file" are different facts. Defaults are this repo's layout.
4. Mirror `ui_kits/conformance/index.html` for the host page. `render()` writes to three ids, all
   optional and all guarded: `#scoreboard` (the per-check grid), `#failures` (the report table — omit
   it and you get a console warning instead of a page), and `#check-count` (a numeral in the lede).
   Keep `#failures` at minimum; it is where the findings land.

Checks 1–11, 13, 14 and 15 need only steps 1 and 2 — check 15 reads `rules.js` and no documents at
all. Check 12 is the one that wants step 3, since a
consuming project's own docs drift from its own code exactly the way this system's did.

**Three things to fix before you ship to real users.** These are measured, not guessed:

- **Fonts are 1.19MB of TTF** — Open Sans roman 517KB, its italic 567KB, Outfit 108KB. Convert all
  three to WOFF2 (expect roughly a third of the size) and `<link rel="preload">` the two you actually
  render. If you ship no italics, drop that face entirely and save 567KB on its own.
- **`styles.css` is a 12-deep `@import` chain.** That shape is the compiler's contract *in this
  project*; it is the wrong shape for production, because `@import` is render-blocking and
  serialized — the browser fetches `styles.css`, parses it, and only then discovers twelve more
  files. Flatten to one concatenated stylesheet, or emit twelve parallel `<link>` tags.
- **`assets/media/` is 14.3MB and is a specimen, not a payload.** Three GIFs account for 4.7MB of it.
  Never copy the folder wholesale — take the one or two stills you use, and if motion ships, it ships
  as video or animated WebP. `data-glass-tier="lite"` exists for the same reason.

**The one number here that is reasoned rather than measured** is the 3–4 concurrent-surface blur cap.
It is labelled as such everywhere it appears, and `ui_kits/glass-lab/blur-budget.html` is the
instrument if you ever run it on a mid-range phone.

## Sources
**Real font binaries were supplied and are now installed.** Still missing: **no codebase, no Figma
file, no slide deck, no logo, no photography.** Everything else here is authored from the written
brief, and the remaining substitutions should be replaced when real assets arrive:

- **Fonts** — *supplied, self-hosted, no longer a substitution.* **Outfit** for display, **Open Sans**
  for UI and body, both SIL OFL 1.1, both variable, served from `assets/fonts/` via `@font-face` in
  `tokens/fonts.css`. Three files: Outfit (wght 100–900), Open Sans roman and italic (wght 300–800,
  wdth pinned to 100). No CDN, no network dependency, no layout shift from a third-party stylesheet.
  Mono is a *system* stack (`ui-monospace` → Menlo/Consolas) — no third webfont ships, and as of this
  round `--family-mono` names no webfont either, so the documented behaviour and the token agree.
  The files are TTF as Google ships them; converting to woff2 is a build-step size win (~30%), not a
  correctness issue. **Flagged substitution: Lato** remains the approved stand-in for Open Sans where
  Open Sans is unavailable — metrically close but rounder, a fallback, not an alternate. Outfit has no
  approved substitute.
- **Icons** — **Lucide** (ISC license) via CDN. Chosen, not invented: open source, actively
  maintained, 24px grid, 1.5px stroke that matches the hairline edge, `currentColor` so glyphs
  inherit glass tone. No icons are hand-drawn in this system.
- **Photography** — *supplied, measured, installed.* Eight stills and three animated files ship in
  `assets/media/`, each with its measured facts recorded in `components/surfaces/media-registry.js`.
  The four gradient moods remain as the synthetic rig and as the paint-underneath fallback when a
  photograph fails to load. Real imagery installing itself exposed a defect no stand-in could:
  `<BackdropStage image="…">` swapped the picture but kept publishing the *mood's* facts, so
  `mood="plain"` under a near-white photo announced luma "dark". **A photograph is not a mood** — an
  image now publishes its own tone, luminance and density, and unmeasured media is refused a
  transmitting stage. See MEDIA below. Rights: sourced from Pexels under its licence — fine for
  specimens and prototypes, but confirm before any public campaign use.
- **Logo** — none supplied, and none invented. The wordmark "Frostwork" is rendered in plain type
  wherever a mark would go (`GlassNav`, `thumbnail.html`).

## THE GLASS MODEL — three layers, three contracts

**The glass has no color of its own, and it does not guess.** A surface's fill is an achromatic
low-alpha base (`rgba(255,255,255,α)` light, `rgba(10,10,10,α)` dark) plus a **wash of the media's
actual sampled color**, published by the stage. Tone is data, not a per-frame filter — cheaper than
`saturate()`, and truer, because it is the color of the thing actually behind the pane.

**Layer 1 · stage.** Owns the media and publishes its facts once, in markup:
`--stage-tone-rgb` (the sampled color), `data-stage-luma="light|dark"` (derived from that sample),
`data-density="0|1|2"`, `data-stage-tone` (the flag that says a tone was published).

**Layer 2 · surface.** Consumes and decides **nothing**. Fill from the base + wash; blur from level;
edge, shadow and radius as before. Blur is the only filter, so it can be tiered away on a weak device
without taking the color identity with it.

**Layer 3 · text.** Guaranteed, not negotiated. Because the stage published luminance, the text role
is deterministic: `[data-stage-luma]` sets primary and muted. The halo applies only below the 16px
optical floor. The muted role sits much closer to primary than a muted tier on flat paper would —
it has to survive a thin surface over saturated media, and that was measured, not eyeballed.

**One dial for depth.** `--glass-depth` is unitless — 10 button / 18 nav / 72 card **and** modal. Blur is
that number in px and alpha is derived from it, so the two can never drift apart. (Derive alpha from a
*length* and the alpha becomes a length; the fill is dropped and the surface renders transparent. That
is not hypothetical — it happened, and it is why depth is unitless.)

**Card and modal converged at 72.** Depth no longer distinguishes a card from a modal — the choice was
made by eye from four real panes at 28 / 40 / 56 / 72 (`ui_kits/glass-lab/ab/blur-*.html`), the heaviest
won, and rather than invent a rung above the modal the collision was allowed to stand. What separates
the two now is what sits underneath: a modal is transient, full-screen, and over a stage-wide scrim; a
card is none of those. The hierarchy moved from *how blurred* to *what is beneath it*, and depth stopped
carrying two jobs. Radius did **not** follow: cards stay at 24. The first pass moved them to 32 by
inheritance from a rule that said a heavier blur gets a larger corner — and that rule is now retired,
because a corner radius participates in no glass calculation. Blur and alpha come from
`--glass-depth`; fill comes from the tone wash. Coupling shape to those bought nothing and propagated
this collision as a side effect: a shape decision made by an optical one. Card 24, modal 32, same
depth.

It is an aesthetic purchase, and the registry is the receipt that it bought nothing else: the same media
verdicts measure at 28 and at 72, because the local extremes are gone by 28. It **is** paid for in fill
alpha, which is derived from depth: .23 light, .31 dark. A 72-blur card is a denser card by construction.

**Density — the entire legibility ladder, in two states.**

| State | Meaning | Cost |
| --- | --- | --- |
| `0` | Transmit maximum environment: translucent fill + 28% tone wash. The default. | 1 filter |
| `2` | Guaranteed: opaque fill at an **authored lightness carrying the media's hue**, override text roles, no filter. | 0 filters |

There is no rung 1 — see the note in `glass.css` for the measurements that removed it.

**Density 2 does not compute its luminance** — that is what the guarantee means. It does still borrow
the media's **hue**, because hue at a pinned lightness cannot threaten contrast: the fill is
`oklch(from <tone> L C h)` where L is authored per chrome mode (90% light / 24% dark) and chroma is
the tone's own chroma × 1.4, capped at a **committed ceiling of 0.10 light / 0.11 dark** — deliberately
inside the sRGB gamut edge, not at it. Across all 34 tone × mode combinations the worst measured ratio
is 12.3:1 body and 6.0:1 muted — see the **Guaranteed fill audit** card, which measures it rather than
asserting it.

Those numbers are the A/B sheet's verdict (`ui_kits/glass-lab/ab-fill.html`, five pairs, one variable
each): hue from the **frame average** rather than the most chromatic region, chroma at a **committed**
ceiling rather than the gamut edge, a **hue-matched** muted tier rather than neutral grey, lightness
**kept high**, and **density 0 unchanged**.

**Two things read as grey, from opposite causes, and both were rejected.** Chroma pushed to the sRGB
gamut edge at a high L clips and loses apparent purity; a heavier tone wash mixes toward the fill's own
achromatic base. Colour is not monotonic in either knob — past a point, more of it looks like less. The
ceilings above are set below the edge for that reason, not for contrast.

**Lightness was amended after the fact, and the reversal is the more useful record.** The first pass
dropped L to 78%/30% to spend AAA headroom on chroma, on the argument that a margin nobody asked for is
waste. Seen isolated rather than side by side, the two fills were nearly indistinguishable in colour
and the lower L simply looked duller — the trade bought nothing and cost the headroom, so it was
reverted. Spending contrast is only justified when the thing bought is visible.

Two consequences worth stating, both learned the hard way. The oklch is composed at every point of
use, never pre-assembled into a token: a custom property substitutes its `var()`s where it is
*declared*, so a fill built in `:root` reads the achromatic fallback and paints every surface in the
system one identical pink. And chroma is proportional, never fixed: the hue angle of a near-grey tone
is arithmetic noise, and a fixed chroma turns that noise into a confident wrong colour — a near-black
photograph was rendering a bright yellow card.

`prefers-reduced-transparency` lands on density 2, as does type below the floor and unknown media.
`prefers-contrast: more` also lands there but keeps the hue, buying its extra ratio from lightness and
chroma instead — identity survives the accessibility preference; only the margin changes.

**Accessibility target.** Every surface transmits as much color, tone and movement as it can while its
text clears **WCAG AA (4.5:1, or 3:1 at 20px+ semibold)**. AA is the floor and non-negotiable. AAA is
recorded when it happens and is never a reason to escalate — buying 7:1 with opacity trades the living
environment for a number nobody asked for.

**Measured, not judged.** Contrast is settled where the media is chosen — a build step, or the image
palette a CMS already returns — against the worst-case sample, not the average. Nothing is sampled on
the client. **This is now literal, not aspirational:** every shipped photograph carries the numbers it
was measured at (`components/surfaces/media-registry.js`) and its density is derived from them.

## MEDIA — a photograph is not a mood

Eleven files ship in `assets/media/`. Each has an entry in `components/surfaces/media-registry.js`
holding its mean RGB, its global luma p50, and — the numbers that actually decide things — the
**local worst case**: the frame is divided into an 8×8 grid of text-sized windows, and we keep the
brightest p95 and the darkest p5 found in any single window. The registry is a **measurement record,
not a set of opinions** — which is why every entry prints its numbers next to its verdict.

**And it was measuring the wrong image.** Text never sits on the photograph; it sits on the photograph
*after the pane's own blur has been applied to it*. A blur is a low-pass filter, so it destroys exactly
the local extremes the derivation was rejecting media for. Every window figure is now measured **through
the pane** — downscale, blur by the pane's own radius at measurement scale, then take the windows.

This is a **correction, not a relaxation**: no threshold moved, the rules below are unchanged, and what
changed is which image they are applied to. Transmitting media went from 2 of 8 stills to **4 of 8**
full-bleed. Both of the two that changed had been rejected for a specular patch the pane had already
erased. Specimen: `guidelines/media/pane-blur-measurement.html`, which measures both columns in-page from
the real pixels and then checks every registry entry against its own fresh measurement, so a drifted
table fails loudly instead of quietly.

**Two axes select the measured cell, and both are layout facts.** *Depth* — the thinnest surface the
stage carries, because thinner glass erases less and worst case governs; recorded at 10 (button), 18
(nav) and 72 (card/modal). *Footprint* — `full` or `center`, which windows the content actually covers,
declared once on the stage. Undeclared means `full`, so an omission is never the less safe option.
Neither is a surface deciding anything: a surface still consumes and decides nothing.

**Averages lie, and one did.** The first version of this measured tile *means*. A specular highlight
is small and bright: it moves a tile's mean by a few units and its p95 by eighty. `sat-strawberry`
measured a global p95 of 175 and a tile-mean spread of 51 — comfortably "safe" — and shipped at
density 0 with the least legible text on the specimen card. Text does not sit on the average of a
photograph; it sits on one particular patch of it. The derivation now measures that patch.

**Density is derived.** Nothing in the registry is a judgement call:

| condition | published |
| --- | --- |
| `p50 ≥ 128` | luma `light` → density 2 (legality rule 1) |
| worst bright `> 192` and worst dark `< 64` | bidirectional → density 2 (legality rule 2) |
| otherwise | luma `dark` → density 0 |

192 is 75% of white and 64 is 25%: past those, one patch of the frame refuses dark text while another
refuses light text, and no single role serves both.

**Four of the eight stills transmit full-bleed**, five on a centre footprint. `plain-pour` (near-black)
and `split-spectrum` (saturated hue, tiny luma range) always could; `cool-mangosteen` and
`sat-strawberry` joined when the measurement started reading the field under the pane. `busy-taps` adds
the centre band. `split-spectrum` remains the useful proof that *colourful* and *high-contrast* are
different measurements.

**The shape of that result is the reassuring part.** Every still that still refuses to transmit is
simply **bright** — `warm-citrus`, `light-ice`, `edge-plate` — and no amount of blur darkens a bright
field. Rule 1 is now the binding constraint, and blur only ever rescued media whose problem was
*locality*, which is the only thing a low-pass filter should be able to fix. A correction that had
rescued the bright media too would have been a bug.

**Facts follow the image, not the mood.** A mood describes the synthetic gradient stand-ins. When a
stage carries a real photograph the mood stops describing what is on screen, so the image's facts
override it. Before this, `<BackdropStage mood="plain" image="light-ice.jpg">` published luma `dark`
and tone `26,26,26` over a near-white photograph, and every surface above it picked a text role for
media that was not there. Only real photography could surface that, and it did on the first swap.
An explicit `luma` or `density` prop still wins over the registry — that is an author saying they know
something about a crop the file does not — and `legaliseStage()` still refuses it if it is illegal.

**Unmeasured media is refused a transmitting stage.** An image with no registry entry publishes
density 2 and warns once, naming the file and the fix. The system would rather look heavier than
promise contrast nobody checked.

**Animated media never transmits.** A GIF can only be sampled at one frame, and one frame is not a
measurement of a moving field: `motion-smoke` reads `p50 8` — near-black — while carrying bright wisps
that arrive a second later. The worst case is spread over *time* and the build step cannot see it, so
animated entries record `first frame only` and publish density 2 unconditionally.

**Animated media also cannot be frozen.** `prefers-reduced-motion` stops a canvas and freezes a video,
but a GIF has no still frame to fall back to, so the only honest response is to drop the image
entirely. Prefer `LiveBackdrop` or a video source for animated Layer 1 — both hold a real still frame.
Ship a GIF only where losing the image outright is acceptable.

**The mood class still paints underneath.** A photograph that fails to load leaves a gradient of
roughly the right colour rather than a void. The stand-ins were not deleted when the real assets
arrived; they became the fallback and the synthetic test rig.

Specimens: `guidelines/media/photography.html`, `guidelines/media/motion-media.html`.

**Fix the media first.** A crop that needs density 2 is a *media* problem, not a glass problem. Recrop,
regrade or slow it until density 0 clears AA. Escalating the surface to survive bad media is the last
thing tried, not the first.

**The harness measures glass, and now the page around it too.** `ui_kits/conformance` walks every
mood × density × chrome cell on the *surfaces*, and that blind spot cost us: an 11px micro-caption in
`--n-5` (#787878, **3.70:1** on the page) had spread to 27 files — specimen cards, labs, the rules
sheet — while every glass surface in the system passed. All 27 now take `--text-muted` (7.43:1), and
`--text-faint` carries a comment saying it is not a text role below 20px.

**Check 8 closes that gap mechanically.** The same contrast arithmetic runs on every text node *off*
the stage, compositing ancestor backgrounds down to an opaque base, and separately flags the faint
role below 20px — a token that can clear AA on a light page and still be wrong. Writing it found two
live failures immediately, in the harness's **own** report: the scoreboard sub-captions at 2.22:1 and
the clean-state note at 4.34:1. Neither was reachable by any existing check, because `render()` writes
them *after* `run()` measures — so `run()` now takes a second pass once the report is on the page. A
check that cannot see the output of the thing checking is not a check.

It is optimistic by construction: ancestor `opacity` and blend modes are not modelled, and text over
an image falls back to the page surface. It will miss a failure before it invents one — which is the
right bias for a check that gates nothing and reports everything.

**Six more rules moved from review to measurement**, which is the interesting direction of travel:
the harness now runs **15** checks, not seven. `L1-shared` becomes *stage completeness* — a stage
either published the whole fact set or it did not, and the defect it guards against is a publisher
assembling the facts by hand and omitting one. `L2-budget` becomes *blur budget*: nesting is a fact
about the DOM and an animated filter is a fact about the stylesheet, so two thirds of a "judgement"
rule turned out to be arithmetic — only the per-viewport count remains a judgement, and it is
reported rather than failed, because the number it would be measured against is itself unmeasured.
`F-concentric` becomes *concentric radii*: inner corner = outer minus the smallest edge inset,
invisible in source because both numbers look deliberate. And the newest, `D-prose`, points the
harness at **the documentation** — every token, contract class, `[data-*]` value and version cited in
code, in this file and in all 51 `@dsCard` files, is resolved against the loaded stylesheets, because
the documents that teach the contract were the last thing here running on trust.

**The concentric check's first version reported 48 failures, all of them wrong.** Pill buttons inside
a nav are the system working, and it was measuring the inset from the top edge only — so a
horizontally centred child read as 138px inset and was told to have a 0px corner. Pills are exempt
geometrically now (radius ≥ half the box) rather than by token name, so an inline `999px` is caught
by the same clause. A check with an opinion is not a measurement, and the failure mode of mechanising
a review rule is producing 48 confident false positives rather than none.

**3 rules remain unmechanised.** Two are genuine judgements no harness should claim:
`D-measure` (a card reads computed values off the DOM rather than asserting them in prose) and `F-hue`
(hue only on elements that respond or report). `D-measure` is the same instinct as `D-prose` and the
obvious next one to try.

The third, `M-fail-safe`, is a different case and the more instructive one: it is **mechanisable and
simply was not mechanised**. It declared `check: '8 reveal'` for four versions while slot 8 is page
furniture, so it read as enforced, appeared in neither the enforced nor the review list, and every
count in this file stayed technically true while one rule was enforced by nobody. Check 15 now
compares the two sets, which is why it was found. Asserting that no reveal CSS is unscoped is the
obvious next check after `D-measure`.

What is *gone* from this list is the category that mattered: `M-layer1-only` and
`M-no-density-animation` were hard contracts sitting on review because nobody had got to them, and
they are now checks 13 and 14. No rule is left in the gap where rung 1 lived.

That distinction was itself an incident: this section previously said all the remaining rules were
about whether a design is *good*, which was written in the same round that mechanised three rules
specifically to stop asserting things. The count is now derived from `coverage()` rather than
remembered — the same correction the `glass.css` comment needed when it asserted "primary is already
solid at every density" and had been false for as long as the hued fill existed.

**Fallback.** A stage that publishes no tone falls back to `saturate()` — it still works, it is just
approximate and cannot be tiered. Publishing a tone turns the guess off.

---

## GOVERNANCE — page and site scale

A legibility decision made surface-by-surface produces a patchwork: each piece is legible, the
composition is incoherent. In v0.2 that failure is not forbidden, it is **unbuildable** — the facts
live on the stage and surfaces have nothing to decide.

**The stage owns density.** A stage is one region of continuous media (`BackdropStage`,
`LiveBackdrop`, `.stage`, `.backdrop`). Density is published once and inherited by every surface
inside it.

**Worst case governs.** Density is whatever the least legible surface in the stage needs. Uniformly
denser reads as intentional; one dense card among five thin ones reads as broken.

**Depth survives density.** Density shifts fill and wash, never the depth ladder, so nav stays thinner
than card and card thinner than modal in both states.

**One step of drift per page.** Stages on a page may differ by at most one density state. A hero at 0
above cards at 2 is two design systems on one screen.

**A surface-level fill must be republished at stage specificity, or the stage will overwrite it.**
Stage-scoped fills are descendant selectors and outrank anything a surface says about itself with a
class and an attribute. Emphasis is the only surface fill that must survive the stage today, and it is
handled explicitly rather than through a general escape hatch — but any future one has the same
problem, and file order does not solve it.

**Density 2 is stage-wide.** If a stage needs the guaranteed fill, every surface in it takes it. Never
half-opaque. The per-surface `data-glass-fill` escape exists for cases where no stage can own the
decision, and it is the exception that gets flagged.

**Each mood publishes its own defaults**, and holds them everywhere on the site: `backdrop--busy`
carries stops at both luminance extremes — a 90%-white and a 92%-black in one field — so it publishes
density **2** without being asked. That is a published *fact* rather than a default
(`BIDIRECTIONAL` in `stage-contract.js`), which is what lets `legaliseStage()` refuse an explicit
`density={0}` on it instead of merely defaulting away from one. A visitor should be able to learn what
glass means here on one page and find it true on the next.

**Report per stage, not per component.** Specs name the stage's tone, luma, density, worst measured
ratio, and tone retained (surface chroma as a share of the media chroma beneath it). "Maximum
environment" is a number the stage is held to, not an intention.

---

## PERFORMANCE — the budget is the aesthetic

Accessibility costs almost nothing here: tokens, static attributes, `text-shadow`, keyframes. No JS,
no images, no added fonts. `backdrop-filter` is the entire budget, and its cost scales with
**area × radius**.

- **Never nest blur.** Enforced in CSS: `.glass .glass` drops its filter. Doubling the most expensive
  operation in the system buys nearly nothing visually.
- **Cap concurrent blurred surfaces** at roughly 6–8 per viewport — and the card's move to depth 72
  spends real budget here, since cost scales with **area × radius**. A grid of 72-blur cards is the
  system's most expensive screen by a wide margin; treat 3–4 as the practical cap at that depth — a
  **reasoned budget, not a measurement**, for the reason recorded directly below — and
  `data-glass-tier="lite"` (drops the filter, keeps the wash) stops being a fallback and becomes the
  mitigation. This is the stated cost of an aesthetic decision, not an oversight.

  **That cap is now instrumented, and the instrument's first lesson was about itself.**
  `ui_kits/glass-lab/blur-budget.html` runs a grid of blurred cards over media in motion — the worst
  case, since a still backdrop lets the blur cache — and ramps the count until frame time leaves the
  display's budget. On one 120Hz desktop, repeated runs put the ceiling **between 32 and past 64**
  concurrent depth-72 surfaces, every pane presented: one run broke at 32, another ran out of ramp at
  64 without breaking. That spread is the reason each step now runs three times and reports the
  median with its range — a single 1.6s window was setting a headline number, and two runs of it
  disagreed by 2.7×.

  **What survives the variance:** even the pessimistic end of that range is roughly **8×** the stated
  cap of 3–4, so the cap is not a measured ceiling on desktop-class hardware. What does *not* survive
  it is any specific number. The cap stays in this document **unchanged** until someone runs the page
  on a real mid-range phone — replacing an unmeasured guess with an unrepeatable measurement is not
  an improvement, and one fast machine is not the device the number is about.

  Four traps the instrument had to be fixed for, all of which had it reporting confident nonsense. A
  fixed 16.7ms budget calls a 120Hz screen clean while it drops every second frame — the budget is
  inferred from the fastest frames observed. A compositor does not blur a surface it is not
  presenting — an early ramp reported 96 cards holding, which was 96 elements and perhaps 20 blurs.
  The first fix for *that* did not work: the rig's height was constrained but the deck's `height:100%`
  had no resolved parent to resolve against, so the fractional rows divided the deck's own content
  height instead of the fixed box, and the shrink-to-fit threshold — computed from a formula rather
  than read off the layout — was wrong by 60px. And one run is not a measurement. The table now
  reports how many panes were presented, marks a clipped row **void** rather than slow, and carries
  the spread across runs so an unstable row reads as unstable.

  **DevTools CPU throttling is not a substitute for the device.** It slows the main thread;
  `backdrop-filter` is composited on the GPU. A 6× throttle will report 60fps on a page that stutters
  badly on the phone it was meant to simulate.
- **Pause ambient motion while a modal is open.** Motion under a `backdrop-filter` forces a re-blur
  every frame; a still backdrop lets it cache. Free, invisible, and it removes the worst case.
- **72px blur is no longer transient.** It used to belong to modals only, which were short-lived and rare. Cards are neither, so the expensive path is now the common one — measure a real card grid on a mid-range device before shipping one, with `blur-budget.html` rather than by eye.
- **Tier, don't degrade.** `data-glass-tier="lite"` and `@supports not (backdrop-filter)` drop the
  filter and keep the wash. In v0.1 the same removal deleted the design.
- **Ambient motion is transform-only**, and does not animate scale on a heavily blurred node — that
  re-rasterizes an expensive layer every step.

---

## CONTENT FUNDAMENTALS

This is a working design lab, and the copy sounds like it: plain, declarative, slightly technical,
never salesy.

- **Voice.** Third person about the system itself ("the glass borrows its mood"), second person only
  in instructions ("pass `fill` over busy media"). No "we", no brand-first "I".
- **Casing.** Sentence case everywhere — headings, buttons, nav, labels. The only uppercase is the
  mono label style, which is uppercase with `+0.08em` tracking and reserved for specs and eyebrows
  (`BLUR 28PX / 0.18`, `2024 — IDENTITY`).
- **Sentence shape.** Short declaratives. State the rule, then the exception. "Legibility wins."
  "56px blur plus the scrim does the work." Where a value exists, name it — copy quotes real numbers
  rather than adjectives ("blur 24 / 0.78 · fill", not "heavier blur").
- **Punctuation.** Em dash for the aside, en dash with spaces in ranges and dates
  (`2024 — Identity`), `·` as the separator inside mono spec strings, `↳` to attach a reason to a flag.
- **No emoji. Ever.** No exclamation marks. No sentence ends in a promise.
- **Labels.** Verb-first and literal: "View project", "Send", "Contact", "Later". Never "Learn more",
  never "Get started".
- **Failures are stated, not hidden.** When something needed the override, the sheet says so and says
  why: "↳ 13px label over bright detail".

---

## VISUAL FOUNDATIONS

**Scope parity.** Every colour-valued semantic token is declared in BOTH chrome scopes. `var()`
substitutes where a property is *declared*, not where it is read, so a token written once at `:root`
locks to its light value and inherits into `.dark` unchanged. This was the system's most persistent
defect — five recurrences — and is now checked at source by the conformance harness (`6 parity`),
which reads through `@import` and considers only colour-valued tokens, so type-size tokens sharing
the `--text-` prefix do not produce noise.

**Color.** Ten achromatic neutrals, `--n-0` (#ffffff) → `--n-9` (#0a0a0a), and nothing else. Semantic
aliases (`--text-strong/body/muted/faint`, `--surface-page`, `--line-hairline`) resolve differently
inside `.ui-light` and `.ui-dark`. No hue is authored into a surface — all color in a screen is
borrowed from the media, published by the stage as `--stage-tone-rgb`.

**Type.** Outfit for display and headings (`--font-display`), Open Sans for UI and body
(`--font-ui`), system mono at 12px uppercase for specs.

Type sits on a **modular scale, ratio φ = 1.618** from a 16px body, rounded to whole
pixels: 16 → 26 → 42 → 68 → 110. Type and spacing are now separate systems — spacing keeps its 8px
rhythm, type follows φ — which is what lets display get genuinely large: hero
`clamp(48px,7.4vw,110px)` at `0.94` / `-0.030em`; display `clamp(34px,4.4vw,68px)` at `1.04` /
`-0.022em`; title 26px at `1.26`; lead 20px; body 16px at
`1.5`; small 14px; micro 12px. Weights: 400 / 500 / 600 only. 14px is the floor on glass —
below it, labels fail contrast over busy media and need the fill override.

**Spacing.** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Card padding 24, modal padding 32, nav padding
8/16. Layout is grid + `gap`, never margins between siblings.

**Heights.** Every interactive box is an 8px multiple, so controls align across surfaces without
nudging: `--control-sm` 32 (small button, segmented nav item), `--control-md` 40 (default button),
`--control-lg` 48, `--nav-height` 56 (40px segmented track + 8/8 padding, minus the 1px hairline each side so the painted box is exactly 56). Height is set on the
control and padding is horizontal only — never vertical padding plus line-height arithmetic, which
is how rhythm drifts.

**Column grid.** 12 columns on desktop and tablet, 6 on mobile (`--grid-columns`, breakpoint at
720px), gutters 24 / 16 on mobile, page margins 32 desktop · 24 tablet · 16 mobile. Use `.grid`.
*On tablet staying at 12:* 12 divides into 6, 4, 3 and 2, so a tablet layout is the desktop layout
with wider spans (a 4-col desktop card becomes 6-col) rather than a different grid — components keep
one span vocabulary across two of the three breakpoints, and the tablet↔desktop reflow stays a
span change instead of a re-layout. Mobile drops to 6 because at that width 12 columns are narrower
than a single word and stop describing anything real.

**Radii.** 8 / 16 / 24 / 32 / pill — 8px steps. Buttons are pills, nav 16, cards **24**, modals 32.

**Radius is not derived from anything.** It used to scale with blur, and that rule is retired: when
card and modal converged at depth 72, the coupling silently moved cards to 32 as a consequence of an
optical decision about blur. A corner radius does not enter any glass calculation — blur and alpha
read `--glass-depth`, fill reads the tone wash — so the coupling had no mechanism behind it and its
only observable effect was propagating collisions from one ladder to another. Each surface takes the
corner its own size and role call for.

One consequence worth having: `--radius-parent` defaults to 24, and a card is the common parent for
nested surfaces. At 32 every card had to republish it or the concentric arithmetic drifted. At 24 the
default is simply correct.

**Backgrounds.** Media-first. Glass never sits on a flat page color — it needs something to sample.
Four moods, all full-bleed within their stage: warm/bright, cool/dark, busy/high-contrast, plain dark.
Imagery skews either warm-ochre or cool-blue; nothing mid-neutral, because mid-neutral media gives the
glass nothing to inherit. Every mood publishes its sampled tone and a default density. No grain layer yet.

Markup contract — **stage**: `class="stage"` or `class="backdrop"`, plus `data-stage-tone` with
`--stage-tone-rgb`, `data-stage-luma="light|dark"`, `data-density="0|1|2"`, optional
`data-glass-tier="lite"`. **Surface**: `class="glass"` plus `data-glass-level="button|nav|card|modal"`,
optional `data-glass-interactive`, and `data-glass-fill="light|dark"` only for the flagged
single-surface exception. A surface never sets tone, luma or density.

**Transparency & blur — when.** Blur is the only filter, and `--glass-depth` encodes hierarchy:
button 10, nav 18, card and modal 72. The heavier the blur, the more the surface claims the screen.
Alpha is derived from the same number — base + depth × .0018 + density — with a mode-specific base
(light .10, dark .18), because dark glass must be denser to hold light text.
`prefers-reduced-transparency` drops the filter and takes the guaranteed fill.

**Borders.** One hairline, `1px`, from the light: `rgba(255,255,255,.55)` in light mode,
`rgba(255,255,255,.16)` in dark. Plus an inset top highlight (`.65` / `.10`) so the surface reads as
a physical pane. No inner shadows.

**Shadows.** One per surface, soft and offset downward, never colored:
light `0 16px 48px -24px rgba(10,10,10,.55)`, dark `0 24px 64px -24px rgba(0,0,0,.8)`.

**Protection gradients vs capsules.** `.glass-scrim` is the stage-wide bottom-62% form. The capsule is
the guaranteed fill at density 2, taken stage-wide or not at all. `.glass-scrim-text` — the local box
behind a single text run — is **retired**, and it was the whole mechanism of the middle rung: opaque
boxes sitting on top of the very material they were protecting. With the two-state ladder there is
nothing for it to do, because at density 0 the media is calm and at density 2 the fill is already
opaque. It survives as a no-op class so existing markup does not break. Where a bar genuinely needs
local protection, `.glass-scroll-edge` obscures the media where it passes underneath rather than
boxing the text.

**Cards.** Radius 24, hairline border, one soft shadow, 24px padding, grid with 16px gaps, mono eyebrow
→ 24px title → 16px body → meta row with an optional spec chip.

**Animation.** Restrained and short: 180ms `cubic-bezier(.2,.6,.2,1)` on background/shadow, 120ms on
transform. Fades and alpha shifts only.

**Two motion registers, never blended.** *Ambient* motion lives in the media layer: 20–40s, infinite,
ease-in-out, GPU transforms only, no user input. *Interaction* motion lives on the surface: 120–180ms,
`cubic-bezier(.2,.6,.2,1)`, always a response to a user act. A surface never drifts; a backdrop never
snaps. `prefers-reduced-motion` freezes the ambient register to a static frame and shortens the
interaction register to 0ms — it never removes the color, only the movement.

**Hover.** Fill alpha +0.10 and a slightly brighter edge. Never a hue change, never a painted fill,
never a border-color jump to an accent (accent is ink only — never an edge).

**Press.** `translateY(1px) scale(0.994)`. No color change.

**Disabled.** `opacity: 0.45`, `cursor: not-allowed`, otherwise identical.

**Two atmospheres.** Light and dark are tuned independently, not inverted. Light mode is a daylight
room — thin fills, `saturate(1.45)`, `brightness(1.08)`, bright edges, shallow shadow. Dark mode is a
dim room — deep fills, `saturate(1.25)`, `brightness(0.82)`, faint edges, a long shadow.

---

## ICONOGRAPHY

**The chosen set is [Lucide](https://lucide.dev) (ISC), loaded from CDN.** No icon font, sprite or SVG
library was supplied, and nothing here is hand-drawn — Lucide is a substitution, flagged as such, but
a deliberate one: it is open source, widely adopted, actively maintained, and its 1.5px stroke on a
24px grid is the closest well-regarded match to this system's hairline edge.

```html
<script src="https://unpkg.com/lucide@0.454.0/dist/umd/lucide.min.js"></script>
<i data-lucide="arrow-up-right"></i>
<script>lucide.createIcons({ attrs: { 'stroke-width': 1.5 } })</script>
```

Rules: 16px in buttons and nav, 20px standalone, 24px only in modals; always `currentColor` so the
glyph borrows tone from the glass; outline only — never filled or duotone, which read as painted UI
and break the lens principle.

**Stroke scales inversely to size, not with it.** A glyph's optical mass must stay constant, so the
stroke gets *proportionally thinner* as the box grows: `1.5` at 16/20/24px (the system baseline,
matched to the hairline edge), `1.25` at 32px+, `1` at 48px+. Never `2` and never `2.5` — a heavy
stroke reads as painted UI sitting on the glass rather than tone passing through it. There is no
sub-16px icon tier; below that, use the mono spec label instead of a glyph. Glyph boxes sit inside 32/40px controls, keeping the 8px rhythm.

**Interior padding and containment.** Every component keeps a minimum of 8px between its content and
any border or container edge — icons, labels, buttons and chips included. A glyph or chip that sits
flush against an edge, or whose own outline merges with a parent outline, is a defect: nested elements
must read as contained, not coincident. Where controls nest (icon inside a button inside a bar), the
8px minimum applies at each level.

Text still does most of the work:

- Text labels do all the work ("Contact", "View project", "Later", "Send").
- Two unicode glyphs are used as typographic marks, not icons: `·` inside mono spec strings and `↳`
  to attach a reason to an override flag.
- No emoji, anywhere.

Specimen: `guidelines/icons/lucide.html`.

---

---

## IMPLEMENTATION TARGET

The system ships as CSS custom properties plus reference JSX; it is framework-agnostic by
construction. This section records how it is consumed in the intended stack (Next.js App Router,
React, TypeScript, Tailwind, Lucide, Sanity, Vercel) without the stack rewriting the system.

**Tokens are the source, utilities are the surface.** Glass values are never written as arbitrary
Tailwind alphas inline (`bg-white/40`, `blur-xl`). Map `tokens/*.css` into the Tailwind theme and use
the named utility — `backdropBlur: { card: 'calc(var(--glass-depth-card) * 1px)' }`, and the depth
tokens for the ladder. **The fill cannot be mapped**, and that is not an omission: it is composed at
the point of use from `--glass-fill-l`, `--glass-fill-c` and the stage's `--stage-tone-rgb`, because a
pre-assembled token would resolve the stage's tone against `:root`, find the achromatic fallback, and
paint every surface in the system the same colour (`tokens/glass.css`, the note at the hued fill).
Surfaces get their fill from `.glass`, never from a utility class. A hardcoded alpha in a `className`
is the patchwork failure at the code level: it cannot be governed by a stage and it cannot be retuned.

**Blur is per level, not one value.** `backdrop-blur-xl` everywhere flattens the hierarchy the system
encodes: button 10 / nav 18 / card and modal 72.

**Tone must be published, or `saturate()` must remain.** A fill plus a blur with nothing else is a grey
wash, not glass. Environment reaches the surface either as a published `--stage-tone-rgb` (preferred:
cheaper, truer, tierable) or as the `saturate()` fallback. A utility mapping that drops both has
removed the design system.

**Server / client split.** Most of the inventory is static markup and CSS and compiles to zero runtime
JS: `GlassSurface`, `GlassCard`, `GlassNav`, `GlassButton`, `SpecChip`, `BackdropStage`, and the
ambient backdrop (CSS keyframes, no canvas). Three need `'use client'` and it is isolated to them:
`GlassSegmented` (measures the active item to position the sliding thumb), `GlassSearch` (owns
open/closed and input state), `GlassModal` (focus trap and dismiss). Interactive state belongs to the
wrapper; the glyph inside stays a pure vector receiver.

**Ambient layer contract.** The media layer sits at `z-0`, `pointer-events-none`,
`aria-hidden="true"` (the attribute, not a class), inside `overflow: hidden`; content sits at `z-10`.
Motion is CSS keyframes on `transform`/`opacity` only. `will-change: transform` goes on the two or
three largest moving nodes, not on every one — past a handful it costs more than it buys. Blurred
circles are radially symmetric, so `rotate()` in a blob keyframe renders no visible change; animate
translate and scale, and vary phase with negative delays.

**Ambient hue is media, not palette.** Drifting orbs carry color — that is the point — but they stay
within one mood per stage (warm-ochre *or* cool-blue), not a tri-hue set. Three unrelated hues in one
field reads as a template gradient; it also makes the stage's worst-case contrast sample
unpredictable, which forces density up and costs the tone it was trying to add.

**Solid fills.** Banned as a default, required at density 2 and under
`prefers-reduced-transparency` — stage-wide, flagged, never as a per-surface convenience.

**Atomic Design mapping**, for consumers organizing that way: atoms = `Text`, `Stack`, `Icon`,
`VisuallyHidden`, `ContentPlane`, `GlassSurface`, `GlassButton`, `SpecChip`; molecules = `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `GlassCard`, `GlassSegmented`, `GlassSearch`; organisms = `GlassNav`,
`GlassModal`, CMS-bound grids; templates = the **stage** — `BackdropStage` / `LiveBackdrop` and the
ambient layer. Governance lives at template level, which is why tone, luma and density are published
there and inherited: no atom or molecule can see enough of the page to choose them.

**Text roles survive the stack.** Maximum-contrast text everywhere (`text-slate-900` /
`dark:text-slate-50` on every string) is not the same as passing AA, and it erases the muted tier the
type system depends on. Primary text takes the strong role; secondary and mono spec labels take the
muted role; both are measured against the worst-case sample for the stage's media.

---

## Index

Root
- `styles.css` — the entry point consumers link; `@import` list only.
- `readme.md` — this file. `SKILL.md` — Agent Skills wrapper. `thumbnail.html` — homepage tile.

Tokens (`tokens/`)
- `fonts.css` (webfont loading + substitution note) · `typography.css` · `colors.css` (neutral ramp +
  per-mode semantics) · `space.css` (spacing, radii, control heights, column grid) · `glass.css` (**the glass recipe**: the three-layer
  contract — depth, derived alpha, tone wash, density states, edges, shadows, guaranteed fill, scrims,
  tiers, interaction) · `backdrops.css` (four media stand-ins, each publishing tone + default density) · `ambient.css` (server-safe CSS-keyframe orb layer) ·
  `base.css` (body, links, headings, `.mono`).
- `tokens/tailwind-theme.js` — build-time map so consumers extend from tokens, never arbitrary alphas.

Components (`components/primitives/`) — the atom layer:
- **Text** — every piece of type. Authors name a *role*, never a size; enforces the plane rules (muted refused on glass, 12px promoted to semibold) using the plane it inherits from `GlassSurface`.
- **Stack** — flex layout on the 8px unit. `gap` and `padding` take a unit *multiplier*, not a length, so a layout cannot drift off the grid; illegal values warn and round.
- **Icon** — sized on the unit, inherits `currentColor`. Two accessibility states only: named image with `label`, or hidden decoration without. Ships the `Icons` glyph set the status rules require.
- **VisuallyHidden** — screen-reader-only text via clip-rect, so nobody reaches for `display:none` and drops the node from the accessibility tree.
- **ContentPlane** — the opaque content plane: prose, the muted tier and data. It sits on the stage **beside** glass, never inside it — an opaque box on top of the material is the retired density-1 scrim, and the component warns if it mounts inside `.glass` (harness check `7 nesting`). Carries both halves of the plane: the `.glass-content` recipe *and* the plane context `Text` reads.

Components (`components/forms/`) — the atom layer for input. Each reads the shadcn variable slots, so a real Radix/shadcn component dropped into a consuming project inherits this appearance with no edits:
- **Field** — owns the label, description, error, and the id / `aria-describedby` / `aria-invalid` wiring. Controls never own their own label, which is what makes a missing one impossible rather than discouraged. Errors render with a mandatory icon.
- **Input** — single-line text. Dual-tone focus ring, so focus stays visible on any surface.
- **Textarea** — multi-line, same chrome and focus contract.
- **Select** — the *native* element, styled. Keyboard behaviour, mobile pickers and screen-reader semantics come free; a rich listbox is Radix Select's job.
- **Checkbox** — 20px visual box, 44px hit area via label padding. Checked state is carried by the check glyph, not fill colour, so it survives grayscale.
- **Switch** — reports state that takes effect immediately (vs Checkbox's submit-time value). On state is carried by thumb position as well as track fill.

Components (`components/surfaces/`):
- **GlassSurface** — base frosted surface; owns depth, derived alpha, guaranteed fill, scrim.
- **GlassCard** — portfolio content card on glass.
- **GlassNav** — floating nav bar, thinnest blur.
- **GlassButton** — pill affordance, two sizes.
- **GlassModal** — takeover overlay, heaviest blur, over a neutral scrim.
- **SpecChip** — mono annotation chip: blur / alpha / override flag.
- **GlassSegmented** — segmented control whose active thumb is glass that *slides*, never fades.
- **GlassSearch** — search field that grows from a 40px circle into a pill; one surface, two shapes.
- **BackdropStage** — static media stage that glass sits on; four moods, sets the UI-mode scope.

Components (`components/motion/`)
- **LiveBackdrop** — animated canvas media: `orbs`, `net`, `entropy`, `drift`. Same four moods and the same
  children slot as `BackdropStage`, so it drops in wherever a static stage was. Pauses off-screen,
  renders one still frame under `prefers-reduced-motion`.

*Intentional additions:* `SpecChip` and `BackdropStage` are not product UI — they exist so the system
can document and stage itself. `GlassSurface` is the shared base the other three surfaces compose.

UI kits — **instruments** (card group *Glass Lab*). These stay useful after every decision is made,
because each one measures rather than proposes.
- `ui_kits/conformance/` — the 15 runtime checks. `checks.js` is the portable half; see **Building with
  this** for the four-step port.
- `ui_kits/glass-lab/blur-budget.html` — the frame-cost instrument: card count × depth over moving
  media, with a ceiling ramp and the lite tier as the control. Infers the display's own budget rather
  than assuming 60Hz, repeats every step and reports the spread, verifies every pane is actually
  presented before trusting a row, and voids the ones that are not.
- `ui_kits/glass-lab/density.html` — the two published states plus the lite tier on one media field:
  the whole legibility model in one sheet.
- `ui_kits/glass-lab/index.html` — **the deliverable**: 4 moods × 4 surfaces × 2 modes with per-cell
  blur/alpha specs and override flags, plus two composed atmosphere panels. `README.md`, `data.js`,
  `Matrix.jsx`, `Atmosphere.jsx`.
- `ui_kits/choreography-lab/` — scrollable, and it *is* the motion spec: media lags, glass is pinned,
  surfaces enter once in DOM order.

UI kits — **closed explorations** (card group of the same name). Every one of these is decided. They
ship as the evidence behind a rule, so a settled question is not re-opened from scratch — not as
guidance, and not as anything to build from.
- `ui_kits/glass-lab/ab-radius.html` — 24 vs 32 at depth 72, in three card sizes. **Closed at 24**,
  and the finding was not which corner looked better: it was that radius should not be derived from
  blur at all. Landed as `--radius-parent: 24` and the card recipe in **VISUAL FOUNDATIONS**.
- `ui_kits/glass-lab/ab-fill.html` — five pairs, one variable each, dialing the guaranteed fill.
  **Closed**: frame-average hue, committed chroma, lightness spent on legibility. Landed in
  `tokens/glass.css` and `guidelines/colors/override-fills.html`.
- `ui_kits/glass-lab/tone-commitment.html` — four candidate density-2 fills, hue adopted from the
  stage at pinned lightness, with measured contrast per candidate. **Closed**; same landing.
- `ui_kits/glass-lab/refinements.html` — round 3: specular edges, φ ladder, four backdrop effects,
  the two moving controls. **Closed** — a historical round, kept because it is where the edge recipe
  came from.
- `ui_kits/primary-lab/` — six candidate identity hues as solid fills on real glass over warm and
  cool stages, and as focus rings. **Closed**; landed in `tokens/brand.css`.
- `ui_kits/accent-lab/` — the accent playground: five placements (none / text / edges / text+edges /
  tinted fill) × four candidate accents × three backdrop effects × both modes. **Closed**; the
  decision lives in `guidelines/colors/accent-on-glass.html` and in **Accent, decided** below.
- `ui_kits/refraction-lab/` — edge displacement at three strengths against a specular-only control,
  with the honest verdict on whether it reads. **Closed**; landed as `L2-refraction-additive` and
  `L2-no-rim-layer`.

Templates (`templates/`) — start here rather than from a blank file; each one inherits the plane
split, the emphasis ladder and the atom contract structurally, which is what makes it cheaper to
follow the system than to improvise around it.
- `glass-hero/GlassHero.dc.html` — portfolio hero: floating nav, two cards, cool/dark media.
- `app-shell/AppShell.dc.html` — dashboard shell. Glass nav and toolbar as chrome, a `ContentPlane` for prose, metrics and the table. The reference for the functional/content split.
- `settings-panel/SettingsPanel.dc.html` — form. Every control wrapped in `Field`, one legality rule (density 0 over light media) surfaced as a field error rather than a console warning.
- `live-stage/LiveStage.dc.html` — `LiveBackdrop` under glass: motion controls as chrome, status reported as icon plus text so it survives grayscale, and reduced-motion reported rather than assumed.

In all four, glass and the content plane are **siblings on the stage**. The plane split is
horizontal: nothing opaque is ever nested inside a frosted surface.

Specimen cards (`guidelines/`)
- `colors/` — neutral ramp, text roles in both modes, accessibility fill overrides.
- `glass/` — four depth levels, tone inheritance, edges & shadow, scrim vs guaranteed fill, hover &
  press, backdrop moods, live backdrops, specular edge.
- `type/` also carries the φ modular scale specimen.
- `type/` — display, body & lead, mono specs. `spacing/` — spacing scale, corner radii, control
  heights, column grid. `icons/` — Lucide specimen.

## Changelog

Moved to `decisions.md` — the full v0.2 / v0.1 record, and the post-mortem behind every rule here.
Split out because it was 40% of this file and none of it is needed to build: an agent that reads the
readme on every turn was paying for the history on every turn. Read `decisions.md` when you want to
*change* a rule, not to follow one.

## Accent, decided

Hue reaches a glass surface as **ink, in two doses**, and never touches the fill or the edge.

**Concentrated.** `tone="brand"` — one solid accent fill, on the single primary action. Already the
Airbnb pattern in `tokens/brand.css`: the neutral solid primary and the branded primary are siblings,
so `emphasis="primary"` is unchanged.

**Dilute.** `--glass-accent-ink` (class `.glass-accent`) — accent type on labels that respond or
report. Not the raw brand hex: the lab's warm-media column showed a mid-lightness accent losing the
contrast the neutral roles guarantee, so the ink mixes the brand hue 60% toward whatever text role
the stage published. Lightness follows the media, only chroma is identity — the same derivation
`--glass-text` gets, with the same opaque-path counterpart for density 2, fill overrides and reduced
transparency. Undefined brand collapses it to the published role exactly — the mix becomes
role-with-role — so an unbranded system stays achromatic rather than grey-tinted.
`prefers-contrast: more` drops the hue outright. The fallback expression is repeated inside every
scope that declares the ink rather than captured in an intermediate token: `var()` substitutes where
a property is *declared*, so a captured chain freezes at `:root` and no brand defined further down
can ever reach it — `T-scope-parity` in another costume, and it cost us a pass.

**Refused: tinted fill.** The fill is the material. Mixed with hue at any percentage the surface
stops sampling the media, and Layer 2 has made a decision it is not allowed to make.

**Refused: edge hue.** Recolouring the specular stack replaces the four-layer edge recipe
(`L2-specular`) and reads as a lighting defect. An edge neither responds nor reports, so it fails
`F-hue` on its own terms.

Enforced as `L2-accent-ink` and `L2-accent-derived` in `guidelines/rules.js`.

## Refraction

Opt-in edge distortion: `refract="subtle"` on a glass surface displaces the backdrop near the
boundary, so the rim reads as thickness rather than as a printed line. `ui_kits/refraction-lab/`
puts the three strengths against a specular-only control.

**It is one primitive in the surface's own `backdrop-filter` chain, not a rim layer.** The convincing
demos inset a child at reduced blur and displace that — a blurred surface inside a blurred surface,
which `L2-budget` forbids for exactly the reason it exists. Pseudo-elements are no escape either:
`.glass-scroll-edge` already owns `::before` and `::after`, and a nav is routinely both.

**The map.** `feDisplacementMap` samples `channel − 0.5`, so mid-grey is zero shift. Two stretched
`feImage` ramps supply the axes — horizontal into R, vertical into G — both neutral across the middle
68%, so the displacement exists only near the edges by construction rather than by masking. Strength
is three baked presets (8 / 20 / 40px) because `scale` is an SVG attribute and SVG attributes cannot
read custom properties; a `var()`-driven strength would silently do nothing.

**The honest limitation.** `url()` runs last in the chain, after `blur()`. Displacing first and
blurring after washes the distortion out entirely, so the thing that warps is the already-blurred
field — legible over hard-edged media like `net`, close to invisible over soft or busy media. And
filter references on a backdrop are unevenly implemented with no way to probe whether a browser
actually applied one, so the gate is parse-level (`CSS.supports`) and publishes
`data-refraction="on"|"off"` on `<html>`.

Which is why it ships as garnish: dropped at density 2, under fill overrides, and under reduced
transparency, increased contrast or reduced motion. If it never renders for a user, nothing about the
design changes. Enforced as `L2-refraction-additive` and `L2-no-rim-layer`.

## Choreography

Two moves, one controller, and a list of things that refuse to move.
`<Choreography>` wraps a page or a long section and reads two author marks:
`data-reveal` on surfaces that should enter, `data-parallax` on stages whose media should lag.
`ui_kits/choreography-lab/` is scrollable — it is the spec.

**Load reveal.** 120ms hold, 60ms step, 380ms travel, translate + opacity on the system's one curve.
The stagger is assigned **per sibling group** and capped at six: a page-wide index makes the fourth
section's cards enter 900ms after they are already on screen. The stage fades without rising — Layer 1
is the room, and a room does not arrive from somewhere.

**Only Layer 1 parallaxes.** This is the move that belongs to this system rather than to websites in
general. Glass has no appearance of its own; it samples what passes beneath. So the effect is the
media sliding under stationary glass — borrowed tone shifts, the specular edge catches different
light, refraction has something to bend. Parallax the glass too and the relative motion cancels: same
cost, nothing shown. Total travel is 48px, deliberately small, because the point is the tone change
and not the sensation of scrolling.

The two Layer 1 publishers needed different media layers. LiveBackdrop has a real canvas child, so
the canvas takes the translate. BackdropStage paints `background-image` on the stage element itself,
where translating would drag the glass with it — so its media becomes a pseudo-element inflated by the
travel distance top and bottom. That was the one place the spec needed a mechanism rather than a token.

**What refuses to move.** No animated blur or `backdrop-filter`, and no scale on a blurred surface —
scale looks like a transform and behaves like a filter change. Density never animates: the fill goes
opaque in one step, so any crossing pops; `.glass-scroll-edge` exists because its gradient is the part
of the protection story that *can* be a continuous function of scroll.

**Fails safe.** The hiding CSS is scoped to `data-choreography="on"`, which the controller sets after
first paint. The subtle failure is not a missing script — it is the script *running*, hiding
everything, and the observer never firing: `IntersectionObserver` with an implicit root reports
`rootBounds: null` in some embeddings. So the first reveal pass is a `getBoundingClientRect` check
that owes nothing to an observer, a null `rootBounds` reveals everything, and a backstop timer
withdraws the flag if nothing has revealed within a second. Enforced as `M-layer1-only`,
`M-fail-safe`, `M-no-density-animation` and the tightened `F-motion`.

## What 1.0 requires

v0.2 is **self-consistent**: 15 runtime checks pass, every declared rule is measured or explicitly
marked a judgement call, and the documents resolve against the code. None of that is evidence of
stability, because the system has never been used to build anything outside this repo. 1.0 is the
first release that asks someone to build against it, so the gate is contact with a real project, not
another internal pass.

**Four things project one has to prove.**

1. **The harness ports.** The four-step contract in **Building with this** was written without being
   executed once. Run it on project one; a design system that can only be verified inside its own
   repo is a style guide. This is the highest-value item on this list because it is the only written
   contract here with zero evidence behind it.
2. **Real photography survives the media contract.** All eight stills in `assets/media/` are specimen
   imagery. The density model exists to react to photographs it did not choose, and it has never seen
   one.
3. **The logo goes in the slot.** Brand is a slot (`guidelines/brand/slot.html`) and nothing has ever
   been put in it.
4. **The plane split holds under content nobody designed for.** Glass carries chrome, the content
   plane carries prose and data. That boundary is clean in four templates written by the same author
   as the rule; real content is what bends it.

Plus the two items below, which are genuinely open rather than merely untested.

### Still open
1. Real font binaries, if the brand ever gets bespoke ones.
2. **The 3–4 concurrent-surface cap is the one load-bearing number here that is reasoned rather than
   measured, and it is staying that way for now.** A desktop puts the ceiling somewhere between 32
   and past 64 depending on the run, which is the wrong hardware rather than a conservative reading
   of it, and no proxy available to us is closer: throttling a fast GPU produces a number with no
   provenance, which is worse than a labelled guess. So this is **declared, not deferred** — every
   place the cap appears says it was reasoned, and `data-glass-tier="lite"` is the mitigation that
   makes being wrong survivable rather than the thing that depends on being right.

   The instrument is built and waiting: run `ui_kits/glass-lab/blur-budget.html` on a real mid-range
   phone and it either confirms the cap or raises it, three runs per step with the median and range.
   Until someone does, the number does not move — replacing an unmeasured guess with an unrepeatable
   measurement is not an improvement, and one fast machine is not the device the number is about.

### Harness backlog — not 1.0 gates

These are refinements to the conformance harness, not conditions on the system. Recorded so they are
not rediscovered, and deliberately not treated as blockers: the system is shippable with check 12
seeing what it currently sees.

1. **`D-measure` is the last rule that could plausibly be mechanised** — a card should read computed
   values off the DOM rather than assert them in prose. Check 12 now resolves the names a card
   *quotes*; what it still cannot judge is a caption that states a computed number in plain words.
   `--glass-fill-l` in a `<code>` is checkable; "measuring 4.8:1" in a sentence is not, and turning
   that into arithmetic means deciding which numbers in a caption are claims about the render.
2. **Prose assembled inside a script string is check 12's blind spot, and reading rendered text is the
   only way in.** Several labs build their captions in JS template literals, where nothing in the
   source separates the sentence from the code around it. This is not merely harder than a source-text
   scan — it rules one out. Check 12 fetches cards, and the served HTML carries the host's injected
   transpiler, so *any* source-text scan of card HTML is scanning tooling that is not part of this
   system. That is how the backtick experiment failed, and the same trap waits for the next person who
   reaches for a regex here. Running the card and reading its rendered DOM is the only approach that
   sees the card's own prose and nothing else.
