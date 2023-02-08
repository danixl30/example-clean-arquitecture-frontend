import { useEffect, useRef, useState } from 'react'
import { StateProvider } from '@mono/core'

export const useRefStateFactory = <T>(initialize: T): StateProvider<T> => {
    const subscriptors = useRef<((value: T) => void)[]>([])
    const firstTime = useRef(true)
    const isMounted = useRef(true)
    const [_, forceUpdate] = useState<boolean>(false)
    const state = useRef(initialize)

    useEffect(() => {
        if (firstTime.current) {
            firstTime.current = false
            return
        }
        subscriptors.current.forEach((e) => e(state.current))
    }, [state])

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    return {
        state: {
            get value() {
                return state.current
            },
            getValue: () => state.current,
            subscribe(callback: (value: T) => void) {
                subscriptors.current.push(callback)
            },
        },
        setState(value: T) {
            if (!isMounted.current) return
            forceUpdate((value) => !value)
            state.current = value
        },
    }
}
