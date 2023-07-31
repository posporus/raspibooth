export async function decrypt(encryptedData: ArrayBuffer, key: CryptoKey, iv: ArrayBuffer, tag: ArrayBuffer): Promise<Uint8Array> {
    // Combine the ciphertext and tag into one ArrayBuffer
    const ciphertextWithTag = new Uint8Array(encryptedData.byteLength + tag.byteLength);
    ciphertextWithTag.set(new Uint8Array(encryptedData), 0);
    ciphertextWithTag.set(new Uint8Array(tag), encryptedData.byteLength);

    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: new Uint8Array(iv),
            additionalData: undefined,
            tagLength: 128, // Length of authentication tag in bits
        },
        key,
        ciphertextWithTag
    );

    return new Uint8Array(decryptedData);
}
