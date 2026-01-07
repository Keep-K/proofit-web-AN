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
            className="group rounded-2xl border border-stone-200 bg-white/60 p-6 transition-colors hover:bg-white/80"
          >
            <h3 className="text-base font-medium text-zinc-950">{m.title}</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {m.chips.slice(0, 3).map((chip) => (
                <span
                  key={`${m.title}-${chip}`}
                  className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-700"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm font-semibold text-zinc-900">{m.micro}</p>

            <p className="mt-2 text-sm leading-relaxed text-stone-600">{m.text}</p>
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


