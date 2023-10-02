
import { Signal } from "@preact/signals"
import { VideoElement } from "./VideoElement.ts"
import { Metadata } from "../../types/Metadata.ts"
import { GIFEncoder, quantize, applyPalette } from "https://unpkg.com/gifenc@1.0.3/dist/gifenc.esm.js"

import { download } from '../../utils/download.ts'

interface CollageData {
    fileId: string
    videos: Uint8Array[]
    playSpeed: Signal<number>
    playing: Signal<boolean>
    metadata: Metadata

}

type ReadyCallback = () => void
export type Effect = { contrast?: number, grayscale?: number, hueRotate?: number, saturate?: number, sepia?: number }
export type Presets = Record<string, Effect>

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
    private capturing = false
    private drawing = false
    private playSpeed = 1

    metadata: Metadata
    fileId: string

    constructor(collageData: CollageData) {
        const { videos, fileId, playSpeed, playing, metadata } = collageData

        this.fileId = fileId
        this.metadata = metadata

        this.isReady = false
        this.readyCallbacks = []

        this.canvas = document.getElementById(this.fileId) as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D

            ; (async () => {
                this.createVideoElements(videos)
                await this.initializeVideoElements()
                this.initializeCanvas()
                this.addEventListeners()
                this.setReady()
            })()

        playSpeed.subscribe((v) => {
            this.playSpeed = v
            this.setPlaybackSpeedForAllVideos(v)
        })

        this.playing = playing
        this.playing.subscribe(v => {
            v ? this.loopAllVideos() : this.stopAllVideos()
        })

    }

    get isAnyPlaying () {
        return this.videoElements.some(v => v.playing)
    }

    applyEffects (effects: Effect) {
        // Construct the filter string from the effects object
        let filterString = ''

        if (effects.contrast !== undefined) {
            filterString += `contrast(${effects.contrast}%) `
        }
        if (effects.grayscale !== undefined) {
            filterString += `grayscale(${effects.grayscale}%) `
        }
        if (effects.hueRotate !== undefined) {
            filterString += `hue-rotate(${effects.hueRotate}deg) `
        }
        if (effects.saturate !== undefined) {
            filterString += `saturate(${effects.saturate}%) `
        }
        if (effects.sepia !== undefined) {
            filterString += `sepia(${effects.sepia}%) `
        }

        // Set the filter property on the canvas context
        this.ctx.filter = filterString.trim()
        this.draw()

    }


    snapshot = () => {
        const fileUrl = this.canvas.toDataURL()
        download(`${this.fileId}.png`, fileUrl)
    }

    async capture (targetFps = 30) {
        console.info('start capturing')

        this.capturing = true
        console.log('dur:', this.metadata.duration)
        console.log('speed:',this.metadata.playSpeed);
        console.log('tFps:', targetFps);
        
        
        const frames = this.metadata.duration /1000 / this.playSpeed * targetFps

        console.log('frames:',frames)

        const width = this.iContainerWidth, height = this.iConstainerHeight

        const gif = GIFEncoder()

        for (let frame = 0; frame < frames; frame++) {

            await this.goToFrameOfAllVideos(frame * this.playSpeed)
            this.draw()

            const { data } = this.ctx.getImageData(0, 0, width, height)
            const format = "rgb444"
            const palette = quantize(data, 256, { format })
            const index = applyPalette(data, palette, format)
            gif.writeFrame(index, width, height, { palette })

        }

        this.capturing = false

        console.log(`${this.fileId}_${this.playSpeed}x_${targetFps}fps.gif`)

        gif.finish()
        const buffer = gif.bytesView()

        const blob = buffer instanceof Blob ? buffer : new Blob([buffer], { type: 'image/gif' })
        const url = URL.createObjectURL(blob)
        download(`${this.fileId}_${this.playSpeed}x_${targetFps}fps.gif`, url)

        this.reset()

    }

    //loop and stop handled thru preact signal
    loop () {
        this.playing.value = true
    }

    stop () {
        this.playing.value = false
    }

    play () {
        this.playAllVideos()
    }

    reset () {
        this.resetAllVideos()
    }

    async playOnce () {
        this.allPos1()
        this.play()
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

    async reachingEndOfAnyVideo () {
        const playOncePromises = this.videoElements.map(videoElement => videoElement.reachingEnd())
        await Promise.any(playOncePromises)
        console.log('reached end of any video')
    }

    allPos1 () {
        for (const videoElement of this.videoElements) {
            videoElement.pos1()
        }
    }

    private drawVideoFrame () {
        this.draw()
        if (!this.isAnyPlaying) this.stopDrawing()
        if (!this.drawing) return
        requestAnimationFrame(() => this.drawVideoFrame())
    }

    private startDrawing () {
        if (this.drawing) return
        this.drawing = true
        this.drawVideoFrame()
    }

    private stopDrawing () {
        this.drawing = false
    }

    private draw () {
        for (const videoElement of this.videoElements) {
            videoElement.draw(this.ctx)
        }

        this.ctx.font = "48px serif"
        this.ctx.fillText("Hello world", 10, this.iConstainerHeight + 10)
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

    private resetAllVideos (): void {
        for (const videoElement of this.videoElements) {
            videoElement.jumpToStopmark()
        }
        requestAnimationFrame(() => this.draw())

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

    private async goToFrameOfAllVideos (frame: number): Promise<void> {
        const goToFramePromises = this.videoElements.map(videoElement => videoElement.goToFrame(frame, this.metadata.fps))
        await Promise.all(goToFramePromises)
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

            videoElement.onPlay(() => {
                this.startDrawing()
            })
            videoElement.anchorPoint(width / 2, height / 2)
            this.videoElements.push(videoElement)

        }
    }

    private handleHover (x: number, y: number) {

        if (this.playing.value) return

        for (let i = 0; i < this.videoElements.length; i++) {
            if (this.videoElements[i].isPointInside(x, y)) {
                if (this.hoveredVideo !== this.videoElements[i]) {
                    if (this.hoveredVideo !== null) {
                        console.log('Mouse left video ' + (this.videoElements.indexOf(this.hoveredVideo) + 1))
                        this.hoveredVideo.jumpToStopmark()
                        this.hoveredVideo = null
                        requestAnimationFrame(() => this.draw())
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
            requestAnimationFrame(() => this.draw())
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
                requestAnimationFrame(() => this.draw())
            }
        }, { passive: false })  // Set passive to false to allow preventDefault()

        this.canvas.addEventListener('mouseleave', () => {
            if (this.hoveredVideo !== null) {
                console.log('Mouse left canvas ' + (this.videoElements.indexOf(this.hoveredVideo) + 1))
                this.hoveredVideo.jumpToStopmark()
                this.hoveredVideo = null
                requestAnimationFrame(() => this.draw())
            }
        })

    }

}


