import { KvList } from "./KvList.ts"

export class KvMemoryList<K extends string, V> extends KvList<K, V> {
  _list: Map<K, V>
  constructor() {
    super()
    this._list = new Map<K, V>()
  }
  has = (key: K): Promise<boolean> =>
    new Promise((resolve) => {
      resolve(this._list.has(key))
    });
  get = (key: K): Promise<V | null> =>
    new Promise((resolve) => {
      const value = this._list.get(key)
      if (value === undefined) resolve(null)
      else resolve(value)
    });

  set = (key: K, value: V): Promise<void> =>
    new Promise((resolve) => {
      this._list.set(key, value)
      resolve()
    });

  delete = (key: K): Promise<void> =>
    new Promise((resolve) => {
      this._list.delete(key)
      resolve()
    });
}
