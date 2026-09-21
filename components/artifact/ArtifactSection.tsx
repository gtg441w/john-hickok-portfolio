import { marked } from 'marked'
import type { Still } from '@/lib/content.schema'
import type { ArtifactSection as Section } from '@/lib/content'

/* One section of an artifact as an expandable glass card, with its stills beside it.
 *
 * NATIVE <details>, NOT A CLIENT COMPONENT. Expand and collapse, keyboard toggling
 * (Enter / Space on the summary) and the expanded state exposed to assistive tech all
 * come from the element itself, with no JavaScript. That keeps this a server
 * component, which the minimal-islands rule in CLAUDE.md asks for, and it means the
 * content is in the HTML whether or not script ever runs.
 *
 * DOM ORDER IS THE MOBILE ORDER. Stills come before the text in source because the
 * narrow layout stacks heading → image → text. The wide layout moves the stills to
 * the right column with grid-area; it does not reorder the DOM, so reading and tab
 * order match what the narrow layout shows.
 *
 * NO INK OVER MEDIA. Captions sit below their image, never on it — the bounded-media
 * rule in spirit, though this is not an artifact card and check 16 does not apply. */

/* A still wider than this, shown as a column vignette, shrinks its text below what
 * anyone can read: the 2400x760 pickup diagram at ~440px wide renders its labels at
 * about 5px. Such a still takes the full card width instead, above the text. */
const WIDE_ASPECT = 2.2

function layoutFor(stills: Still[]): 'text' | 'side' | 'wide' {
  if (!stills.length) return 'text'
  return stills.some(s => s.width / s.height >= WIDE_ASPECT) ? 'wide' : 'side'
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

export default async function ArtifactSection({
  section,
  defaultOpen = true,
}: {
  section: Section
  defaultOpen?: boolean
}) {
  const html = await marked.parse(section.markdown)
  const layout = layoutFor(section.stills)

  const body = (
    <div className="artifact-section__body" data-layout={layout}>
      {section.stills.length > 0 && (
        <div className="artifact-section__media">
          {section.stills.map(s => (
            <Vignette key={s.src} still={s} />
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
