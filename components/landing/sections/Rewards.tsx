import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'
import { Stepper } from '@/components/landing/Stepper'

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
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-text">{LANDING_COPY.rewards.gatedTitle}</p>
              <p className="text-xs text-muted/80">Integrity-gated progression</p>
            </div>
            <div className="mt-6">
              <Stepper
                items={LANDING_COPY.rewards.gates.map((g) => ({ title: g }))}
                variant="gated"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <p className="text-sm font-medium text-text">{LANDING_COPY.rewards.warningTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {LANDING_COPY.rewards.warningText}
            </p>
            <div className="mt-6 rounded-xl border border-border bg-surface/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/80">
                Design note
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Rewards should validate integrity, not create a shortcut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}



