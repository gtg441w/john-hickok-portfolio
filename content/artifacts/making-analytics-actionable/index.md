---
slug: making-analytics-actionable
kind: framework
title: "Making Analytics Actionable: From Audit to Automation"
framing: "Most data frameworks stop at the metric. This one keeps going until the system acts on its own."
readingTime: 9
date: 2021-01-01
layout: walkthrough
hero:
  src: /artifacts/making-analytics-actionable/thumbnail.jpg
  alt: "A sketched point-of-sale terminal on a shop counter, with a card reader, receipt printer and shopping bags, beneath a cut-paper question mark, from the walkthrough video."
  width: 720
  height: 404
  chromeMode: dark
video:
  src: /artifacts/making-analytics-actionable/walkthrough.mp4
  title: "How to Build Dashboards That Drive Action"
  poster:
    src: /artifacts/making-analytics-actionable/walkthrough-poster.jpg
    alt: "A cut-paper question mark hovering over a point-of-sale terminal on a shop counter, in a sketched illustration style."
    width: 720
    height: 1280
    chromeMode: dark
gallery:
  - src: /artifacts/making-analytics-actionable/dashboards-invisible.jpg
    alt: "A sketched wall of colorful charts, tables and torn-paper notes, so dense that no single dashboard on it can be read."
    width: 720
    height: 880
    chromeMode: dark
  - src: /artifacts/making-analytics-actionable/four-phases-list.jpg
    alt: "Four stacked boxes labelled Phase 1: Discover, Phase 2: Define, Phase 3: Answer and Phase 4: Act."
    width: 720
    height: 700
    chromeMode: dark
  - src: /artifacts/making-analytics-actionable/atm-out-of-twenties.jpg
    alt: "A sketched self-service kiosk whose screen shows a warning triangle and the message Out of $20s."
    width: 720
    height: 680
    chromeMode: dark
  - src: /artifacts/making-analytics-actionable/kitchen-lunch-rush.jpg
    alt: "A sketched restaurant kitchen at the lunch rush: two cooks prepping food beneath a rail of order tickets, some ticked and some crossed out."
    width: 720
    height: 730
    chromeMode: dark
  - src: /artifacts/making-analytics-actionable/question-to-measurement.jpg
    alt: "A chain of three boxes joined by arrows: User Story A, then Business Question, then Actionable Measurement, under a Phase 2: Define header."
    width: 720
    height: 760
    chromeMode: dark
  - src: /artifacts/making-analytics-actionable/ai-hub.jpg
    alt: "A glowing circuit-board brain at the center of a hub, with six empty task boxes radiating from it."
    width: 720
    height: 540
    chromeMode: dark
  - src: /artifacts/making-analytics-actionable/closed-loop.jpg
    alt: "Four boxes in a loop, Measurement, Question, Threshold and Action, joined by arrows that run from a measurement to an action."
    width: 720
    height: 540
    chromeMode: dark
related: []
applies: []
featured: true
published: true
placeholder: false
---

## Problem
![](/artifacts/making-analytics-actionable/dashboards-invisible.jpg)

Reporting and dashboard work usually starts from the wrong end: from the data already
sitting in a warehouse, instead of from a real question a specific person asks while
doing their job. The result is dashboards that are technically correct and practically
ignored, built because the data existed rather than because anyone needed it.

The Aloha Smart Manager dashboard workshop caught its own team doing this in real time.
One card on the board reads: *"These questions might be too specific and not
actionable."* That is a team holding its own output to the standard the method sets. A
business question that can't be tied to a measurement, a threshold and eventually an
action isn't a business question yet. It's a topic.

## Role

I learned the foundation, a four-layer chain from epic to user story to business
question to measurement, from Norm Trujillo on NCR Voyix's ITM Next Gen team around 2021
and 2022. I have since broadened it into an eleven-step method in four phases, and
applied it on the Aloha Smart Manager dashboard, whose data model later carried into the
NCR Voyix Home Dashboard.

## The method
![](/artifacts/making-analytics-actionable/four-phases-list.jpg)

Eleven steps, grouped into four phases. Each step lists what AI can speed up there, the
payoff, and what a person keeps.

### Discover: find out what's there

