---
slug: vibe-coding-workshop
kind: workshop
title: Vibe Coding Workshop
client: NCR Voyix
framing: A game wrapped around a real exercise, so designers could learn to build with AI without the intimidation.
readingTime: 7
date: 2026-05-18
hero:
  src: /artifacts/vibe-coding-workshop/world-map-day-1.jpg
  alt: "The workshop game's first map, in pixel art: a city on a green island, snowy mountains, desert mesas, a lake with a sailing ship and a lagoon with palm trees. Seven world nodes sit on a pale path across it. Intro Island, at the left, is white and marked Active; Terminal Town, Snack Oracle of Omaha, Character Count Canyon, Figma Fjord, Reflecting Pond and Launchpad Lagoon are dark and marked Locked. A New Worlds button sits at top right."
  width: 2096
  height: 1616
  chromeMode: light
gallery:
  - src: /artifacts/vibe-coding-workshop/snack-oracle-app.png
    alt: "The Snack Oracle app in its starting state: a cream card on a peach gradient with the title Snack Oracle, the line Dramatic wisdom for hungry heroes, a large orange button reading Ask the Snack Oracle, the status Awaiting your question, and a counter reading Clicks: 0."
    width: 1520
    height: 786
    caption: "The exercise, as I built it while testing: one button, a click counter, and a Certified Snack Philosopher at five clicks. Designers' versions diverged from here within a day."
    chromeMode: light
  - src: /artifacts/vibe-coding-workshop/loops-and-planes.png
    alt: "A diagram titled Four loops set the pace; four planes keep the screen legible. A top row of four cards shows the loops by duration: Moment, 10 to 90 seconds, action then feedback then micro progress; Lesson, 5 to 15 minutes, sections then completion then transition; World, 20 to 45 minutes, lesson chain then world mastery then unlock; and Meta, across sessions, saved progress and a persistent character. A second row of four cards shows the planes, each with one job: Map, Content, Utility and Celebration. A footnote says what was built and what was specified but not built: streaks, and instrumentation such as completion rates."
    width: 2400
    height: 1040
    caption: "The gameplay model: four loops pace the game and four planes keep the screen from stacking. Streaks and instrumentation were specified and never built."
    chromeMode: light
  - src: /artifacts/vibe-coding-workshop/world-map-day-2.jpg
    alt: "The game's second map, in pixel art: three floating islands in a starry purple sky, a violet island of domed buildings, an icy blue island of crystal spires with a research station, and a rocky island with a fortress. Three world nodes sit on a pale path: Atomic Archipelago, GitHub Glacier and Debrief Dolomites, each marked Active. A Return button sits at top left."
    width: 2096
    height: 1616
    caption: "The map for the second and third days: Atomic Archipelago, GitHub Glacier and Debrief Dolomites. Both maps' backdrops are generated art I directed."
    chromeMode: dark
related: []
applies: []
featured: false
published: true
placeholder: false
---

## Problem

Designers on my team were being asked to work in a way most of them had not tried: describe a prototype in plain language, let an AI assistant write the code, and check the result in a browser. Before the workshop, AI prototyping was in use in one of our products, in Figma's own tool.

The first obstacle was not the prompting. It was everything around it. Installing VS Code and Git, getting into the right GitHub organization, connecting the Figma MCP server, and learning what a repo, a branch or a token is well enough to follow an engineer. For a designer who has never opened a terminal, that is an intimidating way to begin, and the people I was teaching were also carrying full delivery loads.

I built the first version on short notice, while learning the skill myself. I was one chapter ahead of the people I was teaching.

## Role

I was the only facilitator and the author of all of it: the exercise, the guide, the glossary and appendices, and the companion game. I used AI throughout: the game was vibe-coded, the map art was generated, and I worked out the guide in conversation with an assistant. I directed all of it and iterated on it heavily; nothing shipped as first output. The guide assumes a Mac, which was true of everyone on the team.

## The decision

![](/artifacts/vibe-coding-workshop/snack-oracle-app.png)

I wrapped a real exercise in a game instead of giving designers a slide deck or a setup document.

The exercise was small on purpose. Designers built the Overdramatic Snack Oracle: a page with one big button that gives random snack advice after a dramatic pause, counts your clicks, and at five names you a Certified Snack Philosopher. They built it by describing it to Copilot in VS Code, ran it in their browser, restyled it through prompts, and then brought in a Figma design through Figma's MCP server. It is a 90-minute exercise. I chose it because it is simple enough to finish, real enough to teach state, timing and interaction, and funny enough to remember.

The wrapper was a retro game. The full workshop guide lives inside it, split across ten worlds on two maps: seven for the first day (Intro Island, Terminal Town, Snack Oracle of Omaha, Character Count Canyon, Figma Fjord, Reflecting Pond, Launchpad Lagoon) and three for the second and third (Atomic Archipelago, GitHub Glacier, Debrief Dolomites). Worlds unlock in order, progress is saved, and a glossary of more than fifty engineering terms, in plain English, sits one click away as a side sheet. The game changed how the workshop felt. It did not shorten or rewrite what the workshop taught.

![](/artifacts/vibe-coding-workshop/loops-and-planes.png)

