import { DownloadList } from '../../features/downloads/components/download-list'
import { DownloadSearch } from '../../features/downloads/components/download-search'
import { Sidebar } from '../../features/sidebar/components/sidebar'
import { StatusBar } from '../../features/status-bar/components/status-bar'
import { Topbar } from '../../features/topbar/components/topbar'
import styles from './app-shell.module.css'
import type { DownloadItem } from '../../features/downloads/lib/download-list'
import type { DownloadSearch as DownloadSearchType } from '../../features/downloads/lib/downloads-header'
import type { SidebarFilter } from '../../features/sidebar/lib/sidebar-filters'
import type { StatusBarSummary } from '../../features/status-bar/lib/status-bar'
import type { TopbarAction } from '../../features/topbar/lib/topbar'

const sidebarFilters: SidebarFilter[] = [
  { id: 'all', label: 'All', count: 6, isActive: true },
  { id: 'downloading', label: 'Downloading', count: 2 },
  { id: 'complete', label: 'Complete', count: 2 },
  { id: 'paused', label: 'Paused', count: 1 },
  { id: 'queued', label: 'Queued', count: 1 },
]

const statusBarSummary: StatusBarSummary = {
  activeCount: 2,
  connectionState: 'online',
  speedLabel: '45.1 MB/s',
}

const downloadSearch: DownloadSearchType = {
  placeholder: 'Filter by name or URL...',
  value: '',
}

const downloadItems: DownloadItem[] = [
  {
    actions: [],
    id: 'manjaro-kde',
    etaLabel: '7m 49s left',
    fileName: 'manjaro-kde-26.0.2-260206-linux618.iso',
    progressLabel: '10.2% of 5.31 GB',
    progressPercent: 10.2,
    sizeLabel: '5.31 GB',
    sourceLabel: 'download.manjaro.org',
    speedLabel: '10.93 MB/s',
    status: 'downloading',
    statusLabel: 'Downloading',
  },
  {
    actions: [
      { id: 'reveal', label: '↗' },
      { id: 'info', label: 'i' },
      { id: 'clear', label: '×' },
    ],
    id: 'figma',
    fileName: 'figma-desktop-app.dmg',
    progressLabel: 'Completed 1:18 PM',
    progressPercent: 100,
    sizeLabel: '182 MB',
    sourceLabel: 'figma.com',
    status: 'complete',
    statusLabel: 'Complete',
    statusMetaLabel: 'Completed 1:18 PM',
  },
  {
    actions: [],
    id: 'postgres',
    fileName: 'postgres-16.1-1.dmg',
    progressLabel: '38%',
    progressPercent: 38,
    sizeLabel: '89 MB',
    sourceLabel: 'postgresql.org',
    status: 'paused',
    statusLabel: 'Paused',
    statusMetaLabel: 'Paused',
  },
  {
    actions: [],
    id: 'xcode',
    etaLabel: '1m 42s left',
    fileName: 'Xcode_15.2.xip',
    progressLabel: '71.9% of 7.69 GB',
    progressPercent: 71.9,
    sizeLabel: '7.69 GB',
    sourceLabel: 'developer.apple.com',
    speedLabel: '34.2 MB/s',
    status: 'downloading',
    statusLabel: 'Downloading',
  },
  {
    actions: [
      { id: 'reveal-fonts', label: '↗' },
      { id: 'info-fonts', label: 'i' },
      { id: 'clear-fonts', label: '×' },
    ],
    id: 'sf-pro-fonts',
    fileName: 'SF-Pro-Fonts.zip',
    progressLabel: 'Completed 1:42 PM',
    progressPercent: 100,
    sizeLabel: '1.2 MB',
    sourceLabel: 'developer.apple.com',
    status: 'complete',
    statusLabel: 'Complete',
    statusMetaLabel: 'Completed 1:42 PM',
  },
  {
    actions: [],
    id: 'ubuntu',
    etaLabel: '12m 08s left',
    fileName: 'ubuntu-24.04-desktop-amd64.iso',
    progressLabel: '24.8% of 5.81 GB',
    progressPercent: 24.8,
    sizeLabel: '5.81 GB',
    sourceLabel: 'releases.ubuntu.com',
    speedLabel: '8.41 MB/s',
    status: 'downloading',
    statusLabel: 'Downloading',
  },
  {
    actions: [],
    id: 'android-studio',
    fileName: 'android-studio-2025.1.dmg',
    progressLabel: '62%',
    progressPercent: 62,
    sizeLabel: '1.1 GB',
    sourceLabel: 'developer.android.com',
    status: 'paused',
    statusLabel: 'Paused',
    statusMetaLabel: 'Paused',
  },
]

const topbarActions: TopbarAction[] = [
  { id: 'add-url', label: 'Add URL', tone: 'primary' },
  { id: 'pause-all', label: 'Pause', tone: 'warning' },
  { id: 'resume-all', label: 'Resume', tone: 'neutral' },
  { id: 'clear-complete', label: 'Clear', tone: 'danger' },
]

export function AppShell() {
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
