/**
 * Content loader · reads content/artifacts/<slug>/index.md
 *
 * VALIDATION HAPPENS HERE AND IT THROWS. content.schema.ts exists so that a missing
 * or malformed field is a failed build rather than a page that renders wrong for
 * whoever loads it next. A loader that caught the ZodError and returned null would
 * turn every one of those into a silent empty slot, which is the failure the schema
 * file's own header warns about. So: parse, and let it throw with the slug attached.
 *
 * Server-only. It touches the filesystem, so importing it from a client component is
 * a build error, which is the correct outcome rather than something to design around.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Artifact } from './content.schema'

const ARTIFACTS_DIR = path.join(process.cwd(), 'content', 'artifacts')

/** Frontmatter plus the markdown body, which the schema deliberately does not model:
 *  the body is prose, and a schema for prose is a schema nobody can satisfy. */
export type LoadedArtifact = Artifact & { body: string }

function readArtifact(slug: string): LoadedArtifact {
  const file = path.join(ARTIFACTS_DIR, slug, 'index.md')
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))

  const parsed = Artifact.safeParse(data)
  if (!parsed.success) {
    /* The slug matters more than the stack trace: "gallery.2.width: Required" is
     * useless without knowing which artifact it came from. */
    throw new Error(
      `Invalid frontmatter in content/artifacts/${slug}/index.md\n` +
        parsed.error.issues.map(i => `  ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n')
    )
  }

  if (parsed.data.slug !== slug) {
    /* The directory name is what the URL uses; the frontmatter slug is what related/
     * applies references resolve against. If they disagree, one of the two silently
     * points nowhere. */
    throw new Error(
      `Slug mismatch: content/artifacts/${slug}/ declares slug "${parsed.data.slug}". ` +
        `The directory name and the frontmatter slug have to match.`
    )
  }

  return { ...parsed.data, body: content.trim() }
}

/** Every artifact on disk, published or not, validated. Sorted newest first. */
export function getAllArtifacts(): LoadedArtifact[] {
  if (!fs.existsSync(ARTIFACTS_DIR)) return []

  return fs
    .readdirSync(ARTIFACTS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => readArtifact(e.name))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

/** What the collection shows. `published: false` keeps an artifact on disk and out of
 *  the site — the per-project answer to Gate 0's permission-to-publish question. */
export function getPublishedArtifacts(): LoadedArtifact[] {
  return getAllArtifacts().filter(a => a.published)
}

export function getArtifact(slug: string): LoadedArtifact | null {
  const dir = path.join(ARTIFACTS_DIR, slug)
  if (!fs.existsSync(path.join(dir, 'index.md'))) return null
  return readArtifact(slug)
}

/** Slugs for generateStaticParams. Unpublished artifacts get no route at all, so an
 *  unlisted-but-reachable URL cannot exist. */
export function getPublishedSlugs(): string[] {
  return getPublishedArtifacts().map(a => a.slug)
}

/** "Project · NCR Voyix" — the card's kind line. */
export function kindLine(a: Artifact): string {
  const kind = a.kind.charAt(0).toUpperCase() + a.kind.slice(1)
  return a.client ? `${kind} · ${a.client}` : kind
}

/** "6 min · applies Altitude". Both halves are optional and an artifact with neither
 *  gets no meta line rather than an empty one. */
export function metaLine(a: Artifact): string | undefined {
  const parts: string[] = []
  if (a.readingTime) parts.push(`${a.readingTime} min`)
  if (a.applies.length) parts.push(`applies ${a.applies.join(', ')}`)
  return parts.length ? parts.join(' · ') : undefined
}
