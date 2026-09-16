# Content

What ships, and only what ships. Markdown with typed frontmatter, validated by
`lib/content.schema.ts` at build time. Git is the CMS — see *What is deliberately not
on this list* in `docs/BUILD_PLAN.md` for why there is no hosted one.

## The source material is not in this repo, and not under it

The raw career history the case studies are written *from* — 50 ChatGPT transcripts —
lives outside the repository entirely:

```
~/Desktop/Portfolio Site/2026/Content/Source/work/
```

**It is not git-ignored here. It is not here at all**, which is the stronger guarantee:
an ignore rule protects a file only until someone edits `.gitignore`, runs `git add -f`,
or points a tool at the folder. A path outside the working tree cannot be committed by
any of those accidents.

Why it matters: this repository is public, and that material carries a personal phone
number and private email addresses, compensation and severance discussion, an active job
search naming current and prospective employers, and a conversation about carrying out a
layoff of a report who held a medical accommodation — a third party who never consented
to any of it being published.

## The boundary

**Source is for discussion. `content/` is for publication.** A case study is written
*from* that history and quotes none of it. Nothing from the source is copied, linked, or
excerpted into a tracked path — not into frontmatter, not into a commit message, not
into an alt attribute.

A `content/source/` ignore rule remains in `.gitignore` as a backstop, in case a copy
ever lands here again by accident. It is a seatbelt, not the plan.

If that history ever needs versioning, it belongs in a **separate private repository**.

## Writing rules

- Bracketed text in the design files (`[Framing line — …]`) is a hole for real copy.
  **Never invent copy to fill it** — leave the hole and ask.
- Per project: the framing line, the problem, the role and what was actually owned, the
  decisions and their reasoning, the outcome, and the 3–6 stills worth showing. The
  reasoning is the differentiator; outcomes are claimed by everyone.
- Galleries hold 3–6 curated stills. Completeness is not a goal.
- A project only enters the collection once its `published` flag is a real answer — see
  Gate 0, *Permission to publish*, in `docs/BUILD_PLAN.md`.
