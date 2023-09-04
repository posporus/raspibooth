export class VideoElement {
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
            console.log('stopmark:', this.stopmark)
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



    startScrubbing () {
        this._scrubbing = true
        this.videoElement.pause()
    }

    stopScrubbing () {
        this._scrubbing = false
        this._stopmark = this.videoElement.currentTime
    }

    scrub (x: number, startX: number, scaleX: number) {
        if (!this._scrubbing) return

        const scrubDistance = (x - startX) * scaleX
        const sensitivity = 100 // Adjust this value to control sensitivity
        const scrubFactor = (scrubDistance / (this._width * sensitivity))
        const newTime = this.videoElement.currentTime + scrubFactor * this.videoElement.duration

        this.videoElement.currentTime = Math.max(0, Math.min(this.videoElement.duration, newTime))
    }

    public set stopmark (v: number) {
        this._stopmark = v
    }

    public get stopmark () {
        if (this._stopmark) return this._stopmark
        return this.videoElement.duration / 2
    }

}