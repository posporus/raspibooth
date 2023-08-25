import { useEffect } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'
import { loadingState } from "../islands/Loader.tsx"
interface BoothCanvasProps {
    videos: Uint8Array[]
    fps: number
    duration: number
    timestamp: number
}


export default function Photopaper (props: BoothCanvasProps) {
    useEffect(() => {
        if (!IS_BROWSER) return
        console.log('canvas', props)
        createCollage(props)
    }, [])

    return (

        
            <canvas id={"picture_canvas"} width={1080} height={1440} class="max-v-full max-h-full h-auto bg-white"></canvas>
      

    )
}

class VideoElement {
    videoElement: HTMLVideoElement
    _x: number
    _y: number
    _width: number
    _height: number
    _offsetX: number
    _offsetY: number
    _borderWidth: number
    _borderColor: string

    initialized: Promise<void>

    constructor(videoData: Uint8Array, x: number, y: number, width: number, height: number) {
        const blob = new Blob([videoData], { type: 'video/mp4' })
        const url = URL.createObjectURL(blob)

        this.videoElement = document.createElement('video')
        this.videoElement.src = url
        this.videoElement.width = width
        this.videoElement.height = height
        this.videoElement.style.display = 'none'
        this.videoElement.autoplay = true
        this.videoElement.muted = true
        this.videoElement.loop = true
        document.body.appendChild(this.videoElement)

        this._x = x
        this._y = y
        this._width = width
        this._height = height
        this._offsetX = 0
        this._offsetY = 0
        this._borderWidth = 0
        this._borderColor = 'black'

        this.initialized = new Promise<void>((resolve) => {
            this.videoElement.oncanplaythrough = () => {
                console.log('video readey!')
                resolve()
            }
        })
    }

    pauseAtMiddle () {
        const onTimeUpdate = () => {
            const halfDuration = this.videoElement.duration / 2
            const currentTime = this.videoElement.currentTime
            console.log('onTimeUpdate called')
            if (currentTime >= halfDuration) {
                this.videoElement.pause()
                this.videoElement.removeEventListener('timeupdate', onTimeUpdate)
            }
        }
        this.videoElement.addEventListener('timeupdate', onTimeUpdate)
        console.log('attach event!')
    }


    play = () => this.videoElement.play()

    border (width: number, color: string) {
        this._borderWidth = width
        this._borderColor = color
    }

    draw (ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.videoElement, this._x + this._offsetX, this._y + this._offsetY, this._width, this._height)
        if (this._borderWidth > 0) {
            ctx.strokeStyle = this._borderColor
            ctx.lineWidth = this._borderWidth
            ctx.strokeRect(this._x + this._offsetX, this._y + this._offsetY, this._width, this._height)
        }
    }

    anchorPoint (x: number, y: number) {
        this._offsetX = -x
        this._offsetY = -y
    }

    isPointInside (x: number, y: number) {
        return x >= this._x + this._offsetX && x <= this._x + this._offsetX + this._width &&
            y >= this._y + this._offsetY && y <= this._y + this._offsetY + this._height
    }
}

function createCollage (canvasData: BoothCanvasProps) {
    const { videos, fps, duration, timestamp } = canvasData

    const c = document.getElementById("picture_canvas") as HTMLCanvasElement
    const ctx = c.getContext("2d") as CanvasRenderingContext2D

    const videoElements: VideoElement[] = []
    const gap = 30 // Set this to the desired gap size
    const cellWidth = c.width / 2
    const cellHeight = c.height / Math.ceil(videos.length / 2)

    function drawVideoFrame (videoElement: VideoElement) {
        videoElement.draw(ctx)
        requestAnimationFrame(() => drawVideoFrame(videoElement))

    }
    for (let i = 0; i < videos.length; i++) {
        const x = (i % 2) * cellWidth + cellWidth / 2
        const y = Math.floor(i / 2) * cellHeight + cellHeight / 2
        const width = cellWidth - 2 * gap
        const height = cellHeight - 2 * gap

        const videoElement = new VideoElement(videos[i], x, y, width, height)
        videoElement.anchorPoint(width / 2, height / 2)
        videoElements.push(videoElement)

    }

    let hoveredVideo: VideoElement | null = null

    c.addEventListener('mousemove', function (e) {
        const rect = c.getBoundingClientRect()
        const scaleX = c.width / rect.width
        const scaleY = c.height / rect.height
        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        for (let i = 0; i < videoElements.length; i++) {
            if (videoElements[i].isPointInside(x, y)) {
                if (hoveredVideo !== videoElements[i]) {
                    if (hoveredVideo !== null) {
                        console.log('Mouse left video ' + (videoElements.indexOf(hoveredVideo) + 1))
                    }
                    hoveredVideo = videoElements[i]
                    console.log('Mouse entered video ' + (i + 1))

                    hoveredVideo.play()
                }
                return
            }
        }

        if (hoveredVideo !== null) {
            console.log('Mouse left video ' + (videoElements.indexOf(hoveredVideo) + 1))
            hoveredVideo.pauseAtMiddle()
            hoveredVideo = null
        }
    })

    c.addEventListener('mouseleave', function () {
        if (hoveredVideo !== null) {
            console.log('Mouse left canvas ' + (videoElements.indexOf(hoveredVideo) + 1))
            hoveredVideo.pauseAtMiddle()
            hoveredVideo = null
        }
    })



    const initializationPromises = videoElements.map(videoElement => videoElement.initialized)
    Promise.all(initializationPromises).then(() => {
        videoElements.forEach((videoElement) => {
            drawVideoFrame(videoElement)
            videoElement.play()
            videoElement.pauseAtMiddle()
        })
        loadingState.value ='done'
    })



}