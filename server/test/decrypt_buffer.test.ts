import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { decrypt_buffer } from "../utils/decrypt_buffer.ts";
import { generateCryptoKeyFromPassword } from "../utils/generateCryptoKeyFromPassword.ts";
// Specify the folder where the test files live
const testFilesFolder = "../shared_test_files/encrypted_test_videos"; // replace with your actual folder path

// Load the test data from the JSON file
const testData: Array<{fileId: string, key: string, original_test_data_file_path: string, password:string, salt:string}> = JSON.parse(Deno.readTextFileSync(`${testFilesFolder}/test_data.json`));

// Create a test for each dataset in the test data
for (const {fileId, key, original_test_data_file_path} of testData) {
  Deno.test(`decrypt_buffer should correctly decrypt file ${fileId}`, async () => {
    // Load the encrypted data
    const encryptedData = await Deno.readFile(`${testFilesFolder}/${fileId}`);

    // Convert the key from a base64 string to an ArrayBuffer
    const keyBuffer = new Uint8Array(Array.from(atob(key), c => c.charCodeAt(0))).buffer;

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      "AES-GCM",
      false,
      ["decrypt"]
    );

    // Decrypt the data
    const decryptedData = await decrypt_buffer(encryptedData, cryptoKey);

    // Load the original data
    const originalData = await Deno.readFile(`../${original_test_data_file_path}`);

    // Check that the decrypted data matches the original data
    assertEquals(decryptedData, originalData);
  });
}

for (const {fileId, password, salt, original_test_data_file_path} of testData) {
  Deno.test(`decrypt_buffer should correctly decrypt file ${fileId} using key derived from password`, async () => {
    // Load the encrypted data
    const encryptedData = await Deno.readFile(`${testFilesFolder}/${fileId}`);

    // Generate the key from the password and salt
    const cryptoKey = await generateCryptoKeyFromPassword(password, salt);

    // Decrypt the data
    const decryptedData = await decrypt_buffer(encryptedData, cryptoKey);

    // Load the original data
    const originalData = await Deno.readFile(`../${original_test_data_file_path}`);

    // Check that the decrypted data matches the original data
    assertEquals(decryptedData, originalData);
  });
}
