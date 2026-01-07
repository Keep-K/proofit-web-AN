import React from 'react'

type StepperItem = {
  title: string
  text?: string
}

type StepperProps = {
  items: StepperItem[]
  variant?: 'default' | 'gated'
  className?: string
}

export function Stepper({ items, variant = 'default', className }: StepperProps) {
  return (
    <ol className={['grid gap-4 md:grid-cols-4 md:gap-5', className].filter(Boolean).join(' ')}>
      {items.map((item, idx) => (
        <li key={item.title} className="relative flex flex-col">
          <div className="flex items-start gap-3">
            <div
              className={[
                'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border',
                variant === 'gated' ? 'bg-surface-2' : 'bg-surface',
                'text-xs font-semibold text-text',
              ].join(' ')}
            >
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text">{item.title}</p>
              {item.text && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
              )}
            </div>
          </div>
          {idx < items.length - 1 && (
            <div
              aria-hidden="true"
              className={[
                'pointer-events-none absolute right-[-18px] top-4 hidden h-0.5 w-[18px] md:block',
                variant === 'gated' ? 'bg-border/40' : 'bg-border/60',
              ].join(' ')}
            />
          )}
        </li>
      ))}
    </ol>
  )
}

