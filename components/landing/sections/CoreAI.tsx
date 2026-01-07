import { LANDING_COPY } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

export function CoreAI() {
  return (
    <Section eyebrow="AI" title={LANDING_COPY.coreAI.title} lead={LANDING_COPY.coreAI.lead}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {LANDING_COPY.coreAI.modules.map((m) => (
          <article
            key={m.title}
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-zinc-950">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{m.text}</p>
              </div>
              <div className="hidden h-8 w-8 rounded-xl border border-zinc-200 bg-zinc-50 sm:block" />
            </div>
            <div className="mt-5">
              <Placeholder
                label={m.slot}
                minHeightClassName="min-h-[140px]"
                className="rounded-xl"
              />
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}


