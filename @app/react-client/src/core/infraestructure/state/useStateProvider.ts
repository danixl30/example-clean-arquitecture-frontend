import { useEffect, useRef, useState } from 'react'
import { StateProvider } from '@mono/core'

export const useStateFactory = <T>(initialize: T): StateProvider<T> => {
    const subscriptors = useRef<((value: T) => void)[]>([])
    const firstTime = useRef(true)
    const isMounted = useRef(true)
    const [state, setState] = useState<T>(initialize)
    let stateCache = state

    useEffect(() => {
        if (firstTime.current) {
            firstTime.current = false
            return
        }
        subscriptors.current.forEach((e) => e(state))
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
                return stateCache
            },
            getValue: () => state,
            subscribe(callback: (value: T) => void) {
                subscriptors.current.push(callback)
            },
        },
        setState(value: T) {
            if (!isMounted.current) return
            stateCache = value
            setState(value)
        },
    }
}
