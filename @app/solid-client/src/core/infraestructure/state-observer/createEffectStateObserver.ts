import { StateObserver, StateViewer } from '@mono/core'
import { createEffect, on } from 'solid-js'

export const createEffectStateObserver =
    (): StateObserver =>
    <T>(callback: () => void, ...states: StateViewer<T>[]) => {
        if (states.length === 0) return
        let isFirst = true

        createEffect(
            on(
                states.map((state) => state.getValue),
                () => {
                    if (isFirst) {
                        isFirst = false
                        return
                    }
                    callback()
                },
            ),
        )
    }
