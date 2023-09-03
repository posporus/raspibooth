import { ComponentChildren } from "preact"

interface StoryProps {
    children: ComponentChildren
}

export function PhotopaperWrapper (props: StoryProps) {
    const { children } = props
    return (
        <>
            <div class="flex justify-center items-center w-screen h-screen bg-red-100" style="background: linear-gradient(360deg, rgba(51,47,125,1) 0%, rgba(147,36,86,1) 34%, rgba(0,212,255,1) 100%);">
                <div class="h-4/5 drop-shadow-xl p-5">
                    {children}
                </div>
            </div >
        </>
    )
}
