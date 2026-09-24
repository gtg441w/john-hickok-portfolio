import Link from 'next/link'
import { EMAIL } from '@/lib/content.schema'

/* Copy is drawn from the resume, the published artifacts and the practice record —
 * nothing here is a claim those sources do not make. Layout follows the Experience
 * page: one glass-content pane, hard-coded, "typed in the component, changed in a
 * commit." */

const sectionLabelStyle = {
  fontSize: 10,
  letterSpacing: '.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--glass-text-muted)',
}

const sectionStyle = {
  borderTop: '1px solid var(--line-hairline)',
  paddingTop: 24,
  display: 'grid' as const,
  gap: 12,
}

const linkStyle = { color: 'var(--glass-text)', textDecoration: 'underline', textUnderlineOffset: 3 }
const bodyStyle = { fontSize: 15, lineHeight: 1.65, color: 'var(--glass-text)', margin: 0 }
const mutedStyle = { fontSize: 14, lineHeight: 1.6, color: 'var(--glass-text-muted)', margin: 0 }

const facts = [
  ['Now', 'Director, UX Strategy, NCR Voyix Restaurant'],
  ['Path', 'UX Architect → UX Manager → Senior UX Manager → Director'],
  ['Before', 'Acuity Brands, lighting and building controls, 2012–2019'],
  ['Studied', 'Industrial Design, Georgia Tech, with a certificate in Sociology & Social Psychology'],
  ['On record', 'More than a dozen US design patents, and a 2021 R&D Award'],
  ['Based', 'Atlanta, Georgia'],
]

export default function AboutPage() {
  return (
    <main style={{ padding: 'clamp(16px,3vw,32px)' }}>
      <div
        className="glass-content"
        style={{
          borderRadius: 20,
          padding: 'clamp(24px,3.2vw,48px)',
          display: 'grid',
          gap: 24,
          maxWidth: 780,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'grid', gap: 8 }}>
          <span className="mono glass-micro" style={sectionLabelStyle}>About</span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,4vw,38px)',
              lineHeight: 1.15,
              fontWeight: 600,
              color: 'var(--glass-text)',
              margin: 0,
            }}
          >
            I lead UX from the boardroom to the pixel.
          </h1>
        </div>

        <p style={{ ...bodyStyle, fontSize: 17 }}>
          I&apos;m John Hickok, a UX leader in Atlanta. I&apos;ve spent my career on products
          where the interface is only half the job: a lighting controller on a wall, a
          self-checkout cash unit, a restaurant manager&apos;s dashboard. The work that
          matters is deciding what the thing should do, and then seeing it through to
          something real people can use.
        </p>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>How I got here</span>
          <p style={bodyStyle}>
            I started as an industrial designer. At Georgia Tech I paired that degree with a
            certificate in sociology and social psychology, and the pairing has shaped how I
            work ever since: a product is an object, and it is also a small piece of social
            behavior. I&apos;ve been taking freelance graphic design work since 2006, which
            kept my hands in craft while my day jobs grew more strategic.
          </p>
          <p style={bodyStyle}>
            At Acuity Brands I designed controls for lighting and building management across
            embedded screens, desktop and mobile, and led design from concept to release. That
            is where the patents come from, and where I learned to own a product end to end,
            from the enclosure and the interface to the packaging and installation materials.
          </p>
          <p style={bodyStyle}>
            In 2019 I joined NCR Voyix as a UX Architect and moved up through UX Manager and
            Senior UX Manager to Director of UX Strategy, where I now lead UX for the
            Restaurant line of business, with teams that span countries and work remote,
            hybrid and in the office.
          </p>
        </div>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>How I work</span>
          <p style={bodyStyle}>
            I try to keep the work honest at every altitude. With executives that means
            turning a strategy into a question a design team can answer. With a team it means
            frameworks and operating rhythm that let good work happen without me in the room.
            At the screen it means details like a cash pickup that advances when the machine
            senses what you did, not when you tap Next.
          </p>
          <p style={bodyStyle}>
            I&apos;m at my best when the problem starts vague. I like turning ambiguity into
            a method other people can pick up and reuse, like the{' '}
            <Link href="/work/making-analytics-actionable" style={linkStyle}>
              analytics framework
            </Link>{' '}
            that grew out of an idea I learned from a colleague and then extended.
          </p>
          <p style={bodyStyle}>
            I also care about growing designers. I built a{' '}
            <Link href="/work/vibe-coding-workshop" style={linkStyle}>
              game-based workshop
            </Link>{' '}
            so my team could learn to build with AI without the intimidation, and I coach
            people through the same shift I&apos;m making myself.
          </p>
        </div>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>On using AI</span>
          <p style={bodyStyle}>
            I design and build with AI, and I keep a running record of what it got wrong. The useful question isn&apos;t whether someone used AI, it&apos;s
            whether they were in a position to notice when the output was wrong. This site was
            built that way, and the record is the proof.
          </p>
        </div>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>At a glance</span>
          <dl style={{ margin: 0, display: 'grid', gap: 10 }}>
            {facts.map(([k, v]) => (
              <div
                key={k}
                style={{ display: 'grid', gridTemplateColumns: 'minmax(72px,110px) 1fr', gap: 12, alignItems: 'baseline' }}
              >
                <dt className="mono glass-micro" style={sectionLabelStyle}>{k}</dt>
                <dd style={{ ...mutedStyle, margin: 0 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>Say hello</span>
          <p style={mutedStyle}>
            If you&apos;re hiring, building something hard, or just want to trade notes on
            design leadership, write to{' '}
            <a href={`mailto:${EMAIL}`} style={linkStyle}>{EMAIL}</a>{' '}
            or use the <Link href="/connect" style={linkStyle}>Connect</Link> page. My{' '}
            <Link href="/experience" style={linkStyle}>resume</Link> has the full history.
          </p>
        </div>
      </div>
    </main>
  )
}
