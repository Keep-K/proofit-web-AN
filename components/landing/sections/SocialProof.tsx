'use client'

import { LANDING_COPY } from '@/lib/landing/content'
import { KickerStrip } from '@/components/landing/KickerStrip'

// 파트너 placeholder - 나중에 실제 이미지로 교체
const PARTNER_COUNT = 8 // 무한 스크롤을 위한 충분한 수량

export function SocialProof() {
  // 무한 스크롤을 위해 아이템을 복제
  const partners = Array.from({ length: PARTNER_COUNT }, (_, i) => `partner-${i + 1}`)
  const duplicatedPartners = [...partners, ...partners] // seamless loop를 위해 복제

  return (
    <>
      {/* Kicker Strip - Full width, connects Hero to credibility badges */}
      <KickerStrip
        message={LANDING_COPY.socialProof.line}
        badges={['Verification-first', 'Integrity-gated', 'Accumulative records']}
      />

      {/* Credibility Badges - 무한 스크롤 (우에서 좌로) - 전체 너비 (full-bleed) */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-6 md:py-8">
        <div className="flex items-center gap-3 md:gap-6 animate-scroll-left whitespace-nowrap">
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={`${partner}-${idx}`}
              className="flex h-14 w-36 shrink-0 items-center justify-center rounded-lg border border-border bg-surface/60 px-4 py-2 opacity-50 transition-opacity hover:opacity-75 md:h-20 md:w-56"
            >
              <span className="text-xs font-medium text-muted md:text-sm">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


