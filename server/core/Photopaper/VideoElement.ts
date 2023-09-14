

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
        this.videoElement.loop = false

        document.body.appendChild(this.videoElement)
        //console.log(this.videoElement)


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
                //console.log('video readey!',x,y)
                resolve()
            }
        })
    }




    pos1 () {
        this.videoElement.currentTime = 0
    }

    // async pos1UntilEnd() {
    //     this.pos1()
    //     await this.untilTime(this.videoElement.duration)
    // }

    // async untilPlayedOnce() {
    //     await this.untilTime(this.videoElement.duration)
    // }



    setPlaybackRate (rate: number): void {
        this.videoElement.playbackRate = rate;
    }

    reachingTime (time: number) {
        console.log('called reachingTime')
        return new Promise<void>((resolve) => {
            const onTimeUpdate = () => {
                console.log('this.videoElement.currentTime', this.videoElement.currentTime, 'time', time)
                if (this.videoElement.currentTime >= time) {
                    console.log('reached time')
                    resolve()
                    this.videoElement.removeEventListener('timeupdate', onTimeUpdate)
                }
            }
            this.videoElement.addEventListener('timeupdate', onTimeUpdate)
        })
    }


    reachingStopmark = () => this.reachingTime(this.stopmark)
    reachingEnd () {
        console.log('called reachingEnd');
        return new Promise<void>((resolve) => {
            const onEnded = () => {
                console.log('reached end');
                resolve();
                this.videoElement.removeEventListener('ended', onEnded);
            };
            this.videoElement.addEventListener('ended', onEnded);
        });
    }


    jumpToStopmark () {
        this.videoElement.pause()
        this.videoElement.currentTime = this.stopmark || 0
    }

    loop () {
        this.videoElement.loop = true
        this.videoElement.play()
    }

    play = () => {
        this.videoElement.loop = false
        this.videoElement.play()
    }

    pause = () => {
        this.videoElement.pause()
    }

    // border (width: number, color: string) {
    //     this._borderWidth = width
    //     this._borderColor = color
    // }

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

    goToFrame = (frameNumber: number, fps = 30) => new Promise<void>((resolve)=>{
        this.videoElement.currentTime = (frameNumber / fps) / this.videoElement.playbackRate;
        this.videoElement.onseeked = () => {
            resolve()
        }
    })

}