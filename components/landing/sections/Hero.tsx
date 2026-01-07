import { LANDING_COPY, SECTION_IDS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

export function Hero() {
  return (
    <Section className="border-t-0">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/80">
            Verification-first performance
          </p>

          <h1 className="mt-4 max-w-[22ch] text-balance whitespace-pre-line text-4xl font-medium leading-snug tracking-tight text-text sm:text-5xl md:text-6xl">
            {LANDING_COPY.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Most platforms suggest plans. PROOFIT verifies execution — turning it into trusted performance that
            accumulates.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`#${SECTION_IDS.system}`}
              className="inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-surface transition hover:bg-accent-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 sm:w-auto"
            >
              {LANDING_COPY.hero.primaryCta}
            </a>
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md border border-border bg-transparent px-5 py-3 text-sm font-medium text-text transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 sm:w-auto"
            >
              {LANDING_COPY.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <Placeholder
              label="HERO VISUAL SLOT"
              minHeightClassName="min-h-[280px] sm:min-h-[420px] md:min-h-[520px]"
              className="rounded-xl"
              subtle={true}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}


