import { LANDING_COPY, SECTION_IDS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function FAQ() {
  return (
    <Section id={SECTION_IDS.faq} eyebrow="FAQ" title={LANDING_COPY.faq.title}>
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
            {LANDING_COPY.faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-transparent p-4 transition hover:border-zinc-200 hover:bg-zinc-50"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-950 focus:outline-none">
                  <div className="flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-zinc-500 transition group-open:rotate-45">+</span>
                  </div>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-zinc-950">Need the full spec?</p>
            <p className="mt-2 text-sm text-zinc-600">
              The complete reference lives in the whitepaper/docs.
            </p>
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              Read Whitepaper
            </a>
          </div>
        </aside>
      </div>
    </Section>
  )
}


