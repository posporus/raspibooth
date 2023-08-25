import { SMTPClient, type SendConfig, type ClientOptions } from "../deps.ts";
import { logger } from "./logger.ts";
//TODO: mask email address in logger.

export type SendmailFunction = (templateFn: () => Omit<SendConfig,'from'>) => Promise<void>;

export const sendmail = async (clientOptions: ClientOptions, sendConfig: SendConfig) => {
    const client = new SMTPClient(clientOptions);

    try {
        // Log the start of the email sending process
        logger.info(`Attempting to send email to ${sendConfig.to}.`);

        await client.send(sendConfig);

        // Log the success of the email sending process
        logger.info(`Email successfully sent to ${sendConfig.to}.`);
    } catch (error) {
        // Log the error
        logger.error(`Failed to send email to ${sendConfig.to}. Error: ${error.message}`);
        
        // Optionally, you can re-throw the error if you want the caller to handle it
        // throw error;
    } finally {
        // Ensure the client is closed even if an error occurs
        await client.close();
    }
};
