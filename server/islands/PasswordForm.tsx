import { verifyStringWithChecksum } from '../browser/verifyStringWithChecksum.ts'
import { useState, useEffect } from 'preact/hooks'
import MultiInput from './MultiInput.tsx'

//TODO: this should be a config
const fileIdLength = 10, passwordLength = 10




export default function PasswordForm () {
    const tokenSegmentLength = (fileIdLength + passwordLength) / 4
    const [tokenSegments, setTokenSegments] = useState<string[] | null>(null)
    const [wrongToken, setWrongToken] = useState<true | null>(null)

    useEffect(() => {
        if (tokenSegments === null) return

        const compositeKey = verifyToken(tokenSegments)

        if (compositeKey) {
            updateUrl(compositeKey)
            setWrongToken(null)
        }
        else {
            setWrongToken(true)
        }

    }, [tokenSegments])

    return (
        <>
            <div class="hero min-h-screen bg-base-200 flex items-center justify-center">
                <div class="hero-content text-center">
                    <div class="max-w-md flex flex-col items-center">
                        <h1 class="text-5xl font-bold py-10">Welcome to Actionbooth!</h1>
                        <div class="card w-full max-w-sm shadow-2xl bg-base-100">
                            <div class="card-body">
                                <form class="form-control">
                                    <label class="label">
                                        Enter your Access Token:
                                    </label>
                                    <MultiInput wrongToken={wrongToken} n={4} d={tokenSegmentLength} onCompleted={setTokenSegments} />
                                    {wrongToken && <span class="text-warning">The Token is invalid</span>}
                                        
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

function verifyToken (tokenSegments: string[]) {
    const { fileId, password } = generateCompositeKey(tokenSegments, fileIdLength, passwordLength)
    return verifyStringWithChecksum(fileId, 3) ? { fileId, password } : false

}

function updateUrl ({ fileId, password }: { fileId: string, password: string }) {
    const newUrl = `${window.location.origin}/${fileId}#${password}`
    window.location.href = newUrl

}

function generateCompositeKey (strings: string[], fileIdLength: number, passwordLength: number) {
    // Concatenate all the input strings into one single string
    const concatenatedString = strings.join('')

    // Check if the total length of the concatenated string matches the sum of fileIdLength and passwordLength
    if (concatenatedString.length !== (fileIdLength + passwordLength)) {
        throw new Error('The resulting length does not match the input.')
    }

    // Extract the fileId and password substrings based on the input lengths
    const fileId = concatenatedString.substring(0, fileIdLength)
    const password = concatenatedString.substring(fileIdLength, fileIdLength + passwordLength)

    // Return the composite key in the format `${fileId}#${password}`
    return { fileId, password }
}