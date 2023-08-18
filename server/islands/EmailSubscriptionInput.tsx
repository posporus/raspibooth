import { useEffect, useState, type StateUpdater } from 'preact/hooks'

type StatusType = 'ready' | 'idle' | 'error' | 'success'

interface EmailSubscriptionInputProps {
    fileId: string
}

export default function EmailSubscriptionInput (props: EmailSubscriptionInputProps) {
    const { fileId } = props
    //const [error, setError] = useState<Error | null>(null)
    const [submit, setSubmit] = useState<string | null>(null)
    //const [success, setSuccess] = useState<boolean>(false)
    const useStatus = useState<StatusType>('ready')
    const [status, setStatus] = useStatus


    // State variable to hold the saved email address
    //const [savedEmail, setSavedEmail] = useState<string | null>(null)

    // Handler for the email input field
    useEffect(() => {
        if (!submit) return

        // Prepare the data to be sent to the server
        const data = {
            email: submit,
            fileId: fileId
        }
        setStatus('idle')

            ; (async () => {
                // Send the data to the server via a POST request
                try {
                    const response = await fetch(`${window.location.origin}/api/subscribe`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })

                    if (response.ok) {
                        // Successfully sent the data to the server
                        setStatus('success')
                    } else {
                        setStatus('error')
                        console.error('Server responded with a status other than 200')
                    }
                } catch (error) {
                    // Network or other error occurred
                    setStatus('error')
                    console.error(error)
                }

            })()

    }, [submit])

    useEffect(() => {
        console.log(status)
    }, [status])

    return (
        <div class="relative">
            {status === 'idle' && <div class="w-full h-full absolute flex place-content-center"><span class="loading loading-spinner loading-sm"></span></div>}
            {(status === 'ready' || status === 'idle') && <EmailInput useStatus={useStatus} setSubmit={setSubmit} />}
            {status === 'success' && <SuccessComp />}
            {status === 'error' && <ErrorComp/>}
        </div>
    )
}
interface EmailInputProps {
    setSubmit: StateUpdater<string | null>
    useStatus: [StatusType, StateUpdater<StatusType>]

}
function EmailInput (props: EmailInputProps) {
    const { setSubmit, useStatus } = props
    const [status] = useStatus
    const [email, setEmail] = useState('')


    const handleEmailChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        setEmail(target.value)
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        setSubmit(email)
    }


    return (
        <div class="join">
            <form onSubmit={handleSubmit} class="flex">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    class="input input-bordered join-item"
                    required
                    disabled={status === 'idle'}
                />
                <button type="submit" disabled={status === 'idle'} class="btn btn-primary join-item">Submit</button>
            </form>
        </div>
    )
}

const SuccessComp = () => (
    <>
        <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>You will be informed via email as soon as your images are available!</span>
        </div>
    </>
)

const ErrorComp = () => (
    <>
        <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>There happened something weird. Please try again later or contact the support.</span>
        </div>
    </>
)