import { sendmail, type SendmailFunction } from "./mailUtils.ts"
import { config } from "./config.ts"
import { SendConfig } from "../deps.ts"
import { isDefined } from "../utils/typeguards.ts"


export const sendmailNoreply: SendmailFunction = async (templateFn) => {
    if (!isDefined(config.mail_hostname) || 
    !isDefined(config.mail_password) || 
    !isDefined(config.mail_username) || 
    !isDefined(config.mail_from)) {
    return;
}
    else {
        const clientOptions = {
            connection: {
                hostname: config.mail_hostname,
                port: config.mail_port,
                tls: config.mail_tls,
                auth: {
                    username: config.mail_username,
                    password: config.mail_password,
                },
            },
        }

        const sendConfig: SendConfig = {
            ...templateFn(),
            from: config.mail_from
        }

        await sendmail(clientOptions, sendConfig)
    }
}