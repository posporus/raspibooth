import MultiInput from './MultiInput.tsx'

//TODO: this should be a config
const fileIdLength = 8, passwordLength = 8




export default function PasswordForm () {
    const tokenSegmentLength = (fileIdLength + passwordLength) / 4
    return (
        <>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content text-center">
                    <div class="max-w-md grid place-content-center">
                        <h1 class="text-5xl font-bold py-10">Welcome to Actionbooth!</h1>
                        <div class="card max-w-sm shadow-2xl bg-base-100">
                            <div class="card-body">
                                <form class="form-control">
                                    <h4 class="py-6">
                                        Enter your Access Token:
                                    </h4>
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