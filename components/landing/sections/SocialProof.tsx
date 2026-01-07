import { LANDING_COPY } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'
import { KickerStrip } from '@/components/landing/KickerStrip'

export function SocialProof() {
  // TODO: Replace with actual partner/client logos
  const logoSlots = Array.from({ length: 5 })
  
  return (
    <>
      {/* Kicker Strip - Full width, connects Hero to credibility badges */}
      <KickerStrip
        message={LANDING_COPY.socialProof.line}
        badges={['Verification-first', 'Integrity-gated', 'Accumulative records']}
      />

      {/* Credibility Badges */}
      <Section>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {logoSlots.map((_, idx) => (
            <Placeholder
              key={`logo-${idx}`}
              label="LOGO"
              minHeightClassName="min-h-0"
              className="h-8 w-20 shrink-0 rounded-md opacity-50"
              hideLabel={true}
            />
          ))}
        </div>
      </Section>
    </>
  )
}


