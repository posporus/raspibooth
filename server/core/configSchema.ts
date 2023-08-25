import { defineSchema } from "./configUtils.ts"

export const configSchema = defineSchema({
    file_storage: { defaultValue: "memory", type: "string", options: ['memory', 'filesystem'] },
    subscription_storage: { defaultValue: "memory", type: "string", options: ['memory', 'filesystem', 'denokv'] },
    authkey: { defaultValue: undefined, type: "string" },
    mail_hostname: { defaultValue: undefined, type: "string" },
    mail_username: { defaultValue: undefined, type: "string" },
    mail_password: { defaultValue: undefined, type: "string" },
    mail_from: { defaultValue: undefined, type: "string" },
    mail_port: { defaultValue: undefined, type: "number" },
    mail_tls: { defaultValue: undefined, type: "boolean" },
    url: { defaultValue: "[no url provided]", type: "string" }
})
