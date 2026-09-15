import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import { THEME_INIT_SCRIPT } from '@/lib/theme'

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
      <body>{children}</body>
    </html>
  )
}
