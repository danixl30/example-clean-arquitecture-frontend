import { mainWrapperLogic } from '@mono/core'
import { signalStateFactory } from '../../../core/infraestructure/state-factory/signalStateFactory'
import Main from './MainPage'

export default function MainWraper() {
    const { openSate, onOpenClose } = mainWrapperLogic(signalStateFactory())

    return (
        <div>
            <button onClick={onOpenClose}>
                {openSate.value ? 'Close' : 'Open'}
            </button>
            {openSate.value && <Main />}
        </div>
    )
}
