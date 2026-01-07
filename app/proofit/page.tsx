import styles from './proofit.module.css'
import { Placeholder } from './components/Placeholders'
import { StickySteps } from './components/StickySteps'

export default function ProofitPage() {
  return (
    <main className={styles.main}>
      {/* Section 1: Hero */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>PROOFIT</span>
              <h1>Proof, not promises.</h1>
              <p className={styles.heroSupporting}>
                Instant verification for on-chain transactions.
              </p>
              <a href="#how-it-works" className={styles.ctaButton}>
                See how it works →
              </a>
            </div>
            <div className={styles.heroVisual}>
              <Placeholder label="HERO PROOF ANIMATION (loop, 4s)" aspectRatio="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How Proofit Works */}
      <section id="how-it-works" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>How Proofit works</h2>
            <p className={styles.sectionSupporting}>
              A simple flow that produces verifiable proof.
            </p>
          </div>
          <StickySteps />
        </div>
      </section>

      {/* Section 3: Why Proofit */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Built for outcomes</h2>
            <p className={styles.sectionSupporting}>
              Speed and integrity without manual checks.
            </p>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Seconds, not hours</h3>
              <p className={styles.whyCardText}>Generate proof fast.</p>
            </div>
            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Tamper-resistant</h3>
              <p className={styles.whyCardText}>Verification you can trust.</p>
            </div>
            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Automation-ready</h3>
              <p className={styles.whyCardText}>Designed for scale.</p>
            </div>
            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Clear receipts</h3>
              <p className={styles.whyCardText}>Proof that reads like UI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Live Proof Demo */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Live proof demo</h2>
            <p className={styles.sectionSupporting}>
              A proof object, end to end.
            </p>
          </div>
          <div className={styles.demoContainer}>
            <div className={styles.demoBlock}>
              <span className={styles.demoLabel}>TRANSACTION INPUT</span>
            </div>
            <div className={styles.demoBlock}>
              <span className={styles.demoLabel}>PROOF GENERATION</span>
            </div>
            <div className={styles.demoBlock}>
              <span className={styles.demoLabel}>VERIFICATION RESULT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Who It's For */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Who it&apos;s for</h2>
            <p className={styles.sectionSupporting}>
              Use cases that need certainty.
            </p>
          </div>
          <div className={styles.whoGrid}>
            <div className={styles.whoColumn}>
              <h3 className={styles.whoTitle}>Payments</h3>
              <p className={styles.whoDescription}>Confirm settlements with proof.</p>
            </div>
            <div className={styles.whoColumn}>
              <h3 className={styles.whoTitle}>Marketplaces</h3>
              <p className={styles.whoDescription}>Reduce disputes with verification.</p>
            </div>
            <div className={styles.whoColumn}>
              <h3 className={styles.whoTitle}>On-chain services</h3>
              <p className={styles.whoDescription}>Expose proof as a primitive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.finalCta}>
            <h2>Start proving trust.</h2>
            <p className={styles.finalCtaText}>
              Move from claims to verification.
            </p>
            <div className={styles.finalCtaButtons}>
              <button className={styles.ctaButton}>Request demo</button>
              <button className={styles.ctaButton}>Read docs</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


