'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react'
import type { Walkthrough as Script } from '@/lib/walkthrough'

/* A guided, in-order tour of a framework. A client island because the tour holds
 * state (where you are, how far you have been, what you have opened) and nothing
 * else in the reading view needs any.
 *
 * THE STORY LANDS IN ORDER. Next always moves one beat forward. The rail lets a reader
 * jump back to anything already seen, and nothing ahead of the furthest beat reached.
 * Interactivity lives inside beats (a guess, a reveal, the AI layer, the ladder), never
 * in the order of them.
 *
 * ONE GLASS SURFACE. The stage is the glass panel; every card inside it is a wash of
 * currentColor, never another .glass, because nested glass drops its filter by design.
 * Ink is --glass-text throughout so it inverts with chrome mode. Phase colours mark
 * things (bars, swatches, underlines) and never carry text: a pastel over light glass
 * cannot hold AA as ink.
 *
 * DISCLOSURES KEEP THEIR BUTTON. The AI layer, the research reveal and the hook each
 * toggle with a button that stays mounted, so focus never drops to the page when
 * content opens beside it. */

const pad = (n: number) => String(n).padStart(2, '0')

export default function Walkthrough({ script }: { script: Script }) {
  const { intro, phases, steps, ladder, proof, ai, close } = script
  const PROOF = steps.length + 1
  const AI = PROOF + 1
  const CLOSE = AI + 1
  const TOTAL = CLOSE + 1

  const [beat, setBeat] = useState(0)
  const [maxBeat, setMaxBeat] = useState(0)
  const [aiOpen, setAiOpen] = useState(false)
  const [guess, setGuess] = useState<number | null>(null)
  const [revealed, setRevealed] = useState<number[]>([])
  const [rung, setRung] = useState(0)

  const rootRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const navigated = useRef(false)

  function go(b: number) {
    const next = Math.max(0, Math.min(CLOSE, b))
    navigated.current = true
    setBeat(next)
    setMaxBeat(m => Math.max(m, next))
  }

  /* After a move, bring the stage back into view if the reader had scrolled past its
   * top, and hand focus to the new beat's heading so assistive tech announces it. Not
   * on first render: landing on the page should not steal focus. */
  useEffect(() => {
    if (!navigated.current) return
    const root = rootRef.current
    if (root && root.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      root.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' })
    }
    headingRef.current?.focus({ preventScroll: true })
  }, [beat])

  const labelOf = (b: number) =>
    b === 0 ? 'Intro' : b <= steps.length ? steps[b - 1].name : b === PROOF ? proof.label : b === AI ? ai.label : 'Close'

  let nextLabel = ''
  if (beat === 0) nextLabel = `Start with ${phases[0].name}`
  else if (beat < steps.length) {
    const here = steps[beat - 1]
    const there = steps[beat]
    nextLabel = here.phase === there.phase ? `Next: ${there.name}` : `Next: ${phases[there.phase].name} · ${there.name}`
  } else if (beat < CLOSE) nextLabel = `Next: ${labelOf(beat + 1)}`

  const segments = [
    { label: 'Intro', beats: [0], color: undefined as string | undefined },
    ...phases.map((p, i) => ({
      label: p.name,
      color: p.color,
      beats: steps.flatMap((s, j) => (s.phase === i ? [j + 1] : [])),
    })),
    { label: 'Proof', beats: [PROOF], color: undefined },
    { label: 'AI', beats: [AI], color: undefined },
    { label: 'Close', beats: [CLOSE], color: undefined },
  ]

  const step = beat >= 1 && beat <= steps.length ? steps[beat - 1] : null
  const phase = step ? phases[step.phase] : null

  return (
    <section
      ref={rootRef}
      className="glass walkthrough"
      data-glass-level="panel"
      aria-label="Guided walkthrough"
    >
      <nav className="walkthrough__rail" aria-label="Walkthrough progress">
        {segments.map(seg => {
          const current = seg.beats.includes(beat)
          const locked = seg.beats[0] > maxBeat
          return (
            <button
              key={seg.label}
              type="button"
              className="walkthrough__seg"
              disabled={locked}
              aria-label={locked ? `${seg.label}, not reached yet` : seg.label}
              aria-current={current ? 'step' : undefined}
              onClick={() => go(seg.beats[0])}
            >
              <span>{seg.label}</span>
              <span className="walkthrough__dots" aria-hidden="true">
                {seg.beats.map(b => (
                  <span
                    key={b}
                    className="walkthrough__dot"
                    data-state={b === beat ? 'current' : b <= maxBeat ? 'seen' : 'ahead'}
                    style={seg.color ? ({ '--dot': seg.color } as CSSProperties) : undefined}
                  />
                ))}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="walkthrough__beat" key={beat}>
        {beat === 0 && (
          <>
            <div className="walkthrough__col">
              <Heading ref={headingRef} size="display">{intro.heading}</Heading>
              <p className="walkthrough__lead">{intro.lead}</p>
            </div>
            <div className="walkthrough__card">
              <p className="walkthrough__micro">{intro.hook.label}</p>
              <p className="walkthrough__lead walkthrough__strong">{intro.hook.prompt}</p>
              <div className="walkthrough__options" role="group" aria-label="Your guess">
                {intro.hook.options.map((o, i) => {
                  const answered = guess !== null
                  const state = answered && i === intro.hook.correct ? 'correct' : guess === i ? 'picked' : undefined
                  return (
                    <button
                      key={o}
                      type="button"
                      className="walkthrough__option"
                      data-state={state}
                      aria-pressed={guess === i}
                      onClick={() => setGuess(i)}
                    >
                      {o}
                    </button>
                  )
                })}
              </div>
              <div aria-live="polite">
                {guess !== null && (
                  <div className="walkthrough__result">
                    <p className="walkthrough__title">
                      {guess === intro.hook.correct ? intro.hook.right : intro.hook.wrong}
                    </p>
                    <p className="walkthrough__muted">{intro.hook.followUp}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {step && phase && (
          <>
            <div className="walkthrough__col">
              <p className="walkthrough__micro walkthrough__phase">
                <span className="walkthrough__swatch" style={{ background: phase.color }} aria-hidden="true" />
                Phase {phase.num} · {phase.name}
              </p>
              <p className="walkthrough__muted">{phase.tagline}</p>
              <p className="walkthrough__micro">
                Step {pad(beat)} of {steps.length}
              </p>
              <Heading ref={headingRef} size="hero">{step.name}</Heading>
              <p className="walkthrough__lead">{step.what}</p>
              {step.finding && (
                <Finding
                  finding={step.finding}
                  open={revealed.includes(beat)}
                  onToggle={() =>
                    setRevealed(r => (r.includes(beat) ? r.filter(x => x !== beat) : [...r, beat]))
                  }
                />
              )}
            </div>

            <div className="walkthrough__col">
              {step.ladder ? (
                <div className="walkthrough__card">
                  <p className="walkthrough__micro walkthrough__phase">
                    <Spark /> The AI layer · {step.name}
                  </p>
                  <p className="walkthrough__title">{ladder.heading}</p>
                  <div className="walkthrough__ladder" role="group" aria-label="Automation rungs">
                    {ladder.rungs.map((r, i) => (
                      <button
                        key={r.name}
                        type="button"
                        className="walkthrough__rung"
                        data-rung={i + 1}
                        aria-pressed={rung === i}
                        onClick={() => setRung(i)}
                      >
                        <span className="walkthrough__micro">Rung {i + 1}</span>
                        <span className="walkthrough__rung-name">{r.name}</span>
                        <span className="walkthrough__small">{r.rule}</span>
                      </button>
                    ))}
                  </div>
                  <div className="walkthrough__divided" aria-live="polite">
                    <p className="walkthrough__micro">{ladder.question}</p>
                    <p className="walkthrough__body">{ladder.rungs[rung].example}</p>
                  </div>
                  <p className="walkthrough__small walkthrough__muted">{ladder.note}</p>
                </div>
              ) : (
                <AiLayer step={step} open={aiOpen} onToggle={() => setAiOpen(o => !o)} />
              )}
            </div>
          </>
        )}

        {beat === PROOF && (
          <>
            <div className="walkthrough__col">
              <p className="walkthrough__micro">{proof.label}</p>
              <Heading ref={headingRef} size="hero">{proof.heading}</Heading>
              <p className="walkthrough__lead">{proof.body}</p>
            </div>
            <div className="walkthrough__col">
              {proof.stats.map(s => (
                <div key={s.figure} className="walkthrough__card">
                  <p className="walkthrough__figure">{s.figure}</p>
                  <p className="walkthrough__body walkthrough__muted">{s.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {beat === AI && (
          <>
            <div className="walkthrough__col">
              <p className="walkthrough__micro walkthrough__phase">
                <Spark /> {ai.label}
              </p>
              <Heading ref={headingRef} size="hero">
                <span className="walkthrough__line">{ai.heading[0]}</span>
                <span className="walkthrough__line">{ai.heading[1]}</span>
              </Heading>
              <p className="walkthrough__lead">{ai.body}</p>
              <p className="walkthrough__small walkthrough__muted walkthrough__divided">{ai.caveat}</p>
            </div>
            <div className="walkthrough__col">
              <p className="walkthrough__micro">↑ {ai.axisY}</p>
              <div className="walkthrough__quadrant">
                {ai.zones.map(z => (
                  <div key={z.name} className="walkthrough__zone" data-owner={z.owner}>
                    <p className="walkthrough__rung-name">{z.name}</p>
                    <p className="walkthrough__micro">{z.axis}</p>
                    <p className="walkthrough__small">{z.examples}</p>
                  </div>
                ))}
              </div>
              <p className="walkthrough__micro walkthrough__axis">
                <span>{ai.axisX[0]}</span>
                <span className="walkthrough__rule" aria-hidden="true" />
                <span>{ai.axisX[1]} →</span>
              </p>
            </div>
          </>
        )}

        {beat === CLOSE && (
          <>
            <div className="walkthrough__col">
              <Heading ref={headingRef} size="label">{close.label}</Heading>
              <p className="walkthrough__quote">{close.acknowledgment}</p>
              <p className="walkthrough__muted">{close.signature}</p>
            </div>
            <div className="walkthrough__col">
              <div className="walkthrough__card">
                <p className="walkthrough__micro">{close.prompt.label}</p>
                <p className="walkthrough__title">{close.prompt.question}</p>
                <p className="walkthrough__muted">{close.prompt.body}</p>
              </div>
              <div className="walkthrough__links">
                <a href="#full-text">Read it straight through</a>
                <Link href="/connect">Get in touch</Link>
              </div>
            </div>
          </>
        )}
      </div>

      <footer className="walkthrough__nav">
        {beat > 0 && (
          <button type="button" className="walkthrough__btn" onClick={() => go(beat - 1)}>
            ← Back
          </button>
        )}
        <span className="walkthrough__small walkthrough__muted">
          {pad(beat + 1)} of {TOTAL} · {labelOf(beat)}
        </span>
        {beat < CLOSE ? (
          <button type="button" className="walkthrough__btn walkthrough__btn--primary" onClick={() => go(beat + 1)}>
            {nextLabel} →
          </button>
        ) : (
          <button
            type="button"
            className="walkthrough__btn walkthrough__btn--primary"
            onClick={() => {
              setGuess(null)
              setRevealed([])
              setRung(0)
              go(0)
            }}
          >
            Walk it again ↺
          </button>
        )}
      </footer>
    </section>
  )
}

function Heading({
  ref,
  size,
  children,
}: {
  ref: Ref<HTMLHeadingElement>
  size: 'display' | 'hero' | 'label'
  children: ReactNode
}) {
  return (
    <h2 ref={ref} tabIndex={-1} className="walkthrough__heading" data-size={size}>
      {children}
    </h2>
  )
}

function Spark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 1.5v3M7 9.5v3M1.5 7h3M9.5 7h3M3.1 3.1l1.8 1.8M9.1 9.1l1.8 1.8M10.9 3.1L9.1 4.9M4.9 9.1l-1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Finding({
  finding,
  open,
  onToggle,
}: {
  finding: NonNullable<Script['steps'][number]['finding']>
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="walkthrough__card">
      <p className="walkthrough__micro">What the research found · {finding.source}</p>
      <p className="walkthrough__body">{finding.question}</p>
      <button type="button" className="walkthrough__btn walkthrough__btn--small" aria-expanded={open} onClick={onToggle}>
        {open ? 'Hide the answer' : 'Make a guess, then reveal'}
      </button>
      <div aria-live="polite">
        {open && (
          <p className="walkthrough__answer">
            <span className="walkthrough__figure">{finding.answer}</span>
            <span className="walkthrough__body walkthrough__muted">{finding.detail}</span>
          </p>
        )}
      </div>
    </div>
  )
}

function AiLayer({
  step,
  open,
  onToggle,
}: {
  step: Script['steps'][number]
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="walkthrough__ai" data-open={open ? '' : undefined}>
      {/* The same button element open or closed, so focus stays put when the panel
        * appears beneath it. */}
      <button type="button" className="walkthrough__ai-toggle" aria-expanded={open} onClick={onToggle}>
        <span className="walkthrough__micro walkthrough__phase">
          <Spark /> The AI layer{open ? ` · ${step.name}` : ''}
        </span>
        {open ? (
          <span className="walkthrough__small">Hide</span>
        ) : (
          <>
            <span className="walkthrough__title">How does AI change this step?</span>
            <span className="walkthrough__body walkthrough__muted">
              Open it to see what AI speeds up here, the payoff, and what a person should still own. It stays
              open as you continue.
            </span>
            <span className="walkthrough__small walkthrough__strong">Open the AI layer ↓</span>
          </>
        )}
      </button>
      {open && (
        <div className="walkthrough__ai-body">
          <div>
            <p className="walkthrough__micro">AI accelerates</p>
            <p className="walkthrough__body">{step.ai}</p>
          </div>
          <div className="walkthrough__divided walkthrough__divided--both">
            <p className="walkthrough__micro">Payoff</p>
            <p className="walkthrough__title">{step.payoff}</p>
          </div>
          <div>
            <p className="walkthrough__micro">A person keeps</p>
            <p className="walkthrough__body">{step.human}</p>
          </div>
        </div>
      )}
    </div>
  )
}
