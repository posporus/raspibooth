import { loadConfig } from "./configUtils.ts";
import { configSchema } from "./configSchema.ts";

console.log(Deno.env.toObject())

export const _config = () => loadConfig(Deno.env,configSchema)