import { trigger } from "../../hooks/useTrigger.ts"
import {signal} from '@preact/signals-core'



export const speedSignal = signal(1)
export const playingSignal = signal(false)
export const [triggerDownloadGif, callTriggerDownloadGif] = trigger()
export const [triggerDownloadSnapshot, callTriggerDownloadSnapshot] = trigger()
