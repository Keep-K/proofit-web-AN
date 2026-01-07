import React from 'react'

type KickerStripProps = {
  message: string
  badges: readonly string[]
}

export function KickerStrip({ message, badges }: KickerStripProps) {
  return (
    <div className="w-full border-t border-b border-border bg-surface/40 py-4 md:py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: Message with dot marker */}
          <div className="flex items-start gap-3 md:items-center">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text/60 md:mt-0" aria-hidden="true" />
            <p className="text-sm font-medium leading-relaxed text-text md:text-base">
              {message}
            </p>
          </div>

          {/* Right: Micro-badges */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="text-xs font-medium uppercase tracking-wide text-muted/80"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



