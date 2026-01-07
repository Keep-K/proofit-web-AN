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
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-950">{b.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{b.lines[0]}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">{b.lines[1]}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">{LANDING_COPY.token.disclaimer}</p>
    </Section>
  )
}


