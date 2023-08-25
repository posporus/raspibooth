import { sendmail, type SendmailFunction } from "./mailUtils.ts";
import { config } from "./config.ts";
import { SendConfig } from "../deps.ts";


const isMail = config.mail_hostname && config.mail_password && config.mail_username;


export const sendmailNoreply: SendmailFunction = async (templateFn) => {
    if (!isMail) return;

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
    };

    const sendConfig: SendConfig = {
        ...templateFn(),
        from: config.mail_from
    };

    await sendmail(clientOptions, sendConfig);
}

const exampleTemplate = (props: { name: string, to: string, subject: string }) => {
    return {
        to: props.to,
        subject: props.subject,
        html: `Hello ${props.name}, welcome to our platform!`
    };
}

// Using the sendmailNoreply function
sendmailNoreply(() => exampleTemplate({ name: 'Peter', to: 'peter@example.com', subject: 'Welcome!' }));
