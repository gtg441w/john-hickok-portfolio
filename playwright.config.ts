import { defineConfig, devices } from '@playwright/test'

/* Conformance runs against the BUILT site, never the dev server — dev-mode CSS
 * injection order differs from the production bundle, and the glass rules are about
 * which stylesheet wins the cascade. See the header of e2e/conformance.spec.ts. */
const PORT = Number(process.env.PORT ?? 3100)
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'e2e',
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: { baseURL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: baseURL,
    /* A cold `next build` is minutes, not seconds. */
    timeout: 300_000,
    /* Locally, reuse a server already running on PORT — but only if it is a
     * production build; point this at `next dev` and the run means nothing. */
    reuseExistingServer: !process.env.CI,
  },
})
