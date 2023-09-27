import { useState } from 'preact/hooks'
import { selectPresetSignal, presetsSignal } from "./PhotopaperCanvas.tsx"


const PresetSelector = () => {
    selectPresetSignal.subscribe(v=>{
        console.log('subscribe',v)
    })

    return (
        <div>
            <select value={selectPresetSignal.value || ''} onChange={(e) => { selectPresetSignal.value = e.currentTarget.value; console.log('change in select',e.currentTarget.value) }}>
                {Object.keys(presetsSignal.value).map((preset) => (
                    <option key={preset} value={preset}>
                        {preset}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PresetSelector
