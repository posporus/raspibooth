import { useState } from 'preact/hooks'
import EmailSubscriptionInput from './EmailSubscriptionInput.tsx'

interface LeaveMailProps {
    fileId: string
}

export default function LeaveMail ({ fileId }: LeaveMailProps) {
    // State variable to hold the email address


    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Your photos not available yet.</h1>
                    <p class="py-6">
                        It appears that your photos haven't been uploaded yet. This could be due to a poor or absent internet connection at the photobooth's location.
                        Don't worry, though — you can leave your email address with us, and we'll notify you as soon as your photos are ready.
                        Rest assured, we will delete your email address immediately after sending the notification.
                    </p>

                    <EmailSubscriptionInput fileId={fileId} />
                </div>
            </div>
        </div>
    )
}
