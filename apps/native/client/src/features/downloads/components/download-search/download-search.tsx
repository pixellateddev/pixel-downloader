import styles from './download-search.module.css'
import type { DownloadSearch } from '../../lib/downloads-header'

type DownloadSearchProps = {
  search: DownloadSearch
}

export function DownloadSearch({ search }: DownloadSearchProps) {
  return (
    <label className={styles.search}>
      <span className={styles.icon} aria-hidden="true" />
      <input
        className={styles.input}
        placeholder={search.placeholder}
        readOnly
        type="text"
        value={search.value}
      />
    </label>
  )
}
