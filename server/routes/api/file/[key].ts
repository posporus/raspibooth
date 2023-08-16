/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts"
import { file_store } from "../../../store.ts"

export const handler: Handlers<Uint8Array | null | boolean> = {
  async GET (_req, ctx) {
    const { key } = ctx.params

    const data = await file_store.get(key)

    if (data === null) {
      return new Response("Not found", { status: 404 })
    }

    return new Response(data)
  },
}
