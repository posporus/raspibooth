import { SMTPClient, type SendConfig, type ClientOptions } from "../deps.ts"

export type SendmailFunction = (templateFn: () => Omit<SendConfig,'from'>) => Promise<void>;

export const sendmail = async (clientOptions:ClientOptions, sendConfig: SendConfig) => {
    const client = new SMTPClient(clientOptions)
    await client.send(sendConfig)
    await client.close()
} 