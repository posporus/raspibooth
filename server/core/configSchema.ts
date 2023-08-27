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
    url: { defaultValue: "[no url provided]", type: "string" },
    max_file_upload_size: { defaultValue: 1000000, type: "number" },
    file_id_length: { defaultValue: 10, type: "number" },
    file_id_checksum_length: {defaultValue:3, type:"number"}
})
