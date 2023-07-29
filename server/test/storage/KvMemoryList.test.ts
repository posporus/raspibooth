import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { KvMemoryList } from "./../../storage/KvMemoryList.ts";

Deno.test("KvMemoryList - set and get string", async () => {
  const list = new KvMemoryList<string, string>();

  // Test the set method
  await list.set("key1", "value1");

  // Test the get method
  assertEquals(await list.get("key1"), "value1");
});

Deno.test("KvMemoryList - set and get number", async () => {
  const list = new KvMemoryList<string, number>();

  // Test the set method
  await list.set("key1", 1);

  // Test the get method
  assertEquals(await list.get("key1"), 1);
});

Deno.test("KvMemoryList - set and get object", async () => {
  const list = new KvMemoryList<string, { a: number }>();

  // Test the set method
  await list.set("key1", { a: 1 });

  // Test the get method
  assertEquals(await list.get("key1"), { a: 1 });
});

Deno.test("KvMemoryList - delete", async () => {
  const list = new KvMemoryList<string, number>();

  // Test the set method
  await list.set("key1", 1);

  // Test the delete method
  await list.delete("key1");
  assertEquals(await list.get("key1"), null);
});
