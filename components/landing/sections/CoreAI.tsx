import Image from 'next/image'
import { LANDING_COPY } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

const MODULE_IMAGES: Record<string, string> = {
  'Body Analysis AI': '/images/coreai/body-analysis.png',
  'Goal Planning AI': '/images/coreai/goal-planning.png',
  'Motion Correction AI': '/images/coreai/motion-correction.png',
  'Adaptive Optimization AI': '/images/coreai/adaptive-optimization.png',
}

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
            <div className="mt-5 relative min-h-[180px] w-full rounded-xl overflow-hidden bg-surface-2">
              <Image
                src={MODULE_IMAGES[m.title] || '/images/coreai/body-analysis.png'}
                alt={`${m.title} visualization`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}


