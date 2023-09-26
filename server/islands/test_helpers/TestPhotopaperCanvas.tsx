import { useEffect } from "preact/hooks"

interface TestPhotopaperProps {
    count: number // Number of rectangles
    gap: number // Gap between rectangles
    width: number // Canvas width
    height: number // Canvas height
}

export default function TestPhotopaperCanvas (props: TestPhotopaperProps) {
    const { count, gap, width, height } = props
    const aspectRatioPadding = (height / width) * 100

    useEffect(() => {
        createCollage(count, gap, width, height)
    }, [count, gap, width, height])

    return (
        <>
            <canvas
                id={"picture_canvas"}
                width={width}
                height={height}
                class="max-w-full max-h-full h-auto rounded"
            />
        </>
    )
}

function createCollage (count: number, gap: number, width: number, height: number) {
    const c = document.getElementById("picture_canvas") as HTMLCanvasElement
    const ctx = c.getContext("2d") as CanvasRenderingContext2D
    console.log(ctx)
    // Set canvas background to white
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    const cellWidth = width / 2
    const cellHeight = height / Math.ceil(count / 2)

    // Draw light grey rectangles
    for (let i = 0; i < count; i++) {
        const x = (i % 2) * cellWidth + cellWidth / 2
        const y = Math.floor(i / 2) * cellHeight + cellHeight / 2
        const rectWidth = cellWidth - 2 * gap
        const rectHeight = cellHeight - 2 * gap

        ctx.fillStyle = "lightgrey"
        ctx.fillRect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight)
    }

}
