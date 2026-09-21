---
slug: sco-cash-management
kind: project
title: Cash Management for Self-Checkout
client: NCR Voyix
framing: A cash pickup that advances when the machine senses what you did, not when you tap Next.
readingTime: 6
date: 2020-06-09
hero:
  src: /artifacts/sco-cash-management/status-screen-final.png
  alt: "Cash Management status screen on a dark slate background. Cards for $1, $5, $10 and $20 notes and 1¢, 5¢, 10¢ and 25¢ coins each show a level bar, the current count and amount, and how many to add or remove; the $5 note and 25¢ coin cards carry red alert badges. Function buttons run down the right edge: Pick Up, Add via Note Loader, Add via Coin Chute, Remove Money, Empty Unit, Print Report, Exit, Lock Screen."
  width: 1920
  height: 1080
  chromeMode: dark
gallery:
  - src: /artifacts/sco-cash-management/legacy-status-screen.jpg
    alt: "The legacy Cash Management screen: a coins overview and note recyclers as small grey tiles, with function buttons on the right for Dispense Functions, Reset Functions and Note Box Transfers, and a greyed-out Apply Changes, Cancel Changes and numeric keypad."
    width: 1444
    height: 1080
    caption: "Before. Cash levels read as small grey tiles, and the work sat behind dispense, reset and transfer menus."
    chromeMode: light
  - src: /artifacts/sco-cash-management/exploration-four-cash-level-views.png
    alt: "Four explored designs for the cash status screen, shown two by two and labelled: circular gauges, bars against a baseline, overlaid columns, and tile cards with a level bar. Each shows the same eight denominations and the same function list."
    width: 2000
    height: 1250
    caption: "Four ways to show how much of each denomination is left. The tile card, with a level bar on one side and an add-or-remove instruction on the other, is what carried through."
    chromeMode: light
  - src: /artifacts/sco-cash-management/pickup-event-sequence.png
    alt: "A diagram of the pickup flow. Seven screens run left to right: open the unit door, remove note box, empty the note box and re-insert it, remove the coin box, empty the coin box and re-insert it, close the unit when finished, and updating unit with every level re-checked. Below them, six sensed events advance the screens: door opened, note box removed, note box inserted, coin box removed, coin box inserted, door closed."
    width: 2400
    height: 760
    caption: "A pickup, end to end. The employee never taps to advance; each screen moves when the unit senses the step completed."
    chromeMode: light
  - src: /artifacts/sco-cash-management/help-modal.png
    alt: "The cash status screen dimmed behind a Help dialog. The dialog shows one denomination card with labelled callouts: bill, coin or note; add/remove indicator; alert notification; current count and amount; add/remove amount."
    width: 1046
    height: 585
    caption: "The card key added after round one, where only 4 of 10 participants read the remove count correctly. With it, all 10 did."
    chromeMode: dark
  - src: /artifacts/sco-cash-management/note-loader-instructions.jpg
    alt: "Instruction screen titled Loading the note loader: three hardware illustrations on the left and four steps on the right, covering opening and removing any $1 notes, loading large notes first, loading $1 notes on top, and stacking notes neatly."
    width: 1920
    height: 1080
    caption: "The physical step guided on screen, so the instruction sits where the hands are."
    chromeMode: light
clips:
  - src: /artifacts/sco-cash-management/pickup-sequence.mp4
    caption: "The prototype running a full pickup. Each screen advances on its own when the unit senses the step is done; nothing is tapped."
    poster:
      src: /artifacts/sco-cash-management/pickup-sequence-poster.jpg
      alt: "A silent recording of the pickup flow on the self-checkout screen, advancing without any taps: open the unit door, remove the note box, empty it and re-insert it, remove the coin box, empty it and re-insert it, close the unit, a brief resetting-counts screen, then the updated Cash Management status screen. The still frame is the first step, Open the unit door."
      width: 1920
      height: 936
      chromeMode: dark
related: []
applies: []
featured: true
published: true
placeholder: false
---

## Problem

![](/artifacts/sco-cash-management/legacy-status-screen.jpg)

Self-checkout units hold cash that has to be added, removed and kept in balance: change for customers, large bills, cash back, and no more cash sitting in the unit than necessary. Running out is bad, and so is holding too much.

The people doing that work stood between two things, the screen above and the hardware below (note loader, coin chute, cash box), moving back and forth while handling cash and driving the interface. The existing flow made them confirm their way through every step. The remove-cash flow I inherited split into dispense, reset and note-box-transfer branches, each ending in apply, cancel or confirm steps.

The people who do this work described a system that made them hunt for things. A store administration specialist who looks after cash office operations across 171 stores told us there were no base levels for coins at all: after an audit, the coins were simply loaded back into the unit with no target to work toward. A software specialist who audits and patches these machines described a lot of menu navigation just to reach the function they needed.

## Role

I was the project lead and UX architect, working with a UX researcher and a UX designer. I interviewed subject-matter experts, mapped the flows, defined the data architecture and behavior, built the test assets, iterated the designs, and presented to stakeholders.

## The decision

