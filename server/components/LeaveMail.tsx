import { useState } from 'preact/hooks';

export default function LeaveMail() {
    // State variable to hold the email address
    const [email, setEmail] = useState('');
    
    // State variable to hold the saved email address
    const [savedEmail, setSavedEmail] = useState<string | null>(null);
    
    // Handler for the email input field
    const handleEmailChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setEmail(target.value);
    };
    
    // Handler for the submit button
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        
        // Save the email address into the memory (state variable)
        setSavedEmail(email);
        
        // Clear the input field
        setEmail('');
        
        // Here, you can also send the email to a server or perform other actions
    };
    
    return (
        <>
            <div>
                <p>The file seems to be not uploaded yet. Leave your email to get informed as soon as the upload is finished.</p>
                
                <form onSubmit={handleSubmit}>
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                
                {savedEmail && <p>Email saved: {savedEmail}</p>}
            </div>
        </>
    );
}
