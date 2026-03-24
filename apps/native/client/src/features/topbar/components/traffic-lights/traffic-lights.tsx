import styles from './traffic-lights.module.css'
import type { TrafficLight, TrafficLightTone } from '../../lib/topbar'

type TrafficLightsProps = {
  lights: TrafficLight[]
  onPress: (light: TrafficLightTone) => void
}

export function TrafficLights({ lights, onPress }: TrafficLightsProps) {
  return (
    <div aria-label="Window controls" className={styles.lights}>
      {lights.map((light) => (
        <button
          aria-label={light.label}
          className={styles.light}
          data-tone={light.id}
          key={light.id}
          onClick={() => onPress(light.id)}
          type="button"
        />
      ))}
    </div>
  )
}
