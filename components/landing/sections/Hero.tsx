import { LANDING_COPY, SECTION_IDS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

export function Hero() {
  return (
    <Section className="border-t-0 pt-10 sm:pt-14">
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-6">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-950/70" />
            Verification-first health performance
          </p>

          <h1 className="text-balance whitespace-pre-line text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            {LANDING_COPY.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl whitespace-pre-line text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
            {LANDING_COPY.hero.subhead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`#${SECTION_IDS.system}`}
              className="inline-flex items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              {LANDING_COPY.hero.primaryCta}
            </a>
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              {LANDING_COPY.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <Placeholder
              label={LANDING_COPY.hero.visualSlotLabel}
              minHeightClassName="min-h-[320px] sm:min-h-[420px]"
              className="rounded-xl"
            />
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-600">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
                <p className="font-medium text-zinc-900">No real media</p>
                <p className="mt-1">Replace this slot later.</p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
                <p className="font-medium text-zinc-900">CSS-only polish</p>
                <p className="mt-1">Hover & focus states.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


