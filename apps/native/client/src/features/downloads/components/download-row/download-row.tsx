import styles from './download-row.module.css'
import type { DownloadItem } from '../../lib/download-list'

type DownloadRowProps = {
  item: DownloadItem
}

export function DownloadRow({ item }: DownloadRowProps) {
  return (
    <article className={styles.row}>
      <div className={styles.layout}>
        <div className={styles.fileTile} aria-hidden="true">
          <div className={styles.fileTileInner} />
        </div>

        <div className={styles.body}>
          <div className={styles.header}>
            <h3 className={styles.fileName}>{item.fileName}</h3>

            {item.actions?.length ? (
              <div className={styles.actions}>
                {item.actions.map((action) => (
                  <button className={styles.actionButton} key={action.id} type="button">
                    {action.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <p className={styles.meta}>
            <span className={styles.statusBadge} data-status={item.status}>
              {item.statusLabel}
            </span>
            <span>{item.sourceLabel}</span>
            <span>{item.sizeLabel}</span>
            {item.statusMetaLabel ? <span>{item.statusMetaLabel}</span> : null}
          </p>

          <div className={styles.progress}>
            <p className={styles.progressMeta}>
              <span>{item.progressLabel}</span>
              {item.speedLabel ? <span>{item.speedLabel}</span> : null}
              {item.etaLabel ? <span>{item.etaLabel}</span> : null}
            </p>
            <div className={styles.progressTrack} aria-hidden="true">
              <div
                className={styles.progressFill}
                style={{ width: `${item.progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
