export async function decrypt(
  encryptedData: Uint8Array,
  password: string,
  salt: Uint8Array,
): Promise<Uint8Array> {
  try {
    console.log('--- decrypt ---')
    console.log('password:',password)
    const decoder = new TextDecoder()
    console.log('salt:', salt,decoder.decode(salt))
    // Derive a key from the password.
    const encoder = new TextEncoder();
    const passwordKey = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"],
    );
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    );

    // Separate the IV from the ciphertext.
    const iv = encryptedData.slice(0, 12);
    const ciphertext = encryptedData.slice(12);
    console.log('IV:', iv)

    // Decrypt the data.
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      ciphertext,
    );

    return new Uint8Array(decryptedData);
  } catch (error) {
    console.log('error:', error)
    throw Error("Failed to decrypt data:", error);
  }
}
