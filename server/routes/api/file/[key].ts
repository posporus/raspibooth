/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";
import { file_store } from "../../../store.ts";

const DEVMODE = Deno.env.get("DEVMODE") == "TRUE";

export const handler: Handlers<Uint8Array | null> = {
  async GET(_req, ctx) {
    const { key } = ctx.params;

    const data = await file_store.get(key) || DEVMODE
      ? await Deno.readFile("../shared_test_files/test_archives/" + key)
      : null;

    if (data === null) {
      return new Response("Not found", { status: 400 });
    }

    return new Response(data);
  },
};
