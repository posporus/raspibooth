/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";
import { file_store, subscription_store } from "../../../store.ts"; // Add this line
import { sendmail } from "../../../utils/sendmail.ts";


const AUTHKEY = Deno.env.get('AUTHKEY')

export const handler: Handlers<File | null> = {
  async POST(req, _ctx) {
    const apiKey = req.headers.get("X-API-Key");

    if (apiKey !== AUTHKEY) {
      return new Response("Invalid API key", { status: 403 });
    }

    const fileId = req.headers.get("X-File-Id");
    
    if (!fileId) {
      return new Response("No fileId provided", { status: 400 });
    }

    // const data = await req.text();

    const data = new Uint8Array(await req.arrayBuffer());

    // const key = getRandomString(10);
    await file_store.set(fileId, data); // Replace kv with file_store
    
    if(await subscription_store.has(fileId)) {
      const to = await subscription_store.get(fileId) || ''
      const html = `hey, your images are ready!
      
      <a href="https://raboo.uber.space">click here!</a>`
      sendmail({to,subject:'Your PHOTOBOOTH Upload Is Ready',html})
    }

    // Calculate the SHA-256 hash of the file data
    const digest = await crypto.subtle.digest("SHA-256", data);
    const checksum = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
    console.log('upload baby!')
    return new Response(JSON.stringify({ fileId: fileId, checksum: checksum }), { status: 200 });
  },
};

