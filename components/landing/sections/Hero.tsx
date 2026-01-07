import { LANDING_COPY, SECTION_IDS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

export function Hero() {
  return (
    <Section className="border-t-0">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Verification-first performance
          </p>

          <h1 className="mt-4 max-w-[22ch] text-balance whitespace-pre-line text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl md:text-6xl">
            {LANDING_COPY.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
            Most platforms suggest plans. PROOFIT verifies execution — turning it into trusted performance that
            accumulates.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`#${SECTION_IDS.system}`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 sm:w-auto"
            >
              {LANDING_COPY.hero.primaryCta}
            </a>
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 sm:w-auto"
            >
              {LANDING_COPY.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <Placeholder
              label="HERO VISUAL SLOT"
              minHeightClassName="min-h-[280px] sm:min-h-[420px] md:min-h-[520px]"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}


