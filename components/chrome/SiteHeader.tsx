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
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: '-.015em',
            color: 'var(--glass-text)',
            lineHeight: 1.1,
          }}
        >
          John Hickok
        </span>
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
