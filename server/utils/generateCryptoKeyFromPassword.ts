export async function generateCryptoKeyFromPassword (password: string, salt: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)
  const salt_encoded = new TextEncoder().encode(salt)

  const importedKey = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  )

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt_encoded,
      iterations: 100000,
      hash: "SHA-256",
    },
    importedKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  )
  const exportedKey = await crypto.subtle.exportKey("raw", derivedKey)
  const keyDataArray = Array.from(new Uint8Array(exportedKey))
  const keyString = btoa(String.fromCharCode.apply(null, keyDataArray))
  console.log('KEY:', keyString)

  return derivedKey
}
