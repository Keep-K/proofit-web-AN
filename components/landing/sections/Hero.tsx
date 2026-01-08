'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { LottieRefCurrentProps } from 'lottie-react'
import { LANDING_COPY, SECTION_IDS, WHITEPAPER_URL } from '@/lib/landing/content'
import { Section } from '@/components/landing/Section'

// Lottie를 동적으로 import하여 클라이언트에서만 로드 (SSR 방지 및 번들 크기 최적화)
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const animationPaths = [
  '/lottie/Calender.json',
  '/lottie/SliderUI.json',
  '/lottie/FitnessGraph.json',
] as const

type AnimationData = {
  v: string
  fr: number
  op: number
  ip: number
  w: number
  h: number
  [key: string]: unknown
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationData, setAnimationData] = useState<AnimationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isTransitioningRef = useRef(false)

  // 애니메이션 데이터 로드
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    const loadAnimation = async () => {
      try {
        const response = await fetch(animationPaths[currentIndex])
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.statusText}`)
        }
        const data = await response.json()
        if (isMounted) {
          setAnimationData(data)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to load animation:', error)
        if (isMounted) {
          setAnimationData(null)
          setIsLoading(false)
        }
      }
    }
    loadAnimation()

    return () => {
      isMounted = false
    }
  }, [currentIndex])

  const handleComplete = useCallback(() => {
    // 중복 전환 방지
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true

    // 애니메이션이 끝나면 다음 애니메이션으로 전환
    setCurrentIndex((prev) => {
      const next = (prev + 1) % animationPaths.length
      // 전환 완료 후 플래그 리셋
      setTimeout(() => {
        isTransitioningRef.current = false
      }, 100)
      return next
    })
  }, [])

  useEffect(() => {
    // 애니메이션 데이터가 로드되면 재생
    if (lottieRef.current && animationData) {
      // 이전 타이머들 정리
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current)
        autoNextTimerRef.current = null
      }

      // 약간의 지연 후 재생하여 DOM이 업데이트되도록 함
      const timer = setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.goToAndPlay(0, true)
        }
      }, 100)
      timeoutRef.current = timer

      // 애니메이션 duration 계산하여 자동 전환 (onComplete가 작동하지 않을 경우 백업)
      const fps = animationData.fr || 60
      const totalFrames = animationData.op || 150
      const duration = (totalFrames / fps) * 1000 // 밀리초

      const autoNextTimer = setTimeout(() => {
        if (!isTransitioningRef.current) {
          handleComplete()
        }
      }, duration + 500) // 약간의 여유 시간 추가
      autoNextTimerRef.current = autoNextTimer

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        if (autoNextTimerRef.current) {
          clearTimeout(autoNextTimerRef.current)
          autoNextTimerRef.current = null
        }
      }
    }
  }, [animationData, currentIndex, handleComplete])

  return (
    <Section className="border-t-0">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/80">
            Verification-first performance
          </p>

          <h1 className="mt-4 max-w-[22ch] text-balance whitespace-pre-line text-4xl font-medium leading-snug tracking-tight text-text sm:text-5xl md:text-6xl">
            {LANDING_COPY.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Most platforms suggest plans. PROOFIT verifies execution — turning it into trusted performance that
            accumulates.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`#${SECTION_IDS.system}`}
              className="inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-surface transition hover:bg-accent-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 sm:w-auto"
            >
              {LANDING_COPY.hero.primaryCta}
            </a>
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md border border-border bg-transparent px-5 py-3 text-sm font-medium text-text transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 sm:w-auto"
            >
              {LANDING_COPY.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-border p-6">
            <div className="relative min-h-[280px] w-full overflow-hidden rounded-xl sm:min-h-[420px] md:min-h-[520px]">
              {isLoading || !animationData ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
                </div>
              ) : (
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={false}
                  onComplete={handleComplete}
                  autoplay={true}
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


