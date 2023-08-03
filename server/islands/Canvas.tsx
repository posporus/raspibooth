import { useEffect } from "preact/hooks"
import { useClient } from "../utils/client.ts"
interface BoothCanvasProps {
    videoData: Uint8Array
}

export default function BoothCanvas (props: BoothCanvasProps) {
    const [client] = useClient()
    useEffect(() => {
        if (!client) return
        const videoblob = new Blob([props.videoData], { type: 'video/mp4' })
        createCollage(videoblob)
    }, [])

    return (
        <>
            <canvas id={"picture_canvas"} width={500} height={200}></canvas>
        </>
    )
}

function createCollage (blob: Blob) {
    const canvas = document.getElementById('picture_canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const segmentDuration = 2.5 // Replace with the actual duration of each segment in seconds

    const videos: HTMLVideoElement[] = Array(4).fill(null).map((_, i) => {
        const video = document.createElement('video')
        video.src = URL.createObjectURL(blob)
        video.muted = true
        video.currentTime = i * segmentDuration
        video.play()

        video.ontimeupdate = () => {
            if (video.currentTime >= (i + 1) * segmentDuration) {
                video.currentTime = i * segmentDuration
            }
        }

        return video
    })

    function draw () {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            videos.forEach((video, i) => {
                const width = canvas.width / 4
                const height = canvas.height
                ctx.drawImage(video, i * width, 0, width, height)
            })

            requestAnimationFrame(draw)
        }
    }

    draw()

}