# Patches to the vendored design system

`styles/_ds/` and `styles/_ds_fork/` are copied verbatim out of the handoff. Anything
this file does not list is untouched, and **re-exporting the design system silently
drops every patch listed here** — re-apply them, or the build breaks again the same way.

Nothing here is allowed to change glass semantics. A patch that would is not a patch;
it is a fork, and it belongs in `_ds_fork/` with its reasoning written down.

---

## 0. `app/globals.css` — mood paint overridden for the generative stage

**No vendored file edited.** An app-level rule overrides the mood class's paint for
one stage, selected by `[data-stage-generative]`.

`.backdrop--cool` paints a fixed dark-navy gradient in both chrome modes, which is
correct for a mood standing in for a photograph — a dark still may legitimately
appear in light chrome and keeps its dark luma. The site backdrop is not a still: it
is a canvas (`components/backdrop/BackdropSlot.tsx`) repainted per chrome mode, which
then publishes the `--stage-tone-rgb` and `data-stage-luma` it actually painted. Its
pre-canvas fallback has to follow the mode for the same reason.

Left alone, light chrome paints `#141414` ink over the dark-navy gradient for the
frames before the canvas mounts — the mode flash the blocking script in `lib/theme.ts`
exists to prevent, arriving by another door.

Only the fallback colour moves. Tone, luma and every glass derivation are untouched,
and the rule is scoped to the one stage that carries the attribute — no mood class
changes meaning for any other caller.

---

## 1. `_ds/…/tokens/glass.css` — stray `}` at line 505

**Deleted one closing brace. Nothing else. Zero semantic change.**

Line 505 was a third `}` after the two that legitimately close the `@supports
(color:oklch(from red 50% .1 h))` block and the `@media (prefers-contrast:more)` block
above it. Balance-checking the file confirms it was the only unbalanced brace in the
whole system — every other stylesheet in `_ds/` and `_ds_fork/` is clean.

Browsers discard a stray top-level `}` under CSS error recovery, so the prototype
renders correctly and the bug is invisible there. Turbopack's CSS parser is strict and
fails the build with `Invalid empty selector`.

It follows that no declaration was ever inside that brace and nothing was ever scoped by
it, which is what makes deleting it safe: the bytes the browser was already ignoring are
the bytes now gone. The `prefers-contrast:more` block — an escape the glass contract says
must never be refused — is unaffected; it closes on line 504 and did before.

This is a defect in the shipped export, worth reporting upstream so it stops recurring.

---

## Known gaps in the handoff (not patched — flagged)

### Missing font licenses

`_ds/…/tokens/fonts.css` states: *"Licenses: both families are SIL OFL 1.1. Full text
ships beside the binaries in `assets/fonts/*-OFL.txt` — self-hosting is covered; keep
those files with the fonts."*

Those files are **not in the handoff.** Only the three `.ttf` binaries shipped.

SIL OFL 1.1 requires the license text to accompany the font files when they are
redistributed, and self-hosting on a public site is redistribution. The fix is small —
drop `OFL.txt` from the Outfit and Open Sans upstream repos into `assets/fonts/` — but
it is a real obligation, not housekeeping, and it should be closed before launch
(`BUILD_PLAN` step 7) rather than after.
