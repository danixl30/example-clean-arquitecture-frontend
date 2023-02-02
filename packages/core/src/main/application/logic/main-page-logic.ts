import {
    MAIN_INPUT_CHANGE_EVENT,
    MainInputChange,
    mainInputChangeEventFactory,
} from '../events/main-input-change'
import { EventHandler } from '../../../core/application/event-handler/event-handler'
import { EventListener } from '../../../core/application/event-handler/listener/event-listener'
import { GetPostApplicatoinService } from '../../../post/application/services/get-posts/type/GetPostApplicationService'
import { InputManager } from '../../../core/application/input-manager/input-manager'
import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { StateFactory } from '../../../core/application/state/state-factory'
import { StateObserver } from '../../../core/application/state-observers/state-observer'

export const mainPageLogic = (
    stateFactory: StateFactory,
    stateObserver: StateObserver,
    initJobFactory: OnInitJob,
    getPosts: GetPostApplicatoinService,
    inputManager: InputManager,
    eventHandler: EventHandler,
    eventListenerFactory: EventListener,
) => {
    const postJob = initJobFactory(() => getPosts.execute(undefined))
    const onEventState = stateFactory('')

    const inputState = inputManager(
        '',
        (value: string) => {
            if (value.includes('.')) return 'Not valid input'
            return ''
        },
        (value: string) => value.trim(),
    )

    eventListenerFactory(MAIN_INPUT_CHANGE_EVENT, (event: MainInputChange) => {
        console.log('from event: ', event.text)
        onEventState.setState(event.text)
    })

    stateObserver(
        () =>
            eventHandler.publish(
                mainInputChangeEventFactory(inputState.value.value),
            ),
        inputState.value,
    )

    return {
        onChangeInput: inputState.onChange,
        inputValue: inputState.value,
        posts: postJob.data,
        errorPosts: postJob.error,
        isLoadingPosts: postJob.isLoading,
        errorInput: inputState.error,
        eventState: onEventState.state,
    }
}
