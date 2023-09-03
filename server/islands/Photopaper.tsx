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


        <canvas id={"picture_canvas"} class="max-w-full max-h-full h-auto rounded-lg overflow-hidden"></canvas>


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
    _stopmark: number | null
    _scrubbing: boolean

    initialized: Promise<void>



    constructor(videoData: Uint8Array, x: number, y: number, width: number, height: number) {
        const blob = new Blob([videoData], { type: 'video/mp4' })
        const url = URL.createObjectURL(blob)

        this._scrubbing = false

        
        this.videoElement = document.createElement('video')
        this.videoElement.src = url
        this.videoElement.width = width
        this.videoElement.height = height
        this.videoElement.style.display = 'none'
        this.videoElement.autoplay = true
        this.videoElement.muted = true
        this.videoElement.loop = true
        document.body.appendChild(this.videoElement)
        console.log(this.videoElement)
        
        
        this._x = x
        this._y = y
        this._width = width
        this._height = height
        this._offsetX = 0
        this._offsetY = 0
        this._borderWidth = 0
        this._borderColor = 'black'

        this._stopmark = null

        this.initialized = new Promise<void>((resolve) => {
            this.videoElement.oncanplaythrough = () => {
                console.log('video readey!')
                resolve()
            }
        })
    }

    pauseAtStopmark () {
        const onTimeUpdate = () => {
            console.log('stopmark:',this.stopmark)
            const currentTime = this.videoElement.currentTime
            console.log('onTimeUpdate called')
            if (currentTime >= this.stopmark) {
                this.videoElement.pause()
                this.videoElement.removeEventListener('timeupdate', onTimeUpdate)
            }
        }
        this.videoElement.addEventListener('timeupdate', onTimeUpdate)
        console.log('attach event!')
    }

    jumpToStopmark () {
        this.videoElement.pause()
        this.videoElement.currentTime = this.stopmark
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

    

    startScrubbing() {
        this._scrubbing = true;
        this.videoElement.pause();
    }
    
    stopScrubbing() {
        this._scrubbing = false;
        this._stopmark = this.videoElement.currentTime;
    }

    scrub(x: number, startX: number, scaleX: number) {
        if (!this._scrubbing) return;
    
        const scrubDistance = (x - startX) * scaleX;
        const sensitivity = 100; // Adjust this value to control sensitivity
        const scrubFactor = (scrubDistance / (this._width * sensitivity));
        const newTime = this.videoElement.currentTime + scrubFactor * this.videoElement.duration;
    
        this.videoElement.currentTime = Math.max(0, Math.min(this.videoElement.duration, newTime));
    }

    
    
    public set stopmark(v : number) {
        this._stopmark = v;
    }

    public get stopmark() {
        if(this._stopmark) return this._stopmark
        return this.videoElement.duration / 2
    }
    
}

function createCollage (canvasData: BoothCanvasProps) {
    const { videos, fps, duration, timestamp } = canvasData

    const iContainerWidth = 1080
    const iConstainerHeight = 1440
    const handleHeight = 220

    const c = document.getElementById("picture_canvas") as HTMLCanvasElement
    c.width = iContainerWidth
    c.height = iConstainerHeight + handleHeight

    const ctx = c.getContext("2d") as CanvasRenderingContext2D

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, c.width, c.height)

    const videoElements: VideoElement[] = []
    const gap = 30 // Set this to the desired gap size
    const cellWidth = iContainerWidth / 2 - gap
    const cellHeight = iConstainerHeight / Math.ceil(videos.length / 2) - gap

    function drawVideoFrame (videoElement: VideoElement) {
        videoElement.draw(ctx)
        requestAnimationFrame(() => drawVideoFrame(videoElement))

    }
    for (let i = 0; i < videos.length; i++) {
        const x = (i % 2) * cellWidth + cellWidth / 2 + gap
        const y = Math.floor(i / 2) * cellHeight + cellHeight / 2 + gap
        const width = cellWidth - 2 * gap
        const height = cellHeight - 2 * gap

        const videoElement = new VideoElement(videos[i], x, y, width, height)
        videoElement.anchorPoint(width / 2, height / 2)
        videoElements.push(videoElement)

    }

    let hoveredVideo: VideoElement | null = null;

    function handleHover(x: number, y: number) {
        for (let i = 0; i < videoElements.length; i++) {
            if (videoElements[i].isPointInside(x, y)) {
                if (hoveredVideo !== videoElements[i]) {
                    if (hoveredVideo !== null) {
                        console.log('Mouse left video ' + (videoElements.indexOf(hoveredVideo) + 1));
                    }
                    hoveredVideo = videoElements[i];
                    console.log('Mouse entered video ' + (i + 1));

                    hoveredVideo.play();
                }
                return;
            }
        }

        if (hoveredVideo !== null) {
            console.log('Mouse left video ' + (videoElements.indexOf(hoveredVideo) + 1));
            hoveredVideo.jumpToStopmark();
            hoveredVideo = null;
        }
    }

    let scrubStartX: number;

c.addEventListener('mousedown', function (e) {
    if (hoveredVideo) {
        hoveredVideo.startScrubbing();
        scrubStartX = e.clientX;
    }
});

c.addEventListener('mousemove', function (e) {
    const rect = c.getBoundingClientRect();
    const scaleX = iContainerWidth / rect.width;
    const scaleY = iConstainerHeight / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (hoveredVideo && hoveredVideo._scrubbing) {
        hoveredVideo.scrub(e.clientX, scrubStartX, scaleX);
    } else {
        handleHover(x, y);
    }
});


c.addEventListener('mouseup', function (e) {
    if (hoveredVideo && hoveredVideo._scrubbing) {
        hoveredVideo.stopScrubbing();
    }
});

c.addEventListener('touchstart', function (e) {
    const rect = c.getBoundingClientRect();
    const scaleX = iContainerWidth / rect.width;
    const scaleY = iConstainerHeight / rect.height;
    const touch = e.changedTouches[0];
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    if (hoveredVideo) {
        hoveredVideo.startScrubbing();
        scrubStartX = touch.clientX;
    } else {
        handleHover(x, y);
    }
});

c.addEventListener('touchmove', function (e) {
    const rect = c.getBoundingClientRect();
    const scaleX = iContainerWidth / rect.width;
    const scaleY = iConstainerHeight / rect.height;
    const touch = e.changedTouches[0];

    if (hoveredVideo && hoveredVideo._scrubbing) {
        hoveredVideo.scrub(touch.clientX, scrubStartX, scaleX);
    }
});

c.addEventListener('touchend', function (e) {
    if (hoveredVideo && hoveredVideo._scrubbing) {
        hoveredVideo.stopScrubbing();
    }
});

    
    
    

    c.addEventListener('mouseleave', function () {
        if (hoveredVideo !== null) {
            console.log('Mouse left canvas ' + (videoElements.indexOf(hoveredVideo) + 1));
            hoveredVideo.jumpToStopmark();
            hoveredVideo = null;
        }
    });



    const initializationPromises = videoElements.map(videoElement => videoElement.initialized)
    Promise.all(initializationPromises).then(() => {
        videoElements.forEach((videoElement) => {
            drawVideoFrame(videoElement)
            videoElement.play()
            videoElement.pauseAtStopmark()
        })
        loadingState.value = 'done'
    })



}