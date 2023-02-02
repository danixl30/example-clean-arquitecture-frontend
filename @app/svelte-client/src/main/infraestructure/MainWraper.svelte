<script lang="ts">
    import { mainWrapperLogic } from "@mono/core"
    import { stateFactoryProvider } from "../../core/infraestructure/state-factory/useStoreStatefactory"
    import MainPage from "./MainPage.svelte"

    const { openSate, onOpenClose } = mainWrapperLogic(stateFactoryProvider())
    let openValue = openSate.value
    openSate.subscribe((value) => {
        openValue = value
    })
</script>

<button on:click={onOpenClose}>
    {openValue ? 'Close': 'Open'}
</button>

{#if openValue}
    <div >
        <MainPage />
    </div>
{/if}
