import styles from './Placeholders.module.css'

interface PlaceholderProps {
  label: string
  aspectRatio?: 'hero' | 'step' | 'default'
}

export function Placeholder({ label, aspectRatio = 'default' }: PlaceholderProps) {
  const containerClass = aspectRatio === 'hero' 
    ? styles.heroPlaceholder 
    : aspectRatio === 'step' 
    ? styles.stepPlaceholder 
    : styles.defaultPlaceholder

  return (
    <div className={containerClass}>
      <span className={styles.label}>{label}</span>
    </div>
  )
}


