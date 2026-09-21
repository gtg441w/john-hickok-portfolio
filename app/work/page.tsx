import type { Metadata } from 'next'

import { getPublishedArtifacts, kindLine, metaLine } from '@/lib/content'
import ArtifactCard from '@/components/artifact/ArtifactCard'

export const metadata: Metadata = {
  title: 'Collection · John Hickok',
  description: 'Projects, frameworks and writing.',
}

export default function CollectionPage() {
  const artifacts = getPublishedArtifacts()

  return (
    <main>
      <div
        style={{
          display: 'grid',
          gap: 32,
          padding: 'clamp(16px,3vw,32px)',
          maxWidth: 1180,
          margin: '0 auto',
        }}
      >
        <header style={{ display: 'grid', gap: 8 }}>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,3.4vw,44px)',
              lineHeight: 1.05,
              letterSpacing: '-.03em',
              fontWeight: 600,
              color: 'var(--glass-text)',
            }}
          >
            Collection
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--glass-text-muted)', maxWidth: '54ch' }}>
            Artifacts relate across categories rather than sitting in folders.
          </p>
        </header>

        {artifacts.length === 0 ? (
          /* An honest empty state. A collection page that renders nothing at all
           * looks broken; one that says it is empty is just early. */
          <p style={{ margin: 0, fontSize: 15, color: 'var(--glass-text-muted)' }}>
            Nothing published yet.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: 24,
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            }}
          >
            {artifacts.map(a => (
              <ArtifactCard
                key={a.slug}
                href={`/work/${a.slug}`}
                size="lg"
                featured={a.featured}
                title={a.title}
                kind={kindLine(a)}
                framing={a.framing}
                meta={metaLine(a)}
                still={a.hero}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
