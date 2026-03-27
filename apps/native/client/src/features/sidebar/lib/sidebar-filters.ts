export type SidebarFilterId = 'all' | 'downloading' | 'complete' | 'paused' | 'queued'

export type SidebarFilter = {
  id: SidebarFilterId
  label: string
  count: number
  isActive?: boolean
}
