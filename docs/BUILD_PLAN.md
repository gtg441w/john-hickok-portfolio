# Build plan

Order matters more than the list does. The two changes from the obvious ordering:
**content is written before screens are built**, and **deploy happens on day one while
it is trivial** rather than at the end when it is load-bearing.

---

## Gate 0 — decide these before any code

**Settled at handoff:** Next.js App Router, plain CSS (the fork ported intact as a
global stylesheet), Zod for content validation, Playwright for the conformance check.
See `COMPONENT_INVENTORY.md`, `content.schema.ts`, `conformance.spec.ts`.

Two open questions remain. Each one changes what gets built, so neither should be
discovered mid-build.

**Permission to publish.** Client work, NDAs, unreleased product stills. This
determines which projects can be in the collection at all, and whether a given project
can carry real screenshots or needs abstracted artifacts. Settle it first — it is the
only item here that can invalidate finished work. The schema's `published` flag is
where the per-project answer lands.

**The generative backdrop (VANTA).** Still open, and **no longer blocking.** The
homepage backdrop is specced as a slot with a static default, so the build proceeds and
the decision can be made against a working page.

Recommendation: **ship v1 without it.** A photographic or CSS-gradient stage costs
nothing, and the glass reads as glass either way. Add it later behind
`prefers-reduced-motion` and a measured frame budget, as an enhancement to a page that
already works. If it ships in v1, it needs the blur-budget rig run on real hardware
before the layout depends on it.

**Resolved: contrast strategy.** This was the third Gate 0 item, and the bounded-media
rule closed it. Ink is no longer set over any artifact still, so nothing on a card
needs measuring — contrast there is a property of the mode. The one remaining surface
that sets text over media is the homepage backdrop stage, and `--scrim: .62` holds it
by derivation. Scrim-only is now the whole strategy rather than a v1 compromise. Build
the compositing check only if a specific still is visibly spoiled by the blunt default.

---

## 1. Repo, skeleton, live URL

Create the repo. Stand up Next.js (App Router) with one real route and deploy it the
same day.

Import `_ds_fork/frostwork-blur-first.css` once in the root layout as a global
stylesheet, and add the blocking inline theme script to `<head>` at the same time — see
`COMPONENT_INVENTORY.md`. Both are cheaper to do now than to retrofit.

Copy in `CLAUDE.md` from this handoff at the same time, so the glass contract is in
context from the first turn and never gets re-litigated.

**Done when:** an empty page is live at a real URL from a push to main.

## 1a. Wire the conformance check before the first card exists

`conformance.spec.ts` in CI, failing the build. Standing it up against zero cards takes
minutes and the test that asserts a route rendered no cards will tell you it is wired.
Standing it up after five screens means triaging five screens at once.

**Done when:** a deliberately broken card — a span inside `[data-artifact-media]` —
fails the build, and removing it passes.

## 2. Domain and DNS

Point the domain now, while there is nothing to break. Deploy stops being a scary
late-stage step and becomes something that has worked a hundred times.

## 3. Write the content — all of it, before building screens

The only item on the list that gets him hired.

Write all six case studies as plain text, outside the code. Real copy changes layout:
line lengths, how many framework cards, whether a project needs three stills or six. A
site built against brackets and filled in afterwards always needs a second layout pass.

Per project: the framing line, the problem, the role and what was actually owned, the
decisions and their reasoning, the outcome, and the 3–6 stills worth showing. The
reasoning is the differentiator — outcomes are claimed by everyone.

**Done when:** every bracketed hole in the design files has real text sitting next to
it, and the image list per project is decided.

## 4. Port the glass, prove it on one real still

Bring in `_ds_fork/frostwork-blur-first.css` and build exactly one **backdrop stage**:
a real project still, dark chrome, the scrim, one pane over it. Measure the composite
at the worst local window. Record the number in the still's `measuredRatio` field.

The stage is the only surface left that needs this. Artifact cards bound their media,
so they are proven by check 16 rather than by measurement.

Do this before building five screens on an assumption. If the scrim-only strategy is
going to fail, it fails here, cheaply.

**Done when:** one real photograph, one real pane, one recorded ratio ≥ 4.5:1.

## 5. Build the screens

Against real content and proven glass. Homepage, collection, artifact reading view,
galleries, Experience, Connect.

Connect is the hybrid: segmented selector (Client / Recruiter / Colleague), a real form
for clients, pre-filled `mailto:` for the other two. One email constant, six usages.

## 6. Performance and devices

- Real mid-tier Android, not devtools throttling. `backdrop-filter` cost scales with
  area × radius, and the card panes are the heaviest surfaces in the system.
- Safari specifically — it diverges most on `backdrop-filter`.
- Image pipeline: AVIF/WebP, `srcset`, intrinsic dimensions on every image.
- The three preference queries, each verified by actually toggling it.
- Keyboard nav end to end; visible focus on glass.

## 7. Ship

- OG and share metadata with a real card image. A portfolio gets pasted into Slack and
  DMs; the unfurl is often the first thing a hiring manager sees.
- Resume PDF as a real download, in sync with the Experience screen.
- Analytics after launch, not before. Something privacy-respecting; page views and
  referrers answer every question worth asking here.

---

## What is deliberately not on this list

**A headless CMS.** One author, six projects. Git is the CMS — markdown with the Zod
schema in `content.schema.ts`. Revisit only if someone non-technical will edit, or if
writing starts publishing weekly.

**A component library beyond what the design system gives.** The glass system is the
component library. Adding a second one is how the contract gets refactored away.
