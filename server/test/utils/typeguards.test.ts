import { isDefined } from "../../utils/typeguards.ts";
import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";

//isDefined
Deno.test("isDefined: should return true for defined values", () => {
  const definedValue = "Hello, Deno!";
  const result = isDefined(definedValue);
  assertEquals(result, true);
});

Deno.test("isDefined: should return false for undefined", () => {
  const undefinedValue = undefined;
  const result = isDefined(undefinedValue);
  assertEquals(result, false);
});

Deno.test("isDefined: should return false for null", () => {
  const nullValue = null;
  const result = isDefined(nullValue);
  assertEquals(result, false);
});
