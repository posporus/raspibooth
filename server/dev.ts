#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from './fresh.config.ts'

import { loadDotenv } from "./core/configUtils.ts"

await loadDotenv('./.env.development.local')

await dev(import.meta.url, "./main.ts",config);
