import { useEffect, useState } from "preact/hooks"
import { mergeClasses } from "../utils/mergeClasses.ts"
import {signal} from '@preact/signals-core'

export const loadingState = signal<LoadingState>('initializing')

export type LoadingState = 'initializing' | 'fetching' | 'decrypting' | 'building' | 'done'


export default function Loader () {
    const [displayNone, setDisplayNone] = useState<boolean>(false)

    function getLoadingMessage() {
        const loadingMessages: Record<LoadingState, string> = {
            'initializing': 'initializing web app',
            'fetching': 'fetching encrypted data',
            'decrypting': 'decrypting media',
            'building': 'building canvas',
            'done': 'finished :)'
        }
        return loadingMessages[loadingState.value]
    }

    const [message, setMessage] = useState<string>(getLoadingMessage())

    useEffect(() => {
        loadingState.subscribe(ls =>{
            console.log(loadingState.value)
            setMessage(getLoadingMessage())
            if (ls === 'done') {
                console.log('dridderd')
                setTimeout(() => setDisplayNone(true), 1000)
            }
        })
        console.log('loadingState: ', loadingState)
        
    }, [])



    const classNames = mergeClasses([
        "fixed bg-white w-screen h-screen place-items-center grid transition duration-1000 ease-in-out z-50",
        loadingState.value == 'done' && "opacity-0"
    ])


    return displayNone ? null : (
        <div class={classNames}>
            <div class="flex flex-col items-center justify-center">
                <span class="loading loading-spinner loading-lg"></span>
                <span>{message}</span>
            </div>

        </div>
    )
}