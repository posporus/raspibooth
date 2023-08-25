import {  cryptoKeyToString, uint8ArrayToBase64 } from "./convertions.ts"

export async function decrypt (encryptedData: ArrayBuffer, key: CryptoKey, iv: ArrayBuffer, tag: ArrayBuffer): Promise<Uint8Array> {

    try {
        // Combine the ciphertext and tag into one ArrayBuffer
        const ciphertextWithTag = new Uint8Array(encryptedData.byteLength + tag.byteLength)
        ciphertextWithTag.set(new Uint8Array(encryptedData), 0)
        ciphertextWithTag.set(new Uint8Array(tag), encryptedData.byteLength)

        console.log('key:', await cryptoKeyToString(key))
        console.log('tag:', uint8ArrayToBase64(new Uint8Array(tag)))
        console.log('iv:', uint8ArrayToBase64(new Uint8Array(iv)))
        // Decrypt the data
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: new Uint8Array(iv),
                tagLength: tag.byteLength * 8, // Length of authentication tag in bits
            },
            key,
            ciphertextWithTag
        )

        return new Uint8Array(decryptedData)
    } catch (error) {
        console.error('Decryption failed:', error.message)
        console.error(error.stack)
        throw error // re-throw the error so it can be handled by the caller if needed
    }
}
