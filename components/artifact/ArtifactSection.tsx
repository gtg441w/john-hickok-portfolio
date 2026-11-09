import { marked } from 'marked'
import type { ArtifactSection as Section } from '@/lib/content'

/* One section of an artifact as an expandable glass card.
 *
 * NATIVE <details>, NOT A CLIENT COMPONENT. Expand and collapse, keyboard toggling
 * (Enter / Space on the summary) and the expanded state exposed to assistive tech all
 * come from the element itself, with no JavaScript. That keeps this a server
 * component, which the minimal-islands rule in CLAUDE.md asks for, and it means the
 * content is in the HTML whether or not script ever runs.
 *
 * TEXT ONLY. An artifact's stills and clips are shown together in the carousel at the
 * top of the page (MediaCarousel), so a section carries none of its own. */

export default async function ArtifactSection({
  section,
  defaultOpen = true,
}: {
  section: Section
  defaultOpen?: boolean
}) {
  const html = await marked.parse(section.markdown)

  const body = (
    <div className="artifact-section__body">
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
