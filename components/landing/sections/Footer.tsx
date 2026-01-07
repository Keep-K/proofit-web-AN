import { LANDING_COPY } from '@/lib/landing/content'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 bg-zinc-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-950">PROOFIT</p>
            <p className="mt-2 text-sm text-zinc-600">
              Verified performance, designed for integrity.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {LANDING_COPY.footer.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-600 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 rounded-md px-1 py-1"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-zinc-200/70 pt-6">
          <p className="text-xs text-zinc-500">{LANDING_COPY.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}


