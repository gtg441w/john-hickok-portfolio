import { EMAIL } from '@/lib/content.schema'

/* Resume content is hard-coded here, not in the content schema — one author, one
 * resume; per content.schema.ts's own note, this is "typed in the component,
 * changed in a commit." Sourced from the real resume in content/resume/. Phone
 * number is deliberately held off this public page (PDF only, per the handoff). */

const roleProgression = ['UX Architect', 'UX Manager', 'Senior UX Manager', 'Director']

const experience = [
  {
    org: 'NCR Voyix',
    place: 'Atlanta, GA',
    title: 'Director, UX Strategy',
    dates: 'March 2019 – Present',
    bullets: [
      'Oversee UX for the NCR Voyix Restaurant line of business, guiding cross-functional teams across remote, hybrid and in-office environments.',
      'Developed and executed creative strategies aligning design systems with user needs, business goals and brand identity.',
      'Championed user empathy throughout the design lifecycle, collaborating with stakeholders to understand needs and pain points.',
      "Accountable for design output quality, design system implementation and resource allocation aligned with NCR's Voyix Commerce Strategy.",
      'Led and mentored international design teams delivering functional designs for hospitality, retail and banking applications.',
    ],
    progression: roleProgression,
  },
  {
    org: 'Acuity Brands',
    place: 'Conyers, GA',
    title: 'Design Engineer, Controls',
    dates: 'January 2012 – March 2019',
    bullets: [
      'Designed intuitive UX for lighting and building management systems across embedded software, desktop and mobile.',
      'Led UX design teams from concept to final release, aligning solutions with strategic vision.',
      'Created responsive UI prototypes for user testing against current trends, best practices and brand standards.',
      'Developed stylistic and digital guidelines that streamlined UX project initiation for development teams.',
      'Completed the Innovation Leadership Program, gaining expertise in OLED, LED and other lighting technologies.',
    ],
  },
  {
    org: 'Freelance',
    place: 'Atlanta, GA',
    title: 'Graphic Designer',
    dates: 'January 2006 – Present',
    bullets: [
      'Creative direction and design services for various clients: logo design, apparel design, promotional materials.',
    ],
  },
]

const skills = [
  'UX Design Tools — Figma, Sketch, Adobe Creative Suite',
  'Design Processes — Wireframing, prototyping, usability testing, design thinking, information architecture',
  'Effective Communication',
  'Leadership & Strategy',
  'Collaboration & Communication',
  'Problem Solving & Creativity',
  'UX Strategic Thinking & Innovation',
  'User-Centered Design',
  'Continuous Improvement',
  'Team Leadership',
  'Iterative Design',
  'User Insights & Research',
  'Cross-Functional Collaboration',
  'Senior Management Interaction',
  'Product Portfolio Management',
  'Coaching & Mentorship',
]

const patents = [
  'US9018840B2', 'US20140265865A1', 'USD645196S1', 'USD643566S1', 'USD653793S1',
  'USD654208S1', 'USD672902S1', 'USD672909S1', 'USD729793S1', 'USD729797S1',
  'USD772177S1', 'USD809701S1', 'USD807567S1', 'CA2929211A1', 'USD799102S1',
  'USD808575S1', 'USD810999S1', 'US20180031216A1',
]

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
  gap: 16,
}

export default function ExperiencePage() {
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
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'grid', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--glass-text)' }}>
              John Hickok
            </span>
            <span style={{ fontSize: 14, color: 'var(--glass-text-muted)' }}>Director, UX Strategy · NCR Voyix</span>
          </div>
          <span className="mono glass-micro" style={sectionLabelStyle}>PDF</span>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--glass-text-muted)' }}>
          <span>Atlanta, GA</span>
          <span>{EMAIL}</span>
          <span>LinkedIn</span>
          <span className="mono glass-micro" style={sectionLabelStyle}>phone held for the PDF, not the page</span>
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--glass-text)' }}>
          Dynamic and results-oriented UX leader with over a decade of experience driving
          innovation and excellence in user-centered design. Skilled in fostering
          collaboration, solving complex problems, and effectively communicating with
          stakeholders at all levels.
        </p>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>Experience</span>
          {experience.map((job) => (
            <div key={job.org} style={{ display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--glass-text)' }}>
                  {job.org}, {job.place} — <span style={{ fontWeight: 400, fontStyle: 'italic' }}>{job.title}</span>
                </span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--glass-text-muted)' }}>{job.dates}</span>
              </div>
              {job.progression && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  {job.progression.map((role, i) => (
                    <span key={role} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="mono glass-micro" style={{ fontSize: 10, color: 'var(--glass-text-muted)' }}>{role}</span>
                      {i < job.progression.length - 1 && <span style={{ color: 'var(--glass-text-muted)' }}>→</span>}
                    </span>
                  ))}
                </div>
              )}
              <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
                {job.bullets.map((b) => (
                  <li key={b} style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--glass-text-muted)' }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>Recognition</span>
          <div style={{ display: 'grid', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--glass-text)' }}>
              2021 R&D Award — <span style={{ fontWeight: 400, fontStyle: 'italic' }}>Meritorious Achievement</span>
            </span>
            <span style={{ fontSize: 13, color: 'var(--glass-text-muted)' }}>
              For meritorious technical achievement in software and technology.
            </span>
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--glass-text)' }}>
              Patents — <span style={{ fontWeight: 400, fontStyle: 'italic' }}>US Design Patents</span>
            </span>
            <span className="mono" style={{ fontSize: 11, lineHeight: 1.6, color: 'var(--glass-text-muted)' }}>
              {patents.join(' · ')}
            </span>
          </div>
        </div>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>Education</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--glass-text)' }}>
            Georgia Institute of Technology, Atlanta, GA — <span style={{ fontWeight: 400, fontStyle: 'italic' }}>B.S. Industrial Design</span>
          </span>
          <span style={{ fontSize: 13, color: 'var(--glass-text-muted)' }}>Certificate in Sociology & Social Psychology</span>
        </div>

        <div style={sectionStyle}>
          <span className="mono glass-micro" style={sectionLabelStyle}>Tools & craft</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {skills.map((s) => (
              <span
                key={s}
                className="mono"
                style={{
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 999,
                  border: '1px solid var(--glass-edge)',
                  color: 'var(--glass-text-muted)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
