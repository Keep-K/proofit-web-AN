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
        'relative w-full rounded-xl border border-dashed border-stone-200 bg-stone-50/60',
        'text-[11px] font-medium tracking-[0.14em] text-stone-500',
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



