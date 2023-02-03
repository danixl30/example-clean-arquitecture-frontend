import { StateFactory } from '@mono/core'
import { createEffect, createSignal, on, onCleanup, onMount } from 'solid-js'

export const signalStateFactory =
    (): StateFactory =>
    <T>(initialValue: T) => {
        const [getValue, setValue] = createSignal<T>(initialValue)
        let subscribers: ((value: T) => void)[] = []
        let firstTime = true
        let isMounted = true

        createEffect(
            on(getValue, () => {
                if (firstTime) {
                    firstTime = false
                    return
                }
                subscribers.forEach((sub) => sub(getValue()))
            }),
        )

        onMount(() => {
            isMounted = true
        })

        onCleanup(() => {
            subscribers = []
            isMounted = false
        })

        return {
            state: {
                get value() {
                    return getValue()
                },
                getValue,
                subscribe: (subs: (value: T) => void) => {
                    subscribers.push(subs)
                },
            },
            setState: (value: T) => {
                if (!isMounted) return
                setValue(() => value)
            },
        }
    }
