import { KvMemoryList } from "./storage/KvMemoryList.ts";
import { DevKvStorageList } from "./storage/DevKvStorageList.ts";
import { KvList } from "./storage/KvList.ts";

const DEVMODE = Deno.env.get("DEVMODE") == "TRUE"

export let file_store:KvList<string,Uint8Array> = new KvMemoryList<string, Uint8Array>();

if(DEVMODE) {
    file_store = new DevKvStorageList()
}
