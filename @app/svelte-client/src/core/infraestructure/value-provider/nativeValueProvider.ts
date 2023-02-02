import type { ValueProvider } from '@mono/core'

export const nativeValueProvider =
    (): ValueProvider =>
    <T>(initialValue: T) => {
        let value: T = initialValue
        return {
            get value() {
                return value
            },
            set value(valueNew: T) {
                value = valueNew
            },
        }
    }
