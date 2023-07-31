import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts"
import { generateKeyFromPassword } from "../utils/generateKeyFromPassword.ts"
const encrypted_videos_dir = "./shared_test_files/encrypted_test_videos/"

// Read and parse the JSON file
const test_data = JSON.parse(await Deno.readTextFile(encrypted_videos_dir + "test_data.json"))

for (const data of test_data) {
    Deno.test(`generateKeyFromPassword function. fileId: ${data.fileId}`, async () => {
        const password = data.password
        const salt = new TextEncoder().encode(data.salt)
        
        const keyData = await generateKeyFromPassword(password, salt)
        const keyDataArray = Array.from(new Uint8Array(keyData))
        const keyString = btoa(String.fromCharCode.apply(null, keyDataArray))
    
        // Compare the generated key with the key from the JSON file
        assertEquals(keyString, data.key)
      })
}
