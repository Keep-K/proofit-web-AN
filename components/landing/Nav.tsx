 'use client'

import Link from 'next/link'
import { LANDING_COPY, NAV_LINKS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { useEffect, useId, useState } from 'react'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuId = useId()

  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const menu = document.getElementById(mobileMenuId)
      const button = target.closest('button[aria-controls]')
      if (menu && !menu.contains(target) && !button) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [mobileOpen, mobileMenuId])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
          aria-label="PROOFIT Home"
        >
          <Placeholder
            label="LOGO"
            className="h-9 w-9 shrink-0 rounded-lg"
            minHeightClassName="min-h-0"
            hideLabel={true}
          />
          <span className="text-sm font-semibold tracking-wide text-text">
            {LANDING_COPY.nav.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(l.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="text-sm text-muted transition-colors hover:text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 rounded-md px-1 py-1"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-accent transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 md:inline-flex"
            href={WHITEPAPER_URL}
            target="_blank"
            rel="noreferrer"
          >
            {LANDING_COPY.nav.cta}
          </a>

          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-text transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
              aria-label="메뉴 열기"
              aria-controls={mobileMenuId}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">메뉴</span>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                className="text-text"
              >
                {mobileOpen ? (
                  <path
                    fill="currentColor"
                    d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7A1 1 0 1 0 5.7 7.12L10.59 12 5.7 16.88a1 1 0 1 0 1.42 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.42L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41Z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5 1.5 1.5 0 0 1 18.5 8h-13A1.5 1.5 0 0 1 4 6.5Zm0 5.5A1.5 1.5 0 0 1 5.5 10.5h13A1.5 1.5 0 0 1 20 12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 12Zm0 5.5A1.5 1.5 0 0 1 5.5 16h13a1.5 1.5 0 0 1 0 3h-13A1.5 1.5 0 0 1 4 17.5Z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="absolute inset-0 bg-text/10"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id={mobileMenuId}
            className="absolute right-6 top-[72px] w-[min(86vw,340px)] rounded-xl border border-border bg-bg p-2"
          >
            <div className="flex flex-col">
              <a
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-accent transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
                href={WHITEPAPER_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                {LANDING_COPY.nav.cta}
              </a>
              <div className="my-2 border-t border-border/70" />
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    className="rounded-md px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
                    onClick={(e) => {
                      e.preventDefault()
                      setMobileOpen(false)
                      const element = document.getElementById(l.id)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}


