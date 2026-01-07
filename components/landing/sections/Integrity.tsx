import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

function IntegrityChecklist() {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5">
      <p className="text-sm font-medium text-text">{LANDING_COPY.integrity.checklistTitle}</p>
      <ul className="mt-4 space-y-2">
        {LANDING_COPY.integrity.checklist.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-text/45" />
            <span>{item}</span>
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
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-2xl border border-border bg-surface/60 p-4">
            <Placeholder
              label={LANDING_COPY.integrity.diagramSlotLabel}
              minHeightClassName="min-h-[260px] sm:min-h-[320px]"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <ul className="space-y-3">
              {LANDING_COPY.integrity.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-text/55" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-border bg-surface/50 p-4">
              <p className="text-sm font-medium text-text">Verified, accumulative performance</p>
              <p className="mt-1 text-sm text-muted">
                Integrity turns execution into a score you can trust — and keep.
              </p>
            </div>
          </div>

          <IntegrityChecklist />
        </div>
      </div>
    </Section>
  )
}



