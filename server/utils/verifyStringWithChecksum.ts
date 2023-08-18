export function verifyStringWithChecksum(inputString: string, checksumLength: number): boolean {
    if (inputString.length <= checksumLength) {
        return false;
    }

    // Extract the random part and the checksum part from the input string
    const randomPart = inputString.slice(0, -checksumLength);
    const checksum = inputString.slice(-checksumLength);

    // Calculate the expected checksum based on the random part
    const expectedChecksumValue = randomPart.split('')
        .map(char => char.charCodeAt(0))
        .reduce((acc, curr) => acc + curr, 0) % (10 ** checksumLength);
    
    const expectedChecksumStr = expectedChecksumValue.toString().padStart(checksumLength, '0');

    // Compare the expected checksum with the actual checksum in the input string
    return expectedChecksumStr === checksum;
}

// // Test the function
// const testString = 'ABWBQ5q531'; // Example string with a checksum
// const checksumLength = 5; // Example checksum length
// const isValid = verifyStringWithChecksum(testString, checksumLength);
// console.log(isValid); // Output: true or false
