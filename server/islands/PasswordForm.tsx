import MultiInput from './MultiInput.tsx'

//TODO: this should be a config
const fileIdLength = 10, passwordLength = 10




export default function PasswordForm () {
    const tokenSegmentLength = (fileIdLength + passwordLength) / 4
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
                                    <MultiInput n={4} d={tokenSegmentLength} onCompleted={updateUrl} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

function updateUrl (v: string[]) {
    console.log('values:', v)
    const { fileId, password } = generateCompositeKey(v, fileIdLength, passwordLength)

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