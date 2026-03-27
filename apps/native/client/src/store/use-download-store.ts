import type { DaemonConfig, DownloadTask } from '@pixel/types'
import { create } from 'zustand'
import { DAEMON_API_BASE } from '../lib/daemon'

export type DownloadConnectionState = 'online' | 'offline'

type DownloadStoreState = {
  config: DaemonConfig | null
  connectionState: DownloadConnectionState
  tasks: DownloadTask[]
  fetchSnapshot: () => Promise<void>
  initStream: () => () => void
  setConfig: (config: DaemonConfig) => void
  setConnectionState: (connectionState: DownloadConnectionState) => void
  setTasks: (tasks: DownloadTask[]) => void
}

let activeEventSource: EventSource | null = null

export const useDownloadStore = create<DownloadStoreState>((set, get) => ({
  config: null,
  connectionState: 'offline',
  tasks: [],
  fetchSnapshot: async () => {
    try {
      const [statusResponse, configResponse] = await Promise.all([
        fetch(`${DAEMON_API_BASE}/status`),
        fetch(`${DAEMON_API_BASE}/config`),
      ])

      if (statusResponse.ok) {
        const nextTasks = (await statusResponse.json()) as DownloadTask[]
        set({ connectionState: 'online', tasks: nextTasks })
      }

      if (configResponse.ok) {
        const nextConfig = (await configResponse.json()) as DaemonConfig
        set({ config: nextConfig })
      }
    } catch {
      set({ connectionState: 'offline' })
    }
  },
  initStream: () => {
    if (activeEventSource) {
      return () => {
        activeEventSource?.close()
        activeEventSource = null
      }
    }

    void get().fetchSnapshot()

    activeEventSource = new EventSource(`${DAEMON_API_BASE}/events`)

    activeEventSource.onmessage = (event) => {
      const nextTasks = JSON.parse(event.data) as DownloadTask[]
      set({ connectionState: 'online', tasks: nextTasks })
    }

    activeEventSource.onerror = () => {
      set({ connectionState: 'offline' })
    }

    return () => {
      activeEventSource?.close()
      activeEventSource = null
    }
  },
  setConfig: (config) => set({ config }),
  setConnectionState: (connectionState) => set({ connectionState }),
  setTasks: (tasks) => set({ tasks }),
}))
