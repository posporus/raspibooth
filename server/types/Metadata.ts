// To parse this data:
//
//   import { Convert, Metadata } from "./file";
//
//   const metadata = Convert.toMetadata(json);

export interface Metadata {
    duration:   number;
    eventName?: string;
    fps:        number;
    location?:  string;
    playSpeed?:  number;
    timestamp:  number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMetadata(json: string): Metadata {
        return JSON.parse(json);
    }

    public static metadataToJson(value: Metadata): string {
        return JSON.stringify(value);
    }
}
