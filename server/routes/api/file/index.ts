/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";
import { file_store, subscription_store } from "../../../store.ts";
import { uploadNotificationMail } from "../../../modifiables/mail-templates.ts";
import { sendmailNoreply } from "../../../core/sendmailNoreply.ts";
import { config } from "../../../core/config.ts";
import { logger } from "../../../core/logger.ts";

export const handler: Handlers<File | null> = {
  async POST(req, _ctx) {
    const apiKey = req.headers.get("X-API-Key");

    if (!config.authkey || config.authkey !== apiKey) {
      logger.warning("Invalid API key received.");
      return new Response("Invalid API key", { status: 403 });
    }

    const fileId = req.headers.get("X-File-Id");
    
    if (!fileId) {
      logger.warning("No fileId provided in the request.");
      return new Response("No fileId provided", { status: 400 });
    }

    const data = new Uint8Array(await req.arrayBuffer());

    await file_store.set(fileId, data);
    
    if(await subscription_store.has(fileId)) {
      logger.info(`Notification email subscription found for fileId: ${fileId}.`);
      const to = await subscription_store.get(fileId) || ''
      const url = config.url   
      sendmailNoreply(()=>uploadNotificationMail({to,fileId,url}))
    }

    const digest = await crypto.subtle.digest("SHA-256", data);
    const checksum = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
    logger.info(`File with fileId: ${fileId} processed with checksum: ${checksum}.`);
    return new Response(JSON.stringify({ fileId: fileId, checksum: checksum }), { status: 200 });
  },
};
