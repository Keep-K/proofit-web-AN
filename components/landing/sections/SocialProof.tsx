import { LANDING_COPY } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'

export function SocialProof() {
  return (
    <section className="border-t border-zinc-200/70 py-8">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-600">{LANDING_COPY.socialProof.line}</p>
          <div className="flex flex-wrap gap-3">
            {LANDING_COPY.socialProof.badgeLabels.map((label, idx) => (
              <Placeholder
                key={`${label}-${idx}`}
                label={label}
                minHeightClassName="min-h-0"
                className="h-9 w-[132px] rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


