import type { DownloadSearch as DownloadSearchData } from '../../lib/downloads-header'
import styles from './download-search.module.css'

type DownloadSearchProps = {
  search: DownloadSearchData
}

export function DownloadSearch({ search }: DownloadSearchProps) {
  return (
    <label className={styles.search}>
      <span className={styles.icon} aria-hidden='true' />
      <input
        className={styles.input}
        onChange={(event) => search.onChange(event.target.value)}
        placeholder={search.placeholder}
        type='text'
        value={search.value}
      />
    </label>
  )
}
