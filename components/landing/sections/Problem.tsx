import Image from 'next/image'
import { LANDING_COPY, SECTION_IDS } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function Problem() {
  const cardEyebrows = ['01 / BODY MODEL', '02 / EXECUTION', '03 / PERFORMANCE'] as const
  return (
    <Section
      id={SECTION_IDS.problem}
      eyebrow="Problem"
      title={LANDING_COPY.problem.title}
      lead={LANDING_COPY.problem.lead}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start">
        <div className="sm:col-span-1">
          <div className="rounded-2xl border border-border bg-surface/60 p-6 h-full flex flex-col">
            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="/images/handmade/Art1.png"
                alt="Problem illustration: Insert your data and Yourself"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted flex-1">
              Existing platforms optimize for <span className="text-text font-medium">engagement</span>, not{' '}
              <span className="text-text font-medium">verified execution</span>.
            </p>
          </div>
        </div>

        {LANDING_COPY.problem.cards.map((c, idx) => (
          <div
            key={c.title}
            className="group flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:bg-surface/75 md:min-h-[200px]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/80">
              {cardEyebrows[idx] ?? `${String(idx + 1).padStart(2, '0')} / TOPIC`}
            </p>
            <h3 className="mt-3 text-base font-medium text-text">
              {c.title.replace(/^\s*[•·‣▪-]+\s*/, '')}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}


