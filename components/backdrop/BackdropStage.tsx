import type { ReactNode } from 'react'

type Mood = 'warm' | 'cool' | 'busy' | 'plain'

type BackdropProps = {
  mood?: Mood
  children?: ReactNode
}

/* The always-present stage. Default fill is the mood's CSS gradient
 * (tokens/backdrops.css) — no client JS, nothing to budget. An animated
 * fill (BackdropSlot) drops in as children without this component changing. */
export default function BackdropStage({ mood = 'cool', children }: BackdropProps) {
  return (
    <div
      className={`backdrop backdrop--${mood}`}
      data-mood={mood}
      data-stage-tone
      /* Its media is generated per chrome mode rather than being a fixed still.
       * app/globals.css keys the pre-canvas fallback paint off this. */
      data-stage-generative=""
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  )
}
