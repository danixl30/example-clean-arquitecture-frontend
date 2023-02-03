import { Ref, UnwrapRef, onMounted, onUnmounted, ref } from 'vue'
import { StateFactory } from '@mono/core'

export const stateFactoryProvider =
    (): StateFactory =>
    <T>(initialValue: T) => {
        const value = ref<T>(initialValue) as Ref<T>
        const isMounted = ref(false) as Ref<boolean>
        const subscribers = ref<((value: T) => void)[]>([]) as Ref<
            ((value: T) => void)[]
        >

        onMounted(() => {
            isMounted.value = true
        })

        onUnmounted(() => {
            isMounted.value = false
            subscribers.value = []
        })

        return {
            state: {
                get value() {
                    return value.value
                },
                getValue: () => value.value,
                subscribe: (sub: (value: T) => void) => {
                    subscribers.value.push(sub)
                },
            },
            setState: (valueUp: T) => {
                if (!isMounted.value) return
                value.value = valueUp
            },
        }
    }
