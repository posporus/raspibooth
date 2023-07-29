import { KvMemoryList } from "./storage/KvMemoryList.ts";

export const file_store = new KvMemoryList<string, Uint8Array>();
