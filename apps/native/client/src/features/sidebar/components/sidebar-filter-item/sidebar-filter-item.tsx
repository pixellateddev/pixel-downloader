import styles from './sidebar-filter-item.module.css'

type SidebarFilterItemProps = {
  count: number
  isActive?: boolean
  label: string
}

export function SidebarFilterItem({
  count,
  isActive = false,
  label,
}: SidebarFilterItemProps) {
  return (
    <button className={styles.item} data-active={isActive} type="button">
      <span className={styles.label}>{label}</span>
      <span className={styles.count}>{count}</span>
    </button>
  )
}
