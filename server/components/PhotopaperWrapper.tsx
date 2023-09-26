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
            <div className="flex flex-col h-full w-full items-center justify-center p-5">
                {/* <div className="flex flex-col max-h-full w-full items-center">
                    <div className="w-full flex justify-center">
                    </div> */}

                    <div className="flex flex-col items-center justify-center flex-grow h-auto" style={{ maxHeight: 'calc(80vh - 4rem)' }}>
                        <PhotopaperTopMenu />
                        <div className="h-full pt-5 pb-5 drop-shadow-xl" >
                            {/* <canvas width="300" height="400" style="background-color: pink;" className="max-w-full max-h-full h-auto"></canvas> */}
                            {children}
                        </div>
                        <PhotopaperBottomMenu />
                    </div>

                    <div className="w-full flex justify-center">

                    </div>
                </div>
            {/* </div> */}
        </>


    )
}

