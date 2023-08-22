import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts"
import { createStore } from "../storage/createStore.ts"
import { KvMemoryList } from "../storage/KvMemoryList.ts"
import { DenoKvList } from "../storage/DenoKvList.ts"
import { FsKvList } from "../storage/FsKvList.ts"

Deno.test("createStore function - memory", () => {
    const testStore = createStore<string, string>('memory', 'testmemory')
    assertEquals(testStore instanceof KvMemoryList, true)
})

Deno.test("createStore function - filesystem", () => {
    const testStore = createStore<string, string>('filesystem', 'testfilesystem')
    assertEquals(testStore instanceof FsKvList, true)
})

if (Object.hasOwn(Deno, "kv")) {
    Deno.test("createStore function - denokv", () => {
        const testStore = createStore<string, string>('denokv', 'testdenokv')
        assertEquals(testStore instanceof DenoKvList, true)
    })
}