![](/artifacts/sco-cash-management/pickup-event-sequence.png)
![](/artifacts/sco-cash-management/pickup-sequence.mp4)

The pickup and restock flows stopped asking the employee to tell the software what the hardware already knew. The note feeder on the outside of the unit has a sensor: when something is fed in, it ingests it, reads it, and sorts it as currency or rejects it. The flow advances on that event. It supports every note a merchant configures, across currencies.

Not every screen carried a "Next" button. Where an event was programmed and dependable, the screen had no Next at all: the only way forward was to do the work. Where it wasn't, Next stayed at the bottom as a redundant path, so nobody could be stranded by a trigger that failed to register. Which screens got one was a judgment about the reliability of a specific sensor, not a global pattern.

A pickup, for example, runs on events: the unit door opens, the note box comes out and goes back in, the coin box comes out and goes back in, the door closes. Door close is the final trigger, and it hands off to a system status assessment in which the unit checks that every denomination level is correct, rather than asking the employee to count and confirm. Every flow listens for a set of events like this to advance to its next step.

The same idea applied to a second kind of flow that never opens the unit. For a large national retailer, I designed end-of-day cash balancing to run entirely from outside the machine: note insertion at the note feeder, coin insertion at the coin feeder, and note removal from the note recycler were the triggers. The retailer's problem was out-of-balance days in its beta stores, where the day's sales didn't match the nightly deposit, and its ask was fewer steps and more automation.

Finding those events was the method, not a one-off. I annotated every "Next" and "Done" in the flow with a single question: could this be automated? We worked with engineering to find which hardware triggers were already available, and used them to cut the number of times an employee had to touch the unit at all, so the task in their hands could stay the task in front of them.

## Reasoning

![](/artifacts/sco-cash-management/note-loader-instructions.jpg)

The screen and the hardware are two places, and the job needs both hands. Every tap that only confirms something the machine already sensed is a trip back to the screen, made by someone holding cash.

The rest of the design followed from the same idea of reducing effort at the point of work:

- The status screen shows every denomination at once as a card: count, amount, a level bar against a baseline, and how much to add or remove, with a red alert on whatever is closest to running out. It supports up to 16 denominations and was tested with several currencies and languages.
- Removing money uses a spreadsheet-style input, chosen to reduce the number of interactions while keeping the removal a single batch.
- Instruction screens with step-by-step illustrations guide the physical work (for example, loading the note loader), and there are demo videos for each flow.

## Outcome

The two things validated differently, and it's worth being exact about which is which.

The status screen was tested, twice, and the numbers are below. The event-driven flows were not A/B tested. They were shown as recorded walkthroughs to customers, to representative users and to internal subject-matter experts, who watched the flow run and said it looked faster because nothing waited on a button press, and less physically demanding because it cut the trips between the screen and the hardware. No pickup was ever run on a physical unit in testing; product ruled that out on cost and speed. So what exists is informed judgment from people who know the job, not measured task times.

I moved to another project before rollout, so there is no field data on pickup time, training time or error rates.

## Validation

![](/artifacts/sco-cash-management/exploration-four-cash-level-views.png)
![](/artifacts/sco-cash-management/help-modal.png)

The cash-level display went through A/B rounds first, testing two things: which presentation people preferred, and how well each let them read the state of the machine. The legacy screen was the control, against four ways of showing how much of each denomination was left: circular gauges, bars against a baseline, overlaid columns, and tile cards. The tile card, with its level bar on one side and its add-or-remove instruction on the other, is what carried through to the final design.

The status screen went through four iterations from there. Two rounds of testing drove the changes.

**Round 1 (April 2020):** a remote unmoderated test, 10 participants with some retail experience from a general-population panel, most unfamiliar with cash management. Each saw a static screenshot and answered six questions.

**Round 2:** the same screen plus a card-layout "Help" modal that explains how to read a card. A new group of 10 participants took it.

| Question | Round 1 (success, no help) | Round 2 (with help) |
|---|---|---|
| Which is closest to running out? | 10 of 10 | 10 of 10 |
| How many $10 bills? | 8 of 10 | 10 of 10 |
| Remove how many 5¢? | **4 of 10** | 10 of 10 |
| Total amount of $5s? | 7 of 10 | 10 of 10 |
| Add how many 25¢? | 6 of 10 | 10 of 10 |
| Which are below the recommended level? | 6 of 10 | 6 of 10 |

The help modal fixed comprehension of add and remove, but it cost something: "closest to running out" got harder to answer with confidence (6.4 to 4.9 out of 7; ease 6.1 to 4.1). The research read was that the extra context up front overwhelmed people. Below-baseline stayed at 6 of 10 because participants still didn't notice the +/- icons and level bars.

Participants, unmoderated round (general population, not store staff):

> "It's red and super easy to see that it's running out." Participant 9
>
> "I see it right away because of the warning sign." Participant 2
>
> "Really brilliant… I wish that when I was using money at the till it would've had a system closer to this. It looks like it's going to be much easier to track…" Participant in round 2

The study's own next step was to test with employees who handle cash daily, and a moderated round with store staff was planned for April 2020.
