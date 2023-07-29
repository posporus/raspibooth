/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";
import { file_store } from "../../../store.ts"; // Add this line


const AUTHKEY = Deno.env.get('AUTHKEY')

export const handler: Handlers<File | null> = {
  async POST(req, _ctx) {
    const apiKey = req.headers.get("X-API-Key");

    if (apiKey !== AUTHKEY) {
      return new Response("Invalid API key", { status: 403 });
    }

    const key = req.headers.get("X-File-Key");
    
    if (!key) {
      return new Response("No key provided", { status: 400 });
    }

    // const data = await req.text();

    const data = new Uint8Array(await req.arrayBuffer());


    // const key = getRandomString(10);
    await file_store.set(key, data); // Replace kv with file_store

    // Calculate the SHA-256 hash of the file data
    const digest = await crypto.subtle.digest("SHA-256", data);
    const checksum = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");

    return new Response(JSON.stringify({ key: key, checksum: checksum }), { status: 200 });
  },
};
