import type { StateFactory } from '@mono/core'
import { writable } from 'svelte/store'

export const stateFactoryProvider =
    (): StateFactory =>
    <T>(initialValue: T) => {
        const data = writable(initialValue)
        let value: T = initialValue
        data.subscribe((valueUp) => {
            value = valueUp
        })
        return {
            state: {
                get value() {
                    return value
                },
                getValue: () => value,
                subscribe: (callback: (value: T) => void) => {
                    data.subscribe(callback)
                },
            },
            setState: (value: T) => {
                data.set(value)
            },
        }
    }
