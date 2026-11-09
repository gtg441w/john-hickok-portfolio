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

/* ── Sections ─────────────────────────────────────────────────────────────────
   The reading view renders the body as one card per `## ` heading. Text only: every
   still and clip an artifact has is shown in the carousel at the top of the page, in
   frontmatter order (lib/media.ts), so a section never places media of its own.

   A markdown image in the body throws. It would render with no intrinsic width and
   height, which on a glass page surfaces as layout shift rather than as a failed
   build; the frontmatter `gallery` or `clips` is where media goes. */

export type ArtifactSection = {
  id: string
  heading: string
  markdown: string
}

const MEDIA_REF = /^!\[[^\]]*\]\(([^)\s]+)\)\s*$/m

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function getSections(artifact: LoadedArtifact): ArtifactSection[] {
  /* Split on level-2 headings only. Anything before the first heading has no card
   * to live in, so it is kept as an untitled lead section rather than lost. */
  const chunks = artifact.body.split(/^## /m)
  const sections: ArtifactSection[] = []

  chunks.forEach((chunk, i) => {
    if (!chunk.trim()) return
    const isLead = i === 0
    const newline = chunk.indexOf('\n')
    const heading = isLead ? '' : (newline === -1 ? chunk : chunk.slice(0, newline)).trim()
    const markdown = (isLead ? chunk : newline === -1 ? '' : chunk.slice(newline + 1)).trim()

    const ref = markdown.match(MEDIA_REF)
    if (ref) {
      throw new Error(
        `content/artifacts/${artifact.slug}/index.md: section "${heading || '(lead)'}" ` +
          `has an inline image, ${ref[1]}. Media is shown in the carousel at the top of ` +
          `the page: list it in the gallery or clips frontmatter and remove the line.`
      )
    }

    sections.push({ id: isLead ? 'lead' : slugify(heading), heading, markdown })
  })

  return sections
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
