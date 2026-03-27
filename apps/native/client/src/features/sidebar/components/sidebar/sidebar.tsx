import type { SidebarFilter } from '../../lib/sidebar-filters'
import { SidebarFilterItem } from '../sidebar-filter-item'
import styles from './sidebar.module.css'

type SidebarProps = {
  filters: SidebarFilter[]
}

export function Sidebar({ filters }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Downloads</span>
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
    </div>
  )
}
