import { onDestroy, onMount } from 'svelte'
import type { OnInit } from '@mono/core'
import type { Optional } from '@mono/types-utils'

export const svelteOnInit =
    (): OnInit => (callback: () => void | (() => void)) => {
        let onClose: Optional<() => void> = null

        onMount(() => {
            const res = callback()
            onClose = res || null
        })

        onDestroy(() => {
            onClose?.()
        })
    }
