import { useEffect } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'
import { CanvasCollage } from "../../core/Photopaper/CanvasCollage.ts"
import { loadingState } from "../Loader.tsx"
import { Metadata } from "../../browser/getDataFromUnzipped.ts"

import { speedSignal, playingSignal, triggerDownloadGif, triggerDownloadSnapshot } from './PhotopaperBottomMenu.tsx'

export interface PhotopaperCanvasProps {
    fileId: string
    videos: Uint8Array[]
    metadata: Metadata
}



export default function PhotopaperCanvas (props: PhotopaperCanvasProps) {


    useEffect(() => {
        if (!IS_BROWSER) return

        const canvasCollage = new CanvasCollage({ playSpeed: speedSignal, playing: playingSignal, ...props }) //any

        canvasCollage.reachingEndOfAnyVideo().then(() => {
            //canvasCollage.pause()
        })

        canvasCollage.onReady(async () => {
            loadingState.value = 'done'
            //canvasCollage.stop()
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


    }, [])

    return (
        <canvas id={props.fileId} className="object-none object-left w-[80vmin] h-[80vmin]  drop-shadow-xl" />
    )
}

