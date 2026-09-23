/**
 * Guided walkthroughs · the script an artifact with `layout: walkthrough` is toured by.
 *
 * The copy lives beside the artifact's markdown, in content/artifacts/<slug>/
 * walkthrough.ts, and is registered below. A walkthrough is a sequence of beats, not
 * prose, so it is typed data rather than markdown; the markdown body stays the full
 * text and renders under the tour.
 *
 * A `walkthrough` artifact with no registered script throws at build, for the same
 * reason the content loader throws on bad frontmatter: a page that silently falls back
 * to something else is a defect nobody sees.
 */
import analyticsWalkthrough from '@/content/artifacts/making-analytics-actionable/walkthrough'

export type WalkthroughPhase = {
  num: string
  name: string
  tagline: string
  /** A marker colour only: bars, dots, swatches. Never ink, because a pastel over light
   *  glass cannot hold AA as text. */
  color: string
}

export type WalkthroughFinding = {
  source: string
  question: string
  answer: string
  detail: string
}

export type WalkthroughStep = {
  /** Index into `phases`. */
  phase: number
  name: string
  what: string
  ai?: string
  payoff?: string
  human?: string
  finding?: WalkthroughFinding
  /** This step's AI layer is the automation ladder rather than the three-part panel. */
  ladder?: boolean
}

export type Walkthrough = {
  intro: {
    heading: string
    lead: string
    hook: {
      label: string
      prompt: string
      options: string[]
      correct: number
      right: string
      wrong: string
      followUp: string
    }
  }
  phases: WalkthroughPhase[]
  steps: WalkthroughStep[]
  ladder: {
    heading: string
    question: string
    rungs: { name: string; rule: string; example: string }[]
    note: string
  }
  proof: {
    label: string
    heading: string
    body: string
    stats: { figure: string; text: string }[]
  }
  ai: {
    label: string
    heading: [string, string]
    body: string
    caveat: string
    zones: { name: string; axis: string; examples: string; owner: 'ai' | 'shared' | 'person' }[]
    axisY: string
    axisX: [string, string]
  }
  close: {
    label: string
    acknowledgment: string
    signature: string
    prompt: { label: string; question: string; body: string }
  }
}

const WALKTHROUGHS: Record<string, Walkthrough> = {
  'making-analytics-actionable': analyticsWalkthrough,
}

export function getWalkthrough(slug: string): Walkthrough {
  const w = WALKTHROUGHS[slug]
  if (!w) {
    throw new Error(
      `content/artifacts/${slug}/index.md declares layout: walkthrough, but no script is ` +
        `registered for it in lib/walkthrough.ts.`
    )
  }
  return w
}
