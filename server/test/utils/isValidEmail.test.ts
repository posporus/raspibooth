import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";
import { isValidEmail } from "../../utils/isValidEmail.ts";

Deno.test("Valid Email - Typical format", () => {
    assertEquals(isValidEmail("example@example.com"), true);
});

Deno.test("Valid Email - With subdomain", () => {
    assertEquals(isValidEmail("example@sub.example.com"), true);
});

Deno.test("Valid Email - With numbers", () => {
    assertEquals(isValidEmail("example123@example.com"), true);
});

Deno.test("Valid Email - With special characters", () => {
    assertEquals(isValidEmail("example.name@example.com"), true);
    assertEquals(isValidEmail("example+name@example.com"), true);
});

Deno.test("Invalid Email - Missing @ symbol", () => {
    assertEquals(isValidEmail("example.com"), false);
});

Deno.test("Invalid Email - Missing domain", () => {
    assertEquals(isValidEmail("example@.com"), false);
});

Deno.test("Invalid Email - Multiple @ symbols", () => {
    assertEquals(isValidEmail("exa@mple@example.com"), false);
});

Deno.test("Invalid Email - Invalid characters", () => {
    assertEquals(isValidEmail("exa*mple@example.com"), false);
    assertEquals(isValidEmail("example@exa!mple.com"), false);
});

Deno.test("Invalid Email - Missing top-level domain", () => {
    assertEquals(isValidEmail("example@example"), false);
});

Deno.test("Invalid Email - Domain with multiple periods", () => {
    assertEquals(isValidEmail("example@example..com"), false);
});

Deno.test("Invalid Email - Top-level domain longer than 63 characters", () => {
    const longTLD = "a".repeat(64); // creates a string of 64 'a' characters
    assertEquals(isValidEmail(`example@example.${longTLD}`), false);
});

Deno.test("Invalid Email - Top-level domain with exactly 63 characters", () => {
    const longTLD = "b".repeat(63); // creates a string of 63 'b' characters
    assertEquals(isValidEmail(`example@example.${longTLD}`), true);
});


Deno.test("Invalid Email - Top-level domain shorter than 2 characters", () => {
    assertEquals(isValidEmail("example@example.c"), false);
});

Deno.test("Edge Case - Empty string", () => {
    assertEquals(isValidEmail(""), false);
});

Deno.test("Edge Case - Only @ symbol", () => {
    assertEquals(isValidEmail("@"), false);
});

Deno.test("Edge Case - Only domain", () => {
    assertEquals(isValidEmail("@example.com"), false);
});

Deno.test("Edge Case - Only domain name", () => {
    assertEquals(isValidEmail("example@"), false);
});

Deno.test("Edge Case - White spaces", () => {
    assertEquals(isValidEmail(" example@example.com"), false);
    assertEquals(isValidEmail("example@example.com "), false);
    assertEquals(isValidEmail("exa mple@example.com"), false);
});
