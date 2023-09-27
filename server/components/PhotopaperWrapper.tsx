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
                    <div className="flex flex-col items-center justify-center h-auto" style={{ maxHeight: 'calc(80vh - 4rem)' }}>
                        <PhotopaperTopMenu />
                        <div className="h-full pt-5 pb-5 drop-shadow-xl" >
                            {children}
                        </div>
                        <PhotopaperBottomMenu />
                    </div>
                </div>
        </>


    )
}

