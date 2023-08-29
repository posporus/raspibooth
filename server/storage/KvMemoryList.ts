import { KvList } from "./KvList.ts"
import { logger } from "../core/logger.ts"

export class KvMemoryList<K extends string, V> extends KvList<K, V> {
  _list: Map<K, V>
  constructor() {
    super()
    this._list = new Map<K, V>()
    logger.info("KvMemoryList initialized.")
  }

  has = (key: K): Promise<boolean> =>
    new Promise((resolve) => {
      const hasKey = this._list.has(key);
      logger.info(`Checking if key "${key}" exists: ${hasKey}`);
      resolve(hasKey);
    });

  get = (key: K): Promise<V | null> =>
    new Promise((resolve) => {
      const value = this._list.get(key);
      if (value === undefined) {
        logger.info(`Key "${key}" not found.`);
        resolve(null);
      } else {
        logger.info(`Retrieved value for key "${key}": ${JSON.stringify(value)}`);
        resolve(value);
      }
    });

  set = (key: K, value: V): Promise<void> =>
    new Promise((resolve) => {
      this._list.set(key, value);
      logger.info(`Set value for key "${key}": ${JSON.stringify(value)}`);
      resolve();
    });

  delete = (key: K): Promise<void> =>
    new Promise((resolve) => {
      this._list.delete(key);
      logger.info(`Deleted key "${key}" from the list.`);
      resolve();
    });
}
