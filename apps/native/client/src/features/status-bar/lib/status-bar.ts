export type StatusBarConnectionState = 'online' | 'offline'

export type StatusBarSummary = {
  activeCount: number
  connectionState: StatusBarConnectionState
  speedLabel: string
}
