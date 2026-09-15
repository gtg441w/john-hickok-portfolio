# Content

What ships. Markdown with typed frontmatter, validated by `lib/content.schema.ts` at
build time. Git is the CMS — see *What is deliberately not on this list* in
`docs/BUILD_PLAN.md` for why there is no hosted one.

## `source/` is not in this repo, on purpose

`content/source/work/` holds 50 raw ChatGPT transcripts — the career history the six
case studies get written *from*. They are on the authoring machine and git-ignored.

**This repository is public**, and that material contains a personal phone number and
private email addresses, compensation and severance discussion, an active job search
naming both current and prospective employers, and a conversation about carrying out a
layoff of a report who held a medical accommodation — a third party who never consented
to any of it being published.

So the boundary is: **source is input, `content/` is output.** A case study is written
from that history and cites none of it. Nothing in `source/` is ever quoted verbatim,
linked, or moved into a tracked path. If it ever needs versioning, it belongs in a
separate private repository, not in this one.

Bracketed text in the design files (`[Framing line — …]`) is a hole for real copy.
Never invent copy to fill it — leave the hole and ask.
