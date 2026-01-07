import { LANDING_COPY } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

export function SocialProof() {
  const logoSlots = Array.from({ length: 5 })
  return (
    <Section>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-stone-600">{LANDING_COPY.socialProof.line}</p>
        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {logoSlots.map((_, idx) => (
            <Placeholder
              key={`logo-${idx}`}
              label="LOGO"
              minHeightClassName="min-h-0"
              className="h-9 w-[104px] shrink-0 rounded-full"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}


