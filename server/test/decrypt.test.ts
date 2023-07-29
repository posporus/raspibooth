//import { assertEquals } from "https://deno.land/std@0.196.0/testing/asserts.ts";
import { decrypt } from "./../utils/decrypt.ts";

Deno.test("decrypt files", async () => {
  const files = ["urEhmvJ3gl"];
  for (const file of files) {
    // if (file.endsWith(".key")) continue; // Skip key files

    const encryptedData = new Uint8Array(
      Deno.readFileSync(`./test/fixtures/encrypted_videos/${file}`),
    );
    const password = new TextDecoder().decode(
      Deno.readFileSync(`./test/fixtures/encrypted_videos/${file}.key`),
    );
    const encoder = new TextEncoder();
    const salt = encoder.encode(file)
    console.log('salt:',salt)
    const decryptedData = await decrypt(encryptedData, password,salt);
    console.log(decryptedData);
    // Check the result of the decryption function.
    // This depends on what you expect the decrypted data to be.
    // For example, if you expect the decrypted data to be the same as the original data, you can do:
    // assertEquals(decryptedData, originalData);
  }
});

// async function getTestfilesWithKeys(directoryPath: string) {
//   const files = [];
//   for await (const dirEntry of Deno.readDir(directoryPath)) {
//     if (!dirEntry.isFile) continue;
//     const filename = dirEntry.name;
//     if (!filename.endsWith(".key")) continue;
//     const filePath = join(directoryPath, dirEntry.name);
//     const key = (await Deno.readFile(filePath+'.key')) || null
//     files.push({
//         filePath,key
//     })
//   }
// }
