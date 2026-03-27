import type { TopbarAction } from '../../lib/topbar'
import { TopbarActions } from '../topbar-actions'
import styles from './topbar.module.css'

type TopbarProps = {
  actions: TopbarAction[]
}

export function Topbar({ actions }: TopbarProps) {
  return (
    <div className={styles.topbar} data-tauri-drag-region>
      <div className={styles.nativeControlsSpacer} aria-hidden='true' />
      <div className={styles.actions} data-tauri-drag-region='false'>
        <TopbarActions actions={actions} />
      </div>
    </div>
  )
}
