import { assertEquals } from "https://deno.land/std@0.115.0/testing/asserts.ts";
import { verifyStringWithChecksum } from "../utils/verifyStringWithChecksum.ts";

// Read the JSON file and parse it to get the array of strings
async function readStringsFromJsonFile(path: string): Promise<{ string: string, checksum_length: number, string_length: number }[]> {
    const jsonContent = await Deno.readTextFile(path);
    return JSON.parse(jsonContent);
}

// Define the test using Deno's test runner
Deno.test("verifyStringWithChecksum should validate strings correctly", async () => {
    const path = 'shared_test_files/random_strings.json';
    const stringsData = await readStringsFromJsonFile(path);

    // Test each string in the array
    for (const data of stringsData) {
        const isValid = verifyStringWithChecksum(data.string, data.checksum_length);
        assertEquals(isValid, true, `String: ${data.string} is not valid`);
        assertEquals(data.string.length, data.string_length, `String length mismatch for ${data.string}`);
    }
});

// Define the test to make sure the verification is not always true
Deno.test("verifyStringWithChecksum should return false for invalid strings", async () => {
    const path = 'shared_test_files/random_strings.json';
    const stringsData = await readStringsFromJsonFile(path);

    // Test each string in the array after deliberately modifying it
    for (const data of stringsData) {
        // Change a character in the string to make it invalid
        const modifiedString = data.string.slice(0, -1) + 'X';
        const isValid = verifyStringWithChecksum(modifiedString, data.checksum_length);
        assertEquals(isValid, false, `Modified string: ${modifiedString} should be invalid`);
    }
});

// Run the tests with: deno test --allow-read <filename>
