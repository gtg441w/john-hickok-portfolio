import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { getArtifact, getPublishedSlugs, getSections, kindLine, metaLine } from '@/lib/content'
import ArtifactSection from '@/components/artifact/ArtifactSection'
import MediaCarousel from '@/components/artifact/MediaCarousel'
import { articleSlides } from '@/lib/media'
import Walkthrough from '@/components/walkthrough/Walkthrough'
import { getWalkthrough } from '@/lib/walkthrough'

/* Static per slug. Unpublished artifacts are absent from this list AND rejected by
 * the handler below, so "not in the collection" and "not reachable by URL" stay the
 * same fact — an unlisted-but-guessable page would make `published: false` a display
 * preference rather than the permission-to-publish answer it is. */
export function generateStaticParams() {
  return getPublishedSlugs().map(slug => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const artifact = getArtifact(slug)
  if (!artifact || !artifact.published) return {}
  return {
    title: `${artifact.title} · Hickok Design`,
    description: artifact.framing,
    openGraph: {
      title: artifact.title,
      description: artifact.framing,
      images: [{ url: artifact.hero.src, width: artifact.hero.width, height: artifact.hero.height }],
    },
  }
}

export default async function ArtifactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artifact = getArtifact(slug)
  if (!artifact || !artifact.published) notFound()

  const meta = metaLine(artifact)
  const sections = getSections(artifact)
  const slides = articleSlides(artifact)

  return (
    <main>
      <article
        style={{
          display: 'grid',
          gap: 40,
          padding: 'clamp(16px,3vw,32px)',
          maxWidth: 1180,
          margin: '0 auto',
        }}
      >
        <header style={{ display: 'grid', gap: 12 }}>
          <span
            className="mono glass-micro"
            style={{
              fontSize: 10,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--glass-text-muted)',
            }}
          >
            {kindLine(artifact)}
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px,4vw,52px)',
              lineHeight: 1.03,
              letterSpacing: '-.03em',
              fontWeight: 600,
              color: 'var(--glass-text)',
            }}
          >
            {artifact.title}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(16px,1.6vw,19px)',
              lineHeight: 1.45,
              color: 'var(--glass-text-muted)',
              maxWidth: '58ch',
            }}
          >
            {artifact.framing}
          </p>
          {meta && (
            <span
              className="mono glass-micro"
              style={{
                fontSize: 10,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--glass-text-muted)',
              }}
            >
              {meta}
            </span>
          )}
        </header>

        {/* The same template for every artifact: header, then its media, then its
          * text. Video first, then clips, then stills (lib/media.ts). */}
        {slides.length > 0 && <MediaCarousel slides={slides} label={`${artifact.title}: images and video`} />}

        {artifact.layout === 'walkthrough' ? (
          <>
            <Walkthrough script={getWalkthrough(artifact.slug)} />

            {/* The full text, every section collapsed. The tour tells the story in
              * order; this is for the reader who wants it straight through, for search,
              * and for anyone without script. Sibling glass cards, never nested. */}
            <section style={{ display: 'grid', gap: 16 }} aria-labelledby="full-text">
              <div style={{ display: 'grid', gap: 6, paddingLeft: 4 }}>
                <h2
                  id="full-text"
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px,2.2vw,28px)',
                    letterSpacing: '-.02em',
                    fontWeight: 600,
                    color: 'var(--glass-text)',
                    scrollMarginTop: 24,
                  }}
                >
                  The full text
                </h2>
                <p style={{ margin: 0, fontSize: 15, color: 'var(--glass-text-muted)' }}>
                  Prefer to read it straight through? Every section, in order.
                </p>
              </div>
              {sections.map(s => (
                <ArtifactSection key={s.id} section={s} defaultOpen={false} />
              ))}
            </section>
          </>
        ) : (
          <>
            {/* Sibling glass cards, never nested: .glass .glass drops its filter by design,
              * so wrapping these in a glass panel would silently flatten all of them. */}
            <div style={{ display: 'grid', gap: 16 }}>
              {sections.map(s => (
                <ArtifactSection key={s.id} section={s} />
              ))}
            </div>
          </>
        )}
      </article>
    </main>
  )
}
