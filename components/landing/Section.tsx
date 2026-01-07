import React from 'react'

type SectionProps = {
  id?: string
  eyebrow?: string
  title?: string
  lead?: string
  className?: string
  children: React.ReactNode
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        'scroll-mt-24 py-16 sm:py-24',
        'border-t border-zinc-200/70',
        className ?? '',
      ].join(' ')}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title || lead) && (
          <header className="mb-10 sm:mb-14">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}


