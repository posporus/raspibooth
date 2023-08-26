import { Handlers } from "$fresh/server.ts";
import { file_store } from "../../../store.ts";
import { logger } from "../../../core/logger.ts"; // Assuming you have a logger utility

export const handler: Handlers<Uint8Array | null | boolean> = {
  async GET(_req, ctx) {
    try {
      const { key } = ctx.params;

      const data = await file_store.get(key);

      if (data === null) {
        logger.warning(`File with key: ${key} not found.`);
        return new Response("Not found", { status: 404 });
      }

      logger.info(`File with key: ${key} retrieved successfully.`);

      const headers = new Headers({
        "Content-Type": "application/octet-stream",
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      });

      return new Response(data, { headers });

    } catch (error) {
      logger.error(`Error retrieving file: ${error.message}`);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
