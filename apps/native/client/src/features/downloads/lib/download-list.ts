export type DownloadStatus = 'downloading' | 'complete' | 'paused' | 'queued' | 'failed'

export type DownloadAction = {
  id: string
  label: string
}

export type DownloadItem = {
  actions?: DownloadAction[]
  id: string
  etaLabel?: string
  fileName: string
  progressLabel: string
  progressPercent: number
  statusLabel: string
  sizeLabel: string
  sourceLabel: string
  speedLabel?: string
  status: DownloadStatus
  statusMetaLabel?: string
}
