// this are the key types accepted by Deno.KV string | number; | bigint | boolean | Uint8Array

export abstract class KvList<K extends string, V> {
  abstract get(key: K): Promise<V | null>;
  abstract set(key: K, value: V): Promise<void>;
  abstract delete(key: K): Promise<void>;
}
