import React from 'react'

type PlaceholderProps = {
  label: string
  className?: string
  minHeightClassName?: string
}

export function Placeholder({
  label,
  className,
  minHeightClassName,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={[
        'relative w-full rounded-xl border border-dashed border-border bg-surface-2',
        'text-[11px] font-medium tracking-[0.14em] text-muted-2',
        'flex items-center justify-center',
        'select-none',
        minHeightClassName ?? 'min-h-[180px]',
        className ?? '',
      ].join(' ')}
    >
      <span className="px-4 text-center uppercase">{label}</span>
    </div>
  )
}



