export async function stringToCryptoKey(keyString: string): Promise<CryptoKey> {
    // Convert base64 string to ArrayBuffer
    const rawKey = Uint8Array.from(atob(keyString), c => c.charCodeAt(0));
  
    // Import key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      rawKey,
      {
        name: "AES-GCM",
      },
      false,
      ["decrypt"]
    );
  
    return cryptoKey;
  }
  