---
title: "Building a site with an AI that was confidently wrong"
slug: practice-record
kind: practice-record
status: in-progress
opened: 2026-09
updated: 2026-09-14
summary: >-
  A running record of what the machine proposed, what I refused, and what the
  refusal turned up. Kept during the build, not reconstructed after it.
eyebrow:
  - Practice record
  - In progress
  - Opened September 2026
hero:
  still: plain-pour
  chrome: dark
  scrim: 0.62
---

> **This is not the case study.** It is the primary source the case study will be
> written from. It is dated, unpolished, and organised by incident rather than by
> argument. Entries are added as the build proceeds; nothing here is tidied up
> afterwards, because the tidying is what would destroy its value.

## Why keep this at all

The interesting question about AI-assisted design work is not whether someone used
AI. It is whether they were in a position to notice when the output was wrong.

That is not visible in a finished artifact. A site built by someone who interrogated
every claim and a site built by someone who accepted the first answer can look
identical — and the second one is usually faster. The difference only exists in the
record of what was rejected.

So the record is the deliverable. Each entry below follows the same shape: what was
proposed, what made me push, what the push turned up, and what it cost. Some entries
are cases where I was right. Some are cases where I was wrong. Both are load-bearing
— a log where the human is always right is a log nobody should believe.

One structural note about this particular project, because it shapes everything: the
design system carries a *measured* legibility contract. Contrast ratios, fill alpha,
scrim alpha — derived numbers with the derivation written next to them. That turns out
to be the thing that makes AI output checkable at all. You cannot audit taste. You can
audit arithmetic.

<!-- figure: contract-live -->
<!--
  Figure 1 — the contract, rendered rather than diagrammed.
  Interactive in the design source; render as a live glass stage, not an image.
    still     plain-pour   (author-selectable)
    chrome    dark         (author-selectable: dark | light)
    fill α    .50          both modes
    blur      32px         fixed
    scrim α   .62          derived
    band      38.2%        bottom-up
  Caption: Change the still or pull the scrim off and the failure mode is
  immediate: this is the check a screenshot cannot perform.
-->

## The record

### 01 — The instruction was describing a version that no longer existed

**Proposed.** A substantial fork of the design system to restore a blur-first
rendering, on the basis of a project note warning that the system derived its fill
alpha from blur depth and would break legibility if left alone.

**I questioned.** Whether the premise was still true. The note was confident and
specific, which is exactly what a stale instruction looks like.

**Found.** The note described v0.2. The shipped system was v0.3, which had already
decoupled blur from alpha, solved alpha at a single value in both modes, and retired
the depth ladder entirely. There was no derived alpha left to restore.

**Changed.** The fork collapsed from a rewrite to two amendments. The project's own
rules file was rewritten to stop warning about a danger that had been fixed upstream.

> The most expensive output of this session would have been a large, careful,
> well-reasoned fork of a problem that did not exist. Nothing in the process flags
> that — it reads as productivity.

### 02 — Retired in the stylesheet, still running in the JavaScript

**Proposed.** Treat the density system as retired, per the stylesheet, and move on.

**I questioned.** Whether every layer agreed that it was retired.

**Found.** They did not. The media registry still shipped the old measured table and
still published the escalated verdict for any image it had never measured — which is
every image a content system will ever hand it. The verdict no longer changed the
pane's thickness, so it looked inert. It still swapped the text colours to a set that
had been solved against an opaque fill that was no longer there.

**Changed.** The fork finishes the retirement rather than fighting it: the text roles
are re-pointed at the mode they actually sit on, and the override is kept for the two
paths that genuinely are opaque.

> A half-finished retirement throws no errors. It is the failure mode most likely to
> survive a refactor, because everything still renders.

### 03 — "Conservative" was doing the work that a calculation should have done

**Proposed.** A scrim at alpha .78, described as a conservative choice.

**I questioned.** Where .78 came from. Every other number in this system arrives with
its derivation attached; this one arrived with an adjective.

**Found.** It was a guess. The requirement is solvable in one line: composite a black
scrim at alpha *a* over the worst photograph that could ever arrive — pure white — and
require the result under the contract's ceiling. That gives *a* ≥ .5386. Shipping .62
lands at .119 against a .18 ceiling, which is real headroom.

**Changed.** Every photograph on the site got roughly a third of its contrast back,
and the number now carries its own proof.

> Over-caution is not a safe default; it is an unmeasured one. It costs something real
> and hides the cost behind a word that sounds responsible.

### 04 — The rule that was correct and never painted

**Proposed.** Implement the scrim as a class declaring a background gradient on the
element carrying the media.

**I questioned.** Nothing, initially. It looked right and the reasoning was sound. I
asked why the panes still felt thin over bright stills.

