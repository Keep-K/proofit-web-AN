import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

function FlowStepper() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-zinc-950">
          {LANDING_COPY.solution.flowTitle}
        </h3>
      </div>

      <div className="mt-4">
        <ol className="grid gap-3 md:grid-cols-4 md:gap-4">
          {LANDING_COPY.solution.flow.map((s, idx) => (
            <li
              key={s.title}
              className="relative rounded-xl border border-zinc-200 bg-zinc-50 p-4 md:p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm font-semibold text-zinc-900">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-950">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{s.text}</p>
                </div>
              </div>
              {idx < LANDING_COPY.solution.flow.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[-10px] top-1/2 hidden h-px w-5 bg-zinc-300 md:block"
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
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-900">
              One principle: <span className="font-semibold">proof before rewards.</span>
            </p>
            <ul className="mt-5 space-y-3">
              {LANDING_COPY.solution.pillars.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-900">
                    ✓
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Roadmap mindset
              </p>
              <p className="mt-2 text-sm text-zinc-700">
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


