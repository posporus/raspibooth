import { KvList } from "./KvList.ts"

//TODO: Not tested
let kv: Deno.Kv | null = null

export class DenoKvList<K extends string, V> extends KvList<K, V>  {
    _listName: string
    constructor(listName: string) {
        super()
        this._listName = listName;

        (async () => {
            if (!kv)
                kv = await Deno.openKv()
        })()
    }
    has = async (key: K): Promise<boolean> => (await !!this.get(key))

    get = async (key: K): Promise<V | null> => {
        // if (!kv) kvNotOpenError('get')
        const value = await kv?.get<V>([this._listName, key])
        return value?.value || null
    }


    set = async (key: K, value: V): Promise<void> => {
        // if (kv === null) kvNotOpenError('set')
        await kv?.set([this._listName, key], value)
    }

    delete = async (key: K): Promise<void> => {
        // if(kv === null) kvNotOpenError('delete')
        await kv?.delete([this._listName,key])
    }
    init = async () => {
        await Deno.openKv()
    }
}

// const notNull = <T>(obj:T | null):obj is T => kv !== null

const kvNotOpenError = (place: string) => { throw Error(`Tried to reach Deno.Kv before finished opening the database. ${place}`) }



