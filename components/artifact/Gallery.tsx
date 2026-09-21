import type { Still } from '@/lib/content.schema'

/* One column, full-bleed, captions beneath (COMPONENT_INVENTORY.md).
 *
 * NO SCRIM AND NO MEASUREMENT HERE, and that is a structural fact rather than an
 * omission: the caption sits outside the image, so nothing is ever set over
 * photography and the glass contract has nothing to hold. `scrimStrength` on a still
 * used only in a gallery is harmless and meaningless — see content.schema.ts.
 *
 * Each still keeps its own aspect ratio (height:auto, no crop) so a 2400x760 diagram
 * and a 1046x585 screenshot can sit in the same column without either being cropped
 * to match the other. width/height are rendered as real attributes so the browser
 * reserves the right box before the image arrives: layout shift on a glass page is
 * especially ugly, because every pane above the shift re-resolves its blur. */
export default function Gallery({ stills }: { stills: Still[] }) {
  if (!stills.length) return null

  return (
    <div style={{ display: 'grid', gap: 40 }}>
      {stills.map(still => (
        <figure key={still.src} style={{ margin: 0, display: 'grid', gap: 10 }}>
          <img
            src={still.src}
            alt={still.alt}
            width={still.width}
            height={still.height}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 'var(--radius-md, 16px)',
              border: '1px solid var(--glass-edge, rgba(128,128,128,.25))',
            }}
          />
          {still.caption && (
            <figcaption
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: 'var(--glass-text-muted)',
                maxWidth: '68ch',
              }}
            >
              {still.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
