/**
 * Content schema · portfolio site
 *
 * Zod, because the validation has to run in the same place the content lives: this is
 * a repo, not a CMS, and an unvalidated frontmatter field fails at render time on a
 * page nobody reloaded. Import this in the content loader and parse at build time, so
 * a missing field is a failed build rather than a broken deploy.
 *
 * TWO FIELDS EXIST FOR LEGIBILITY, NOT FOR ATMOSPHERE, and they are the ones most
 * likely to be dropped as decoration: `chromeMode` and `scrimStrength`. Read the notes
 * on each before touching either. Everything in `_ds_fork/frostwork-blur-first.css`
 * assumes they mean what they say here.
 */
import { z } from 'zod'

/* ── Still ────────────────────────────────────────────────────────────────────
   An image plus the two facts the glass contract needs from it.

   `chromeMode` IS THE FIRST LEVER. Flipping a bright still to light chrome flips the
   ink roles and recovers more contrast than thickening the pane, at no cost in
   transmission. It is not an atmosphere choice. Default `dark` matches the site's
   default mode; set `light` on a bright still rather than reaching for anything else.

   `scrimStrength` DEFAULTS TO THE WORST CASE, and this is the important part: an unset
   field must never be the unsafe one. .62 is derived — a black scrim at alpha a over
   pure white must land under .18 relative luminance, which requires a ≥ .5386; .62
   lands at .119. An editor who has measured a calm still may dial it down. Nobody may
   raise it above .9 to rescue a still that should have been recropped; fix the media
   first.

   It applies to the BACKDROP STAGE only. Artifact cards bound their media and set no
   ink over it, so they take no scrim — see the codified rule in the fork CSS § 3. A
   scrim value on a still used only in a card is harmless but meaningless. */
export const Still = z.object({
  src: z.string().min(1),
  /** Required. An empty string is a deliberate decorative marking, not a default. */
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional(),
  chromeMode: z.enum(['dark', 'light']).default('dark'),
  scrimStrength: z.number().min(0).max(0.9).default(0.62),
  /** Recorded when someone actually measures the composite at the worst local window.
   *  Never inferred, never a default — an absent number means nobody measured, which
   *  is a different fact from a passing one. */
  measuredRatio: z.number().positive().optional()
})
export type Still = z.infer<typeof Still>

/* ── Artifact ─────────────────────────────────────────────────────────────────
   Projects, frameworks and writing are one kind. The site's organising metaphor is a
   museum: artifacts live in a collection and relate across categories rather than
   sitting in folders, so a single type with a `kind` discriminator is the shape that
   matches the IA. Two collections would reintroduce the folders.

   `framing` is the line that appears on the card, clamped to two lines. It is the one
   string a visitor reads before deciding whether to open anything, and every bracketed
   [Framing line — …] hole in the design files is this field. */
export const Artifact = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  kind: z.enum(['project', 'framework', 'writing', 'workshop']),
  title: z.string().min(1),
  client: z.string().optional(),
  framing: z.string().min(1),
  /** Shown as the card's meta line, e.g. "18 min · applies Altitude". */
  readingTime: z.number().int().positive().optional(),
  hero: Still,
  /** 3–6 curated stills. Not a dump of every screen: a project needing twenty is a
   *  signal to curate, and the gallery is sized for four. No completeness requirement. */
  gallery: z.array(Still).max(12).default([]),
  /** Cross-category relationships. Slugs, resolved at build time so a dangling
   *  reference is a failed build rather than a dead link. */
  related: z.array(z.string()).default([]),
  /** Frameworks this artifact applies; frameworks leave it empty. */
  applies: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  /** False keeps an artifact out of the collection without deleting it — the Gate 0
   *  permission-to-publish question needs somewhere to land per project. */
  published: z.boolean().default(false),
  date: z.coerce.date(),
  /** An empty slot on purpose, like [Framework 04] in the design files. A placeholder
   *  that renders as a slot is honest; one that renders as content is a lie. */
  placeholder: z.boolean().default(false)
})
export type Artifact = z.infer<typeof Artifact>

/* ── Practice record ──────────────────────────────────────────────────────────
   Matches content/practice-record.md. Entries are appended during the build and never
   tidied afterwards — the tidying is what would destroy the value — so the schema
   permits an incomplete entry rather than requiring the full shape. An entry with
   `found` and no `proposed` is a defect nobody proposed, which is a real category. */
export const PracticeEntry = z.object({
  n: z.number().int().positive(),
  title: z.string().min(1),
  proposed: z.string().optional(),
  questioned: z.string().optional(),
  found: z.string().optional(),
  changed: z.string().optional(),
  noticed: z.string().optional(),
  /** The pull-quote. The finding, not the summary. */
  lesson: z.string().min(1)
})

export const PracticeRecord = z.object({
  title: z.string().min(1),
  slug: z.literal('practice-record'),
  status: z.enum(['in-progress', 'closed']).default('in-progress'),
  opened: z.string(),
  updated: z.coerce.date(),
  summary: z.string(),
  hero: z.object({
    still: z.string(),
    chrome: z.enum(['dark', 'light']).default('dark'),
    scrim: z.number().min(0).max(0.9).default(0.62)
  }),
  entries: z.array(PracticeEntry).default([])
})

/* ── Hard-coded, deliberately not content ─────────────────────────────────────
   Resume roles, patents, education, Connect copy. One author, one resume; a schema for
   a single record is ceremony. Typed in the component, changed in a commit.

   The exception worth naming: the email address lives in ONE exported constant and is
   used in six places. It was retyped once and that is why this line exists. */
export const EMAIL = 'johnhickok21@gmail.com'
