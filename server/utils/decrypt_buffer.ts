import { decrypt } from "./decrypt.ts";

export async function decrypt_buffer(encryptedData: ArrayBuffer, key: CryptoKey): Promise<Uint8Array> {
    // Assume the IV is the first 12 bytes of the encrypted data
    const iv = encryptedData.slice(0, 12);

    // Assume the tag is the next 16 bytes
    const tag = encryptedData.slice(12, 28);

    // The remaining data is the actual encrypted data
    const actualEncryptedData = encryptedData.slice(28);

    // Decrypt the data
    const decryptedData = await decrypt(actualEncryptedData, key, iv, tag);

    return decryptedData;
}
