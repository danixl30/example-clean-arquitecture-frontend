import {
    cancelHandler,
    createInputManager,
    eventListenerFactory,
    getPostService,
    getPostsRepositoryJSONPlaceHolder,
    mainPageLogic,
    nativeOnInitJob,
    useAxiosHttp,
    useEventHadler,
} from '@mono/core'
import { mountedOnInit } from '../../../core/infraestructure/on-init/mountedOnInit'
import { signalStateFactory } from '../../../core/infraestructure/state-factory/signalStateFactory'
import { createEffectStateObserver } from '../../../core/infraestructure/state-observer/createEffectStateObserver'
import { nativeValueProvider } from '../../../core/infraestructure/value-provider/nativeValueProvider'

export default function Main() {
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
        signalStateFactory(),
        createEffectStateObserver(),
        nativeOnInitJob(
            signalStateFactory(),
            createEffectStateObserver(),
            mountedOnInit(),
        ),
        getPostService(
            getPostsRepositoryJSONPlaceHolder(
                useAxiosHttp('https://my-json-server.typicode.com/'),
                cancelHandler(nativeValueProvider(), mountedOnInit()),
            ),
        ),
        createInputManager(signalStateFactory()),
        eventHandler,
        eventListenerFactory(mountedOnInit(), eventHandler),
    )

    const onChangeInputPage = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement
        onChangeInput(target.value)
    }

    return (
        <>
            {isLoadingPosts.value && <h1>Loading...</h1>}
            {errorPosts.value && <h1>Error on fetch posts</h1>}
            {!isLoadingPosts.value && !errorPosts.getValue() && (
                <>
                    <h1>Hello world</h1>
                    <h2>{inputValue.value}</h2>
                    {errorInput.value && (
                        <>
                            <h3>{errorInput.value}</h3>
                        </>
                    )}
                    <input
                        type="text"
                        value={inputValue.value}
                        onKeyUp={onChangeInputPage}
                    />
                    <p>{eventState.value}</p>
                    {posts.value?.map((e) => (
                        <div>{e.title}</div>
                    ))}
                </>
            )}
        </>
    )
}
