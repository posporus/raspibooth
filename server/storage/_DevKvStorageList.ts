import { KvList } from "./KvList.ts"

export class DevKvStorageList<K extends string> extends KvList<K, Uint8Array> {
  _path: string
  constructor() {
    super()
    this._path = "../shared_test_files/test_archives/"
    //this._list = new Map<K, V>()
  }
  has = (key: K): Promise<boolean> => fileExists(this._path + key)
  get = (key: K): Promise<Uint8Array | null> => readFile(this._path + key)


  set = (key: K, value: Uint8Array): Promise<void> =>
    new Promise((resolve) => {
      console.warn('DEVMODE - not set.', key, value)
      resolve()
    });

  delete = (key: K): Promise<void> =>
    new Promise((resolve) => {
      console.warn('DEVMODE - not deleted.', key)
      resolve()
    });
}


async function fileExists (filePath: string): Promise<boolean> {
  try {
    await Deno.stat(filePath)
    // The file or directory exists
    return true
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // The file or directory does not exist
      return false
    } else {
      // Some other error occurred
      throw error
    }
  }
}


async function readFile (filePath: string): Promise<Uint8Array | null> {
  try {
    const content = await Deno.readFile(filePath)
    return content
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // The file does not exist
      console.error('File not found')
    } else {
      // Some other error occurred
      console.error(error)
    }
    return null
  }
}