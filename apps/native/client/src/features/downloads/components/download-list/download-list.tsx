import { DownloadRow } from '../download-row'
import styles from './download-list.module.css'
import type { DownloadItem } from '../../lib/download-list'

type DownloadListProps = {
  items: DownloadItem[]
}

export function DownloadList({ items }: DownloadListProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <DownloadRow item={item} key={item.id} />
      ))}
    </div>
  )
}
