import { isTauri } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'

import type { TrafficLightTone } from '../features/topbar/lib/topbar'

export async function runTrafficLightAction(action: TrafficLightTone) {
  if (!isTauri()) {
    return
  }

  const currentWindow = getCurrentWindow()

  switch (action) {
    case 'close':
      await currentWindow.close()
      break
    case 'minimize':
      await currentWindow.minimize()
      break
    case 'maximize':
      await currentWindow.toggleMaximize()
      break
  }
}
