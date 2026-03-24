import { SidebarFilterItem } from '../sidebar-filter-item'
import { SidebarStorage } from '../sidebar-storage'
import styles from './sidebar.module.css'
import type { SidebarFilter } from '../../lib/sidebar-filters'

type SidebarProps = {
  filters: SidebarFilter[]
}

export function Sidebar({ filters }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Downloads</span>
        <h1 className={styles.title}>Library</h1>
      </header>

      <div className={styles.filters}>
        {filters.map((filter) => (
          <SidebarFilterItem
            key={filter.id}
            count={filter.count}
            isActive={filter.isActive}
            label={filter.label}
          />
        ))}
      </div>

      <SidebarStorage
        capacityLabel="20 GB"
        usedLabel="7.3 GB"
        usagePercent={36.5}
      />
    </div>
  )
}
