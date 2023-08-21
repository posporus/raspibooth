import { KvMemoryList } from "./storage/KvMemoryList.ts";
import { DevKvStorageList } from "./storage/DevKvStorageList.ts";
import { KvList } from "./storage/KvList.ts";

const DEVMODE = Deno.env.get("DEVMODE") == "TRUE"

export let file_store:KvList<string,Uint8Array> = new KvMemoryList<string, Uint8Array>();
export const subscription_store:KvList<string,string> = new KvMemoryList<string, string>();

if(DEVMODE) {
    console.log('using DEVMODE store')
    file_store = new DevKvStorageList()
}
