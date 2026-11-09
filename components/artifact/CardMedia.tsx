'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { Clip, Still } from '@/lib/content.schema'
import type { CardPreview } from '@/lib/media'

/* An artifact card's media row, and the slideshow it plays while the card is hovered
 * or focused: the artifact's video first, muted and capped, then its stills.
 *
 * IT IS THE MEDIA ELEMENT AND NOTHING ELSE. Check 16 wants exactly two children on a
 * card, media then band, with nothing rendered inside the media. So this renders one
 * element, a <div> with a background-image or a <video>, swapped as the preview moves
 * between them, and listens for hover and focus on the card it sits in (its parent)
 * rather than wrapping it. The card itself stays a server component.
 *
 * WHEN IT PLAYS. Only while a mouse is over the card, or while the card has keyboard
 * focus (:focus-visible, so a tap on a phone does not count). It never plays on a
 * touch screen, and never for a reader who prefers reduced motion. Leaving the card
 * puts it back on its first image.
 *
 * NEVER ANY SOUND. Every video is muted, on the element and as a property, because
 * React does not reliably write the attribute.
 *
 * THE INTRO CLIP is the hero card's play-once motion on page load, kept as it was:
 * its sources carry the reduced-motion query, so it works without script. Once a
 * reader has hovered the card, the intro is done for good. */

const STILL_MS = 1500
const NARROW = '(max-width: 719px)'

/* `from` is the image fading out as this phase fades in: a still's src, or a frame
 * captured from the video it follows. */
type Phase =
  | { kind: 'rest'; from?: string }
  | { kind: 'video' }
  | { kind: 'still'; index: number; from?: string }

