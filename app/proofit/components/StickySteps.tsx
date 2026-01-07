'use client'

import { useState } from 'react'
import styles from './StickySteps.module.css'
import { Placeholder } from './Placeholders'

const steps = [
  {
    id: '01',
    title: 'Transaction initiated',
  },
  {
    id: '02',
    title: 'Proof generated',
  },
  {
    id: '03',
    title: 'Verification completed',
  },
]

export function StickySteps() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className={styles.container}>
      <div className={styles.stickyColumn}>
        <ol className={styles.stepList}>
          {steps.map((step, index) => (
            <li key={step.id} className={styles.stepItem}>
              <button
                className={`${styles.stepButton} ${activeStep === index ? styles.active : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <span className={styles.stepNumber}>{step.id}</span>
                <span className={styles.stepTitle}>{step.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.contentColumn}>
        <Placeholder
          label={`STEP ${steps[activeStep].id} — ${steps[activeStep].title}`}
          aspectRatio="step"
        />
      </div>
    </div>
  )
}

