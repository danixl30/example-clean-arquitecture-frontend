import { ValueProvider } from '@mono/core'

export const nativeValueProvider =
    (): ValueProvider =>
    <T>(initialValue: T) => {
        let data: T = initialValue

        return {
            get value() {
                return data
            },
            set value(newValue: T) {
                data = newValue
            },
        }
    }
