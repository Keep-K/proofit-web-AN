import { LANDING_COPY } from '@/lib/landing/content'
import { Placeholder } from '@/components/landing/Placeholder'
import { Section } from '@/components/landing/Section'

export function SocialProof() {
  // TODO: Replace with actual partner/client logos
  const logoSlots = Array.from({ length: 5 })
  
  return (
    <Section>
      <div className="rounded-2xl border border-border bg-surface/60 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Text Content Area */}
          <div className="lg:max-w-2xl">
            <p className="text-sm leading-relaxed text-muted">
              {LANDING_COPY.socialProof.line}
            </p>
          </div>

          {/* Logo/Partner Area */}
          <div className="flex-shrink-0">
            <div className="flex flex-wrap items-center justify-start gap-4 md:justify-end lg:justify-end">
              {logoSlots.map((_, idx) => (
                <Placeholder
                  key={`logo-${idx}`}
                  label="LOGO"
                  minHeightClassName="min-h-0"
                  className="h-9 w-[104px] shrink-0 rounded-lg opacity-60"
                  hideLabel={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


