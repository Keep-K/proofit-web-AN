import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function Token() {
  return (
    <Section
      id={SECTION_IDS.token}
      eyebrow="Token"
      title={LANDING_COPY.token.title}
      lead={LANDING_COPY.token.lead}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {LANDING_COPY.token.boxes.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:bg-surface/75"
          >
            <h3 className="text-base font-medium text-text">{b.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{b.lines[0]}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{b.lines[1]}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted/80">{LANDING_COPY.token.disclaimer}</p>
    </Section>
  )
}


