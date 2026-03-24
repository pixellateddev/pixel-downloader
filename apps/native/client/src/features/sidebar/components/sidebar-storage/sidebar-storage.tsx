import styles from './sidebar-storage.module.css'

type SidebarStorageProps = {
  capacityLabel: string
  usedLabel: string
  usagePercent: number
}

export function SidebarStorage({
  capacityLabel,
  usedLabel,
  usagePercent,
}: SidebarStorageProps) {
  return (
    <section className={styles.card} aria-labelledby="sidebar-storage-title">
      <h2 className={styles.title} id="sidebar-storage-title">
        Storage
      </h2>
      <div className={styles.meter} aria-hidden="true">
        <div className={styles.fill} style={{ width: `${usagePercent}%` }} />
      </div>
      <p className={styles.meta}>
        {usedLabel} of {capacityLabel} used
      </p>
    </section>
  )
}
