import { create } from 'zustand'

type UiStoreState = {
  activeSidebarFilter: 'all' | 'downloading' | 'complete' | 'paused' | 'queued' | 'failed'
  isAddDownloadOpen: boolean
  isSettingsOpen: boolean
  searchQuery: string
  selectedTaskId: string | null
  setActiveSidebarFilter: (filter: UiStoreState['activeSidebarFilter']) => void
  setAddDownloadOpen: (isOpen: boolean) => void
  setSearchQuery: (searchQuery: string) => void
  setSelectedTaskId: (taskId: string | null) => void
  setSettingsOpen: (isOpen: boolean) => void
}

export const useUiStore = create<UiStoreState>((set) => ({
  activeSidebarFilter: 'all',
  isAddDownloadOpen: false,
  isSettingsOpen: false,
  searchQuery: '',
  selectedTaskId: null,
  setActiveSidebarFilter: (activeSidebarFilter) => set({ activeSidebarFilter }),
  setAddDownloadOpen: (isAddDownloadOpen) => set({ isAddDownloadOpen }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTaskId: (selectedTaskId) => set({ selectedTaskId }),
  setSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
}))
