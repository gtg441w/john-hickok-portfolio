import { marked } from 'marked'
import type { Clip, Still } from '@/lib/content.schema'
import { frameOf, type ArtifactSection as Section, type Media } from '@/lib/content'

/* One section of an artifact as an expandable glass card, with its media beside it.
 *
 * NATIVE <details>, NOT A CLIENT COMPONENT. Expand and collapse, keyboard toggling
 * (Enter / Space on the summary) and the expanded state exposed to assistive tech all
 * come from the element itself, with no JavaScript. That keeps this a server
 * component, which the minimal-islands rule in CLAUDE.md asks for, and it means the
 * content is in the HTML whether or not script ever runs.
 *
 * DOM ORDER IS THE MOBILE ORDER. Media comes before the text in source because the
 * narrow layout stacks heading → media → text. The wide layout moves the media to
 * the right column with grid-area; it does not reorder the DOM, so reading and tab
 * order match what the narrow layout shows.
 *
 * NO INK OVER MEDIA. Captions sit below their image, never on it — the bounded-media
 * rule in spirit, though this is not an artifact card and check 16 does not apply. */

/* A still wider than this, shown as a column vignette, shrinks its text below what
 * anyone can read: the 2400x760 pickup diagram at ~440px wide renders its labels at
 * about 5px. Such a still takes the full card width instead, above the text. */
const WIDE_ASPECT = 2.2

function layoutFor(media: Media[]): 'text' | 'side' | 'wide' {
  if (!media.length) return 'text'
  return media.map(frameOf).some(f => f.width / f.height >= WIDE_ASPECT) ? 'wide' : 'side'
}

function Vignette({ still }: { still: Still }) {
  return (
    <figure className="artifact-section__figure">
      {/* Links to the full-resolution file: a vignette is small by design, and these
        * are UI screenshots whose detail is the point. A plain link, so enlarging an
        * image needs no lightbox and no script. */}
      <a href={still.src} target="_blank" rel="noopener" className="artifact-section__zoom">
        <img
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          loading="lazy"
          decoding="async"
        />
        <span className="visually-hidden"> (opens full size in a new tab)</span>
      </a>
      {still.caption && <figcaption>{still.caption}</figcaption>}
    </figure>
  )
}

/* A clip plays only when asked. Native controls, no autoplay and no script: nothing
 * moves unless the reader starts it, which is what a reader who prefers reduced motion
 * needs from content in the middle of an article (WCAG 2.2.2), and the poster holds
 * the frame until then. preload="none" keeps the page from spending a megabyte on a
 * clip nobody plays; width and height reserve its box from the poster, so it does not
 * shift the text when it loads.
 *
 * The clip has no audio track, so muted changes nothing today; it is there so the
 * element stays silent if a later edit ever adds a track or turns on autoplay. The
 * poster's alt is the text alternative for what happens across the clip, not just
 * the still frame. */
function ClipFigure({ clip }: { clip: Clip }) {
  const { poster } = clip
  return (
    <figure className="artifact-section__figure">
      <video
        controls
        muted
        loop
        playsInline
        preload="none"
        poster={poster.src}
        width={poster.width}
        height={poster.height}
        aria-label={poster.alt}
      >
        <source src={clip.src} type="video/mp4" />
      </video>
      {clip.caption && <figcaption>{clip.caption}</figcaption>}
    </figure>
  )
}

export function MediaFigure({ media }: { media: Media }) {
  return media.kind === 'still' ? <Vignette still={media.still} /> : <ClipFigure clip={media.clip} />
}

export default async function ArtifactSection({
  section,
  defaultOpen = true,
}: {
  section: Section
  defaultOpen?: boolean
}) {
  const html = await marked.parse(section.markdown)
  const layout = layoutFor(section.media)

  const body = (
    <div className="artifact-section__body" data-layout={layout}>
      {section.media.length > 0 && (
        <div className="artifact-section__media">
          {section.media.map(m => (
            <MediaFigure key={m.kind === 'still' ? m.still.src : m.clip.src} media={m} />
          ))}
        </div>
      )}
      {/* Authored markdown from this repo, reviewed in a commit — not user input. */}
      <div className="artifact-section__text artifact-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )

  /* Text before the first heading has no title to collapse under, so it renders as a
   * plain card rather than a <details> with an empty summary. */
  if (!section.heading) {
    return (
      <section className="glass artifact-section" data-glass-level="panel" id={section.id}>
        {body}
      </section>
    )
  }

  return (
    <details className="glass artifact-section" data-glass-level="panel" id={section.id} open={defaultOpen}>
      <summary className="artifact-section__summary">
        <h2>{section.heading}</h2>
        <span className="artifact-section__chevron" aria-hidden="true" />
      </summary>
      {body}
    </details>
  )
}
