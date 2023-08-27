/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts"
import { file_store, subscription_store } from "../../../store.ts"
import { uploadNotificationMail } from "../../../modifiables/mail-templates.ts"
import { sendmailNoreply } from "../../../core/sendmailNoreply.ts"
import { _config } from "../../../core/config.ts"
import { logger } from "../../../core/logger.ts"
import { isValidFileId } from "../../../utils/isValidFileId.ts"
import { calculateChecksum } from "../../../utils/calculateChecksum.ts"

//console.log('loaded config',config)

export const handler: Handlers<File | null> = {
  GET (_req, _ctx) {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "Allow": "POST" }
    })
  },
  async POST (req, _ctx) {
    const config = _config()
    try {
      const apiKey = req.headers.get("X-API-Key")
      if (!config.authkey || config.authkey !== apiKey) {
        logger.warning(`Invalid API key received.`)
        return new Response("Invalid API key", { status: 403 })
      }

      // Retrieve and Validate File ID
      const fileId = req.headers.get("X-File-Id")
      if (!fileId) {
        logger.warning("No fileId provided in the request.")
        return new Response("No fileId provided", { status: 400 })
      }

      if (!isValidFileId(fileId, config.file_id_length,config.file_id_checksum_length)) {
        logger.warning("Invalid fileId format provided in the request.")
        return new Response("Invalid fileId format", { status: 400 })
      }


      // Check if request body is empty
      const data = new Uint8Array(await req.arrayBuffer())
      if (data.length === 0) {
        logger.warning("No data provided in the request body.")
        return new Response("No data provided", { status: 400 })
      }

      // Validate file size
      if (data.length > config.max_file_upload_size) {
        logger.warning("Uploaded file size exceeds the allowed limit.")
        return new Response("File size exceeds the allowed limit", { status: 413 })
      }

      const checksum = req.headers.get("X-Checksum")
      if (checksum !== await calculateChecksum(data)) {
        logger.warning("Not matching checksums.")
        return new Response("Not matching checksums.", { status: 422 })
      }
      // Store File Data
      await file_store.set(fileId, data)

      // Send Notification Email if there's a subscription for the file ID
      if (await subscription_store.has(fileId)) {
        logger.info(`Notification email subscription found for fileId: ${fileId}.`)
        const to = await subscription_store.get(fileId) || ''
        const url = config.url
        await sendmailNoreply(() => uploadNotificationMail({ to, fileId, url }))
      }

      // Return Response
      return new Response("OK", { status: 200 })

    } catch (error) {
      logger.error(`Error processing request: ${error.message}`)
      return new Response("Internal Server Error", { status: 500 })
    }
  },
}