**1. Audit.** Collect and consolidate every available data point from existing reports,
databases and exports. See what can already answer meaningful questions, and where the
obvious gaps are.

> AI ingests every report, export and spreadsheet, extracts each field, dimension and
> measure, and flags duplicates and conflicts across systems. Payoff: a multi-week
> clerical slog becomes a first draft in hours. A person keeps: deciding what is in
> scope, and catching the retired source the AI has no way to know is dead.

**2. Question.** Research how people actually use data in their daily work: what matters
most, what they monitor constantly, and what would make them take action.

> AI synthesizes interview transcripts and support tickets at volume: tallies themes,
> flags contradictions, surfaces what people say with unusual intensity. Payoff: a week
> of close reading becomes an afternoon. A person keeps: the conversation itself. The
> follow-up question prompted by a hesitation happens in the room, not in the transcript.

**3. Organize.** Classify everything in a large card sort with users, subject matter
experts and the project team, then converge on a single consensus data schema.

> AI proposes a first-draft taxonomy before the session and joins the sort as one more
> contributor. Payoff: the room starts from a hypothesis instead of a blank table. A
> person keeps: the consensus. Agreeing on what a category really means is a social
> outcome, not a data output.

### Define: turn data into real questions

**4. Epic.** The largest categories of data, the top of the hierarchy everything else
hangs from.

> AI drafts candidate epics from the organized schema, informed by comparable taxonomies
> from other domains. Payoff: cheap to generate, cheap to discard. A person keeps:
> choosing the epics that match how this business actually divides its work.

**5. User story.** A user's fundamental motivations inside an epic. For example: as a
manager, I want to see who is clocked in, so I can keep labor cost under control.

> AI drafts story stems straight from interview notes and support tickets. Payoff:
> coverage no analyst could type out by hand. A person keeps: confirming each story
> reflects real priorities, not just what gets said most often.

**6. Business question.** The questions a person asks themselves throughout a job, an
industry or a product. *Are any machines in danger of running out of cash? Are any
employees approaching overtime?*

> AI generates a wide net of candidate questions for every story, then triages them
> against the evidence gathered in Discover. Payoff: more candidates than a team would
> brainstorm alone, already sorted. A person keeps: the final cut. Separating the
> critical and innovative question from the merely plausible one needs business context
> AI does not have.

### Answer: make the answer visible

**7. Answers.** Identify the data dimensions and measures that can answer each business
question.

> AI maps questions to existing measures, flags missing data, proposes derived metrics,
> and pulls in outside sources like weather or market benchmarks. Payoff: answers that
> reach beyond the data you already own. A person keeps: defining exactly what each
> metric means. AI can compute a ratio instantly; it cannot decide what the denominator
> should be.

**8. Visualizations.** Charts, graphs and metric presentations that give each answer
context, and show dimensions and measures over time so the data tells a story.

> AI drafts several chart options for every answer, applying visualization best practice
> by default. Payoff: real options to test on day one. A person keeps: testing with real
> people. Looks right and reads right are two different results.

### Act: trigger a response

**9. Thresholds.** Identify the thresholds in critical data that should make someone
take action.

> AI sets thresholds from historical distributions instead of round-number guesses, and
> recalibrates them as conditions drift. Payoff: fewer false alarms and fewer misses. A
> person keeps: pricing the trade-off between a false alarm and a missed one. That is
> risk tolerance, not statistics.

**10. Actions.** Pair each threshold with a call to action that guides people toward the
recommended response.

> AI recommends the next best action for each breach, tuned to what has worked before.
> Payoff: guidance at the exact moment it is needed. A person keeps: deciding which
> actions are allowed to be suggested at all. In banking, that line is compliance, not
> modeling.

**11. Automate.** Identify the actions that can run automatically, helping people
without the risk of taking a human out of the loop.

> AI executes approved actions and climbs a ladder: recommend, then act under watch,
> then act alone on low-risk, reversible work. Payoff: a higher ceiling on what is safe
> to automate. A person keeps: the audit. The job moves from doing the task to
> supervising the system that does it.

## Why it works: importance is not attention
![](/artifacts/making-analytics-actionable/atm-out-of-twenties.jpg)
![](/artifacts/making-analytics-actionable/kitchen-lunch-rush.jpg)

