export function cacheUint8Array(key: string, value: Uint8Array): Uint8Array {
    const base64String = localStorage.getItem(key);
    
    // If the value exists in the cache, retrieve and return it.
    if (base64String) {
        const binaryString = atob(base64String);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    // If the value doesn't exist in the cache, set the provided value and return it.
    const newBase64String = btoa(String.fromCharCode(...value));
    localStorage.setItem(key, newBase64String);
    return value;
}
