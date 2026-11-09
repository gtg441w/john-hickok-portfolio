'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { slideFrame, slideKey, type Slide } from '@/lib/media'

/* The reading view's media, at the top of the article, as one carousel.
 *
 * THE TRACK IS A NATIVE SCROLL-SNAP CONTAINER. Swipe on touch, two-finger scroll on a
 * trackpad and the no-script case all come from the browser; the script only adds the
 * arrows, the thumbnails, the arrow keys and the "3 of 8" readout, and keeps them in
 * step with wherever the track was scrolled to.
 *
 * IT WRAPS. Next on the last slide returns to the first, and previous on the first
 * goes to the last, so the arrows are never disabled.
 *
 * IT NEVER ADVANCES ON ITS OWN. Motion that starts by itself needs a pause control
 * (WCAG 2.2.2), and a carousel that moves at the top of a long read pulls the eye off
 * the text. The card's hover slideshow is where the motion lives; this one waits.
 *
 * NO INK OVER MEDIA. The arrows, caption and thumbnails sit in a row below the stage,
 * on the panel's own glass, never on the image. Every still is shown whole
 * (object-fit: contain): these are screenshots and diagrams whose detail is the point,
 * and a crop that suits one would cut the labels off the next.
 *
 * SOUND IS ALWAYS OPT-IN. Every video starts muted. The narrated one keeps its
 * controls so a reader can turn the narration on; clips have no audio track at all.
 * Moving to another slide pauses whatever was playing. */

export default function MediaCarousel({ slides, label }: { slides: Slide[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const count = slides.length

  /* React does not reliably write `muted` into server HTML, so set it on the elements
   * themselves. Without this a narrated video could start with sound. */
  useEffect(() => {
    trackRef.current?.querySelectorAll('video').forEach(v => {
      v.muted = true
      v.defaultMuted = true
    })
  }, [])

  /* Follow the track rather than drive it: a swipe, a trackpad scroll and a button
   * press all end with the track at some slide, and the readout reads it from there. */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth)
        setIndex(Math.max(0, Math.min(count - 1, i)))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [count])

  /* Leaving a slide pauses it, and keeps its thumbnail in view. */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    Array.from(track.children).forEach((slide, i) => {
      if (i !== index) slide.querySelectorAll('video').forEach(v => v.pause())
    })
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined
    thumb?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [index])

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current
      if (!track) return
      /* Wraps: past the last slide is the first, before the first is the last. */
      const next = ((i % count) + count) % count
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      track.scrollTo({ left: next * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
      setIndex(next)
    },
    [count],
  )

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    /* Leave the keys alone while a video's own controls have focus: there, left and
     * right seek. */
    if ((e.target as HTMLElement).tagName === 'VIDEO') return
    const to =
      e.key === 'ArrowRight' ? index + 1
      : e.key === 'ArrowLeft' ? index - 1
      : e.key === 'Home' ? 0
      : e.key === 'End' ? count - 1
      : null
    if (to === null) return
    e.preventDefault()
    goTo(to)
  }

  if (!count) return null
  const current = slides[index]
  const caption =
    current.kind === 'video' ? current.title
    : current.kind === 'clip' ? current.clip.caption
    : current.still.caption
  const single = count === 1

  return (
    <section
      className="glass media-carousel"
      data-glass-level="panel"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <div ref={trackRef} className="media-carousel__track" tabIndex={0} aria-label="Slides">
        {slides.map((s, i) => (
          <div
            key={slideKey(s)}
            className="media-carousel__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index || undefined}
            inert={i !== index || undefined}
          >
            <SlideMedia slide={s} eager={i === 0} />
          </div>
        ))}
      </div>

      <div className="media-carousel__bar">
        {!single && (
          <button
            type="button"
            className="media-carousel__arrow"
            onClick={() => goTo(index - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}
        <p className="media-carousel__caption" aria-live="polite">
          {!single && (
            <span className="mono glass-micro media-carousel__count">
              {index + 1} / {count}
            </span>
          )}
          {caption && <span>{caption}</span>}
          {current.kind === 'still' && (
            <a href={current.still.src} target="_blank" rel="noopener" className="media-carousel__full">
              Full size<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
        </p>
        {!single && (
          <button
            type="button"
            className="media-carousel__arrow"
            onClick={() => goTo(index + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">›</span>
          </button>
        )}
      </div>

      {!single && (
        <div ref={thumbsRef} className="media-carousel__thumbs">
          {slides.map((s, i) => {
            const f = slideFrame(s)
            return (
              <button
                key={slideKey(s)}
                type="button"
                className="media-carousel__thumb"
                aria-label={`Show ${i + 1} of ${count}`}
                aria-current={i === index || undefined}
                onClick={() => goTo(i)}
              >
                <img src={f.src} alt="" width={f.width} height={f.height} loading="lazy" decoding="async" />
                {s.kind !== 'still' && <span className="media-carousel__play" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

function SlideMedia({ slide, eager }: { slide: Slide; eager: boolean }) {
  const f = slideFrame(slide)
  if (slide.kind === 'still') {
    return (
      <img
        src={f.src}
        alt={f.alt}
        width={f.width}
        height={f.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }
  /* preload="none": nothing is spent on a video until a reader starts it. The poster
   * is a full Still, so its box is reserved from intrinsic dimensions. */
  const src = slide.kind === 'video' ? slide.src : slide.clip.src
  return (
    <video
      controls
      muted
      playsInline
      loop={slide.kind === 'clip'}
      preload="none"
      poster={f.src}
      width={f.width}
      height={f.height}
      aria-label={slide.kind === 'video' ? slide.title : f.alt}
    >
      <source src={src} type="video/mp4" />
      {slide.kind === 'video' && slide.captions && (
        <track kind="captions" src={slide.captions} srcLang="en" label="English" default />
      )}
    </video>
  )
}
