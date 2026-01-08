import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function Roadmap() {
  return (
    <Section
      id={SECTION_IDS.roadmap}
      eyebrow="Roadmap"
      title={LANDING_COPY.roadmap.title}
      lead={LANDING_COPY.roadmap.lead}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <ol className="relative space-y-6 border-l border-border pl-6">
              {LANDING_COPY.roadmap.phases.map((p) => (
                <li key={p.title} className="relative pl-2">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border border-border bg-surface"
                  />
                  <h3 className="text-base font-medium text-text">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <p className="text-sm font-medium text-text">{LANDING_COPY.roadmap.safetyTitle}</p>
            <ul className="mt-4 space-y-3">
              {LANDING_COPY.roadmap.safety.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text/45" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/80">
              Rollout principle
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Ship gates first. Expand only when trust signals stay stable.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}



