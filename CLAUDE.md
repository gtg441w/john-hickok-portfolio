# Project rules

Copy this file to the **root of the site repo**. Claude Code reads it on every turn.
It is the short form; `README.md` and `GLASS_RULES.md` in the handoff are the long form.

## What this is

A personal portfolio and practice site for John Hickok, UX leader. Homepage, project
and framework collection, long-form artifact reading, a hybrid Connect form, an
Experience (resume) screen, per-project galleries. The organising metaphor is a
**museum**: artifacts live in a collection, are viewed individually, and relate across
categories rather than sitting in folders.

The visual system is glass: translucent blurred panes over photographic and generative
media, governed by a measured legibility contract rather than by taste.

## Stack

Next.js (App Router) · plain CSS · Zod · Playwright. Settled at handoff; not open.

- **The fork is a global stylesheet**, imported once in the root layout. Do not port it
  into CSS-in-JS, CSS modules or Tailwind — it is a cascade of derived custom
  properties and attribute selectors, and reimplementing it is how the derivations get
  lost. Plain CSS keeps them intact.
- **Minimal client islands.** Pages are server components. Only `ThemeToggle`,
  `SlideOverPanel`, `SearchModal`, `ConnectForm`, `Walkthrough` (the guided tour an
  artifact with `layout: walkthrough` renders) and an animated backdrop (if one ever
  lands) are client components. The prototype looks like one stateful app because it is
  one file, not because that is the design.
- **Theme needs a blocking inline script in `<head>`** setting `data-theme` before
  first paint. `theme` has three states — `null` (follow the OS), `'dark'`, `'light'` —
  and collapsing `null` into a default silently breaks system-preference following.
- **Content is markdown validated by `content.schema.ts`** at build time.
- **`conformance.spec.ts` runs in CI and fails the build.** Not report-only: AA is
  non-negotiable, and a report-only check on a non-negotiable floor is a rule enforced
  by nobody.

`COMPONENT_INVENTORY.md` has the full mapping, props and routes.

## The glass contract — the thing most likely to be broken by a well-meaning refactor

> **Blur wins wherever AA holds.** An opaque fill is the *last* resort, taken only when
> a measurement shows AA cannot be met with the filter on — never as a response to
> uncertainty, and never as a response to a thin margin.

- `_ds_fork/frostwork-blur-first.css` is **the amendment itself**, not a reference.
  Its derivations must survive the port intact. Read it before touching any glass
  surface.
- **AA (4.5:1, or 3:1 at 20px+ semibold) is the floor and is non-negotiable.** AAA is
  never a reason to escalate. 4.66:1 is a pass.
- **Never nest blur.** `.glass .glass` drops its filter, by design.
- **The stage owns the facts and publishes them once. Surfaces decide nothing.**
  Worst case governs the stage.
- **Chrome mode is the first lever.** A bright still flipped to light chrome recovers
  more contrast than thickening the pane, at no cost in transmission.
- **Media is bounded on artifact cards — no ink over a photograph, ever.** The media
  bleeds to the card's left, right and top edges and stops at the text band; the band
  declares no fill and no filter, so it is the card's own glass reading the site
  backdrop. Legibility is therefore a property of the **mode**, not of the image, and a
  dark still under light chrome cannot break it. Hero and rail card are one composition
  at two sizes (`[data-artifact-card]`, `[data-artifact-size="sm"]`). Codified in
  `_ds_fork/frostwork-blur-first.css` § 3 and enforced by check 16 in
  `_ds_fork/frostwork-rules-addendum.js` — port both, and run the check.
- **A structural guarantee beats a measured one** wherever the structure is available.
  Where it is not — the backdrop stage, the one surface that still sets text over media
  — measure and scrim.
- **An artifact card is not a stage.** It publishes no tone and takes no scrim. Only the
  site backdrop is a stage.
- **The scrim holds the dark-chrome contract.** `--scrim: .62`, derived: a black scrim
  at alpha *a* over pure white must land under .18 relative luminance, requiring
  *a* ≥ .5386. Full-height bottom-up ramp, solid across the bottom 38.2%. Applies to
  the backdrop stage only. Per-still
  override via the `--scrim` property; worst case is the default.
- **The opaque escapes stay.** `prefers-reduced-transparency`, `prefers-contrast`, and
  an authored `data-glass-fill` are a user or an author asking for the guaranteed
  state. Never refuse them.
- **Measure against the composite** — the fill over the media as blurred by the pane's
  own radius, not the raw image — and use the worst local window, not the average.
  Record the number.
- Contrast arithmetic does not model stroke thinning. Type below ~12px over a moving
  field wants review by eye even when the ratio passes.

## Content

- **Content lives in the repo**, not in a hosted CMS. Markdown/MDX with a typed,
  validated frontmatter schema. One author, a handful of projects; a headless CMS
  would add an API and a second place for content to rot.
- Per-still `--scrim` is a frontmatter field on the image, not a magic number in a
  component.
- Bracketed text in the design files (`[Framing line — …]`) is a hole for real copy.
  **Never invent copy to fill it** — leave the hole and ask.
- Galleries hold 3–6 curated stills per project. Completeness is not a goal.
- Email is `johnhickok21@gmail.com`. It appears in six places; keep them in sync from
  one constant.

## Imagery

Everything in `media/` is a stand-in and ships with the handoff for reference only.
The calibration stills stress-test the glass contract; the `artifact-*` screenshots are
placeholders. **Nothing about their subject, crop, palette, or aspect ratio is a
decision.** Do not infer layout intent from them. Real stills replace all of it.

## Fidelity of the design files

They are HTML prototypes, not production code. **Recreate** them in this codebase's
idiom; do not paste them in.

- High fidelity: every number in the glass layer; layout, type scale, the 8px spacing
  unit, the 38.2% scrim band, animation durations and easings.
- Low fidelity: copy and imagery.
- Zero fidelity: the artifact screenshots.

## Standing engineering rules

- Ship images as AVIF/WebP with `srcset` and intrinsic dimensions. Layout shift on a
  glass pane is especially ugly — the blur re-resolves.
- Wire the preference queries for real and verify them: `prefers-reduced-transparency`,
  `prefers-contrast`, `prefers-reduced-motion`.
- Keyboard nav and a visible focus ring on glass are part of the contract, not polish.
- Test `backdrop-filter` in Safari specifically; it diverges there more than anywhere.
- Perf budget is measured on a real mid-tier Android, not on desktop devtools
  throttling. `backdrop-filter` cost scales with area × radius.

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `gtg441w/john-hickok-portfolio`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
