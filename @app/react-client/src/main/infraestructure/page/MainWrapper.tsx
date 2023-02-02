import Main from './Main'
import { mainWrapperLogic } from '@mono/core'
import { useStateFactory } from '../../../core/infraestructure/state/useStateProvider'

export default function MainWrapper() {
    const { openSate, onOpenClose } = mainWrapperLogic(useStateFactory)
    return (
        <>
            <button onClick={onOpenClose}>
                {openSate.value ? 'Close' : 'Open'}
            </button>
            {openSate.value && <Main />}
        </>
    )
}
