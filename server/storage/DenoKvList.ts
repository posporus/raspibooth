import { KvList } from "./KvList.ts";
import { logger } from "../core/logger.ts";

let kv: Deno.Kv | null = null;
let kvRefCount = 0;


const kvFinalizer = new FinalizationRegistry((heldValue: Deno.Kv) => {
    heldValue.close();
});

export class DenoKvList<K extends string, V> extends KvList<K, V> {
    _listName!: string;

    constructor(listName: string) {
        super();
        this._listName = listName;
    }

    private async ensureInit(): Promise<void> {
        if (!kv) {
            try {
                kv = await Deno.openKv();
                kvFinalizer.register(this, kv);
                logger.info(`Initialized Deno.Kv for list: ${this._listName}`);
            } catch (error) {
                logger.warning(`Failed to initialize Deno.Kv for list: ${this._listName}. Error: ${error.message}`);
            }
        }
    }

    async has(key: K): Promise<boolean> {
        await this.ensureInit();
        if (!kv) return false;
        const exists = !!(await this.get(key));
        logger.info(`Key "${key}" exists in list "${this._listName}": ${exists}`);
        return exists;
    }

    async get(key: K): Promise<V | null> {
        await this.ensureInit();
        if (!kv) return null;
        const value = await kv.get<V>([this._listName, key]);
        if (value?.value) {
            logger.info(`Retrieved value for key "${key}" from list "${this._listName}"`);
        } else {
            logger.info(`Key "${key}" not found in list "${this._listName}"`);
        }
        return value?.value || null;
    }

    async set(key: K, value: V): Promise<void> {
        await this.ensureInit();
        if (!kv) return;
        await kv.set([this._listName, key], value);
        logger.info(`Set value for key "${key}" in list "${this._listName}"`);
    }

    async delete(key: K): Promise<void> {
        await this.ensureInit();
        if (!kv) return;
        await kv.delete([this._listName, key]);
        logger.info(`Deleted key "${key}" from list "${this._listName}"`);
    }

    close(): void {
        if (!kv) {
            throw new Error("kv is not initialized");
        }        
        kvRefCount--;
        if (kvRefCount <= 0 && kv) {
            kv.close();
            kvFinalizer.unregister(this);
            kv = null;
        }
    }
}
