import { useState, useEffect, useRef } from 'preact/hooks';

interface MultiInputProps {
    n: number;
    d: number;
    onCompleted?: (values: string[]) => void;
    className?: string;
}

export default function MultiInput(props: MultiInputProps) {
    const { n, d, onCompleted, className } = props;
    
    // Create an array of refs, one for each input field
    const inputRefs = useRef(Array.from({ length: n }, () => useRef<HTMLInputElement>(null)));
    
    // Create a state variable to hold the values of the input fields
    const [values, setValues] = useState<string[]>(Array(n).fill(''));
    
    // Focus the first input field when the component is first rendered
    useEffect(() => {
        inputRefs.current[0].current?.focus();
    }, []);
    
    // Handle the input event on each input field
    const handleInput = (e: Event, index: number) => {
        const target = e.target as HTMLInputElement;
        const newValue = target.value;
        
        // Update the value of this input field
        const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
        
        // Check if this input field is full
        if (newValue.length === d) {
            // Check if this is the last input field
            if (index === n - 1) {
                // Trigger the signal with the updated values
                if (onCompleted) {
                    onCompleted(newValues);
                }
            } else {
                // Move focus to the next input field
                inputRefs.current[index + 1].current?.focus();
            }
        }
    };
    
    // Render the input fields, separated by ' - '
    return (
        <>
            <div class="flex space-x-2 font-mono">
                {Array.from({ length: n }, (_, index) => (
                    <>
                        <input
                            key={index}
                            ref={inputRefs.current[index]}
                            value={values[index]}
                            maxLength={d}
                            onInput={(e) => handleInput(e, index)}
                            class="input input-bordered w-1 input-sm grow"
                        />
    
                        {index < n - 1 && <span className="grow-0">-</span>}
                    </>
                ))}
            </div>
        </>
    )
}
