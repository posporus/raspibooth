import { loadConfig } from "./configUtils.ts";
import { configSchema } from "./configSchema.ts";

import { loadDotenv } from "./configUtils.ts"

await loadDotenv('./.env')


console.log(Deno.env.toObject())

export const _config = () => loadConfig(Deno.env,configSchema)