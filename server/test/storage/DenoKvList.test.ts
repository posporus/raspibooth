import { DenoKvList } from "../../storage/DenoKvList.ts";
import { assertEquals, assertThrows } from "$std/testing/asserts.ts"


Deno.test("Set and Get Test", async () => {
    const list = new DenoKvList<string, string>("testList");
    await list.set("key1", "value1");
    const value = await list.get("key1");
    list.close()
    assertEquals(value, "value1");
});

Deno.test("Has Test", async () => {
    const list = new DenoKvList<string, string>("testList");
    await list.set("key2", "value2");
    const hasKey = await list.has("key2");
    list.close()
    assertEquals(hasKey, true);
});

Deno.test("Delete Test", async () => {
    const list = new DenoKvList<string, string>("testList");
    await list.set("key3", "value3");
    await list.delete("key3");
    const hasKey = await list.has("key3");
    list.close()
    assertEquals(hasKey, false);
});

Deno.test("Error Handling Test", async () => {
    const list = new DenoKvList<string, string>("testList");
    const result = await list.get("key4");
    assertEquals(result, null);
    list.close();
});
