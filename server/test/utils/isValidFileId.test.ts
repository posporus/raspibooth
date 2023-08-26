import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";
import { isValidFileId, hasValidIdFormat, hasValidChecksum } from "../../utils/isValidFileWithChecksum.ts";

// Import the JSON content
const currentDir = new URL('../../../shared_test_files', import.meta.url).pathname;
const validFileIds = JSON.parse(Deno.readTextFileSync(`${currentDir}/validFileIds.json`));


// Tests for hasValidIdFormat
Deno.test("Valid ID Format", () => {
    assertEquals(hasValidIdFormat("ABC123", 6), true);
});

Deno.test("Invalid ID Format - Special Characters", () => {
    assertEquals(hasValidIdFormat("ABC!23", 6), false);
});

Deno.test("Invalid ID Format - Incorrect Length", () => {
    assertEquals(hasValidIdFormat("ABC1234", 6), false);
});

// Tests for hasValidChecksum not possible for now because no test data :/


// Tests for isValidFileId


Deno.test("Invalid File ID with Checksum - Incorrect ID Length", () => {
    const input = "ABCDE" + "123"; // "ABCDE" generates a checksum of "123", but ID length is incorrect
    assertEquals(isValidFileId(input, 6, 3), false);
});

Deno.test("Invalid File ID with Checksum - Incorrect Checksum", () => {
    const input = "ABCDEF" + "124"; // "ABCDEF" should generate a checksum of "123"
    assertEquals(isValidFileId(input, 6, 3), false);
});

// Iterate over the JSON content to create tests
validFileIds.forEach((fileIdObj: { string: string, checksum_length: number, string_length: number }, index: number) => {
    Deno.test(`Valid File ID with Checksum from JSON - Test ${index + 1}`, () => {
        const { string, checksum_length, string_length } = fileIdObj;
        assertEquals(isValidFileId(string, string_length - checksum_length, checksum_length), true);
    });
});
