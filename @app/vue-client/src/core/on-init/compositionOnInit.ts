import { onMounted, onUnmounted } from 'vue'
import { OnInit } from '@mono/core'
import { Optional } from '@mono/types-utils'

export const compositionOnInit =
    (): OnInit => (callback: () => void | (() => void)) => {
        let onClose: Optional<() => void> = null
        onMounted(() => {
            const res = callback()
            onClose = res || null
        })

        onUnmounted(() => {
            onClose?.()
        })
    }
