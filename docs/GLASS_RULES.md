# Project rules

## Glass — local fork of Frostwork v0.3

**Blur wins wherever AA holds.** Density 2 (opaque fill, no filter) is the *last*
resort, taken only when a measurement shows AA cannot be met with the filter on — never
as a response to uncertainty, and never as a response to a thin margin.

The fork lives in `_ds_fork/frostwork-blur-first.css`, loaded after the design system's
own stylesheets. Read that file before changing anything here; the derivations are
written into it.

### What the fork found

The shipped system is **v0.3**, and v0.3 already did most of this. Blur and alpha are
decoupled, alpha is a single solved `.50` in both modes, the depth ladder is gone, and
`tokens/glass.css` resolves `[data-density="0"]` and `[data-density="2"]` to identical
values. An earlier version of this file warned against "restoring the derived .23/.31
alpha" — that warning described v0.2. There is no derived alpha left to restore, and
`.50` is now the system's own value, not a local deviation.

### What the fork actually changes

1. **It finishes the density retirement.** The CSS retired density; the JS did not.
   `media-registry.js` still ships v0.2's table with `density: "2"` verdicts and still
   publishes density 2 for any unregistered image — which is every image a CMS will
   hand it. That verdict no longer changes thickness, but it *does* still swap the ink
   roles to the opaque-path overrides, which were solved against a fill that isn't
   there. The fork re-points those roles at chrome, and leaves the override in place
   for the two genuinely opaque paths.

2. **It adds the scrim**, because a CMS cannot run the measurement the contract
   assumes. v0.3 replaced the per-image registry with a one-sided contract: light
   chrome is unconstrained, dark chrome needs a background below ~.18 relative
   luminance. A scrim holds the dark side without inspecting the photograph.
   `--scrim: .62` is derived, not judged — a black scrim at alpha *a* over pure white
   must land under .18, which requires *a* ≥ .5386; .62 lands at .119, with headroom.
   Full-height bottom-up ramp, solid across the pane band. Per-still override via the
   `--scrim` property, worst case as the default.

3. **It bounds the media on artifact cards.** Ink is never set over a photograph.
   Media bleeds to the card's left, right and top edges and stops at the text band;
   the band is the card's own glass, reading the site backdrop rather than the still.
   That converts legibility from a property of the *image* — reopened by every new
   still, and only ever bounded by the scrim — into a property of the *mode*, which
   the site owns. The dark-still-under-light-chrome case cannot arise, because the
   still is under no ink. Hero and rail card are one composition at two sizes.

   Codified in `_ds_fork/frostwork-blur-first.css` § 3 (the geometry),
   `_ds_fork/frostwork-rules-addendum.js` (the rule as data, and check 16, which
   measures on the rendered page that no text rect intersects the media row). The
   scrim is not retired by it: the site's own backdrop stage still carries text over
   media, and `.62` still governs it. What shrank is the number of surfaces the
   derivation has to hold for — five to one.

### Standing rules

- **A structural guarantee beats a measured one** wherever the structure is available.
  Bounding the media is cheaper and stronger than measuring the still under the ink.
  Where the structure is *not* available — the backdrop stage — measure and scrim.
- **Measure against the composite**, meaning the fill over the media as blurred by the
  pane's own radius — not the raw image — and use the worst local window, not the
  average. Record the number.
- **AAA is never a reason to escalate**, and neither is a thin margin. 4.66:1 is a pass.
- **Chrome mode is the first lever.** Flipping a bright still to light chrome flips the
  ink roles and recovers more contrast than thickening the pane, at no cost in
  transmission.
- **The opaque escapes stay.** `prefers-reduced-transparency`, `prefers-contrast`, and
  an authored `data-glass-fill` are a user or an author asking for the guaranteed
  state. The fork is about the system not giving up on their behalf — not about
  refusing them when they ask.
- **Contrast arithmetic does not model stroke thinning.** Type below ~12px over a
  moving field wants review by eye even when the ratio passes.

### Unchanged

AA is the floor and is non-negotiable. Never nest blur. The stage owns the facts and
publishes them once; surfaces decide nothing. Worst case governs the stage.
