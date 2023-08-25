import { SMTPClient } from "../deps.ts"
import { config } from "./config.ts"

const isMail = config.mail_hostname && config.mail_password && config.mail_username

export let client: SMTPClient | null = null

const createClient = () => {
    if (client !== null || !isMail) return
    client = new SMTPClient({
        connection: {
            hostname: config.mail_hostname,
            port: config.mail_port,
            tls: config.mail_tls,
            auth: {
                username: config.mail_username,
                password: config.mail_password,
            },
        },
    })
    return client
}

export async function sendmail (SendConfig:{to: string, subject:string, content?: string, html?:string}) {
    if(!isMail) return

    createClient()
    client && await client.send({
        from: "noreply@raboo.uber.space",
        ...SendConfig
    })
}