import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

function IntegrityChecklist() {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-6">
      <p className="text-sm font-semibold text-text mb-4">{LANDING_COPY.integrity.checklistTitle}</p>
      <ul className="space-y-3">
        {LANDING_COPY.integrity.checklist.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Integrity() {
  return (
    <Section
      id={SECTION_IDS.integrity}
      eyebrow="Integrity"
      title={LANDING_COPY.integrity.title}
      lead={LANDING_COPY.integrity.lead}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        <div className="rounded-2xl border border-border bg-surface/60 p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-text mb-4">Verification-first principles</h3>
              <ul className="space-y-3">
                {LANDING_COPY.integrity.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-muted">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 border-t border-border/50">
              <div className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-accent-2/5 p-5">
                <p className="text-sm font-semibold text-text mb-2">Verified, accumulative performance</p>
                <p className="text-sm leading-relaxed text-muted">
                  Integrity turns execution into a score you can trust — and keep.
                </p>
              </div>
            </div>
          </div>
        </div>

        <IntegrityChecklist />
      </div>
    </Section>
  )
}



