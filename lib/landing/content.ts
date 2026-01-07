export const WHITEPAPER_URL = 'https://proofit.gitbook.io/proofit-docs/'

export const SECTION_IDS = {
  problem: 'problem',
  system: 'system',
  integrity: 'integrity',
  rewards: 'rewards',
  token: 'token',
  roadmap: 'roadmap',
  faq: 'faq',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const NAV_LINKS: Array<{ id: SectionId; label: string }> = [
  { id: SECTION_IDS.problem, label: 'Problem' },
  { id: SECTION_IDS.system, label: 'System' },
  { id: SECTION_IDS.integrity, label: 'Integrity' },
  { id: SECTION_IDS.rewards, label: 'Rewards' },
  { id: SECTION_IDS.token, label: 'Token' },
  { id: SECTION_IDS.roadmap, label: 'Roadmap' },
  { id: SECTION_IDS.faq, label: 'FAQ' },
]

export const LANDING_COPY = {
  nav: {
    brand: 'PROOFIT',
    cta: 'Read Whitepaper',
  },
  hero: {
    headline: 'From disappearing results\n to verified performance.',
    subhead:
      'Most health platforms suggest plans — they don’t verify execution.\nPROOFIT turns progress into trusted performance that accumulates.',
    primaryCta: 'Explore the System',
    secondaryCta: 'Read Whitepaper',
    visualSlotLabel: 'HERO VISUAL SLOT',
  },
  socialProof: {
    line: 'Built for a verification-first future of health performance.',
    badgeLabels: [
      'CREDIBILITY SLOT',
      'CREDIBILITY SLOT',
      'CREDIBILITY SLOT',
      'CREDIBILITY SLOT',
      'CREDIBILITY SLOT',
    ],
  },
  problem: {
    title: 'Why current health apps fail to retain performance',
    lead:
      'Plans are easy. Proof is hard. Without verification, effort disappears into untrusted metrics.',
    illustrationSlotLabel: 'PROBLEM ILLUSTRATION SLOT',
    cards: [
      {
        title: 'Body state isn’t truly understood',
        text: 'Generic programs ignore context. Without a grounded baseline, optimization is guesswork.',
      },
      {
        title: 'Execution isn’t verified',
        text: 'Apps record intent, not reality. Form, range, and consistency are rarely checked.',
      },
      {
        title: 'Performance disappears',
        text: 'Outcomes get logged, but the process isn’t stored as trusted performance over time.',
      },
    ],
  },
  solution: {
    title: 'What PROOFIT is',
    lead:
      'A system where verified execution becomes measurable performance — and performance becomes a durable asset.',
    pillars: [
      'Understand the body (AI)',
      'Verify execution (vision / motion)',
      'Quantify & store performance (integrity)',
      'Expand into rewards, economy, ecosystem',
    ],
    flowTitle: 'System Flow',
    flow: [
      { title: 'Analyze', text: 'Body analysis establishes a grounded baseline.' },
      { title: 'Plan', text: 'Goal planning defines what “good” looks like.' },
      { title: 'Correct', text: 'Motion correction verifies execution quality.' },
      { title: 'Optimize', text: 'Adaptive optimization improves the loop over time.' },
    ],
  },
  coreAI: {
    title: 'Core AI System',
    lead: 'AI is not a feature — it’s the platform structure.',
    modules: [
      {
        title: 'Body Analysis AI',
        chips: ['Signals', 'Baseline', 'Model'],
        micro: 'Ground truth for personalized performance.',
        text: 'Turn raw signals into a usable body model.',
        slot: 'MODULE VISUAL SLOT',
      },
      {
        title: 'Goal Planning AI',
        chips: ['Goals', 'Constraints', 'Plan'],
        micro: 'Plans that can be verified, not assumed.',
        text: 'Translate goals into clear, verifiable plans.',
        slot: 'MODULE VISUAL SLOT',
      },
      {
        title: 'Motion Correction AI',
        chips: ['Pose', 'Checks', 'Feedback'],
        micro: 'Verify execution quality in real time.',
        text: 'Check form and consistency during execution.',
        slot: 'MODULE VISUAL SLOT',
      },
      {
        title: 'Adaptive Optimization AI',
        chips: ['Trends', 'Adjust', 'Optimize'],
        micro: 'Improve the loop from verified outcomes.',
        text: 'Continuously adjust using verified performance.',
        slot: 'MODULE VISUAL SLOT',
      },
    ],
  },
  integrity: {
    title: 'Data & Integrity',
    lead:
      'Verified, accumulative performance means progress is retained with trust — not just reported.',
    diagramSlotLabel: 'INTEGRITY DIAGRAM SLOT',
    bullets: [
      'Verification-first: collect proof before features and rewards.',
      'Process > outcome: store what was executed, not only what happened.',
      'Anti-fraud & anomaly checks: integrity gates protect the signal.',
      'Trust range: performance scores are valid only within verified bounds.',
    ],
    checklistTitle: 'Integrity checklist',
    checklist: [
      'Signal captured',
      'Execution verified',
      'Consistency measured',
      'Score within trust range',
    ],
  },
  rewards: {
    title: 'Reward System',
    lead:
      'Rewards are a certificate of verified performance — delayed, non-competitive, and integrity-gated.',
    gatedTitle: 'Gated logic',
    gates: ['Score', 'Anti-fraud', 'Sustained period', 'Reward'],
    warningTitle: 'Guardrail',
    warningText: 'Rewards shouldn’t become the goal. Verification must stay primary.',
  },
  token: {
    title: 'Token Economy (high-level)',
    lead:
      'Kept intentionally abstract. No promises, no numbers — details follow verification maturity.',
    boxes: [
      {
        title: 'Utility',
        lines: ['Access to product capabilities (future).', 'Activation gated by verified usage.'],
      },
      {
        title: 'Governance',
        lines: ['Scope starts narrow and safety-first.', 'Rules evolve with verification maturity.'],
      },
      {
        title: 'Ecosystem incentives',
        lines: ['Incentives follow integrity signals.', 'Designed to discourage manipulation.'],
      },
    ],
    disclaimer: 'Details evolve; see the whitepaper for the latest.',
  },
  roadmap: {
    title: 'Roadmap & Rollout',
    lead:
      'Trust maturity stages — data before features, verification before rewards, safety gates always on.',
    phases: [
      {
        title: 'Phase A — Core MVP',
        text: 'Minimal loop: baseline → plan → verify → performance record.',
      },
      {
        title: 'Phase B — Verification & Integrity Layer',
        text: 'Hardening: trust range, anomaly detection, durable storage formats.',
      },
      {
        title: 'Phase C — Rewards & Token activation',
        text: 'Only after verification maturity is proven and stable.',
      },
      {
        title: 'Phase D — Ecosystem expansion',
        text: 'Scale outward once filters and integrity gates are complete.',
      },
    ],
    safetyTitle: 'Safety gates',
    safety: ['Rollback / versioning', 'Risk management', 'Gradual rollout', 'Auditability'],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'How is performance verified?',
        a: 'Verification focuses on execution quality and consistency, using integrity checks before anything becomes a “performance record.”',
      },
      {
        q: 'Why is the reward delayed?',
        a: 'To prevent incentives from distorting behavior. Rewards require sustained verified performance over time.',
      },
      {
        q: 'What data is stored?',
        a: 'The goal is to store verified performance signals and summaries — focusing on process and integrity rather than vanity outcomes.',
      },
      {
        q: 'Is AI a feature or the system?',
        a: 'The system. PROOFIT separates roles (analysis, planning, correction, optimization) so verification stays grounded.',
      },
      {
        q: 'How does rollout reduce risk?',
        a: 'By gating expansion behind trust maturity stages and safety mechanisms like rollback and anomaly filtering.',
      },
      {
        q: 'Where can I read full specs?',
        a: 'The full reference lives in the whitepaper/docs. Use the “Read Whitepaper” link in the navigation.',
      },
    ],
  },
  finalCta: {
    title: 'Build trust into performance.',
    lead: 'Start from verification. Then let progress accumulate.',
    primary: 'Read Whitepaper',
    secondary: 'Contact / Join Waitlist',
  },
  footer: {
    links: [
      { label: 'Docs', href: WHITEPAPER_URL },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'Email', href: '#' },
    ],
    copyright: `© ${new Date().getFullYear()} PROOFIT. All rights reserved.`,
  },
} as const


