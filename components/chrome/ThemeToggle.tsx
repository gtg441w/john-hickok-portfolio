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

  /* Before mount the resolved theme is unknown, so hold the slot empty at full size
   * rather than rendering nothing — the floating bar is centred, and a late-arriving
   * button would shift every link in it. */
  if (!theme) return <span className="theme-toggle" aria-hidden="true" />

  const isDark = theme === 'dark'
  const next: ResolvedTheme = isDark ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-pressed={isDark}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => {
        applyTheme(next)
        setTheme(next)
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