Day 2 changed the ask. Instead of the Snack Oracle, designers chose a real Figma frame or component from their own work, broke it into atoms and molecules from the design system, planned the states it needed, and built it back through prompts. That was the bridge from the exercise to their own work.

![](/artifacts/vibe-coding-workshop/world-map-day-2.jpg)

## Reasoning

**Why a game.** The frightening part was the beginning, so that is where the game had to work. A map with locked worlds makes the order of things legible. Saved progress makes coming back easy. A setup world feels different from a document with the same steps. A colleague said the game was "a lot less boring than reading a confluence doc." I told them that was the goal: make it engaging and approachable.

**Why a silly exercise.** Low stakes make failure cheap. At the readout I told the team we were not launching a product and nobody was going to get hurt, so they could show their mistakes. They did: one designer opened a build that had gone badly wrong and walked us through how it happened. And because everyone started from the same brief, the differences were visible. Within two days the Snack Oracles included an airport-marquee board, a casino slot machine, a rainbow "chaos" oracle, a Cthulhu haiku generator, and a pizza cursor that sprays pixie dust. As I told the team while they were posting them, it was interesting to see the same prompts and code produce slightly different results.

**Why being one chapter ahead helped.** I built the exercise and did it myself first, so every step in the guide had been run by someone who could get stuck. Playtesters got confused about when to use Ask, Plan or Agent mode, so I added a section on modes. They hit unfamiliar jargon, so I added the glossary. Both revisions are dated May 15 in the guide's own log.

**Adoption before governance.** The decision I would defend most is what I cut. The design included a GitHub world, covering branches, commits and pull requests. On the last day I told the team we would skip it. People were already working locally and bringing real project work into Copilot, and I did not want to slow that down with process. GitHub is the next step, so that work lives somewhere safer than one laptop, but it comes after the habit is there.

Throughout, the guide teaches what it calls intent engineering: describe the experience you want in plain language, not the code. The guide's own phrase is "intent first, syntax second." The designers who took that furthest wrote down goals and constraints before generating anything.

## Outcome

Fourteen designers took part. The first two days ran twice, morning and afternoon, so colleagues from India to San Francisco could join; most came to the morning session. The afternoon sessions turned into office hours, and one of them produced the most useful tactic of the week. Copilot could not see the click path in a Figma prototype until a designer drew big red arrows from each tapped element to the screen it should lead to. That designer shared it, and it spread. At the readout a colleague who had given up on the same problem nominated it for a superlative.

Other tactics travelled the same way. One designer asked the assistant for a chronological transcript at the end of the day so the next session did not start from zero. Another found the tool that lets you click an element in the running page and send it to the chat, which meant pointing at what they meant instead of describing it. Another spent most of the second day writing a goals-and-constraints file, with accessibility as the first requirement, before generating any code.

On Day 2, designers brought real components from their own product work into Copilot, and several finished with working multi-screen prototypes. On the research side, designers used it to review design files against usability heuristics and to draft a moderated usability test plan from a Figma flow. One designer described three hours of rebuilding a multi-screen flow from Figma: "it was a fight for three hours, but it got to something that feels like the start of an HTML prototype."

By my count as of September 2026, AI prototyping is in active use in six of our products, and one of those started only in the last two weeks. Before the workshop the count was one. That is my count, not a measurement, and I cannot separate the workshop's effect from everything else that changed. The game has also outlived the workshop: colleagues have asked me for the link more than once since, mainly to get through setup.

What I do not have is telemetry. There are no completion rates, no time-to-first-build, and no measure of time saved. The evidence here is attendance, what people posted in Slack, a recorded readout, and my own count.

## What didn't work

**Setup.** Setup is where people got stuck first. Some of it was organizational: an org-level setting that blocked installing the Figma MCP server, and access to the right GitHub organization, are things a guide cannot fix. Some of it was mine. The link to the Day 3 workshop returned a page-not-found for one designer that morning, and a Word document linked from the setup steps pointed to a place a reviewer could not request access to. I fixed both as they were reported.

**The assistant's habits.** Copilot often created new CSS variables and patterns instead of updating the ones that existed, which left redundant styles. A designer flagged it on the first day. At the readout another described the same thing as a cleanup that quietly produced a pile of code they had not asked for. A file rename broke one designer's Figma references, and that designer stopped there. After three attempts at a pizza illustration, another found the tool could not draw one.

**Intent and outcome.** A designer observed at the readout that with no picture in mind, the assistant would produce something they liked, and with a specific picture in mind, it never matched. Several designers landed on the same workaround: start small and add one piece at a time.

**Research use.** AI-generated user feedback on a prototype was attributed to a persona for the wrong job, and a designer worried about the assistant reinforcing its own assumptions. Both are reasons to treat that output as a draft.

**The game itself.** The gameplay model specified streaks and instrumentation. I built neither, because of time. So I do not know where people stalled or how far each got, beyond what they told me.

## What I'd change

Two things, and I am sure of both. The guide never tells Copilot to reuse existing variables and design tokens before creating new ones. That was my oversight, and it is the fix that would have prevented a mess several people hit. And I would instrument the game. It would have told me where people stalled instead of leaving me to reconstruct it from Slack.
