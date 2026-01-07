import React from 'react'

type PlaceholderProps = {
  label: string
  className?: string
  minHeightClassName?: string
  hideLabel?: boolean
  subtle?: boolean
}

export function Placeholder({
  label,
  className,
  minHeightClassName,
  hideLabel = false,
  subtle = false,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={[
        'relative w-full rounded-xl border border-dashed border-border bg-surface-2',
        'flex items-center justify-center',
        'select-none',
        minHeightClassName ?? 'min-h-[180px]',
        className ?? '',
      ].join(' ')}
    >
      {!hideLabel && (
        <span
          className={[
            'px-4 text-center uppercase',
            subtle
              ? 'text-[10px] tracking-wide text-muted-2/50'
              : 'text-[11px] font-medium tracking-[0.14em] text-muted-2/60',
          ].join(' ')}
        >
          {label}
        </span>
      )}
    </div>
  )
}



