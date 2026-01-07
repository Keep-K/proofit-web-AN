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
            className="group rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:bg-surface/75"
          >
            <h3 className="text-base font-medium text-text">{m.title}</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {m.chips.slice(0, 3).map((chip) => (
                <span
                  key={`${m.title}-${chip}`}
                  className="inline-flex items-center rounded-full border border-border bg-surface/60 px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm font-semibold text-text">{m.micro}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
            <div className="mt-5">
              <Placeholder
                label={m.slot}
                minHeightClassName="min-h-[140px]"
                className="rounded-xl"
                subtle={true}
              />
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}


