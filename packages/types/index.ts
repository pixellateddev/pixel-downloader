export type DownloadStatus = 'pending' | 'downloading' | 'completed' | 'failed' | 'paused'

export type SegmentStatus = 'pending' | 'downloading' | 'completed' | 'failed'

export interface DaemonConfig {
  defaultDownloadDir: string
}

export interface ProbeResult {
  url: string
  filename: string
  size: number
  isResumable: boolean
  contentType: string
  headers?: Record<string, string>
}

export interface DownloadTask {
  id: number
  url: string
  filename: string
  directory: string
  size: number
  downloadedBytes: number
  status: DownloadStatus
  isResumable: boolean
  headers?: Record<string, string>
  createdAt: string
  speed?: number
  eta?: number
  segments?: SegmentTask[]
}

export interface SegmentTask {
  id: number
  downloadId: number
  startByte: number
  endByte: number
  downloadedBytes: number
  status: SegmentStatus
  speed?: number
}

export type NewDownload = Pick<
  DownloadTask,
  'url' | 'filename' | 'size' | 'isResumable' | 'directory' | 'headers'
>
