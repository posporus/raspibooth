import { assertEquals, assertThrows } from "https://deno.land/std@0.114.0/testing/asserts.ts"
import { defineSchema, loadConfig } from "../../core/configUtils.ts";

// Mock schema for testing purposes
const testSchema = defineSchema({
    storage_mode: { defaultValue: "local", type: "string", options: ['local', 'cloud'] },
    max_users: { defaultValue: 100, type: "number" },
    enable_logging: { defaultValue: false, type: "boolean" },
    api_key: { defaultValue: undefined, type: "string" },
});

Deno.test("defineSchema should return the provided schema", () => {
    assertEquals(testSchema, {
        storage_mode: { defaultValue: "local", type: "string", options: ['local', 'cloud'] },
        max_users: { defaultValue: 100, type: "number" },
        enable_logging: { defaultValue: false, type: "boolean" },
        api_key: { defaultValue: undefined, type: "string" },
    });
});

Deno.test("loadConfig should load default values", () => {
    const mockEnv = {
        get: (_key: string) => undefined
    };

    const config = loadConfig(mockEnv, testSchema);
    assertEquals(config, {
        storage_mode: "local",
        max_users: 100,
        enable_logging: false,
        api_key: undefined,
    });
});

Deno.test("Environment variables should override default values", () => {
    const mockEnv = {
        get: (key: string) => {
            if (key === "STORAGE_MODE") return "cloud";
            if (key === "MAX_USERS") return "200";
            if (key === "ENABLE_LOGGING") return "true";
            if (key === "API_KEY") return "12345";
            return undefined;
        }
    };

    const config = loadConfig(mockEnv, testSchema);
    assertEquals(config, {
        storage_mode: "cloud",
        max_users: 200,
        enable_logging: true,
        api_key: "12345",
    });
});

Deno.test("Should throw error for invalid string options", () => {
    const mockEnv = {
        get: (key: string) => {
            if (key === "STORAGE_MODE") return "invalid_mode";
            return undefined;
        }
    };

    assertThrows(() => {
        loadConfig(mockEnv, testSchema);
    }, Error, "Invalid value for storage_mode. Allowed values are: local, cloud");
});

Deno.test("Should handle boolean and number casting", () => {
    const mockEnv = {
        get: (key: string) => {
            if (key === "MAX_USERS") return "300";
            if (key === "ENABLE_LOGGING") return "false";
            return undefined;
        }
    };

    const config = loadConfig(mockEnv, testSchema);
    assertEquals(config, {
        storage_mode: "local",
        max_users: 300,
        enable_logging: false,
        api_key: undefined,
    });
});
