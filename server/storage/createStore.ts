import { KvMemoryList } from "./KvMemoryList.ts";
import { DenoKvList } from "./DenoKvList.ts";
import { FsKvList } from "./FsKvList.ts";
import { KvList } from "./KvList.ts";

export type StoreVariantTypes = 'filesystem' | 'memory' | 'denokv';

const storageClasses = {
    filesystem: FsKvList,
    memory: KvMemoryList,
    denokv: DenoKvList
};

export function createStore<K extends string, V>(
    config: StoreVariantTypes,
    storeName: string
): KvList<K, V> {
    if (!['filesystem', 'memory', 'denokv'].includes(config)) {
        throw new Error(`Invalid config value: ${config}`);
    }
    
    return new storageClasses[config](storeName);
}