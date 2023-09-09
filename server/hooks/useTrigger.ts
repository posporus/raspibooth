import { Signal, useSignal } from "@preact/signals"

export const useTrigger = ():[Trigger, TriggerCaller] => {
    const trigger = useSignal(0)
    const callTrigger = () => trigger.value++
    return [trigger, callTrigger]
}

export type TriggerCaller = (() => number)
export type Trigger = Signal<number>