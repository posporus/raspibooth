import { Signal } from "@preact/signals"
import {signal} from '@preact/signals-core'


export const trigger = ():[Trigger, TriggerCaller] => {
    const trigger = signal(0)
    const callTrigger = () => trigger.value++
    return [trigger, callTrigger]
}

export type TriggerCaller = (() => number)
export type Trigger = Signal<number>