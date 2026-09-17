'use client'

import { useState } from 'react'
import { EMAIL } from '@/lib/content.schema'

type Who = 'recruiter' | 'client' | 'colleague'

const TABS: { key: Who; label: string }[] = [
  { key: 'recruiter', label: 'Recruiter' },
  { key: 'client', label: 'Client' },
  { key: 'colleague', label: 'Colleague' },
]

function mailto(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ConnectForm() {
  const [who, setWho] = useState<Who>('client')
  const [mission, setMission] = useState('')
  const [copied, setCopied] = useState<Who | null>(null)

  const missionWords = mission.trim() === '' ? 0 : mission.trim().split(/\s+/).length

  async function copyTemplate(who: Who, text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(who)
      setTimeout(() => setCopied(null), 2000)
    } catch {}
  }

  const recruiterBody = `Subject: Role inquiry\nYou are: \nTitle: \nCompensation range: \nLocation: \nLink: `
  const colleagueBody = `Subject: Hello\nWhere we crossed paths: \nWhat you are working on: `

  return (
    <div
      className="glass-content"
      style={{
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(var(--space-4),2.4vw,var(--space-6))',
        display: 'grid',
        gap: 'var(--space-5)',
      }}
    >
      <div
        role="tablist"
        aria-label="Who is getting in touch"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
          gap: 'var(--space-1)',
          padding: 'var(--space-1)',
          borderRadius: 'var(--radius-pill)',
          border: 'var(--hairline) solid var(--glass-edge)',
          background: 'rgba(var(--glass-tint),.14)',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={who === tab.key}
            onClick={() => setWho(tab.key)}
            style={{
              appearance: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 13,
              padding: '8px 0',
              borderRadius: 999,
              border: 0,
              background: who === tab.key ? 'var(--primary)' : 'transparent',
              color: who === tab.key ? 'var(--primary-fg)' : 'var(--text-muted)',
              fontWeight: who === tab.key ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {who === 'recruiter' && (
        <div style={{ display: 'grid', gap: 12 }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Arrives in your mail client, pre-filled. Fill in the blanks before sending, or copy
            the template as plain text.
          </p>
          <pre
            className="mono"
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: 12,
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--glass-edge)',
              background: 'rgba(var(--glass-tint),.14)',
            }}
          >
            {recruiterBody}
          </pre>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="glass" data-glass-level="button" data-glass-interactive="" href={mailto('Role inquiry', recruiterBody)}>
              Open in email
            </a>
            <button type="button" className="glass" data-glass-level="button" data-glass-interactive="" onClick={() => copyTemplate('recruiter', recruiterBody)}>
              {copied === 'recruiter' ? 'Copied' : 'Copy template'}
            </button>
          </div>
          <p className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{EMAIL}</p>
        </div>
      )}

      {who === 'client' && (
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'grid', gap: 16 }}
        >
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="mono glass-micro" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              Your mission, in 15 words or fewer
            </span>
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              rows={2}
              style={{
                fontFamily: 'inherit',
                fontSize: 14,
                padding: 10,
                borderRadius: 8,
                border: '1px solid var(--glass-edge)',
                background: 'rgba(var(--glass-tint),.14)',
                resize: 'vertical',
              }}
            />
            <span className="mono" style={{ fontSize: 11, color: missionWords > 15 ? '#c0392b' : 'var(--text-muted)' }}>
              {missionWords} / 15
            </span>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="mono glass-micro" style={{ fontSize: 10, textTransform: 'uppercase' }}>Name</span>
            <input type="text" style={{ fontFamily: 'inherit', fontSize: 14, padding: 10, borderRadius: 8, border: '1px solid var(--glass-edge)', background: 'rgba(var(--glass-tint),.14)' }} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="mono glass-micro" style={{ fontSize: 10, textTransform: 'uppercase' }}>Email</span>
            <input type="email" style={{ fontFamily: 'inherit', fontSize: 14, padding: 10, borderRadius: 8, border: '1px solid var(--glass-edge)', background: 'rgba(var(--glass-tint),.14)' }} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="mono glass-micro" style={{ fontSize: 10, textTransform: 'uppercase' }}>Timeline</span>
            <input type="text" style={{ fontFamily: 'inherit', fontSize: 14, padding: 10, borderRadius: 8, border: '1px solid var(--glass-edge)', background: 'rgba(var(--glass-tint),.14)' }} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="mono glass-micro" style={{ fontSize: 10, textTransform: 'uppercase' }}>Link</span>
            <input type="url" style={{ fontFamily: 'inherit', fontSize: 14, padding: 10, borderRadius: 8, border: '1px solid var(--glass-edge)', background: 'rgba(var(--glass-tint),.14)' }} />
          </label>
          <button
            type="submit"
            className="glass"
            data-glass-level="button"
            data-emphasis="primary"
            data-glass-interactive=""
            style={{ justifySelf: 'start' }}
          >
            Send inquiry
          </button>
        </form>
      )}

      {who === 'colleague' && (
        <div style={{ display: 'grid', gap: 12 }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Same idea, simpler — arrives pre-filled, or copy the template as plain text.
          </p>
          <pre
            className="mono"
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: 12,
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--glass-edge)',
              background: 'rgba(var(--glass-tint),.14)',
            }}
          >
            {colleagueBody}
          </pre>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="glass" data-glass-level="button" data-glass-interactive="" href={mailto('Hello', colleagueBody)}>
              Open in email
            </a>
            <button type="button" className="glass" data-glass-level="button" data-glass-interactive="" onClick={() => copyTemplate('colleague', colleagueBody)}>
              {copied === 'colleague' ? 'Copied' : 'Copy template'}
            </button>
          </div>
          <p className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{EMAIL}</p>
        </div>
      )}
    </div>
  )
}
