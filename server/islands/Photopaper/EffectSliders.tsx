import { useEffect, useState } from "preact/hooks"
import { type Effect } from "../../core/Photopaper/CanvasCollage.ts"
import PresetSelector from "./PresetSelector.tsx"

import { effectSignal, selectPresetSignal, presetsSignal } from "./PhotopaperCanvas.tsx"


// Slider component
type SliderProps = {
    label: string
    value: number
    onChange: (value: number) => void
    disabled?: boolean
}

const Slider = ({ label, value, onChange, disabled = false }: SliderProps) => {
    return (
        <div>
            <label>{label}</label>
            <input
                disabled={disabled}
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
export interface EffectsComponentProps {
    disabled?: boolean
}
// Main component
const EffectsComponent = ({ disabled = false }: EffectsComponentProps) => {

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
                disabled={disabled}
                label="Contrast"
                value={effects.contrast!}
                onChange={(value) => setEffects((prev) => ({ ...prev, contrast: value }))}
            />
            <Slider
                disabled={disabled}
                label="Grayscale"
                value={effects.grayscale!}
                onChange={(value) => setEffects((prev) => ({ ...prev, grayscale: value }))}
            />
            <Slider
                disabled={disabled}
                label="Hue Rotate"
                value={effects.hueRotate!}
                onChange={(value) => setEffects((prev) => ({ ...prev, hueRotate: value }))}
            />
            <Slider
                disabled={disabled}
                label="Saturate"
                value={effects.saturate!}
                onChange={(value) => setEffects((prev) => ({ ...prev, saturate: value }))}
            />
            <Slider
                disabled={disabled}
                label="Sepia"
                value={effects.sepia!}
                onChange={(value) => setEffects((prev) => ({ ...prev, sepia: value }))}
            />
        </div>
    )
}

export default EffectsComponent
