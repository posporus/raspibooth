// Uint8Array to Base64
export function uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Base64 to Uint8Array
export function base64ToUint8Array(base64: string): Uint8Array {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

export function arrayBufferToString(buffer:ArrayBuffer) {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(buffer);
}

export const cryptoKeyToString = async (cryptoKey: CryptoKey): Promise<string> => {
    const exportedKey = await window.crypto.subtle.exportKey("raw", cryptoKey);
    const keyDataArray = new Uint8Array(exportedKey);
    const keyString = uint8ArrayToBase64(keyDataArray);
    return keyString;
  }
  