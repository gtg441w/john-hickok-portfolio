import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { getArtifact, getPublishedSlugs, getSections, kindLine, metaLine } from '@/lib/content'
import ArtifactSection, { MediaFigure } from '@/components/artifact/ArtifactSection'
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
    title: `${artifact.title} · John Hickok`,
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
  const { sections, unplaced } = getSections(artifact)

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
        {/* First thing on the page, above the title. The video is portrait, so its box is
          * capped by height and centred rather than stretched to the column. The poster
          * is a full Still, so the box is reserved from its width and height and nothing
          * shifts when the video loads. */}
        {artifact.video && (
          <figure style={{ margin: 0, display: 'grid', justifyItems: 'center' }}>
            <video
              controls
              playsInline
              preload="metadata"
              poster={artifact.video.poster.src}
              aria-label={artifact.video.title}
              width={artifact.video.poster.width}
              height={artifact.video.poster.height}
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: 'min(80vh, 720px)',
                aspectRatio: `${artifact.video.poster.width} / ${artifact.video.poster.height}`,
                display: 'block',
                background: '#000',
                borderRadius: 'var(--radius-lg, 24px)',
                border: '1px solid var(--glass-edge, rgba(128,128,128,.25))',
              }}
            >
              <source src={artifact.video.src} type="video/mp4" />
              {artifact.video.captions && (
                <track kind="captions" src={artifact.video.captions} srcLang="en" label="English" default />
              )}
            </video>
          </figure>
        )}

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
            {/* The hero carries no ink. Text over media is the backdrop stage's job and
              * nowhere else's, so this is just the image. */}
            <img
              src={artifact.hero.src}
              alt={artifact.hero.alt}
              width={artifact.hero.width}
              height={artifact.hero.height}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 'var(--radius-lg, 24px)',
                border: '1px solid var(--glass-edge, rgba(128,128,128,.25))',
              }}
            />

            {/* Sibling glass cards, never nested: .glass .glass drops its filter by design,
              * so wrapping these in a glass panel would silently flatten all of them. */}
            <div style={{ display: 'grid', gap: 16 }}>
              {sections.map(s => (
                <ArtifactSection key={s.id} section={s} />
              ))}
            </div>

            {/* Media the author never placed in a section. Empty when everything is
              * placed, which is the intent; present so an unplaced still or clip is
              * visible rather than lost. */}
            {unplaced.length > 0 && (
              <section style={{ display: 'grid', gap: 24 }}>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px,2.2vw,28px)',
                    letterSpacing: '-.02em',
                    fontWeight: 600,
                    color: 'var(--glass-text)',
                  }}
                >
                  Gallery
                </h2>
                <div style={{ display: 'grid', gap: 40 }}>
                  {unplaced.map(m => (
                    <MediaFigure key={m.kind === 'still' ? m.still.src : m.clip.src} media={m} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </article>
    </main>
  )
}
