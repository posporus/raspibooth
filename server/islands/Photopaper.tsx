import { useEffect } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'
import { CanvasCollage } from "../core/Photopaper/CanvasCollage.ts"
import { loadingState } from "./Loader.tsx"
import { Signal } from "@preact/signals"
import { Metadata } from "../browser/getDataFromUnzipped.ts"
import { Trigger } from "../hooks/useTrigger.ts"

export interface PhotopaperProps {
    fileId: string
    videos: Uint8Array[]
    metadata: Metadata
    playing: Signal<boolean>
    playSpeed: Signal<number>
    triggerDownload: Trigger;
}


export default function Photopaper (props: PhotopaperProps) {


    useEffect(() => {
        if (!IS_BROWSER) return

        const canvasCollage = new CanvasCollage(props) //any

        canvasCollage.reachingEndOfAnyVideo().then(() => {
            //canvasCollage.pause()
        })

        canvasCollage.onReady(async () => {
            loadingState.value = 'done'
            //canvasCollage.stop()
            await canvasCollage.playOnce()
            canvasCollage.reset()
        })

        props.triggerDownload.subscribe(async (v) => {
            if (v === 0) return
            await canvasCollage.capture()
            
            console.log('gif created.')

        })


    }, [])

    return (
        <>
            <div class="drop-shadow-xl p-5">
                <CanvasElement id={props.fileId}></CanvasElement>
            </div>
        </>

    )
}

const CanvasElement = (props: { id: string }) => <canvas id={props.id} class="max-w-full max-h-full h-auto rounded" > </canvas>
