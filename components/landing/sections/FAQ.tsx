import { LANDING_COPY, SECTION_IDS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function FAQ() {
  return (
    <Section id={SECTION_IDS.faq} eyebrow="FAQ" title={LANDING_COPY.faq.title}>
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl border border-border bg-surface/60 p-2">
            {LANDING_COPY.faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-transparent p-4 transition-colors hover:border-border hover:bg-surface/70 focus-within:border-border focus-within:bg-surface/70"
              >
                <summary
                  className={[
                    'cursor-pointer list-none text-sm font-medium text-text focus:outline-none',
                    'flex items-center justify-between gap-4',
                    "after:content-['+'] after:text-muted/80 after:transition",
                    "group-open:after:content-['–']",
                    'focus-visible:ring-2 focus-visible:ring-accent/25 rounded-lg px-1 py-1',
                    '[&::-webkit-details-marker]:hidden',
                  ].join(' ')}
                >
                  <span className="pr-2">{item.q}</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <p className="text-sm font-medium text-text">Need the full spec?</p>
            <p className="mt-2 text-sm text-muted">
              The complete reference lives in the whitepaper/docs.
            </p>
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-surface transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
            >
              Read Whitepaper
            </a>
          </div>
        </aside>
      </div>
    </Section>
  )
}


