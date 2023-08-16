import { useState, useEffect, useRef } from 'preact/hooks';

interface MultiInputProps {
    n: number;
    d: number;
    onCompleted?: (values: string[]) => void;
    className?: string;
}

export default function MultiInput(props: MultiInputProps) {
    const { n, d, onCompleted, className } = props;
    const inputRefs = useRef(Array.from({ length: n }, () => useRef<HTMLInputElement>(null)));
    const [values, setValues] = useState<string[]>(Array(n).fill(''));
    
    useEffect(() => {
        inputRefs.current[0].current?.focus();
    }, []);
    
    const handleInput = (e: Event, index: number) => {
        const target = e.target as HTMLInputElement;
        const newValue = target.value;
        const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
        
        if (newValue.length === d) {
            if (index === n - 1) {
                if (onCompleted) {
                    onCompleted(newValues);
                }
            } else {
                inputRefs.current[index + 1].current?.focus();
            }
        }
    };
    
    const handlePaste = (e: ClipboardEvent, index: number) => {
        e.preventDefault();
        const pastedData = e.clipboardData?.getData('text');
        if (pastedData) {
            // Remove characters that are not a-z, A-Z, or 0-9
            const sanitizedData = pastedData.replace(/[^a-zA-Z0-9]/g, '');
            
            const pieces = [];
            for (let i = 0; i < sanitizedData.length; i += d) {
                pieces.push(sanitizedData.substring(i, i + d));
            }
            const newValues = [...values];
            for (let i = 0; i < pieces.length && (index + i) < n; i++) {
                newValues[index + i] = pieces[i];
            }
            setValues(newValues);
    
            // Trigger the onCompleted callback with the updated values
            if (onCompleted) {
                onCompleted(newValues);
            }
        }
    };
    
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
                            onPaste={(e) => handlePaste(e as ClipboardEvent, index)}
                            class="input input-bordered w-1 input-sm grow"
                        />
    
                        {index < n - 1 && <span className="grow-0">-</span>}
                    </>
                ))}
            </div>
        </>
    );
}
