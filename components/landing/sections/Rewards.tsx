import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

function GatedLogic() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-zinc-950">{LANDING_COPY.rewards.gatedTitle}</p>
        <p className="text-xs text-zinc-500">Integrity-gated progression</p>
      </div>

      <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-4">
        {LANDING_COPY.rewards.gates.map((g, idx) => (
          <li key={g} className="relative rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm font-semibold text-zinc-900">
                {idx + 1}
              </span>
              <span className="text-sm font-semibold text-zinc-950">{g}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Rewards() {
  return (
    <Section
      id={SECTION_IDS.rewards}
      eyebrow="Rewards"
      title={LANDING_COPY.rewards.title}
      lead={LANDING_COPY.rewards.lead}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8">
          <GatedLogic />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-amber-950">{LANDING_COPY.rewards.warningTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/80">
              {LANDING_COPY.rewards.warningText}
            </p>
            <div className="mt-5 rounded-xl border border-amber-200 bg-white/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800/80">
                Design note
              </p>
              <p className="mt-2 text-sm text-amber-900/80">
                Rewards should validate integrity, not create a shortcut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


