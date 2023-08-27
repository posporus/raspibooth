import { Handlers } from "$fresh/server.ts";
import { subscription_store } from "../../../store.ts";
import { isValidEmail } from "../../../utils/isValidEmail.ts";
import { isValidFileId } from "../../../utils/isValidFileId.ts";
import { _config } from "../../../core/config.ts";
import { logger } from "../../../core/logger.ts";

const config = _config();

export const handler: Handlers<string | null> = {
    async POST(req, _ctx) {
        let email, fileId;

        // Parse and validate JSON data
        try {
            const data = await req.json();
            email = data.email;
            fileId = data.fileId;

            if (!email || !fileId) {
                throw new Error("Missing required fields");
            }
        } catch (err) {
            logger.error(`Failed to parse request data: ${err.message}`);
            return new Response("Invalid request data", { status: 400 });
        }

        // Validate email
        if (!isValidEmail(email)) {
            logger.warning(`Invalid email format received: ${email}`);
            return new Response("Invalid email format", { status: 400 });
        }

        // Validate fileId
        if (!isValidFileId(fileId, config.file_id_length, config.file_id_checksum_length)) {
            logger.warning(`Invalid fileId format received: ${fileId}`);
            return new Response("Invalid fileId format", { status: 400 });
        }

        try {
            await subscription_store.set(fileId, email);
            logger.info(`Subscription saved successfully for email: ${email} with fileId: ${fileId}`);
            return new Response(JSON.stringify({ email, fileId }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } catch (err) {
            logger.error(`Error saving subscription for email: ${email} with fileId: ${fileId}. Error: ${err.message}`);
            return new Response('An error occurred while saving the subscription.', { status: 500 });
        }
    },
};

// TODO: Implement rate limiting middleware or use a third-party solution.
