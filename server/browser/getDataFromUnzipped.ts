export type FileObject = {
    [key: string]: Uint8Array
}

export type Metadata = {
    duration: number
    playSpeed: number
    timestamp: number
    fps:number
    location?: string
    eventName?: string
}

export interface UnpackedData {
    metadata: Metadata
    videos:Uint8Array[]
}

export function getDataFromUnzipped (unzipped_obj: FileObject): UnpackedData {
    // Extract and parse metadata.json
    const metadataString = new TextDecoder().decode(unzipped_obj["metadata.json"])
    const metadata: Metadata = JSON.parse(metadataString)

    // Extract videos
    const videos: Uint8Array[] = Object.entries(unzipped_obj)
        .filter(([key]) => key !== 'metadata.json')
        .map(([, value]) => value)

    // Combine everything into the final object
    const result = {
        metadata,
        videos: videos
    }

    return result
}