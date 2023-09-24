import Icon from '../../components/Icon.tsx'

import { trigger } from "../../hooks/useTrigger.ts"
import {signal} from '@preact/signals-core'



export const speedSignal = signal(1)
export const playingSignal = signal(false)
export const [triggerDownloadGif, callTriggerDownloadGif] = trigger()
export const [triggerDownloadSnapshot, callTriggerDownloadSnapshot] = trigger()

export type DownloadOptionsType = 'archive' | 'snapshot' | 'gif'
// interface MenuProps {
//     speed: Signal<number>
//     playing: Signal<boolean>
//     onDownloadOptionClick: (option: DownloadOptionsType) => void
//     onShareClick: () => void
// }

const PlayButton = () => {
    return (
        <li>
            <a class="tooltip" data-tip="Play" onClick={() => { playingSignal.value = !playingSignal.value }}>
                {playingSignal.value ? <Icon iconName="stop" prefix="fas" /> : <Icon iconName="play" prefix="fas" />}
            </a>
        </li>
    )
}
//TODO: speedSignal does not render on change.
function SpeedControl() {
    return (
    <li class="dropdown dropdown-top">
        <label class="tooltip" data-tip="Play speed" tabIndex={0}>
            <Icon iconName="gauge" prefix="fas" />
        </label>
        <div tabIndex={0} class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52">
            <input
                id="default-range"
                type="range"
                min={.25}
                max={1.75}
                step={0.05}

                value={speedSignal.value}
                onInput={(e) => (speedSignal.value = Number(e.currentTarget.value))}
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span class="badge">{speedSignal.value}x</span>
        </div>
    </li>
)}

const DownloadOptions = () => (
    <li class="dropdown dropdown-top dropdown-end">
        <label class="tooltip" data-tip="Download" tabIndex={0}>
            <Icon iconName="download" prefix="fas" />
        </label>
        <ul tabIndex={0} class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
            <li><a onClick={() => console.log('not yet implemented')}><Icon iconName="file-zipper" prefix="fas" /> Archive</a></li>
            <li><a onClick={callTriggerDownloadSnapshot}><Icon iconName="camera" prefix="fas" /> Snapshot</a></li>
            <li><a onClick={callTriggerDownloadGif}><Icon iconName="film" prefix="fas" /> Gif</a></li>
        </ul>
    </li>
)

const ShareButton = () => {
    const handleShare = async () => {
        try {
            (document.getElementById('share_warning_modal') as HTMLDialogElement)?.close()
            if (navigator.share) {
                await navigator.share({
                    title: 'Raspibooth',
                    text: 'Check out this content!',
                    url: window.location.href,
                })
            } else {
                // Fallback for browsers that do not support the Web Share API
                throw Error('Web Share API not supported.')
            }
        } catch (error) {
            console.error('Sharing failed', error)
        }
    }

    return (
        <li>
            <a class="tooltip" data-tip="Share" onClick={() => (document.getElementById('share_warning_modal') as HTMLDialogElement)?.showModal()}>
                <Icon iconName="share-nodes" prefix="fas" />
            </a>
            <dialog id="share_warning_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Share Warning</h3>
                    <p className="py-4">
                        By sharing, you will be sharing a link to this web page, providing access to the full, unencrypted file,
                        along with all available options for editing and manipulation, not just a static image or video.

                    </p>
                    <div className="modal-action">
                        <button className="btn" onClick={handleShare}>Share Anyway</button>
                        <button className="btn" onClick={() => (document.getElementById('share_warning_modal') as HTMLDialogElement)?.close()}>Cancel</button>
                    </div>
                </div>
            </dialog>
        </li>
    )
}




export const PhotopaperBottomMenu = () => {
    return (
        <div class="grid grid-flow-col gap-4">
            <ul class="menu menu-horizontal menu-lg bg-base-200 rounded-box text-2xl">
                <PlayButton />
                <SpeedControl />
            </ul>

            <ul class="menu menu-horizontal menu-lg bg-base-200 rounded-box text-2xl">
                <DownloadOptions />
                <ShareButton />
            </ul>
        </div>
    )
}