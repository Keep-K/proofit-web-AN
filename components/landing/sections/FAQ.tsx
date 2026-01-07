import { LANDING_COPY, SECTION_IDS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

export function FAQ() {
  return (
    <Section id={SECTION_IDS.faq} eyebrow="FAQ" title={LANDING_COPY.faq.title}>
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-0 rounded-2xl border border-border bg-surface/60 divide-y divide-border/50">
            {LANDING_COPY.faq.items.map((item) => (
              <details
                key={item.q}
                className="group"
              >
                <summary
                  className={[
                    'cursor-pointer list-none text-sm font-medium text-text focus:outline-none',
                    'flex items-center justify-between gap-4 px-6 py-4',
                    'transition-colors hover:bg-surface/50',
                    'focus-visible:ring-2 focus-visible:ring-accent/25 focus-visible:ring-inset',
                    '[&::-webkit-details-marker]:hidden',
                    "before:content-[''] before:w-0 before:flex-shrink-0",
                    "after:content-['+'] after:text-muted-2 after:transition-transform after:duration-200 after:font-mono after:text-lg after:leading-none after:flex-shrink-0",
                    "group-open:after:content-['–']",
                  ].join(' ')}
                >
                  <span className="pr-4 flex-1">{item.q}</span>
                </summary>
                <div className="px-6 pb-4 pt-0">
                  <p className="text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
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
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-surface transition hover:bg-accent-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
            >
              Read Whitepaper
            </a>
          </div>
        </aside>
      </div>
    </Section>
  )
}


