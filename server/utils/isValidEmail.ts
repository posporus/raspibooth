export function isValidEmail(email: string): boolean {
    // Updated regex for email validation
    const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
    if (email.includes("..")) return false; // Check for consecutive periods
    return regex.test(email);
}
