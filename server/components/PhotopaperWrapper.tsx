import { ComponentChildren } from "preact"
import { PhotopaperTopMenu } from "../islands/Photopaper/PhotopaperTopMenu.tsx"
import { PhotopaperBottomMenu } from "../islands/Photopaper/PhotopaperBottomMenu.tsx"

interface MenuOverlayProps {
    children: ComponentChildren
}

export function PhotopaperWrapper (props: MenuOverlayProps) {
    const { children } = props

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#332F7D] via-[#93245E] to-[#00D4FF]">
            <div className="flex flex-col max-h-[100vh] max-w-[100vw] absolute">

                <PhotopaperTopMenu />

                <div className="">
                    {children} {/* This is presumably where your canvas is */}
                </div>

                <PhotopaperBottomMenu />

            </div>
        </div>

    )
}

