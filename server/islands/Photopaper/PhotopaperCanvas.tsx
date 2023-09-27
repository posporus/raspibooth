import { useEffect } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'
import { CanvasCollage, type Effect, type Presets } from "../../core/Photopaper/CanvasCollage.ts"
import { loadingState } from "../Loader.tsx"
import { Metadata } from "../../browser/getDataFromUnzipped.ts"
import { signal } from "@preact/signals-core"

import { speedSignal, playingSignal, triggerDownloadGif, triggerDownloadSnapshot } from './PhotopaperBottomMenu.tsx'

export interface PhotopaperCanvasProps {
    fileId: string
    videos: Uint8Array[]
    metadata: Metadata
}
export const effectSignal = signal<Effect>({})
export const selectPresetSignal = signal<keyof Presets | null>(null)
export const savePreset = signal<string>('')
export const presetsSignal = signal<Presets>({
    'Grayscale': { grayscale: 100 },
    'Contrasty': { contrast: 100 },
    'Sepia': { sepia: 100 }
})


export default function PhotopaperCanvas (props: PhotopaperCanvasProps) {

    useEffect(() => {
        if (!IS_BROWSER) return

        const canvasCollage = new CanvasCollage({ playSpeed: speedSignal, playing: playingSignal, ...props }) //any

        canvasCollage.onReady(async () => {
            loadingState.value = 'done'
            await canvasCollage.playOnce()
            canvasCollage.reset()
        })

        triggerDownloadGif?.subscribe(async (v) => {
            if (v === 0) return
            await canvasCollage.capture()
            console.log('gif created.')
        })

        triggerDownloadSnapshot?.subscribe((v) => {
            if (v === 0) return
            canvasCollage.snapshot()
            console.log('snapshot created.')
        })

    })

    return (
        <canvas id={props.fileId} className="max-w-full max-h-full h-auto" />
    )
}

