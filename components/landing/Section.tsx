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
  const hasHeading = Boolean(eyebrow || title || lead)
  return (
    <section
      id={id}
      className={[
        'scroll-mt-24 py-20 md:py-28',
        'border-t border-border/70',
        className ?? '',
      ].join(' ')}
    >
      <div className="mx-auto max-w-6xl px-6">
        {hasHeading && (
          <header className="max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted/80">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-medium leading-snug tracking-tight text-text sm:text-4xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {lead}
              </p>
            )}
          </header>
        )}
        <div className={hasHeading ? 'mt-8 md:mt-10' : ''}>{children}</div>
      </div>
    </section>
  )
}