Two moments, from two industries, where the method surfaced something a data-first
approach would have missed.

**Banking, ITM Next Gen.** A live poll asked whether respondents could predict cash
demand. They rated themselves 4 out of 5 likely to *seek* that answer, but only 2.5 out
of 5 on how often they would actually *check* it. Wanting an answer and checking for it
are different behaviors.

**Restaurants, Aloha Smart Manager.** Interviews with restaurant operators found real
misalignment between the metrics the team assumed belonged on the homepage and the
metrics operators actually monitored. A follow-up survey quantified the gap:

- 52% ranked **Total Sales Today** their most important metric, but only 30% check it
  several times a day. Most, 54%, check it once a day.
- 50% ranked **Sales per Labor Hour** their *least* important metric, yet 26% still
  check it weekly.
- 69% ranked **Total Void Counts** 9th or 10th out of 10, yet 39% check it daily.
- **Raw Items in Danger of Running Out** is where the two agree: 71% ranked it their top
  metric, and it's checked daily or several times a day. The mismatch is
  metric-specific, which is exactly why every metric has to be measured instead of
  assumed.

Design for what people check, not only for what they say matters.

## Outcome
![](/artifacts/making-analytics-actionable/question-to-measurement.jpg)

The strongest evidence of portability is not that the method was reused. It is that its
output survived a platform rewrite. When Aloha Smart Manager was folded into NCR Voyix
Central as part of a micro-frontend platform strategy, the same data and metrics carried
into what is now the NCR Voyix Home Dashboard. The epic, story, question and measurement
mapping was never a property of one screen; it held up as a durable schema underneath a
completely new interface.

Across banking and restaurant operations, two industries with little in common, the
same chain surfaced the same non-obvious finding: stated importance does not predict
checking behavior, so a dashboard has to be designed around attention, not only around
importance.

## Where AI fits
![](/artifacts/making-analytics-actionable/ai-hub.jpg)

*Everything above this section happened. This section is a proposal: how the method
evolves next. It hasn't been run in the field yet.*

**Time, delegate. Trust, keep.** AI can accelerate all eleven steps. The rule for where
it leads: divergent work, generating many options fast, goes to AI. Convergent work,
deciding and owning the outcome, stays with a person. If a mistake would only cost
time, delegate it. If it would cost trust, a person keeps it.

That produces four zones:

- **AI leads** (many options, cheap mistakes): extracting every field from every report,
  drafting a first taxonomy, generating candidate questions, sketching chart variants.
- **AI proposes, you decide** (many options, costly mistakes): triaging business
  questions, recommending thresholds, suggesting next best actions.
- **Automate the chore** (few options, cheap mistakes): tallying interview themes,
  flagging duplicate fields, reminding staff to clock out after close.
- **A person owns it** (few options, costly mistakes): running the interview, defining
  what a metric means, setting compliance limits, making the final cut.

**Automation is a ladder, not a switch.** Rung one, human in the loop: AI recommends, a
person acts. Rung two, human on the loop: AI acts, a person watches and can undo it.
Rung three, autonomous within limits: AI acts alone, only on low-risk, reversible work.
Take a real restaurant research question, *are any employees approaching overtime?* On
rung one, AI flags who is close and suggests who could clock out early. On rung two, AI
drafts next week's schedule to head off overtime, and the manager can roll it back. On
rung three, AI reminds anyone still clocked in after close to clock out. Anything
costly or hard to reverse stays on rung one.

## Where it sits
![](/artifacts/making-analytics-actionable/closed-loop.jpg)

None of the parts are new on their own, and saying so is part of the point. The middle
of the chain resembles Victor Basili's Goal Question Metric method from software
engineering. Epics and user stories come from agile practice, especially Jeff Patton's
story mapping. Organize is card sorting. Thresholds paired with actions echo how
Google's site reliability engineers design alerts that only fire when someone can act.
What none of them do alone is run the full distance, from an audit of what exists to a
system that acts on its own. This method stitches them into one repeatable pass.

## Acknowledgment

I learned the foundation of this method, epic to user story to business question to
measurement, from Norm Trujillo, through months of conversation and collaboration on NCR
Voyix's ITM Next Gen team. Without him, I would have had nothing to evolve or adapt.
