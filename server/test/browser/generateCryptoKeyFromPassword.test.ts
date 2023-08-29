import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts"
import { generateCryptoKeyFromPassword } from "../../browser/generateCryptoKeyFromPassword.ts"

const currentDir = new URL('../../../shared_test_files', import.meta.url).pathname;

// Read and parse the JSON file
const test_data = JSON.parse(await Deno.readTextFile(`${currentDir}/test_archives/test_data.json`))

for (const data of test_data) {
    Deno.test(`generateCryptoKeyFromPassword function. fileId: ${data.fileId}`, async () => {
        const password = data.password
        const salt = data.salt
        
        const keyData = await generateCryptoKeyFromPassword(password, salt)
        const exportedKey = await crypto.subtle.exportKey("raw", keyData);
        const keyDataArray = Array.from(new Uint8Array(exportedKey))
        const keyString = btoa(String.fromCharCode.apply(null, keyDataArray))
    
        // Compare the generated key with the key from the JSON file
        assertEquals(keyString, data.key)
      })
}