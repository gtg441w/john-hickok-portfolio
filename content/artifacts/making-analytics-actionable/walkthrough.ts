import type { Walkthrough } from '@/lib/walkthrough'

/* The guided tour of this artifact. The full text is index.md beside it; keep the two
 * saying the same thing when either changes. */
const walkthrough: Walkthrough = {
  intro: {
    heading: 'Fifteen beats, from the first audit to the last automation.',
    lead: "Take them in order. Anything you've seen stays one click away, and what's ahead opens as you reach it.",
    hook: {
      label: 'Before we start, a guess',
      prompt:
        '52% of restaurant operators ranked Total Sales Today their most important metric. How many check it several times a day?',
      options: ['30%', '52%', '75%'],
      correct: 0,
      right: 'Yes. Only 30%.',
      wrong: 'Actually, only 30%.',
      followUp:
        'Most, 54%, check it once a day. Importance is not attention, and the method ahead designs for both.',
    },
  },

  phases: [
    { num: '01', name: 'Discover', tagline: "Find out what's there.", color: '#8DB4DA' },
    { num: '02', name: 'Define', tagline: 'Turn data into real questions.', color: '#B4A5DB' },
    { num: '03', name: 'Answer', tagline: 'Make the answer visible.', color: '#86C6AE' },
    { num: '04', name: 'Act', tagline: 'Trigger a response.', color: '#DDA285' },
  ],

  steps: [
    {
      phase: 0,
      name: 'Audit',
      what: 'Collect and consolidate every available data point from existing reports, databases and exports. See what can already answer meaningful questions, and where the obvious gaps are.',
      ai: 'Ingests every report, export and spreadsheet, extracts each field, dimension and measure, and flags duplicates and conflicts across systems.',
      payoff: 'A multi-week clerical slog becomes a first draft in hours.',
      human: 'Decide what is in scope, and catch the retired source the AI has no way to know is dead.',
    },
    {
      phase: 0,
      name: 'Question',
      what: 'Research how people actually use data in their daily work: what matters most, what they monitor constantly, and what would make them take action.',
      ai: 'Synthesizes interview transcripts and support tickets at volume. Tallies themes, flags contradictions, and surfaces what people say with unusual intensity.',
      payoff: 'A week of close reading becomes an afternoon.',
      human: 'Run the conversation. The follow-up question prompted by a hesitation happens in the room, not in the transcript.',
      finding: {
        source: 'ITM Next Gen poll',
        question:
          'Respondents rated the question "Can we predict cash demand?" 4 out of 5 for how likely they were to seek the answer. How often would they actually check it?',
        answer: '2.5/5',
        detail: 'Wanting an answer and checking for it are different behaviors.',
      },
    },
    {
      phase: 0,
      name: 'Organize',
      what: 'Classify everything in a large card sort with users, subject matter experts and the project team, then converge on a single consensus data schema.',
      ai: 'Proposes a first-draft taxonomy before the session and joins the sort as one more contributor.',
      payoff: 'The room starts from a hypothesis instead of a blank table.',
      human: 'Build the consensus. Agreeing on what a category really means is a social outcome, not a data output.',
    },
    {
      phase: 1,
      name: 'Epic',
      what: 'Epics are the largest categories of data, the top of the hierarchy everything else hangs from.',
      ai: 'Drafts candidate epics from the organized schema, informed by comparable taxonomies from other domains.',
      payoff: 'Cheap to generate, cheap to discard.',
      human: 'Choose the epics that match how this business actually divides its work.',
    },
    {
      phase: 1,
      name: 'User story',
      what: "User stories capture a user's fundamental motivations inside an epic. As a manager, I want to see who is clocked in, so I can keep labor cost under control.",
      ai: 'Drafts story stems straight from interview notes and support tickets.',
      payoff: 'Coverage no analyst could type out by hand.',
      human: 'Confirm each story reflects real priorities, not just what gets said most often.',
    },
    {
      phase: 1,
      name: 'Business question',
      what: 'The questions a person asks themselves throughout a job, an industry or a product. Are any machines in danger of running out of cash? Are any employees approaching overtime?',
      ai: 'Generates a wide net of candidate questions for every story, then triages them against the evidence gathered in Discover.',
      payoff: 'More candidates than a team would brainstorm alone, already sorted.',
      human: 'Make the cut. Separating the critical and innovative question from the merely plausible one needs business context AI does not have.',
    },
    {
      phase: 2,
      name: 'Answers',
      what: 'Identify the data dimensions and measures that can answer each business question.',
      ai: 'Maps questions to existing measures, flags missing data, proposes derived metrics, and pulls in outside sources like weather or market benchmarks.',
      payoff: 'Answers that reach beyond the data you already own.',
      human: 'Define exactly what each metric means. AI can compute a ratio instantly; it cannot decide what the denominator should be.',
    },
    {
      phase: 2,
      name: 'Visualizations',
      what: 'Charts, graphs and metric presentations that give each answer context, and show dimensions and measures over time so the data tells a story.',
      ai: 'Drafts several chart options for every answer, applying visualization best practice by default.',
      payoff: 'Real options to test on day one.',
      human: 'Test with real people. Looks right and reads right are two different results.',
      finding: {
        source: 'Aloha Smart Manager survey',
        question:
          '69% of restaurant operators ranked Total Void Counts 9th or 10th out of 10 metrics. How many still check it every day?',
        answer: '39%',
        detail: 'Low importance, steady attention. The dashboard has to make room for both.',
      },
    },
    {
      phase: 3,
      name: 'Thresholds',
      what: 'Identify the thresholds in critical data that should make someone take action.',
      ai: 'Sets thresholds from historical distributions instead of round-number guesses, and recalibrates them as conditions drift.',
      payoff: 'Fewer false alarms and fewer misses.',
      human: 'Price the trade-off between a false alarm and a missed one. That is risk tolerance, not statistics.',
    },
    {
      phase: 3,
      name: 'Actions',
      what: 'Pair each threshold with a call to action that guides people toward the recommended response.',
      ai: 'Recommends the next best action for each breach, tuned to what has worked before.',
      payoff: 'Guidance at the exact moment it is needed.',
      human: 'Decide which actions are allowed to be suggested at all. In banking, that line is compliance, not modeling.',
    },
    {
      phase: 3,
      name: 'Automate',
      what: 'Identify the actions that can run automatically, helping people without the risk of taking a human out of the loop.',
      ladder: true,
    },
  ],

  ladder: {
    heading: 'Climb only as trust is earned.',
    question: 'Are any employees approaching overtime?',
    rungs: [
      {
        name: 'Human in the loop',
        rule: 'AI recommends. A person acts.',
        example: 'AI flags employees nearing overtime and suggests who could clock out early. The manager decides.',
      },
      {
        name: 'Human on the loop',
        rule: 'AI acts. A person can undo it.',
        example: "AI drafts next week's schedule to head off overtime. The manager reviews it and can roll it back.",
      },
      {
        name: 'Autonomous, within limits',
        rule: 'AI acts alone on low-risk, reversible work.',
        example: 'AI reminds anyone still clocked in after close to clock out.',
      },
    ],
    note: 'A person keeps the audit. Anything costly or hard to reverse stays on rung one.',
  },

  proof: {
    label: 'The proof',
    heading: 'The schema outlived its screen.',
    body: 'When Aloha Smart Manager moved into NCR Voyix Central as part of a micro-frontend platform strategy, the same data and metrics carried into the NCR Voyix Home Dashboard. The mapping from epic to measurement was never a property of one screen.',
    stats: [
      {
        figure: '2 industries',
        text: 'Banking and restaurants, with little in common. The same finding in both: stated importance does not predict what people check.',
      },
      {
        figure: '71%',
        text: "ranked Raw Items in Danger of Running Out their top metric, and they check it daily or more. Sometimes importance and attention agree. The work is finding where they don't.",
      },
    ],
  },

  ai: {
    label: 'Where AI fits',
    heading: ['Time, delegate.', 'Trust, keep.'],
    body: 'Divergent work, generating many options fast, is where AI leads. Convergent work, deciding and owning the outcome, stays with a person.',
    caveat: 'Everything before this beat happened. This one is a proposal: how the method evolves next.',
    zones: [
      {
        name: 'AI leads',
        axis: 'Many options · cheap mistakes',
        examples: 'Extract every field from every report. Draft a first taxonomy. Generate candidate questions. Sketch chart variants.',
        owner: 'ai',
      },
      {
        name: 'AI proposes, you decide',
        axis: 'Many options · costly mistakes',
        examples: 'Triage business questions. Recommend thresholds. Suggest next best actions.',
        owner: 'shared',
      },
      {
        name: 'Automate the chore',
        axis: 'Few options · cheap mistakes',
        examples: 'Tally interview themes. Flag duplicate fields. Remind staff to clock out after close.',
        owner: 'ai',
      },
      {
        name: 'A person owns it',
        axis: 'Few options · costly mistakes',
        examples: 'Run the interview. Define what a metric means. Set compliance limits. Make the final cut.',
        owner: 'person',
      },
    ],
    axisY: 'Hundreds of options',
    axisX: ['A mistake costs time', 'A mistake costs trust'],
  },

  close: {
    label: 'Acknowledgment',
    acknowledgment:
      "I learned the foundation of this method, epic to user story to business question to measurement, from Norm Trujillo, through months of conversation and collaboration on NCR Voyix's ITM Next Gen team. Without him, I would have had nothing to evolve or adapt.",
    signature: 'John Hickok',
    prompt: {
      label: 'Your turn',
      question: 'What metric does your team call critical, but rarely check?',
      body: 'That gap is where the next dashboard should start.',
    },
  },
}

export default walkthrough
