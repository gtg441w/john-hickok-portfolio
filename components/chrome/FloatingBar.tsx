'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

/* Distance, in px, a scroll has to travel in one direction before the bar reacts.
 * Below it, the jitter of a thumb resting on the glass would flicker the bar. */
const THRESHOLD = 8
/* The bar never hides this close to the top of the page, or this close to the end:
 * at the top there is nothing to make room for, and at the end the reader is about
 * to want somewhere to go. */
const EDGE = 80

/* The floating bar. On a phone it docks to the bottom of the viewport and gets out
 * of the way while you read: scrolling down hides it, scrolling up brings it back.
 *
 * This component only reports direction, as data-hidden. Whether that means anything
 * is CSS's decision (globals.css § Site header): it applies below 720px only, never
 * while focus is inside the bar, and never under prefers-reduced-motion. The children
 * stay server-rendered; only this wrapper is a client island. */
export default function FloatingBar({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const pathname = usePathname()

  // A new page starts with the bar showing.
  useEffect(() => setHidden(false), [pathname])

  useEffect(() => {
    lastY.current = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - lastY.current
      if (Math.abs(delta) < THRESHOLD) return
      lastY.current = y

      const atTop = y < EDGE
      const atEnd = y + window.innerHeight > document.documentElement.scrollHeight - EDGE
      setHidden(delta > 0 && !atTop && !atEnd)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav
      className="glass site-nav"
      data-glass-level="nav"
      data-hidden={hidden ? '' : undefined}
      aria-label="Primary"
    >
      {children}
    </nav>
  )
}
