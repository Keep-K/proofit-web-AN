import { LANDING_COPY, WHITEPAPER_URL } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function FinalCTA() {
  return (
    <Section className="bg-white/40">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="text-balance text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
              {LANDING_COPY.finalCta.title}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
              {LANDING_COPY.finalCta.lead}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={WHITEPAPER_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              >
                {LANDING_COPY.finalCta.primary}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              >
                {LANDING_COPY.finalCta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


