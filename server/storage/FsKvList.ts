import { exists } from "https://deno.land/std@0.197.0/fs/mod.ts"
import { KvList } from "./KvList.ts"

const { readFile, writeFile, remove } = Deno

export class FsKvList<K extends string, V> extends KvList<K, V> {
    private basePath: string

    constructor(listName: string) {
        super()
        const fsStoragePath = Deno.env.get('FILESYSTEM_STORAGE_PATH') || "./data"
        this.basePath = `${fsStoragePath}/${listName}`
    }

    private getFilePath (key: K): string {
        return `${this.basePath}/${key}`
    }

    async has (key: K): Promise<boolean> {
        return await exists(this.getFilePath(key))
    }

    async get (key: K): Promise<V | null> {
        const filePath = this.getFilePath(key)
        if (await exists(filePath)) {
            const data = await readFile(filePath)
            const header = new TextDecoder().decode(data.slice(0, 5))

            if (header.startsWith("BIN:")) {
                return data.slice(4) as unknown as V
            } else if (header.startsWith("JSON:")) {
                return JSON.parse(new TextDecoder().decode(data.slice(5))) as V
            }

        }
        return null
    }

    async set (key: K, value: V): Promise<void> {
        const filePath = this.getFilePath(key)
        if (value instanceof Uint8Array) {
            const header = new TextEncoder().encode("BIN:")
            await writeFile(filePath, new Uint8Array([...header, ...value]))
        } else {
            const header = new TextEncoder().encode("JSON:")
            const data = new TextEncoder().encode(JSON.stringify(value))
            await writeFile(filePath, new Uint8Array([...header, ...data]))
        }
    }

    async delete (key: K): Promise<void> {
        const filePath = this.getFilePath(key)
        if (await exists(filePath)) {
            await remove(filePath)
        }
    }
}
