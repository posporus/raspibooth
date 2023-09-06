import { ComponentChildren } from "preact"
import Icon from "./Icon.tsx"

interface StoryProps {
    children: ComponentChildren
}

export function PhotopaperWrapper (props: StoryProps) {
    const { children } = props
    return (
        <>
            <div class="flex flex-col justify-center items-center w-screen h-screen bg-red-100" style="background: linear-gradient(360deg, rgba(51,47,125,1) 0%, rgba(147,36,86,1) 34%, rgba(0,212,255,1) 100%);">
                <div class="drop-shadow-xl p-5">
                    {children}
                </div>
                <Menu />
            </div >
        </>
    )
}

const Menu = () => {
    return (
        <div>
            <ul class="menu menu-horizontal bg-base-200 rounded-box mt-6">
                <li>
                    <a class="tooltip" data-tip="Play">
                        <Icon iconName="play" prefix="fas" />
                    </a>
                </li>
                <li>
                    <a class="tooltip" data-tip="Snapshot">
                        <Icon iconName="camera" prefix="fas" />
                    </a>
                </li>
                <li>
                    <a class="tooltip" data-tip="Download">
                        <Icon iconName="download" prefix="fas" />
                    </a>
                </li>
            </ul>
        </div>
    )
}