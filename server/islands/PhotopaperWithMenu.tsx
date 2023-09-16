import { useTrigger } from "../hooks/useTrigger.ts";
import Photopaper, { type PhotopaperProps } from "./Photopaper.tsx"
import { DownloadOptionsType, PhotopaperMenu } from "./PhotopaperMenu.tsx"
import { useSignal } from "@preact/signals"
import { useEffect } from "preact/hooks"


export type PhotopaperWithMenuProps = Omit<PhotopaperProps, 'playSpeed' | 'playing' | 'triggerDownload'>


export default function PhotopaperWithMenu (props: PhotopaperWithMenuProps) {
    const speedSignal = useSignal(1)
    const playingSignal = useSignal(false)
    const [triggerDownloadGif, callTriggerDownloadGif] = useTrigger()
    const [triggerDownloadSnapshot, callTriggerDownloadSnapshot] = useTrigger()


    useEffect(() => {
        speedSignal.subscribe((v) => {
            console.log('speed:', v)
        })
        playingSignal.subscribe(v => {
            console.log('play:', v)
        })
    }, [])

    const handleDownload = (o: DownloadOptionsType) => {
        console.log('handleDownload', o)
        if (o === 'gif') callTriggerDownloadGif()
        if (o === 'snapshot') callTriggerDownloadSnapshot()
    }
    return (
        <>
            <Photopaper
                {...props} playSpeed={speedSignal}
                playing={playingSignal}
                triggerDownloadSnapshot={triggerDownloadSnapshot}
                triggerDownloadGif={triggerDownloadGif}
            />
            <PhotopaperMenu
                speed={speedSignal}
                onDownloadOptionClick={handleDownload}
                playing={playingSignal}
                onShareClick={() => console.log('share')}
            />
        </>
    )
}