'use client'

import { useEffect, useState } from 'react'
import { THEME_STORAGE_KEY, type ResolvedTheme } from '@/lib/theme'

/* Mirrors the effect of THEME_INIT_SCRIPT (lib/theme.ts) so an explicit click
 * produces exactly the same DOM state the blocking script would have produced
 * for that choice. */
function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  root.style.colorScheme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {}
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ResolvedTheme | null>(null)

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as ResolvedTheme) || 'dark')
  }, [])

  if (!theme) return null

  const isDark = theme === 'dark'
  const next: ResolvedTheme = isDark ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="glass"
      data-glass-level="nav"
      data-glass-interactive=""
      aria-pressed={isDark}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => {
        applyTheme(next)
        setTheme(next)
      }}
      style={{
        appearance: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        height: 46,
        width: 46,
        borderRadius: 999,
        display: 'grid',
        placeItems: 'center',
        flex: '0 0 auto',
        border: '1px solid var(--glass-edge)',
        padding: 0,
      }}
    >
      <span
        className="mono glass-micro"
        style={{
          fontSize: 20,
          lineHeight: 1,
          color: 'var(--glass-text)',
          display: 'block',
          transform: 'translateY(-0.085em)',
        }}
      >
        {isDark ? '◐' : '◑'}
      </span>
    </button>
  )
}