**Found.** Stages set their photograph with an inline background shorthand, which
beats any stylesheet rule unconditionally. The scrim had never rendered once. Rebuilt
as a pseudo-element, which also fixed the paint order without needing to name a
stacking value.

**Changed.** The mechanism started existing.

> A rule that must survive the thing it amends has to win against it. Being later in
> the file is not winning. And the symptom I could actually see — "this feels thin" —
> was the only route to a defect the reasoning could not reach.

### 05 — Three defects that only a real asset could expose

**Found in one pass.** An animation loop that kept running after navigating away from
the page that started it. A class that was written, documented, and applied to nothing
— so the panel thumbnails rendered with no scrim at all. And the scrim then being
applied too broadly once it worked, including onto calibration frames whose entire
purpose is to show what the media does to a pane *unaided*.

**Changed.** The scrim became explicitly opt-in, applied to exactly five stages, with
the exclusion written down as a reason rather than left as an omission.

> Scrimming a measurement frame means measuring the scrim. The second version of a fix
> is where you find out whether the first one understood the problem.

### 06 — The easy accessibility answer was the wrong one

**Proposed.** Where legibility was uncertain, go opaque. Guaranteed contrast, no
measurement needed.

**I questioned.** Whether uncertainty is a legitimate trigger. If the whole visual
identity is translucency, an escalation that fires on doubt will fire constantly, and
the site becomes opaque by accident rather than by decision.

**Changed.** The rule became one sentence and the whole fork follows from it: blur
wins wherever the standard holds, and opacity is the last resort, taken only when a
measurement shows the standard cannot be met. Uncertainty is not a measurement. A thin
margin is not a failure. The first lever is flipping the chrome mode, which costs
nothing and recovers more than thickening the pane does.

> The user-facing escapes stayed exactly as they were. The point was never to override
> someone asking for the guaranteed state — it was to stop the system giving up on
> their behalf.

### 07 — Placeholders become requirements unless you label them

**Noticed.** The handoff package shipped with stand-in imagery so a developer could
see the glass over real pixels. Nothing in it said the images were disposable — and a
developer receiving a design package treats what is in it as intent.

**Changed.** The package now declares fidelity in explicit tiers, down to a
zero-fidelity tier that says outright: these stills are reference, their crop and
palette carry no decision, do not infer layout intent from them, replace all of them.

> An unlabelled placeholder is a specification. The cheapest thing in a handoff is a
> sentence saying which parts you meant.

<!-- figure: scrim-solve -->
| scrim α | composited L | verdict |
| --- | --- | --- |
| 0 | 1.000 | fails |
| .5386 | .180 | the solve |
| **.62** | **.119** | **shipped** |
| .78 | .041 | the guess |

Figure 2 — a black scrim over pure white, the worst photograph that can arrive. The
ceiling is .18. The solve is .5386, the shipped value .62, and the number originally
proposed was .78 — which cleared the ceiling by four times and cost every good still a
third of its contrast to do it. The gap between the third and fourth row is the whole
argument for deriving rather than guessing.

## Where I was wrong

Two, so far, and both are the same shape: I asked for the conventional answer because
it was the one I knew.

### I asked for a content management system I do not need

Six projects, one author, me. A hosted CMS would have added a service to run, a schema
to migrate, and a second place for content to go stale. The content lives in the
repository as text files with a validated schema, and the per-image scrim override is
just another field. I had assumed the CMS because that is what a content-driven site
has.

### I had the writing scheduled last

My build list was complete and the order was wrong. Writing the case studies was the
final step, after the site was built — which guarantees a second layout pass, because
real copy changes line lengths, card counts, and how many stills a project actually
needs. It is also the only item on the list that gets me hired, and it was scheduled
behind hosting.

## Still open

**The generative backdrop.** A live animated field under the panes, on the first
screen a visitor loads — the most expensive composite in the system, in the least
forgiving place. Currently deferred rather than decided.

**Scrim, or per-image measurement.** The contract assumes something measures each
photograph. Nothing on a static site does. The scrim bounds the problem instead of
solving it, which means some stills get more scrim than they need. Deliberate for now;
revisit when a still is visibly spoiled by it.

**What the contract fails to prevent.** The most useful entries in this record will be
the ones written during the build, when a system designed in the abstract meets an
implementation that did not read the reasoning. None of those exist yet.

## Method

Design and system work in conversation with an AI collaborator; every derived number
checked against its own derivation; the design system forked rather than followed,
with the reasoning written into the stylesheet so the next reader gets the argument
and not just the value. Implementation follows in a coding environment, from a handoff
package written for that purpose. This record is appended to as it goes.

Of the seven entries above, five began as something the machine proposed and I
refused. Two more were defects neither of us proposed — they surfaced only when a real
asset or a real page was in front of us. Separately, two entries record something I
proposed and it refused. That last pair is the finding I did not expect.
