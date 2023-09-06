import { useEffect } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'
import { CanvasCollage } from "../core/Photopaper/CanvasCollage.ts"
import { loadingState } from "./Loader.tsx"

export interface PhotopaperProps {
    fileId: string
    videos: Uint8Array[]
    fps: number
    duration: number
    timestamp: number
    location?: string
    eventName?: string
}

export default function Photopaper (props: PhotopaperProps) {

    useEffect(() => {
        const canvasCollage = new CanvasCollage(props) //any
        canvasCollage.onReady(() => {
            loadingState.value = 'done'
        })
        canvasCollage.teaseVideos()
        if (!IS_BROWSER) return
        console.log('canvas', props)
    }, [])

    return (
        <>
            <CanvasElement id={props.fileId}></CanvasElement>
        </>

    )
}

const CanvasElement = (props: { id: string }) => <canvas id={props.id} class="max-w-full max-h-full h-auto rounded" > </canvas>
