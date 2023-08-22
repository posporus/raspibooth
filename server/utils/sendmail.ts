import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts"



const MAIL_HOSTNAME = Deno.env.get("MAIL_HOSTNAME")
const MAIL_USERNAME = Deno.env.get("MAIL_USERNAME")
const MAIL_PASSWORD = Deno.env.get("MAIL_PASSWORD")
const MAIL_PORT = + (Deno.env.get("MAIL_PORT") || 0)
const MAIL_TLS = Deno.env.get("MAIL_TLS") === "TRUE"

const MAIL = MAIL_HOSTNAME && MAIL_USERNAME && MAIL_PASSWORD

console.log(MAIL_HOSTNAME, MAIL_USERNAME, MAIL_PASSWORD, MAIL_PORT, MAIL_TLS)

export let client: SMTPClient | null = null

const createClient = () => {
    if (client !== null || !MAIL) return
    client = new SMTPClient({
        connection: {
            hostname: MAIL_HOSTNAME,
            port: MAIL_PORT,
            tls: MAIL_TLS,
            auth: {
                username: MAIL_USERNAME,
                password: MAIL_PASSWORD,
            },
        },
    })
    return client
}

export async function sendmail (to: string, subject:string, content: string, html:string) {
    if(!MAIL) return
    createClient()
    client && await client.send({
        from: "noreply@raboo.uber.space",
        to,
        subject,
        content,
        html,
    })
}

// await sendmail('test2@posporus.de','freshdigga','hello','<>')
