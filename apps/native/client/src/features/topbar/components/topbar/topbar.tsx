import styles from './topbar.module.css'
import { TopbarActions } from '../topbar-actions'
import { TrafficLights } from '../traffic-lights'
import type { TopbarAction, TrafficLight, TrafficLightTone } from '../../lib/topbar'

type TopbarProps = {
  actions: TopbarAction[]
  onTrafficLightPress: (light: TrafficLightTone) => void
  trafficLights: TrafficLight[]
}

export function Topbar({
  actions,
  onTrafficLightPress,
  trafficLights,
}: TopbarProps) {
  return (
    <div className={styles.topbar} data-tauri-drag-region>
      <div className={styles.controls} data-tauri-drag-region="false">
        <TrafficLights lights={trafficLights} onPress={onTrafficLightPress} />
      </div>
      <div className={styles.actions} data-tauri-drag-region="false">
        <TopbarActions actions={actions} />
      </div>
    </div>
  )
}
