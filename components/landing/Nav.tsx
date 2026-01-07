import Link from 'next/link'
import { LANDING_COPY, NAV_LINKS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-zinc-50/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          aria-label="PROOFIT Home"
        >
          <Placeholder
            label="LOGO"
            className="h-9 w-9 shrink-0 rounded-lg"
            minHeightClassName="min-h-0"
          />
          <span className="text-sm font-semibold tracking-wide text-zinc-950">
            {LANDING_COPY.nav.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 rounded-md px-1 py-1"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 md:inline-flex"
            href={WHITEPAPER_URL}
            target="_blank"
            rel="noreferrer"
          >
            {LANDING_COPY.nav.cta}
          </a>

          <details className="relative md:hidden">
            <summary className="list-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 cursor-pointer">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-[min(86vw,320px)] rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
              <div className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="my-2 border-t border-zinc-200/70" />
                <a
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                  href={WHITEPAPER_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {LANDING_COPY.nav.cta}
                </a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}


