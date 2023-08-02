import { useState, useEffect, StateUpdater } from 'preact/hooks'

interface DecryptorProps {
    videoData: Uint8Array
}

export default function VideoPlayer (props: DecryptorProps) {

    //const [decryptedData, setDecryptedData] = useState<Uint8Array | null>(null)
    useEffect(() => {
        if (!props.videoData) return
        playVideo(props.videoData)
    }, [props.videoData])


    return (
        <>
            <video id="videoplayer" />
            <canvas id="booth_picture" width="480" height="270"></canvas>
        </>
    )
}

function playVideo (arrayBuffer: ArrayBuffer) {
    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'video/mp4' })

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a video element
    //const video = document.createElement('video');
    const video = document.getElementById('videoplayer') as HTMLVideoElement
    const source = document.createElement('source')
    video.appendChild(source)

    if (!video) return false

    // Set the source of the video element to the object URL
    video.controls = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true
    video.loop = true
    source.src = url// + "#t=1,2"
    source.type = "video/mp4"
    video.hidden = true

    // Add the video element to the DOM
    document.body.appendChild(video)

    // Play the video
    video.play()
}