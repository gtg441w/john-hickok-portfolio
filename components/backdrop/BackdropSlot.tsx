'use client'

import { useEffect, useRef, useState } from 'react'
import type { ResolvedTheme } from '@/lib/theme'

/* Animated fill for BackdropStage. Canvas-only, no dependencies — recreated from
 * the vendored design system's LiveBackdrop (styles/_ds/.../_ds_bundle.js,
 * components/motion/LiveBackdrop.jsx), not imported from it: that bundle is a UMD
 * blob for the static prototype/authoring tool, not an ESM module for this app.
 *
 * THIS STAGE FOLLOWS CHROME MODE, and that is a deliberate exception rather than a
 * confusion of the two. `.dark`/`.light` is the user's preference and drives ink;
 * `data-stage-luma` is a published fact about the media. For a PHOTOGRAPH those are
 * independent — a dark still may sit in light chrome and keeps its dark luma. This
 * media is generative, so it has no fixed luma to publish: it is repainted per mode,
 * and then publishes the fact it actually painted. Ink stays legible because the
 * media moved, not because the fact was fudged.
 *
 * Tone values are the prototype's (IA Storyboard.dc.html, initVanta). */
const PALETTES: Record<ResolvedTheme, { bg: readonly [string, string]; ink: string; tone: string }> = {
  dark: { bg: ['#0d151b', '#2c4353'], ink: '154,196,220', tone: '10,38,50' },
  light: { bg: ['#e6ecf6', '#f3f3ff'], ink: '0,158,192', tone: '224,234,246' },
}

type Point = { x: number; y: number; vx: number; vy: number }

function makeNet(w: number, h: number): Point[] {
  const n = Math.round(Math.min(90, Math.max(14, (w * h) / 26000)))
  return Array.from({ length: n }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
  }))
}

export default function BackdropSlot() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: -9999, y: -9999 })
  const [theme, setTheme] = useState<ResolvedTheme | null>(null)

  /* The theme lives on <html data-theme>, written before first paint by
   * THEME_INIT_SCRIPT and rewritten by ThemeToggle — there is no React state for
   * it to subscribe to, so the attribute is the source of truth. */
  useEffect(() => {
    const root = document.documentElement
    const read = () => setTheme((root.dataset.theme as ResolvedTheme) || 'dark')
    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const host = hostRef.current
    if (!canvas || !host || !theme) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const PALETTE = PALETTES[theme]

    /* Layer 1 publishes what it actually painted, for the surfaces above it. */
    const stage = host.closest<HTMLElement>('.backdrop')
    if (stage) {
      stage.style.setProperty('--stage-tone-rgb', PALETTE.tone)
      stage.dataset.stageLuma = theme
    }

    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let pts: Point[] = []
    let raf = 0
    let visible = true

    const resize = () => {
      const r = host.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width))
      h = Math.max(1, Math.round(r.height))
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      pts = makeNet(w, h)
    }

    const paintBg = () => {
      const g = ctx.createLinearGradient(0, 0, w * 0.7, h)
      g.addColorStop(0, PALETTE.bg[1])
      g.addColorStop(1, PALETTE.bg[0])
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }

    const drawNet = () => {
      const max = Math.min(190, Math.max(90, w / 6))
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      const all = pointer.current.x > -9998 ? pts.concat([pointer.current as Point]) : pts
      ctx.lineWidth = 1
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const dx = all[i].x - all[j].x
          const dy = all[i].y - all[j].y
          const d = Math.hypot(dx, dy)
          if (d > max) continue
          ctx.strokeStyle = `rgba(${PALETTE.ink},${(0.34 * (1 - d / max)).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(all[i].x, all[i].y)
          ctx.lineTo(all[j].x, all[j].y)
          ctx.stroke()
        }
      }
      ctx.fillStyle = `rgba(${PALETTE.ink},.5)`
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4, 0, 6.284)
        ctx.fill()
      }
    }

    const frame = () => {
      paintBg()
      drawNet()
      if (!reduce && visible) raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) frame()
    })
    ro.observe(host)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduce) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(host)

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 }
    }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    resize()
    if (reduce) frame()
    else raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [theme])

  return (
    <div ref={hostRef} className="stage-media" style={{ position: 'fixed', inset: 0 }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}
