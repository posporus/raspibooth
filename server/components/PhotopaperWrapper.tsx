import { ComponentChildren } from "preact"
import Icon from "./Icon.tsx"

interface StoryProps {
    children: ComponentChildren
}

export function PhotopaperWrapper (props: StoryProps) {
    const { children } = props
    return (
        <>
            <div class="flex flex-col justify-center items-center w-full h-full bg-red-100" style="background: linear-gradient(360deg, rgba(51,47,125,1) 0%, rgba(147,36,86,1) 34%, rgba(0,212,255,1) 100%);">
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
        <div class="grid grid-flow-col gap-4">
            <ul class="menu menu-horizontal menu-lg bg-base-200 rounded-box text-2xl">
                <li>
                    <a class="tooltip" data-tip="Play">
                        <Icon iconName="play" prefix="fas" />
                    </a>
                </li>
                <li class="dropdown dropdown-top">
                    <label class="tooltip" data-tip="Play speed" tabIndex={0}><Icon iconName="gauge" prefix="fas" /></label>
                    <div tabIndex={0} class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52">


                        <input id="default-range" type="range" value="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

                    </div>
                </li>
            </ul>


            <ul class="menu menu-horizontal menu-lg bg-base-200 rounded-box text-2xl">

                <li class="dropdown dropdown-top dropdown-end">


                    <label class="tooltip" data-tip="Download" tabIndex={0}><Icon iconName="download" prefix="fas" /></label>
                    <ul tabIndex={0} class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
                        <li>
                            <a>
                                <Icon iconName="file-zipper" prefix="fas" />
                                Archive
                            </a>
                        </li>
                        <li>
                            <a>
                                <Icon iconName="camera" prefix="fas" />
                                Snapshot
                            </a>
                        </li>
                        <li>
                            <a>
                                <Icon iconName="film" prefix="fas" />
                                Gif
                            </a>
                        </li>
                    </ul>


                </li>

                <li>
                    <a class="tooltip" data-tip="Share">
                        <Icon iconName="share-nodes" prefix="fas" />
                    </a>
                </li>
                
            </ul>
        </div>
    )
}

//<input id="default-range" type="range" value="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">