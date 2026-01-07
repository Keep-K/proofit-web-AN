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
        <div className="flex flex-nowrap items-center justify-center gap-3 md:gap-6">
          {PARTNER_LOGOS.map((logo, idx) => (
            <div
              key={`logo-${idx}`}
              className="relative h-14 w-36 shrink-0 opacity-50 transition-opacity hover:opacity-75 md:h-20 md:w-56"
            >
              <Image
                src={logo}
                alt={`Partner logo ${idx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 144px, 224px"
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}


