import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts"
import { decrypt } from "../../browser/decrypt.ts"

// Load the test data
const testFilesFolder = new URL('../../../shared_test_files', import.meta.url).pathname;

const testData = JSON.parse(await Deno.readTextFile(`${testFilesFolder}/encryption_datasets.json`))
let i = 0
for (const data of testData) {
  i++
  Deno.test(`Decrypt test data: ${i}`, async () => {
    // Decode the key, iv, and original data from Base64
    const keyData = base64ToUint8Array(data.key)
    const iv = base64ToUint8Array(data.iv)
    const originalData = base64ToUint8Array(data.original_data)
    const encryptedData = base64ToUint8Array(data.encrypted_data)
    const tag = base64ToUint8Array(data.tag)

    console.log(`${data}`)
    // Import the key data as a CryptoKey
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    )

    // Decrypt the data
    const decryptedData = await decrypt(encryptedData, key, iv, tag)

    // Compare the decrypted data to the original data
    assertEquals(decryptedData, originalData)
  })
}

function base64ToUint8Array (base64String: string) {
  if (!(/^[A-Za-z0-9\+\/\=]*$/.test(base64String))) {
    throw new Error("Invalid base64 string: " + base64String)
  }
  const binaryString = atob(base64String)
  const length = binaryString.length
  const bytes = new Uint8Array(length)
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}