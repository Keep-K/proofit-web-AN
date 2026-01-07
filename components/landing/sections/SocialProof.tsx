import Image from 'next/image'
import { LANDING_COPY } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'
import { KickerStrip } from '@/components/landing/KickerStrip'

const PARTNER_LOGOS = [
  '/images/partners/partner-logo-1.png',
  '/images/partners/partner-logo-2.png',
  '/images/partners/partner-logo-3.png',
  '/images/partners/partner-logo-5.png',
] as const

export function SocialProof() {
  return (
    <>
      {/* Kicker Strip - Full width, connects Hero to credibility badges */}
      <KickerStrip
        message={LANDING_COPY.socialProof.line}
        badges={['Verification-first', 'Integrity-gated', 'Accumulative records']}
      />

      {/* Credibility Badges */}
      <Section>
        <div className="flex flex-nowrap items-center justify-center gap-4 md:gap-8 overflow-x-auto">
          {PARTNER_LOGOS.map((logo, idx) => (
            <div
              key={`logo-${idx}`}
              className="relative h-16 w-40 shrink-0 opacity-50 transition-opacity hover:opacity-75 md:h-24 md:w-64"
            >
              <Image
                src={logo}
                alt={`Partner logo ${idx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 160px, 256px"
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}


