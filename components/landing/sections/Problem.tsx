import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

export function Problem() {
  return (
    <Section
      id={SECTION_IDS.problem}
      eyebrow="Problem"
      title={LANDING_COPY.problem.title}
      lead={LANDING_COPY.problem.lead}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <Placeholder
              label={LANDING_COPY.problem.illustrationSlotLabel}
              minHeightClassName="min-h-[220px] lg:min-h-[280px]"
            />
            <p className="mt-4 text-sm text-zinc-600">
              Existing platforms optimize for <span className="text-zinc-900 font-medium">engagement</span>,
              not <span className="text-zinc-900 font-medium">verified execution</span>.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {LANDING_COPY.problem.cards.map((c) => (
              <div
                key={c.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-semibold text-zinc-900">
                  •
                </div>
                <h3 className="text-base font-semibold text-zinc-950">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}


