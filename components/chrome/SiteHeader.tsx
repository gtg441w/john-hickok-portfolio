import Link from 'next/link'
import FloatingBar from './FloatingBar'
import NavLink from './NavLink'
import ThemeToggle from './ThemeToggle'

/* Two elements: the mark and the floating bar. Layout lives in globals.css
 * (§ Site header) because it changes at a breakpoint — above 720px the mark sits
 * top-left and the bar is centred on the page; below it the mark centres at the
 * top and the bar docks to the bottom of the viewport, within thumb reach. */
export default function SiteHeader() {
  return (
    <header className="site-header">
      {/* The mark is the way home — the site's only home control, by convention
        * rather than an icon. The link is sized to the mark, not to its grid slot,
        * so clicking the empty header space beside it does nothing.
        *
        * WHEN THE LOGO ARRIVES: replace the text inside the link with the image or
        * SVG and give it alt="John Hickok". Keep the aria-label on the link — it is
        * what tells a screen reader this is the way home, which a logo alone does
        * not say. It starts with the visible name on purpose (WCAG 2.5.3, label in
        * name), so a voice-control user can still say "click John Hickok". */}
      <Link href="/" className="home-mark" aria-label="John Hickok, home">
        John Hickok
      </Link>

      <FloatingBar>
        <NavLink href="/">About Me</NavLink>
        <NavLink href="/experience">Resume</NavLink>
        <NavLink href="/connect">Connect</NavLink>
        <span className="site-nav__divider" aria-hidden="true" />
        <ThemeToggle />
      </FloatingBar>
    </header>
  )
}
