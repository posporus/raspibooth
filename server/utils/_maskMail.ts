export function maskEmail(email: string): string {
    // Split the email into alias and domain parts
    const [alias, domain] = email.split('@');

    // Check if the alias has at least two characters
    if (alias.length < 2) {
        throw new Error("Email alias should have at least two characters.");
    }

    // Mask the alias except for the first two characters
    const maskedAlias = alias.slice(0, 2) + '*'.repeat(alias.length - 2);

    // Combine the masked alias with the domain
    return `${maskedAlias}@${domain}`;
}
