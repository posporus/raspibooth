import { ComponentChildren } from "preact"
import { PhotopaperTopMenu } from "../islands/Photopaper/PhotopaperTopMenu.tsx"
import { PhotopaperBottomMenu } from "../islands/Photopaper/PhotopaperBottomMenu.tsx"

interface MenuOverlayProps {
    children: ComponentChildren
}

export function PhotopaperWrapper (props: MenuOverlayProps) {
    const { children } = props

    return (
        <>
            <div className="flex flex-col h-full w-full justify-center">
                <div className="flex flex-col max-h-full w-full items-center">
                    <div className="w-full flex justify-center">
                        <PhotopaperTopMenu />
                    </div>

                    <div className="w-full flex justify-center flex-grow" style={{ maxHeight: 'calc(80vh - 4rem)' }}>
                        <div className="h-full p-5 drop-shadow-xl" >
                            {/* <canvas width="300" height="400" style="background-color: pink;" className="max-w-full max-h-full h-auto"></canvas> */}
                            {children}
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <PhotopaperBottomMenu />
                    </div>
                </div>
            </div>
        </>


    )
}