function canPlay(): boolean {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasHover(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/* Decoded once and kept, so a fade never starts on an image the browser has not
 * painted yet. That half-loaded first frame is what made the old swap look like a
 * flash rather than a fade. */
const decoded = new Map<string, Promise<void>>()
function decode(src: string): Promise<void> {
  let p = decoded.get(src)
  if (!p) {
    const img = new Image()
    img.src = src
    p = img.decode().catch(() => undefined)
    decoded.set(src, p)
  }
  return p
}

/* The frame a video is showing, as an image, so the move from video to still can
 * fade like any other instead of cutting. Same-origin media, so the canvas is never
 * tainted; if it is anyway, the caller falls back to the hero still. */
function grabFrame(el: Element | null): string | undefined {
  if (!(el instanceof HTMLVideoElement) || el.readyState < 2 || !el.videoWidth) return
  try {
    const scale = Math.min(1, 960 / el.videoWidth)
    const c = document.createElement('canvas')
    c.width = Math.round(el.videoWidth * scale)
    c.height = Math.round(el.videoHeight * scale)
    c.getContext('2d')?.drawImage(el, 0, 0, c.width, c.height)
    return c.toDataURL('image/jpeg', 0.85)
  } catch {
    return
  }
}

export default function CardMedia({
  still,
  intro,
  preview,
}: {
  still: Still
  /** Play-once motion on page load. Only where the card is the page's hero. */
  intro?: Clip
  preview?: CardPreview
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [phase, setPhase] = useState<Phase>({ kind: 'rest' })
  const [introDone, setIntroDone] = useState(!intro)
  const preloaded = useRef(false)

  const stills = useMemo(
    () => (preview?.stills.length ? preview.stills : [still.src]),
    [preview?.stills, still.src],
  )
  const video = preview?.video
  const animates = Boolean(video) || stills.length > 1

  /* Leaving the video: capture its frame, wait for the next still to decode, then
   * fade from one to the other. */
  const toStills = useCallback(() => {
    const from = grabFrame(ref.current) ?? still.src
    if (stills.length < 2) {
      setPhase({ kind: 'rest', from })
      return
    }
    decode(stills[1]).then(() =>
      setPhase(p => (p.kind === 'video' ? { kind: 'still', index: 1, from } : p)),
    )
  }, [stills, still.src])

  /* Hover and focus are on the card, which is this element's parent. */
  useEffect(() => {
    const card = ref.current?.parentElement
    if (!card || !animates) return

    const start = () => {
      if (!canPlay()) return
      setIntroDone(true)
      if (!preloaded.current) {
        preloaded.current = true
        stills.forEach(decode)
      }
      setPhase(p => (p.kind !== 'rest' ? p : video ? { kind: 'video' } : { kind: 'still', index: 0 }))
    }
    /* Back to the first image, faded from wherever the preview was. */
    const stop = () =>
      setPhase(p =>
        p.kind === 'rest' ? p
        : p.kind === 'video' ? { kind: 'rest', from: grabFrame(ref.current) }
        : { kind: 'rest', from: p.index === 0 ? undefined : stills[p.index] },
      )

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && hasHover()) start()
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && !card.matches(':focus-visible')) stop()
    }
    const onFocus = () => {
      if (card.matches(':focus-visible')) start()
    }
    const onBlur = () => {
      if (!card.matches(':hover')) stop()
    }

    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointerleave', onLeave)
    card.addEventListener('focusin', onFocus)
    card.addEventListener('focusout', onBlur)
    return () => {
      card.removeEventListener('pointerenter', onEnter)
      card.removeEventListener('pointerleave', onLeave)
      card.removeEventListener('focusin', onFocus)
      card.removeEventListener('focusout', onBlur)
    }
  }, [animates, video, stills])

  /* The stills advance on a timer and loop, each one only once it has decoded. */
  useEffect(() => {
    if (phase.kind !== 'still') return
    let live = true
    const next = (phase.index + 1) % stills.length
    const t = window.setTimeout(() => {
      decode(stills[next]).then(() => {
        if (live) setPhase({ kind: 'still', index: next, from: stills[phase.index] })
      })
    }, STILL_MS)
    return () => {
      live = false
      window.clearTimeout(t)
    }
  }, [phase, stills])

  /* Muted as a property, then played. A browser that refuses to play skips to the
   * stills rather than sitting on a frozen frame. */
  useEffect(() => {
    const el = ref.current
    if (!(el instanceof HTMLVideoElement)) return
    el.muted = true
    el.defaultMuted = true
    if (phase.kind === 'video') el.play().catch(() => toStills())
  }, [phase.kind, introDone, toStills])

  const setRef = (el: HTMLElement | null) => {
    ref.current = el
  }

  if (phase.kind === 'video' && video) {
    const narrow = video.narrowSrc && window.matchMedia(NARROW).matches
    return (
      <video
        ref={setRef}
        data-artifact-media=""
        src={narrow ? video.narrowSrc : video.src}
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        poster={still.src}
        aria-hidden="true"
        onTimeUpdate={e => {
          if (e.currentTarget.currentTime >= video.maxSeconds) toStills()
        }}
        onEnded={() => toStills()}
        onError={() => toStills()}
      />
    )
  }

  if (phase.kind === 'still') {
    const src = stills[phase.index]
    return (
      <div
        key={`${phase.index}-${src}`}
        ref={setRef}
        data-artifact-media=""
        data-fade={phase.from ? '' : undefined}
        style={
          {
            backgroundImage: `url("${src}")`,
            '--fade-from': phase.from ? `url("${phase.from}")` : undefined,
          } as CSSProperties
        }
      />
    )
  }

  const restFrom = phase.kind === 'rest' ? phase.from : undefined

  if (intro && !introDone && !restFrom) {
    /* The intro, as before: sources gated on reduced motion, the narrow cut first. */
    const motion = '(prefers-reduced-motion: no-preference)'
    return (
      <video
        ref={setRef}
        data-artifact-media=""
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        poster={intro.poster.src}
        aria-hidden="true"
        onEnded={() => setIntroDone(true)}
      >
        {intro.narrowSrc && (
          <source src={intro.narrowSrc} type="video/mp4" media={`${motion} and ${NARROW}`} />
        )}
        <source src={intro.src} type="video/mp4" media={motion} />
      </video>
    )
  }

  return (
    <div
      key={restFrom ? `rest-${restFrom.slice(-32)}` : 'rest'}
      ref={setRef}
      data-artifact-media=""
      data-fade={restFrom ? '' : undefined}
      style={
        {
          backgroundImage: `url("${still.src}")`,
          '--fade-from': restFrom ? `url("${restFrom}")` : undefined,
        } as CSSProperties
      }
    />
  )
}
