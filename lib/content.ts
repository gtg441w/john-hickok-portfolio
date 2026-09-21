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
import { Artifact, type Still } from './content.schema'

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
   The reading view renders the body as one card per `## ` heading, each with its
   own stills beside it.

   WHERE THE PAIRING IS AUTHORED. A still belongs to a section because the section
   says so, as an ordinary markdown image on its own line:

       ## The decision
       ![](/artifacts/sco-cash-management/pickup-event-sequence.png)

   The line is only a reference. Everything the page needs to render the image —
   intrinsic width and height, alt, caption — comes from the matching entry in the
   validated `gallery` frontmatter, matched by src. That keeps the schema untouched
   (it is shared with other artifacts in progress) and keeps the metadata where Zod
   can check it, rather than in markdown where a missing width would surface as
   layout shift on a glass page instead of as a failed build.

   A reference to a src that is not in the gallery throws, for the same reason the
   loader throws on bad frontmatter: an image with no intrinsic dimensions is a
   defect, and the build is the cheapest place to find it. */

export type ArtifactSection = {
  id: string
  heading: string
  /** Markdown with the still-reference lines removed. Rendered by the page. */
  markdown: string
  stills: Still[]
}

const STILL_REF = /^!\[[^\]]*\]\(([^)\s]+)\)\s*$/

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function getSections(artifact: LoadedArtifact): {
  sections: ArtifactSection[]
  /** Gallery stills no section referenced. Rendered after the sections, so a still
   *  that was never placed is shown rather than silently dropped. */
  unplaced: Still[]
} {
  const bySrc = new Map(artifact.gallery.map(s => [s.src, s]))
  const placed = new Set<string>()

  /* Split on level-2 headings only. Anything before the first heading has no card
   * to live in, so it is kept as an untitled lead section rather than lost. */
  const chunks = artifact.body.split(/^## /m)
  const sections: ArtifactSection[] = []

  chunks.forEach((chunk, i) => {
    if (!chunk.trim()) return
    const isLead = i === 0
    const newline = chunk.indexOf('\n')
    const heading = isLead ? '' : (newline === -1 ? chunk : chunk.slice(0, newline)).trim()
    const rest = isLead ? chunk : newline === -1 ? '' : chunk.slice(newline + 1)

    const stills: Still[] = []
    const markdown = rest
      .split('\n')
      .filter(line => {
        const m = line.match(STILL_REF)
        if (!m) return true
        const still = bySrc.get(m[1])
        if (!still) {
          throw new Error(
            `content/artifacts/${artifact.slug}/index.md: section "${heading || '(lead)'}" ` +
              `references ${m[1]}, which is not in the gallery frontmatter. Add it there ` +
              `with width, height and alt, or remove the reference.`
          )
        }
        stills.push(still)
        placed.add(still.src)
        return false
      })
      .join('\n')
      .trim()

    sections.push({ id: isLead ? 'lead' : slugify(heading), heading, markdown, stills })
  })

  return { sections, unplaced: artifact.gallery.filter(s => !placed.has(s.src)) }
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
