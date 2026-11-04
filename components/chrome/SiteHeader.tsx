import Link from 'next/link'

import { Logo, LOGO_MOTIONS } from '@/components/brand'
import FloatingBar from './FloatingBar'
import NavLink from './NavLink'
import ThemeToggle from './ThemeToggle'

/* Two elements: the logo and the floating bar. Layout lives in globals.css
 * (§ Site header) because it changes at a breakpoint — above 720px the logo sits
 * top-left and the bar is centred on the page; below it the logo centres at the top
 * and the bar docks to the bottom of the viewport, within thumb reach. */
export default function SiteHeader() {
  return (
    <header className="site-header">
      {/* The logo is the way home — the site's only home control, by convention
        * rather than an icon. The link is sized to the logo, not to its grid slot,
        * so clicking the empty header space beside it does nothing.
        *
        * The accessible name sits on the link, not on the logo: the mark and the
        * words inside are decorative, so a screen reader hears it once. It starts
        * with the visible words on purpose (WCAG 2.5.3, label in name), so a
        * voice-control user can still say "click Hickok Design".
        *
        * data-logo-trigger marks this link as the thing the logo answers to: hover,
        * focus and press on the link drive the mark's behaviours (components/brand/
        * logo.css). Which behaviours run is the `motion` list below; the draw-in
        * plays on a full page load only, because client-side navigation never
        * remounts the header. */}
      <Link href="/" className="home-mark" aria-label="Hickok Design, home" data-logo-trigger>
        <Logo size={32} motion={LOGO_MOTIONS} />
      </Link>

      <FloatingBar>
        <NavLink href="/about">About Me</NavLink>
        <NavLink href="/experience">Resume</NavLink>
        <NavLink href="/connect">Connect</NavLink>
        <span className="site-nav__divider" aria-hidden="true" />
        <ThemeToggle />
      </FloatingBar>
    </header>
  )
}
