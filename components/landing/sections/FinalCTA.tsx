import { LANDING_COPY, WHITEPAPER_URL } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function FinalCTA() {
  return (
    <Section>
      <div className="rounded-3xl border border-stone-200 bg-white/60 p-8 sm:p-10">
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="text-balance text-3xl font-medium leading-snug tracking-tight text-zinc-950 sm:text-4xl">
              {LANDING_COPY.finalCta.title}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-stone-600 sm:text-lg">
              {LANDING_COPY.finalCta.lead}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={WHITEPAPER_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15"
              >
                {LANDING_COPY.finalCta.primary}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-md border border-stone-200 bg-transparent px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15"
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



