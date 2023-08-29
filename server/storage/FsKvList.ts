import { exists, ensureDir } from "https://deno.land/std/fs/mod.ts"
import { KvList } from "./KvList.ts"
import { logger } from "../core/logger.ts"

const { readFile, writeFile, remove } = Deno

export class FsKvList<K extends string, V> extends KvList<K, V> {
    private basePath: string
    private listName: string

    constructor(listName: string, basePath?: string) {
        super()
        this.basePath = basePath || Deno.env.get('FILESYSTEM_STORAGE_PATH') || "./data"
        this.listName = listName
        logger.info(`FsKvList initialized with listName: ${listName} and basePath: ${this.basePath}.`)
    }

    private getFilePath(key: K): string {
        return `${this.basePath}/${this.listName}/${key}`
    }

    async has(key: K): Promise<boolean> {
        const existsKey = await exists(this.getFilePath(key));
        logger.info(`Checking if key "${key}" exists in FsKvList: ${existsKey}`);
        return existsKey;
    }

    async get(key: K): Promise<V | null> {
        const filePath = this.getFilePath(key)
        if (await exists(filePath)) {
            const data = await readFile(filePath)
            const header = new TextDecoder().decode(data.slice(0, 5))
            if (header.startsWith("BIN:")) {
                logger.info(`Retrieved binary data for key "${key}" from FsKvList.`);
                return data.slice(4) as unknown as V
            } else if (header.startsWith("JSON:")) {
                logger.info(`Retrieved JSON data for key "${key}" from FsKvList.`);
                return JSON.parse(new TextDecoder().decode(data.slice(5))) as V
            }
        }
        logger.warning(`Key "${key}" not found in FsKvList.`);
        return null;
    }

    async set(key: K, value: V): Promise<void> {
        const filePath = this.getFilePath(key)
        await ensureDir(`${this.basePath}/${this.listName}`);
        if (value instanceof Uint8Array) {
            const header = new TextEncoder().encode("BIN:")
            await writeFile(filePath, new Uint8Array([...header, ...value]))
            logger.info(`Set binary data for key "${key}" in FsKvList.`);
        } else {
            const header = new TextEncoder().encode("JSON:")
            const data = new TextEncoder().encode(JSON.stringify(value))
            await writeFile(filePath, new Uint8Array([...header, ...data]))
            logger.info(`Set JSON data for key "${key}" in FsKvList.`);
        }
    }

    async delete(key: K): Promise<void> {
        const filePath = this.getFilePath(key)
        if (await exists(filePath)) {
            await remove(filePath)
            logger.info(`Deleted key "${key}" from FsKvList.`);
        } else {
            logger.warning(`Attempted to delete non-existent key "${key}" from FsKvList.`);
        }
    }
}
