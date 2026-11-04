/**
 * The logo · behaviour
 *
 * Pins what the header logo does, so the micro-interactions can be changed freely
 * (components/brand/logo.css) and a regression shows up as a failed test, not as
 * something noticed on a phone a week later.
 *
 * WHY PLAYWRIGHT AND NOT JSDOM. Every assertion here is about computed style or layout
 * after a real hover, focus or media query. jsdom computes neither, so these tests
 * would pass on a logo that does nothing.
 *
 * WHAT IS PINNED, and what is deliberately not. Pinned: the accessible name, that the
 * pieces are decorative, that hover and focus both straighten the spine by the amount
 * the token says, that the spine stays inside the mark when it does, and that reduced
 * motion removes the draw-in and the easing. Not pinned: durations, easing curves, the
 * angle itself (read from its token) and the draw order. Those are the things meant to
 * be retuned, so the tests wait for the logo's animations to finish and never for a
 * fixed time. If a retune ever needs a test to change, change the test along with it.
 *
 * Like conformance.spec.ts this runs against the built site.
 *
 *   npx playwright test logo.spec.ts
 */
import { test, expect, type Page } from '@playwright/test'

/** Wait for the logo's own animations and transitions to finish, whatever their
 *  duration. A fixed wait would tie these tests to today's timing, which is exactly the
 *  thing meant to be retuned. Scoped to the mark: the page has other animations. */
const settle = (page: Page) =>
  page.locator('.logo-mark').evaluate(async (el) => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    await Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished))
  })

const spine = (page: Page) =>
  page.locator('.logo-mark__spine').evaluate((el) => getComputedStyle(el).transform)

/** Rotation of a computed `matrix(a, b, …)`, in degrees; 0 for `none`. */
const angle = (m: string) => {
  if (m === 'none') return 0
  const [a, b] = m.match(/matrix\(([^)]+)\)/)![1].split(',').map(Number)
  return (Math.atan2(b, a) * 180) / Math.PI
}

/** The angle the resolve recipe is configured to turn by, read from the token. */
const configured = (page: Page) =>
  page.locator('.logo-mark').evaluate((el) => {
    const raw = getComputedStyle(el).getPropertyValue('--logo-resolve-angle').trim()
    return parseFloat(raw)
  })

test.describe('header logo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Let the draw-in finish; it is not what these tests are about.
    await settle(page)
  })

  test('is one link with one accessible name, and the pieces are decorative', async ({ page }) => {
    const link = page.locator('.home-mark')
    await expect(link).toHaveAttribute('aria-label', 'Hickok Design, home')
    await expect(link.locator('svg')).toHaveCount(2)
    for (const svg of await link.locator('svg').all()) {
      await expect(svg).toHaveAttribute('aria-hidden', 'true')
    }
  })

  test('hover straightens the spine by the configured angle, and it leans back', async ({ page }) => {
    expect(angle(await spine(page))).toBe(0)
    await page.hover('.home-mark')
    await settle(page)
    expect(angle(await spine(page))).toBeCloseTo(await configured(page), 1)
    await page.mouse.move(5, 400)
    await settle(page)
    expect(angle(await spine(page))).toBe(0)
  })

  test('keyboard focus does the same, and shows an outline', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.locator('.home-mark')).toBeFocused()
    await settle(page)
    expect(angle(await spine(page))).toBeCloseTo(await configured(page), 1)
    const outline = await page
      .locator('.home-mark')
      .evaluate((el) => [getComputedStyle(el).outlineStyle, getComputedStyle(el).outlineWidth])
    expect(outline).toEqual(['solid', '2px'])
  })

  test('the straightened spine stays inside the mark', async ({ page }) => {
    // The regression this guards: a wrong rotation pivot swung the spine out past the
    // ring. Compare the spine's box with the mark's, with room for the round caps.
    await page.hover('.home-mark')
    await settle(page)
    const [mark, sp] = await Promise.all([
      page.locator('.logo-mark').boundingBox(),
      page.locator('.logo-mark__spine').boundingBox(),
    ])
    const slack = 3
    expect(sp!.y).toBeGreaterThanOrEqual(mark!.y - slack)
    expect(sp!.y + sp!.height).toBeLessThanOrEqual(mark!.y + mark!.height + slack)
    expect(sp!.x).toBeGreaterThanOrEqual(mark!.x - slack)
    expect(sp!.x + sp!.width).toBeLessThanOrEqual(mark!.x + mark!.width + slack)
  })
})

test.describe('header logo, reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('has no draw-in and does not ease, but still answers hover', async ({ page }) => {
    await page.goto('/')
    const style = await page.locator('.logo-mark path').first().evaluate((el) => getComputedStyle(el).animationName)
    expect(style).toBe('none')
    const duration = await page
      .locator('.logo-mark__spine')
      .evaluate((el) => getComputedStyle(el).transitionDuration)
    expect(duration).toBe('0s')
    await page.hover('.home-mark')
    expect(angle(await spine(page))).toBeCloseTo(await configured(page), 1)
  })
})
