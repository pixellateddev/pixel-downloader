import styles from './downloads-header.module.css'
import type { DownloadsSummary } from '../../lib/downloads-header'

type DownloadsHeaderProps = {
  summary: DownloadsSummary
}

export function DownloadsHeader({ summary }: DownloadsHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{summary.activeFilterLabel}</h2>
        <p className={styles.meta}>Showing current downloads in this section.</p>
      </div>
      <span className={styles.badge}>{summary.itemCount}</span>
    </div>
  )
}
