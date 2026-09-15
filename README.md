# John Hickok — portfolio and practice site

Next.js (App Router) · plain CSS · Zod · Playwright.

Read `CLAUDE.md` first. It carries the glass contract, which is the part of this
codebase most likely to be broken by a well-meaning refactor. The long form lives in
the handoff: `README.md`, `GLASS_RULES.md`, `COMPONENT_INVENTORY.md`, `BUILD_PLAN.md`.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; must pass before pushing
```

Node 24 (`.nvmrc`). This machine has it at `~/.local/node`, installed from the official
tarball rather than a package manager, so `~/.local/node/bin` needs to be on `PATH` —
`.zshrc` and `.zprofile` already do that for new shells.

## Layout

| Path | |
|---|---|
| `app/` | Routes. Server components by default — see the inventory for the four client islands. |
| `app/globals.css` | The single global stylesheet. Imports the design system, then the fork. Order is load-bearing. |
| `lib/theme.ts` | The blocking theme script. Three states; see the comment before changing it. |
| `lib/content.schema.ts` | Zod frontmatter schema. From the handoff, not yet wired — step 3. |
| `e2e/conformance.spec.ts` | The AA conformance check. From the handoff, not yet wired — step 1a. |
| `content/` | Markdown content, validated at build time. |
| `docs/` | The handoff prose: build plan, component inventory, glass rules. |
| `design/` | The storyboard prototype and its stand-in media. Reference, never pasted in. |
| `styles/_ds/` | Frostwork v0.3, vendored verbatim. |
| `styles/_ds_fork/` | The project fork — "blur wins wherever AA holds". |
| `styles/PATCHES.md` | Every deviation from the vendored copies. Re-exporting the design system drops them. |

`design/reference/` holds the video and image library and is deliberately git-ignored —
128 MB of material nothing in the build reads. It lives on the authoring machine only.

## Build status

Step 1 of `BUILD_PLAN.md` is done. No screens are built yet — that is step 5, and it
waits on step 3 (writing the content) by design.
