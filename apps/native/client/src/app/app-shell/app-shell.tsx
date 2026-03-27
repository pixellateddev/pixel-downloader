import type { DownloadTask } from '@pixel/types'
import { useEffect } from 'react'
import { DownloadList } from '../../features/downloads/components/download-list'
import { DownloadSearch } from '../../features/downloads/components/download-search'
import type { DownloadItem } from '../../features/downloads/lib/download-list'
import type { DownloadSearch as DownloadSearchType } from '../../features/downloads/lib/downloads-header'
import { Sidebar } from '../../features/sidebar/components/sidebar'
import type { SidebarFilter } from '../../features/sidebar/lib/sidebar-filters'
import { StatusBar } from '../../features/status-bar/components/status-bar'
import type { StatusBarSummary } from '../../features/status-bar/lib/status-bar'
import { Topbar } from '../../features/topbar/components/topbar'
import type { TopbarAction } from '../../features/topbar/lib/topbar'
import { useDownloadStore } from '../../store/use-download-store'
import { useUiStore } from '../../store/use-ui-store'
import styles from './app-shell.module.css'

const formatBytes = (value: number) => {
  if (value <= 0) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const exponent = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1)
  const amount = value / 1024 ** exponent
  const precision = exponent === 0 ? 0 : amount >= 10 ? 1 : 2

  return `${amount.toFixed(precision)} ${units[exponent]}`
}

const formatSpeed = (speed?: number) => {
  if (!speed) {
    return undefined
  }

  return `${formatBytes(speed)}/s`
}

const formatEta = (seconds?: number) => {
  if (!seconds || seconds <= 0) {
    return undefined
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes <= 0) {
    return `${remainingSeconds}s left`
  }

  return `${minutes}m ${remainingSeconds}s left`
}

const topbarActions: TopbarAction[] = [
  { id: 'add-url', label: 'Add URL', tone: 'primary' },
  { id: 'pause-all', label: 'Pause', tone: 'warning' },
  { id: 'resume-all', label: 'Resume', tone: 'neutral' },
  { id: 'clear-complete', label: 'Clear', tone: 'danger' },
]

const mapTaskToItem = (task: DownloadTask): DownloadItem => {
  const progressPercent =
    task.size > 0 ? Math.min((task.downloadedBytes / task.size) * 100, 100) : 0
  const sourceLabel = new URL(task.url).hostname
  const sizeLabel = formatBytes(task.size)
  const progressLabel =
    task.status === 'completed'
      ? `Completed ${new Date(task.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
      : `${progressPercent.toFixed(1)}% of ${sizeLabel}`

  return {
    actions: task.status === 'completed' ? [{ id: `clear-${task.id}`, label: '×' }] : [],
    etaLabel: formatEta(task.eta),
    fileName: task.filename,
    id: String(task.id),
    progressLabel,
    progressPercent,
    sizeLabel,
    sourceLabel,
    speedLabel: formatSpeed(task.speed),
    status:
      task.status === 'completed' ? 'complete' : task.status === 'pending' ? 'queued' : task.status,
    statusLabel:
      task.status === 'completed'
        ? 'Complete'
        : task.status === 'failed'
          ? 'Failed'
          : task.status === 'pending'
            ? 'Queued'
            : task.status[0].toUpperCase() + task.status.slice(1),
    statusMetaLabel: task.status === 'completed' ? progressLabel : undefined,
  }
}

const buildSidebarFilters = (tasks: DownloadTask[]): SidebarFilter[] => {
  const completedCount = tasks.filter((task) => task.status === 'completed').length
  const downloadingCount = tasks.filter((task) => task.status === 'downloading').length
  const failedCount = tasks.filter((task) => task.status === 'failed').length
  const pausedCount = tasks.filter((task) => task.status === 'paused').length
  const queuedCount = tasks.filter((task) => task.status === 'pending').length

  return [
    { id: 'all', label: 'All', count: tasks.length, isActive: true },
    { id: 'downloading', label: 'Downloading', count: downloadingCount },
    { id: 'complete', label: 'Complete', count: completedCount },
    { id: 'paused', label: 'Paused', count: pausedCount },
    { id: 'queued', label: 'Queued', count: queuedCount + failedCount },
  ]
}

const buildStatusBarSummary = (
  tasks: DownloadTask[],
  connectionState: StatusBarSummary['connectionState']
): StatusBarSummary => {
  const activeTasks = tasks.filter((task) => task.status === 'downloading')
  const totalSpeed = activeTasks.reduce((sum, task) => sum + (task.speed ?? 0), 0)

  return {
    activeCount: activeTasks.length,
    connectionState,
    speedLabel: formatSpeed(totalSpeed) ?? '0 B/s',
  }
}

export function AppShell() {
  const connectionState = useDownloadStore((state) => state.connectionState)
  const initStream = useDownloadStore((state) => state.initStream)
  const tasks = useDownloadStore((state) => state.tasks)
  const searchQuery = useUiStore((state) => state.searchQuery)
  const setSearchQuery = useUiStore((state) => state.setSearchQuery)

  useEffect(() => initStream(), [initStream])

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = tasks.filter((task) => {
    if (!normalizedSearchQuery) {
      return true
    }

    return (
      task.filename.toLowerCase().includes(normalizedSearchQuery) ||
      task.url.toLowerCase().includes(normalizedSearchQuery)
    )
  })

  const downloadItems = filteredTasks.map(mapTaskToItem)
  const sidebarFilters = buildSidebarFilters(tasks)
  const statusBarSummary = buildStatusBarSummary(tasks, connectionState)
  const downloadSearch: DownloadSearchType = {
    onChange: setSearchQuery,
    placeholder: 'Filter by name or URL...',
    value: searchQuery,
  }

  return (
    <main className={styles.shell}>
      <div className={styles.windowFrame}>
        <header className={styles.topbar}>
          <Topbar actions={topbarActions} />
        </header>

        <aside className={styles.sidebar}>
          <Sidebar filters={sidebarFilters} />
        </aside>

        <section className={styles.mainPanel}>
          <section className={styles.contentScroll}>
            <div className={styles.contentChrome}>
              <DownloadSearch search={downloadSearch} />
            </div>

            <section className={styles.content}>
              <DownloadList items={downloadItems} />
            </section>
          </section>
        </section>

        <footer className={styles.footer}>
          <StatusBar summary={statusBarSummary} />
        </footer>
      </div>
    </main>
  )
}
