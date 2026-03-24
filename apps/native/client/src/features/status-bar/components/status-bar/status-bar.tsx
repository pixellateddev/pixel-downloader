import styles from './status-bar.module.css'
import type { StatusBarSummary } from '../../lib/status-bar'

type StatusBarProps = {
  summary: StatusBarSummary
}

export function StatusBar({ summary }: StatusBarProps) {
  return (
    <div className={styles.statusBar}>
      <div className={styles.metrics}>
        <span className={styles.metric}>
          <span className={styles.label}>{summary.speedLabel}</span>
        </span>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.metric}>
          <span className={styles.label}>{summary.activeCount} active</span>
        </span>
      </div>

      <div
        className={styles.presence}
        data-state={summary.connectionState}
      >
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{summary.connectionState}</span>
      </div>
    </div>
  )
}
