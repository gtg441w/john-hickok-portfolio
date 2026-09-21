import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { marked } from 'marked'

import { getArtifact, getPublishedSlugs, kindLine, metaLine } from '@/lib/content'
import Gallery from '@/components/artifact/Gallery'

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

  /* The body is authored markdown in this repo, written by the site's one author and
   * reviewed in a commit. It is not user input, so rendering it as HTML is not an
   * injection surface — if that ever stops being true, sanitize here. */
  const html = await marked.parse(artifact.body)

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

        <div
          className="glass artifact-prose"
          data-glass-level="panel"
          style={{ padding: 'clamp(20px,3vw,40px)', borderRadius: 'var(--radius-lg, 24px)' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {artifact.gallery.length > 0 && (
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
            <Gallery stills={artifact.gallery} />
          </section>
        )}
      </article>
    </main>
  )
}
