export type TrafficLightTone = 'close' | 'minimize' | 'maximize'

export type TrafficLight = {
  id: TrafficLightTone
  label: string
}

export type TopbarActionTone = 'primary' | 'warning' | 'danger' | 'neutral'

export type TopbarAction = {
  id: string
  label: string
  tone: TopbarActionTone
}
