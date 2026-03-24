import styles from './topbar-actions.module.css'
import type { TopbarAction } from '../../lib/topbar'

type TopbarActionsProps = {
  actions: TopbarAction[]
}

export function TopbarActions({ actions }: TopbarActionsProps) {
  return (
    <div className={styles.actions}>
      {actions.map((action) => (
        <button
          className={styles.button}
          data-tone={action.tone}
          key={action.id}
          type="button"
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
