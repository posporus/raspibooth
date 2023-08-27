export function isValidFileId(fileId: string, fileIdLength: number, checksumLength: number): boolean {
    // Validate the fileId format and length
    const isValidId = hasValidIdFormat(fileId, fileIdLength);
    if (!isValidId) return false;

    // Verify the fileId with the checksum
    return hasValidChecksum(fileId, checksumLength);
}

export function hasValidIdFormat(fileId: string, length: number): boolean {
    const validFormat = /^[a-zA-Z0-9]+$/;
    return validFormat.test(fileId) && fileId.length === length;
}

export function hasValidChecksum(inputString: string, checksumLength: number): boolean {
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
