import dynamic from 'next/dynamic'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/sections/Hero'
import { SocialProof } from '@/components/landing/sections/SocialProof'
import { Problem } from '@/components/landing/sections/Problem'

// 아래쪽 섹션들은 lazy loading으로 최적화 (초기 번들 크기 감소)
const Solution = dynamic(() => import('@/components/landing/sections/Solution').then((mod) => ({ default: mod.Solution })))
const CoreAI = dynamic(() => import('@/components/landing/sections/CoreAI').then((mod) => ({ default: mod.CoreAI })))
const Integrity = dynamic(() => import('@/components/landing/sections/Integrity').then((mod) => ({ default: mod.Integrity })))
const Rewards = dynamic(() => import('@/components/landing/sections/Rewards').then((mod) => ({ default: mod.Rewards })))
const Token = dynamic(() => import('@/components/landing/sections/Token').then((mod) => ({ default: mod.Token })))
const Roadmap = dynamic(() => import('@/components/landing/sections/Roadmap').then((mod) => ({ default: mod.Roadmap })))
const FAQ = dynamic(() => import('@/components/landing/sections/FAQ').then((mod) => ({ default: mod.FAQ })))
const FinalCTA = dynamic(() => import('@/components/landing/sections/FinalCTA').then((mod) => ({ default: mod.FinalCTA })))
const Footer = dynamic(() => import('@/components/landing/sections/Footer').then((mod) => ({ default: mod.Footer })))

export default function Home() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-text focus:ring-2 focus:ring-accent/25"
      >
        본문으로 건너뛰기
      </a>

      <Nav />

      <main id="main" className="focus:outline-none">
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <CoreAI />
        <Integrity />
        <Rewards />
        <Token />
        <Roadmap />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}

