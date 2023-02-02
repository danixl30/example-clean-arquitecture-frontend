<script lang="ts">
    import { cancelHandler, createInputManager, eventListenerFactory, getPostService, getPostsRepositoryJSONPlaceHolder, mainPageLogic, nativeOnInitJob, useAxiosHttp, useEventHadler, type Post } from '@mono/core';
    import type { Optional } from '@mono/types-utils'
    import { svelteOnInit } from '../../core/infraestructure/on-init/svelteOnInit'
    import { stateFactoryProvider } from '../../core/infraestructure/state-factory/useStoreStatefactory'
    import { useStoreStateObserver } from '../../core/infraestructure/state-observer/useStoreStateObserver'
    import { nativeValueProvider } from '../../core/infraestructure/value-provider/nativeValueProvider'
    const eventHandler = useEventHadler(nativeValueProvider())
    const {
        inputValue,
        onChangeInput,
        posts,
        isLoadingPosts,
        errorPosts,
        errorInput,
        eventState,
    } = mainPageLogic(
        stateFactoryProvider(),
        useStoreStateObserver(),
        nativeOnInitJob(
            stateFactoryProvider(),
            useStoreStateObserver(),
            svelteOnInit(),
        ),
        getPostService(
            getPostsRepositoryJSONPlaceHolder(
                useAxiosHttp('https://my-json-server.typicode.com/'),
                cancelHandler(nativeValueProvider(), svelteOnInit()),
            ),
        ),
        createInputManager(stateFactoryProvider()),
        eventHandler,
        eventListenerFactory(svelteOnInit(), eventHandler),
    )
    let loadingValue = isLoadingPosts.value
    isLoadingPosts.subscribe(value => loadingValue = value)
    let postsValue = posts.value
    posts.subscribe(value => postsValue = value)
    let inputValueState = inputValue.value
    inputValue.subscribe(value => inputValueState = value)
    let errorPostsValue = errorPosts.value
    errorPosts.subscribe(value => errorPostsValue = value)
    let errorInputValue = errorInput.value
    errorInput.subscribe(value => errorInputValue = value)
    let eventStateValue = eventState.value
    eventState.subscribe(value => eventStateValue = value)

    const handleInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        onChangeInput(target.value)
    }
</script>

{#if loadingValue}
   <h1>Loading...</h1> 
{/if}
{#if errorPostsValue}
    <h1>Error on loading posts</h1>
{/if}
{#if !errorPostsValue && !loadingValue}
    <h1>Hello world</h1>
    <h2>{inputValueState}</h2>
    {#if errorInputValue}
        <h3>{errorInputValue}</h3>
    {/if}
    <input 
        value={inputValueState} 
        on:input={handleInputChange}
    />
    <p>{eventStateValue}</p>
    {#if postsValue}
        {#each postsValue as post}
        <div>{post.title}</div> 
        {/each}
    {/if}
{/if}
