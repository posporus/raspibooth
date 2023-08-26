export function isValidFileId(fileId: string, length: number): boolean {
    const validFormat = /^[a-zA-Z0-9]+$/;
    return validFormat.test(fileId) && fileId.length === length;
  }
  