/**
 * Conformance in CI · check 16, bounded media
 *
 * WHY PLAYWRIGHT AND NOT JSDOM. Check 16 is geometric: it reads
 * getBoundingClientRect on every artifact card and every text node inside it. jsdom
 * returns a zeroed rect for everything, so every card would report as clean, forever
 * — a vacuous pass on the one rule this file exists to enforce. That is the same
 * failure shape the upstream harness documents in its own porting notes: a design
 * system that can only be verified inside its own repo is a style guide, and a check
 * that cannot see layout is not a check.
 *
 * The check runs against the BUILT site, not the dev server. Dev-mode CSS injection
 * ordering differs from the production bundle, and the rule is about which stylesheet
 * wins — see the scrim incident in GLASS_RULES.md, where a correct rule never painted
 * because it lost the cascade.
 *
 * FAILURES BLOCK THE MERGE. AA is the floor and is non-negotiable, and a report-only
 * check on a non-negotiable floor is a rule enforced by nobody — the exact state
 * upstream's M-fail-safe sat in for four versions while reading as enforced.
 *
 *   npx playwright test conformance.spec.ts
 */
import { test, expect, type Page } from '@playwright/test'

/** Every route that renders an artifact card. Add a route here when you add one;
 *  a page absent from this list is unchecked, which is worse than failing. */
const ROUTES = ['/', '/work', '/work/fresco', '/practice']

/** Load the fork's addendum into the page and run its own check, rather than
 *  reimplementing the measurement here. Two copies of a measurement drift, and the
 *  copy in CI would be the one nobody reads. */
async function runCheck16(page: Page) {
  await page.addScriptTag({ path: './public/_ds_fork/frostwork-rules-addendum.js' })
  return page.evaluate(() => {
    const F = (window as any).FrostworkFork
    if (!F) throw new Error('FrostworkFork did not load — check 16 did not run')
    return F.boundedMedia() as {
      fails: { where: string; what: string; detail: string }[]
      cards: number
      checked: number
    }
  })
}

for (const route of ROUTES) {
  test(`check 16 · bounded media · ${route}`, async ({ page }) => {
    await page.goto(route)
    /* The check is geometric, so it needs fonts and images resolved: a card whose
       background image has not loaded still has the right rects, but a band whose
       font has not swapped does not. */
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => document.fonts.ready)

    const res = await runCheck16(page)

    if (res.fails.length) {
      const report = res.fails
        .map(f => `  ${f.where} · ${f.what} · ${f.detail}`)
        .join('\n')
      throw new Error(
        `check 16 failed on ${route} — ${res.fails.length} failure(s) ` +
          `across ${res.cards} artifact card(s):\n${report}`
      )
    }
    /* A page that measures zero cards passes trivially. That is fine for a route that
       legitimately has none, and a lie for one that should — so the count is asserted
       per route rather than assumed. */
    expect(res.checked, `${route} rendered no artifact cards`).toBeGreaterThan(0)
  })
}

/** The rule must also be REGISTERED, not merely measured. The fork's own first version
 *  lost this race: it registered before the design system loaded, took its no-registry
 *  branch, and was overwritten when the system assigned its own array — the rule
 *  existed as an object and was absent from the registry, silently. */
test('check 16 · the rule is registered', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.addScriptTag({ path: './public/_ds_fork/frostwork-rules-addendum.js' })
  const state = await page.evaluate(() => {
    const F = (window as any).FrostworkFork
    F.assert()
    const rules = (window as any).FrostworkRules || []
    return { registered: rules.some((r: any) => r.id === 'C-bounded-media') }
  })
  expect(state.registered, 'C-bounded-media missing from FrostworkRules').toBe(true)
})

/** Contrast on the backdrop stage — the one surface that still sets text over media,
 *  and therefore the only caller of the scrim. Bounded media removed the other five;
 *  this is what is left to measure. */
test('scrim holds the dark-chrome contract', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const scrim = await page.evaluate(() => {
    const stage = document.querySelector('.stage-scrim')
    if (!stage) return null
    const v = getComputedStyle(stage).getPropertyValue('--scrim').trim()
    const before = getComputedStyle(stage, '::before')
    return { alpha: parseFloat(v), painted: before.backgroundImage !== 'none' }
  })
  expect(scrim, 'no .stage-scrim on the homepage').not.toBeNull()
  /* .5386 is the solve; anything below it cannot hold pure white under the .18
     ceiling. Not a style preference — the derivation is in the fork CSS § 2. */
  expect(scrim!.alpha).toBeGreaterThanOrEqual(0.5386)
  /* The scrim must actually PAINT. It shipped once as a class that lost the cascade to
     an inline background shorthand and never rendered — correct rule, zero effect. */
  expect(scrim!.painted, 'the scrim pseudo-element is not painting').toBe(true)
})
