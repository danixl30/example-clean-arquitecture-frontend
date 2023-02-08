import { ChangeEvent } from 'react'
import { cancelHandler } from '@mono/core'
import { createInputManager } from '@mono/core'
import { eventListenerFactory } from '@mono/core'
import { getEventContext } from '../../../core/infraestructure/event-handler/context/EventProvider'
import { getPostService } from '@mono/core'
import { getPostsRepositoryJSONPlaceHolder } from '@mono/core'
import { mainPageLogic } from '@mono/core'
import { nativeOnInitJob } from '@mono/core'
import { useAxiosHttp } from '@mono/core'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { useEffectStateObserver } from '../../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefValueProvider } from '../../../core/infraestructure/value-provider/useRefValueProvider'
//import { useStateFactory } from '../../../core/infraestructure/state/useStateProvider'
import { useRefStateFactory } from '../../../core/infraestructure/state/useRefStateHandler'

export default function Main() {
    const stateFactory = useRefStateFactory()
    const {
        inputValue,
        onChangeInput,
        posts,
        isLoadingPosts,
        errorPosts,
        errorInput,
        eventState,
    } = mainPageLogic(
        stateFactory,
        useEffectStateObserver,
        nativeOnInitJob(stateFactory, useEffectStateObserver, useEffectOnInit),
        getPostService(
            getPostsRepositoryJSONPlaceHolder(
                useAxiosHttp('https://my-json-server.typicode.com/'),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        createInputManager(stateFactory),
        getEventContext(),
        eventListenerFactory(useEffectOnInit, getEventContext()),
    )

    const onChangeInputPage = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeInput(e.target.value)
    if (isLoadingPosts.value) return <h1>Loading...</h1>
    if (errorPosts.value) return <h1>Error on fetch posts</h1>
    return (
        <>
            <h1>Hello world</h1>
            <h2>{inputValue.value}</h2>
            {errorInput.value && (
                <>
                    <h3>{errorInput.value}</h3>
                </>
            )}
            <input value={inputValue.value} onChange={onChangeInputPage} />
            <p>{eventState.value}</p>
            {posts.value?.map((e) => (
                <div key={e.id}>{e.title}</div>
            ))}
        </>
    )
}
