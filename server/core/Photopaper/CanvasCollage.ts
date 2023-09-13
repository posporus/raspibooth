
import { Signal } from "@preact/signals"
import { VideoElement } from "./VideoElement.ts"
import { Metadata } from "../../browser/getDataFromUnzipped.ts"


interface CollageData {
    fileId: string
    videos: Uint8Array[]
    playSpeed: Signal<number>
    playing: Signal<boolean>
    metadata: Metadata

}

type ReadyCallback = () => void

export class CanvasCollage {
    private iContainerWidth = 1080;
    private iConstainerHeight = 1440;
    private handleHeight = 220;
    private gap = 30;
    private videoElements: VideoElement[] = [];
    private hoveredVideo: VideoElement | null = null;
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private playing: Signal
    private isReady: boolean
    private readyCallbacks: ReadyCallback[]
    
    fileId: string

    constructor(collageData: CollageData) {
        const { videos, fileId, playSpeed, playing } = collageData
        this.fileId = fileId

        this.isReady = false
        this.readyCallbacks = []

        this.canvas = document.getElementById(this.fileId) as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D

        (async ()=>{
            this.createVideoElements(videos)
            await this.initializeVideoElements()
            this.initializeCanvas()
            this.addEventListeners()
            this.initDrawVideoFrame()
            this.setReady()
        })()

        playSpeed.subscribe((v) => {
            this.setPlaybackSpeedForAllVideos(v)
        })

        this.playing = playing
        this.playing.subscribe(v => {
            v ? this.loopAllVideos() : this.stopAllVideos()
        })
    }

    //loop and stop handled thru preact signal
    loop () {
        this.playing.value = true
    }

    stop() {
        this.playing.value = false
    }

    play() {
        this.playAllVideos()
    }
    
    reset() {
        this.resetAllVideos()
    }

    async playOnce() {
        this.allPos1()
        this.playAllVideos()
        await this.reachingEndOfAnyVideo()
    }

    setReady (): void {
        this.isReady = true
        this.executeReadyCallbacks()
    }

    onReady (callback: ReadyCallback): void {
        if (this.isReady) {
            callback() // If already ready, execute the callback immediately
        } else {
            this.readyCallbacks.push(callback) // Otherwise, store it for later
        }
    }

    private executeReadyCallbacks (): void {
        while (this.readyCallbacks.length) {
            const callback = this.readyCallbacks.shift()
            if (callback) {
                callback()
            }
        }
    }

    async reachingEndOfAnyVideo() {
        const playOncePromises = this.videoElements.map(videoElement => videoElement.reachingEnd())
        await Promise.all(playOncePromises)
        console.log('reached end of all')
    }

    allPos1 () {
        for (const videoElement of this.videoElements) {
            videoElement.pos1()
        }
    }

    private initDrawVideoFrame () {
        for (const videoElement of this.videoElements) {
            this.drawVideoFrame(videoElement)
        }
    }

    private playAllVideos (): void {
        for (const videoElement of this.videoElements) {
            videoElement.play()
        }
    }

    private loopAllVideos (): void {
        for (const videoElement of this.videoElements) {
            videoElement.loop()
        }
    }

    private resetAllVideos ():void {
        for (const videoElement of this.videoElements) {
            videoElement.jumpToStopmark()
        }
    }

    private pauseAllVideos (): void {
        for (const videoElement of this.videoElements) {
            videoElement.pause()
        }
    }

    private stopAllVideos (): void {
        this.pauseAllVideos()
        this.resetAllVideos()
    }

    private setPlaybackSpeedForAllVideos (speed: number): void {
        for (const videoElement of this.videoElements) {
            videoElement.setPlaybackRate(speed)
        }
    }

    private initializeCanvas () {
        this.canvas.width = this.iContainerWidth
        this.canvas.height = this.iConstainerHeight + this.handleHeight
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    private async initializeVideoElements () {
        const initializationPromises = this.videoElements.map(videoElement => videoElement.initialized)
        await Promise.all(initializationPromises)
    }

    private createVideoElements (videos: Uint8Array[]) {
        const cellWidth = this.iContainerWidth / 2 - this.gap
        const cellHeight = this.iConstainerHeight / Math.ceil(videos.length / 2) - this.gap

        for (let i = 0; i < videos.length; i++) {
            const x = (i % 2) * cellWidth + cellWidth / 2 + this.gap
            const y = Math.floor(i / 2) * cellHeight + cellHeight / 2 + this.gap
            const width = cellWidth - 2 * this.gap
            const height = cellHeight - 2 * this.gap

            const videoElement = new VideoElement(videos[i], x, y, width, height)
            videoElement.anchorPoint(width / 2, height / 2)
            this.videoElements.push(videoElement)
        }
    }

    private drawVideoFrame (videoElement: VideoElement) {
        videoElement.draw(this.ctx)
        requestAnimationFrame(() => this.drawVideoFrame(videoElement))
    }

    private handleHover (x: number, y: number) {

        if(this.playing.value) return

        for (let i = 0; i < this.videoElements.length; i++) {
            if (this.videoElements[i].isPointInside(x, y)) {
                if (this.hoveredVideo !== this.videoElements[i]) {
                    if (this.hoveredVideo !== null) {
                        console.log('Mouse left video ' + (this.videoElements.indexOf(this.hoveredVideo) + 1))
                    }
                    this.hoveredVideo = this.videoElements[i]
                    console.log('Mouse entered video ' + (i + 1))
                    this.hoveredVideo.pos1
                    this.hoveredVideo.loop()
                }
                return
            }
        }

        if (this.hoveredVideo !== null) {
            console.log('Mouse left video ' + (this.videoElements.indexOf(this.hoveredVideo) + 1))
            this.hoveredVideo.jumpToStopmark()
            this.hoveredVideo = null
        }
    }

    private addEventListeners () {

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect()
            const scaleX = this.iContainerWidth / rect.width
            const scaleY = this.iConstainerHeight / rect.height
            const x = (e.clientX - rect.left) * scaleX
            const y = (e.clientY - rect.top) * scaleY
            this.handleHover(x, y)
        })

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault()  // Prevent default touch behavior
            const rect = this.canvas.getBoundingClientRect()
            const scaleX = this.iContainerWidth / rect.width
            const scaleY = this.iConstainerHeight / rect.height
            const touch = e.changedTouches[0]
            const x = (touch.clientX - rect.left) * scaleX
            const y = (touch.clientY - rect.top) * scaleY
            this.handleHover(x, y)
        }, { passive: false })  // Set passive to false to allow preventDefault()

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault()  // Prevent default touch behavior
            if (this.hoveredVideo) {
                console.log('Touch ended for video ' + (this.videoElements.indexOf(this.hoveredVideo) + 1))
                this.hoveredVideo.jumpToStopmark()
                this.hoveredVideo = null
            }
        }, { passive: false })  // Set passive to false to allow preventDefault()

        this.canvas.addEventListener('mouseleave', () => {
            if (this.hoveredVideo !== null) {
                console.log('Mouse left canvas ' + (this.videoElements.indexOf(this.hoveredVideo) + 1))
                this.hoveredVideo.jumpToStopmark()
                this.hoveredVideo = null
            }
        })

    }
    
}


