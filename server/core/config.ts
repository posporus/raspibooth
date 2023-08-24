import { loadConfig } from "./configUtils.ts";
import { configSchema } from "./configSchema.ts";

export const config = loadConfig(Deno.env,configSchema)