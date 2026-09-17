import type { Still } from '@/lib/content.schema'
import ArtifactCard from '@/components/artifact/ArtifactCard'
import Rail from '@/components/artifact/Rail'
import FrameworkCard from '@/components/framework/FrameworkCard'

function still(src: string, width: number, height: number): Still {
  return { src, alt: '', width, height, chromeMode: 'dark', scrimStrength: 0.62 }
}

const frameworks = [
  { title: 'Altitude', subtitle: '[Executive to tactical, one model.]' },
  { title: 'Ambiguity to execution', subtitle: '[Framework 02 — one line.]' },
  { title: 'Operating cadence', subtitle: '[Framework 03 — one line.]' },
  { title: '[Framework 04]', subtitle: '[Framework 04 — one line.]' },
]

const projects = [
  { title: 'Fresco', src: '/media/artifact-movie-box.png', w: 752, h: 588 },
  { title: 'Cash Management', src: '/media/artifact-retreat-site.png', w: 900, h: 579 },
  { title: 'Aloha Smart Manager', src: '/media/artifact-voice-app.png', w: 2048, h: 1536 },
  { title: 'ITM', src: '/media/artifact-weather-glass.png', w: 1200, h: 844 },
]

export default function HomePage() {
  return (
    <main>
      <div style={{ display: 'grid', gap: 32, padding: 'clamp(16px,3vw,32px)', maxWidth: 1180, margin: '0 auto' }}>
        <span
          style={{
            fontSize: 16,
            lineHeight: 1.5,
            color: 'var(--glass-text-muted)',
            maxWidth: '52ch',
            paddingLeft: 4,
          }}
        >
          A UX leader who can operate at every altitude.{' '}
          <span style={{ color: 'var(--glass-text)' }}>
            [Positioning line — one sentence on translating executive vision into shipped
            experience.]
          </span>
        </span>

        <ArtifactCard
          href="/work/fresco"
          size="lg"
          featured
          title="Fresco"
          kind="Project · NCR Voyix"
          framing="[Framing line — the problem this solved and why it mattered, in one sentence.]"
          meta="18 min · applies Altitude"
          still={still('/media/artifact-smart-home.avif', 1024, 768)}
        />

        <Rail title="Frameworks" caption="rail · numbered spine · top of the hierarchy" minColumnWidth={210}>
          {frameworks.map((fw, i) => (
            <FrameworkCard key={fw.title} href="/work" index={i + 1} title={fw.title} subtitle={fw.subtitle} />
          ))}
        </Rail>

        <Rail title="Projects" caption="rail · horizontal · snap · C3 standard at rail scale" minColumnWidth={248}>
          {projects.map((p) => (
            <ArtifactCard
              key={p.title}
              href="/work"
              size="sm"
              title={p.title}
              kind="Project · NCR Voyix"
              still={still(p.src, p.w, p.h)}
            />
          ))}
        </Rail>
      </div>
    </main>
  )
}
