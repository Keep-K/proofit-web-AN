import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/sections/Hero'
import { SocialProof } from '@/components/landing/sections/SocialProof'
import { Problem } from '@/components/landing/sections/Problem'
import { Solution } from '@/components/landing/sections/Solution'
import { CoreAI } from '@/components/landing/sections/CoreAI'
import { Integrity } from '@/components/landing/sections/Integrity'
import { Rewards } from '@/components/landing/sections/Rewards'
import { Token } from '@/components/landing/sections/Token'
import { Roadmap } from '@/components/landing/sections/Roadmap'
import { FAQ } from '@/components/landing/sections/FAQ'
import { FinalCTA } from '@/components/landing/sections/FinalCTA'
import { Footer } from '@/components/landing/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-zinc-900 focus:ring-2 focus:ring-zinc-900/15"
      >
        본문으로 건너뛰기
      </a>

      <Nav />

      <main id="main">
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

