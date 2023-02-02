import type { StateObserver, StateViewer } from '@mono/core'

export const useStoreStateObserver =
    (): StateObserver =>
    <T>(callback: () => void, ...states: StateViewer<T>[]) => {
        states.forEach((state) => state.subscribe(() => callback()))
    }
