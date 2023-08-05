import { useEffect } from "preact/hooks"
import { useClient } from "../utils/client.ts"
interface BoothCanvasProps {
    videos: Uint8Array[]
    fps: number
    duration: number
    timestamp: number
}


export default function BoothCanvas (props: BoothCanvasProps) {
    const [client] = useClient()
    useEffect(() => {
        if (!client) return
        console.log('canvas', props)
        createCollage(props)
    }, [])

    return (
        <>
            <canvas id={"picture_canvas"} width={1080} height={1920} class="h-100 "></canvas>
        </>
    )
}

function createCollage(canvasData: BoothCanvasProps) {
    const { videos, fps, duration, timestamp } = canvasData;

    const canvas = document.getElementById('picture_canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const videoElements: HTMLVideoElement[] = videos.map((bytes) => {
        const blob = new Blob([bytes], { type: 'video/mp4' });
        const video = document.createElement('video');
        video.src = URL.createObjectURL(blob);
        video.muted = true;
        video.currentTime = duration / 2;
        video.loop = true;
        return video;
    });

    function getVideoPosition(i: number) {
        const width = canvas.width / 2;
        const height = canvas.height / 2;
        const dx = i <= 1 ? width * i : width * (i - 2);
        const dy = i <= 1 ? 0 : height;
        return { dx, dy, width, height };
    }

    function draw() {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            videoElements.forEach((video, i) => {
                const { dx, dy, width, height } = getVideoPosition(i);
                ctx.drawImage(video, dx, dy, width, height);
            });

            requestAnimationFrame(draw);
        }
    }

    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        videoElements.forEach((video, i) => {
            const { dx, dy, width, height } = getVideoPosition(i);
    
            if (mouseX > dx && mouseX < dx + width && mouseY > dy && mouseY < dy + height) {
                if (video.paused) {
                    video.play();
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    });
    
    // Pause all videos and jump to the middle when the mouse leaves the canvas
    canvas.addEventListener('mouseout', function() {
        videoElements.forEach(video => {

            video.pause();
        });
    });
    
    
    
    

    draw();
}
