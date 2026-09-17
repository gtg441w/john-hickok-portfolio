'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { CSSProperties } from 'react'

const base: CSSProperties = {
  fontFamily: 'inherit',
  padding: '6px 12px',
  borderRadius: 999,
  textDecoration: 'none',
  transition: 'background 180ms cubic-bezier(.2,.6,.2,1), color 180ms cubic-bezier(.2,.6,.2,1)',
}

export default function NavLink({ href, children }: { href: string; children: string }) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className="mono"
      style={{
        ...base,
        background: active ? 'color-mix(in oklab, currentColor 14%, transparent)' : 'transparent',
        color: active ? 'var(--glass-text)' : 'var(--glass-text-muted)',
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </Link>
  )
}
