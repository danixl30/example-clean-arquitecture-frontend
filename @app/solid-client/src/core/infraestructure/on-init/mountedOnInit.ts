import { Optional } from '@mono/types-utils'
import { OnInit } from '@mono/core'
import { onCleanup, onMount } from 'solid-js'

export const mountedOnInit =
    (): OnInit => (callback: () => void | (() => void)) => {
        let onClose: Optional<() => void> = null

        onMount(() => {
            const res = callback()
            onClose = res || null
        })

        onCleanup(() => {
            onClose?.()
        })
    }
