import ConnectForm from '@/components/connect/ConnectForm'

export default function ConnectPage() {
  return (
    <main style={{ padding: 'clamp(16px,3vw,32px)', maxWidth: 900, margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
          gap: 'var(--space-4)',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'grid', gap: 'var(--space-4)', padding: 'var(--space-2) 0' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--glass-text)' }}>
            Connect
          </span>
          <span style={{ fontSize: 15, color: 'var(--glass-text-muted)' }}>
            A form where a constraint does real work, and plain email everywhere else.
          </span>
          <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
            <span
              className="mono glass-micro"
              style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--glass-text-muted)' }}
            >
              Why it differs
            </span>
            <span style={{ fontSize: 14, color: 'var(--glass-text-muted)' }}>
              A client gets a real form, with a 15-word mission constraint that filters rather
              than gatekeeps. A recruiter or colleague gets plain email, pre-filled so nothing
              gets lost in a subject line.
            </span>
          </div>
        </div>

        <ConnectForm />
      </div>
    </main>
  )
}
