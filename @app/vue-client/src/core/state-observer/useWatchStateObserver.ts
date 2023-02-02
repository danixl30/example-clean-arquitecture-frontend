import { StateObserver, StateViewer } from '@mono/core'
import { watch } from 'vue'

export const useWatchStateObserver =
    (): StateObserver =>
    <T>(callback: () => void, ...states: StateViewer<T>[]) => {
        if (states.length === 0) return
        watch(() => states.map((e) => e.value), callback)
    }
