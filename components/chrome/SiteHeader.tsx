import Link from 'next/link'
import NavLink from './NavLink'
import ThemeToggle from './ThemeToggle'

export default function SiteHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        padding: 'clamp(12px,2vw,32px) clamp(12px,2vw,32px) 0',
      }}
    >
      <div style={{ flex: '1 1 0', minWidth: 0, display: 'grid', gap: 4, padding: '4px 0' }}>
        {/* The mark is the way home — the site's only home control, by convention
          * rather than an icon. The link is sized to the mark, not to this flex slot,
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
      </div>

      <div
        className="glass"
        data-glass-level="nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 16px',
          borderRadius: 999,
          flexWrap: 'wrap',
          flex: '0 1 auto',
          minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <NavLink href="/">About Me</NavLink>
          <NavLink href="/experience">Resume</NavLink>
          <NavLink href="/connect">Connect</NavLink>
        </div>
      </div>

      <ThemeToggle />
    </div>
  )
}
