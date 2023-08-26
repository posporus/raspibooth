import { loadConfig } from "./configUtils.ts";
import { configSchema } from "./configSchema.ts";


export const _config = () => loadConfig(Deno.env,configSchema)