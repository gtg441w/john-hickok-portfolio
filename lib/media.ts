/**
 * An artifact's media, in the order it is shown.
 *
 * ONE ORDER, TWO SURFACES. The reading view's carousel and the card's hover slideshow
 * both walk the same frontmatter, so the rule for what comes first lives here once:
 * motion first, then stills. A surface that ordered its own media would drift from the
 * other the first time someone added a clip.
 *
 * No filesystem access, so the types are safe to import from client components.
 */
import type { Artifact, Clip, Still } from './content.schema'

/** One item in the reading view's carousel. */
export type Slide =
  /** The narrated video. Has sound, so it starts muted and keeps its controls. */
  | { kind: 'video'; src: string; poster: Still; title: string; captions?: string }
  /** A short silent clip. */
  | { kind: 'clip'; clip: Clip }
  | { kind: 'still'; still: Still }

export function slideKey(s: Slide): string {
  return s.kind === 'video' ? s.src : s.kind === 'clip' ? s.clip.src : s.still.src
}

/** The frame a slide is sized and described by. */
export function slideFrame(s: Slide): Still {
  return s.kind === 'video' ? s.poster : s.kind === 'clip' ? s.clip.poster : s.still
}

/** Hero, then gallery, each src once. The hero is left out when the artifact has a
 *  narrated video, because its hero is then a frame of that video, which already
 *  leads the carousel. */
function stillsOf(a: Artifact): Still[] {
  const seen = new Set<string>()
  const out: Still[] = []
  for (const s of [...(a.video ? [] : [a.hero]), ...a.gallery]) {
    if (seen.has(s.src)) continue
    seen.add(s.src)
    out.push(s)
  }
  return out
}

/** The reading view's carousel: the narrated video, then the clips, then the stills. */
export function articleSlides(a: Artifact): Slide[] {
  return [
    ...(a.video ? [{ kind: 'video' as const, ...a.video }] : []),
    ...a.clips.map(clip => ({ kind: 'clip' as const, clip })),
    ...stillsOf(a).map(still => ({ kind: 'still' as const, still })),
  ]
}

/** What a card plays while it is hovered or focused. Plain strings only: it crosses
 *  into a client component. */
export type CardPreview = {
  /** At most one video, played muted and cut off at `maxSeconds`. */
  video?: { src: string; narrowSrc?: string; maxSeconds: number }
  /** Image srcs, advanced on a timer after the video. */
  stills: string[]
}

/** A card's video is capped so a long narrated piece cannot hold the card. */
const CARD_VIDEO_MAX_SECONDS = 6

/** The short card clip where one exists, otherwise the opening seconds of the
 *  narrated video. Then the stills, starting with the hero, which is also the card's
 *  resting frame. */
export function cardPreview(a: Artifact): CardPreview {
  const video = a.heroClip
    ? { src: a.heroClip.src, narrowSrc: a.heroClip.narrowSrc, maxSeconds: CARD_VIDEO_MAX_SECONDS }
    : a.video
      ? { src: a.video.src, maxSeconds: CARD_VIDEO_MAX_SECONDS }
      : undefined
  const stills = [a.hero, ...stillsOf(a)].map(s => s.src)
  return { video, stills: [...new Set(stills)] }
}
