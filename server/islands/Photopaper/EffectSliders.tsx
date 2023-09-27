import { useEffect, useState } from "preact/hooks"
import { type Effect } from "../../core/Photopaper/CanvasCollage.ts"
import PresetSelector from "./PresetSelector.tsx"

import { effectSignal, selectPresetSignal, presetsSignal } from "./PhotopaperCanvas.tsx"


// Slider component
type SliderProps = {
    label: string
    value: number
    onChange: (value: number) => void
}

const Slider = ({ label, value, onChange }: SliderProps) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onInput={(e) => onChange(Number((e.target as HTMLInputElement).value))}
            />
            <span>{value}</span>
        </div>
    )
}

// Main component
const EffectsComponent = () => {
    const [effects, setEffects] = useState<Effect>({
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        saturate: 100,
        sepia: 0,
    })

    useEffect(() => {
        effectSignal.subscribe((value) => {
            setEffects(value)
            console.log('effect changed', value)
        })

        selectPresetSignal.subscribe((name) => {
            if (name === null) return
            effectSignal.value = presetsSignal.value[name] || {}

        })
    }, [])

    useEffect(() => {
        effectSignal.value = effects
    }, [effects])

    return (
        <div>
            <PresetSelector />
            <Slider
                label="Contrast"
                value={effects.contrast!}
                onChange={(value) => setEffects((prev) => ({ ...prev, contrast: value }))}
            />
            <Slider
                label="Grayscale"
                value={effects.grayscale!}
                onChange={(value) => setEffects((prev) => ({ ...prev, grayscale: value }))}
            />
            <Slider
                label="Hue Rotate"
                value={effects.hueRotate!}
                onChange={(value) => setEffects((prev) => ({ ...prev, hueRotate: value }))}
            />
            <Slider
                label="Saturate"
                value={effects.saturate!}
                onChange={(value) => setEffects((prev) => ({ ...prev, saturate: value }))}
            />
            <Slider
                label="Sepia"
                value={effects.sepia!}
                onChange={(value) => setEffects((prev) => ({ ...prev, sepia: value }))}
            />
        </div>
    )
}

export default EffectsComponent
