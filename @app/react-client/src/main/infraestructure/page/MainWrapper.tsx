import Main from './Main'
import { mainWrapperLogic } from '@mono/core'
import { useStateFactory } from '../../../core/infraestructure/state/useStateProvider'

export default function MainWrapper() {
    const { openSate, onOpenClose } = mainWrapperLogic(useStateFactory)

    const handleClick = () => {
        console.log(openSate.value)
        onOpenClose()
        console.log(openSate.value)
    }

    return (
        <>
            <button onClick={handleClick}>
                {openSate.value ? 'Close' : 'Open'}
            </button>
            {openSate.value && <Main />}
        </>
    )
}
