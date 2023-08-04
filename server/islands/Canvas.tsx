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
            <canvas id={"picture_canvas"} width={1080} height={1920} class="h-100 "></canvas>
        </>
    )
}

function createCollage (blob: Blob) {
    const canvas = document.getElementById('picture_canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const videoDuration = 12
    
    const videos: HTMLVideoElement[] = Array(4).fill(null).map((_, i) => {
        const video = document.createElement('video')
        video.src = URL.createObjectURL(blob)
        video.muted = true
        const segmentDuration = videoDuration/4 // Replace with the actual duration of each segment in seconds
        video.currentTime = i * segmentDuration
        video.play()
        video.ontimeupdate = () => {
            if (video.currentTime >= (i + 1) * segmentDuration) {
                video.currentTime = i * segmentDuration
                //console.log('reset time.',video.currentTime)
            }
        }

        return video
    })

    function draw () {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            videos.forEach((video, i) => {
                const width = canvas.width / 2
                const height = canvas.height / 2


                const dx = i <= 1 ? width * i : width * (i - 2)
                const dy = i <= 1 ? 0 : height
    
                ctx.drawImage(video, dx, dy, width, height)
                //console.log(`video ${i}: ${video.currentTime}`)
            })

            requestAnimationFrame(draw)
        }
    }

    draw()

}