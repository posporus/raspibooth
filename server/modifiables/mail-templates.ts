import { SendConfig } from "../deps.ts"

type MailTemplateFunction<P> = (props: P) => Omit<SendConfig, 'from'>

export const uploadNotificationMail: MailTemplateFunction<{ fileId: string, to: string, url: string }> = (props) => {
    return {
        to: props.to,
        subject: `Your Photobooth videos (${props.fileId}) have been uploaded!`,
        html: `Hello, <br/>
        your Photobooth videos (${props.fileId}) are ready.<br/>
        <br/>
        You will either need your encryption URL (qr-code) or your Access Token
        to access and decrypt the files at ${props.url}.<br/>
        <br/>
        Have a lot of fun an a great day!
        `
    }
}