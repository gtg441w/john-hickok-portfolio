import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import { THEME_INIT_SCRIPT } from '@/lib/theme'
import SiteHeader from '@/components/chrome/SiteHeader'
import BackdropStage from '@/components/backdrop/BackdropStage'
import BackdropSlot from '@/components/backdrop/BackdropSlot'

export const metadata: Metadata = {
  title: 'John Hickok',
  description: 'Portfolio and practice record of John Hickok, UX leader.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /* suppressHydrationWarning: the script below mutates <html> before React
     * hydrates, so the client tree legitimately differs from the server one here
     * and only here. */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking, and it has to stay blocking. Deferred, the page paints in one
          * mode and corrects in the other — a flash on every load, on a site whose
          * whole identity is the difference between those two modes. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {/* The stage wraps the whole document: it publishes the tone facts every
          * glass surface above it reads, so it has to be an ancestor of the chrome
          * and the page, not a sibling. The canvas inside it is fixed to the
          * viewport — the backdrop is the room, and the room does not scroll. */}
        <BackdropStage mood="cool">
          <BackdropSlot />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SiteHeader />
            {children}
          </div>
        </BackdropStage>
      </body>
    </html>
  )
}
