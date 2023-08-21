import { assertEquals, assert } from "https://deno.land/std@0.199.0/assert/mod.ts"
import { FsKvList } from "../../storage/FsKvList.ts"
import { ensureDir } from "https://deno.land/std/fs/mod.ts"

Deno.test("FsKvList", async (t) => {
  const testFolderPath = "./testFolder"
  const fsKvList = new FsKvList<string, any>(testFolderPath)

  //await ensureDir("./test_data")

  // Ensure the folder is writable before the tests
  await t.step("setup: ensure folder is writable", async () => {
    await Deno.mkdir(testFolderPath, { recursive: true })
    const testFile = `${testFolderPath}/testWritable.txt`
    await Deno.writeTextFile(testFile, "test")
    const content = await Deno.readTextFile(testFile)
    assertEquals(content, "test")
    await Deno.remove(testFile)
  })

  await t.step("set and get JSON data", async () => {
    const key = "testKey"
    const value = { test: "value" }
    await fsKvList.set(key, value)
    const retrievedValue = await fsKvList.get(key)
    assertEquals(retrievedValue, value)
  })

  await t.step("set and get binary data", async () => {
    const key = "testBinaryKey"
    const value = new Uint8Array([1, 2, 3, 4, 5])
    await fsKvList.set(key, value)
    const retrievedValue = await fsKvList.get(key)
    assertEquals(retrievedValue, value)
  })

  await t.step("check key existence", async () => {
    const key = "testExistKey"
    const value = "testValue"
    await fsKvList.set(key, value)
    const exists = await fsKvList.has(key)
    assert(exists)
  })

  await t.step("delete key", async () => {
    const key = "testDeleteKey"
    const value = "testValue"
    await fsKvList.set(key, value)
    await fsKvList.delete(key)
    const existsAfterDelete = await fsKvList.has(key)
    assert(!existsAfterDelete)
  })

  //Cleanup after the tests
  await t.step("cleanup: remove test folder", async () => {
    await Deno.remove(testFolderPath, { recursive: true })
  })
})
