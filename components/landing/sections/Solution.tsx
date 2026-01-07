import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

function FlowStepper() {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-6">
      <h3 className="text-sm font-medium text-text">
        {LANDING_COPY.solution.flowTitle}
      </h3>

      <div className="mt-6">
        <ol className="grid gap-4 md:grid-cols-4 md:gap-5">
          {LANDING_COPY.solution.flow.map((s, idx) => (
            <li
              key={s.title}
              className="relative flex flex-col"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-text">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
              {idx < LANDING_COPY.solution.flow.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[-18px] top-4 hidden h-0.5 w-[18px] bg-border/60 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Solution() {
  return (
    <Section
      id={SECTION_IDS.system}
      eyebrow="System"
      title={LANDING_COPY.solution.title}
      lead={LANDING_COPY.solution.lead}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <p className="text-sm font-medium text-text">
              One principle: <span className="font-semibold">proof before rewards.</span>
            </p>
            <ul className="mt-5 space-y-3">
              {LANDING_COPY.solution.pillars.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text/45" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-border bg-surface/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/80">
                Roadmap mindset
              </p>
              <p className="mt-2 text-sm text-muted">
                Data before features. Verification before rewards. Expansion after filters are complete.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <FlowStepper />
        </div>
      </div>
    </Section>
  )
}


