import type { Still } from '@/lib/content.schema'
import ArtifactCard from '@/components/artifact/ArtifactCard'
import Rail from '@/components/artifact/Rail'
import FrameworkCard from '@/components/framework/FrameworkCard'
import { getPublishedArtifacts, kindLine, metaLine } from '@/lib/content'

function still(src: string, width: number, height: number): Still {
  return { src, alt: '', width, height, chromeMode: 'dark', scrimStrength: 0.62 }
}

const frameworks = [
  { title: 'Altitude', subtitle: '[Executive to tactical, one model.]' },
  { title: 'Ambiguity to execution', subtitle: '[Framework 02 — one line.]' },
  { title: 'Operating cadence', subtitle: '[Framework 03 — one line.]' },
  { title: '[Framework 04]', subtitle: '[Framework 04 — one line.]' },
]

/* Projects with no artifact written yet. These are bracket-holes wearing real
 * titles: the image is a handoff stand-in (CLAUDE.md, Imagery — nothing about its
 * subject or crop is a decision) and the card links to the collection rather than
 * to a page that does not exist.
 *
 * This list only ever shrinks. The moment content/artifacts/<slug>/index.md lands
 * with published: true, the artifact renders itself from its own frontmatter above
 * these, so the only edit needed here is deleting the line.
 *
 * Aloha Smart Manager is included: it was held out pending review and John cleared
 * it on 2026-09-20 (Gate 0, docs/BUILD_PLAN.md). Removing it again is a one-line
 * deletion, which is the point — there is more finished work than there are slots. */
const pendingProjects = [
  { title: 'Fresco', src: '/media/artifact-movie-box.png', w: 752, h: 588 },
  { title: 'ITM', src: '/media/artifact-weather-glass.png', w: 1200, h: 844 },
  { title: 'Aloha Smart Manager', src: '/media/artifact-voice-app.png', w: 2048, h: 1536 },
]

/* The hero before anything is published. Not a fallback for an error — it is the
 * honest state of a collection with nothing in it yet, and it kept the homepage
 * standing for the whole stretch before the first artifact existed. */
const placeholderHero = {
  title: 'Fresco',
  kind: 'Project · NCR Voyix',
  framing: '[Framing line — the problem this solved and why it mattered, in one sentence.]',
  meta: '18 min · applies Altitude',
  still: still('/media/artifact-smart-home.avif', 1024, 768),
}

export default function HomePage() {
  /* The most recent published artifact takes the hero; the rest fall into the rail
   * ahead of the not-yet-written ones. Ordering is by date, from the loader, so the
   * hero changes by writing an artifact rather than by editing this file. */
  const [heroArtifact, ...railArtifacts] = getPublishedArtifacts()

  return (
    <main>
      <div style={{ display: 'grid', gap: 32, padding: 'clamp(16px,3vw,32px)', maxWidth: 1180, margin: '0 auto' }}>
        <span
          style={{
            fontSize: 16,
            lineHeight: 1.5,
            color: 'var(--glass-text-muted)',
            maxWidth: '52ch',
            paddingLeft: 4,
          }}
        >
          A UX leader who can operate at every altitude.{' '}
          <span style={{ color: 'var(--glass-text)' }}>
            [Positioning line — one sentence on translating executive vision into shipped
            experience.]
          </span>
        </span>

        {heroArtifact ? (
          <ArtifactCard
            href={`/work/${heroArtifact.slug}`}
            size="lg"
            featured={heroArtifact.featured}
            title={heroArtifact.title}
            kind={kindLine(heroArtifact)}
            framing={heroArtifact.framing}
            meta={metaLine(heroArtifact)}
            still={heroArtifact.hero}
            clip={heroArtifact.heroClip}
          />
        ) : (
          <ArtifactCard href="/work" size="lg" featured {...placeholderHero} />
        )}

        <Rail title="Frameworks" caption="rail · numbered spine · top of the hierarchy" minColumnWidth={210}>
          {frameworks.map((fw, i) => (
            <FrameworkCard key={fw.title} href="/work" index={i + 1} title={fw.title} subtitle={fw.subtitle} />
          ))}
        </Rail>

        <Rail title="Projects" caption="rail · horizontal · snap · C3 standard at rail scale" minColumnWidth={248}>
          {railArtifacts.map((a) => (
            <ArtifactCard
              key={a.slug}
              href={`/work/${a.slug}`}
              size="sm"
              title={a.title}
              kind={kindLine(a)}
              still={a.hero}
            />
          ))}
          {pendingProjects.map((p) => (
            <ArtifactCard
              key={p.title}
              href="/work"
              size="sm"
              title={p.title}
              kind="Project · NCR Voyix"
              still={still(p.src, p.w, p.h)}
            />
          ))}
        </Rail>
      </div>
    </main>
  )
}
