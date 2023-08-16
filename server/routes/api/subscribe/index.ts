import { Handlers } from "$fresh/server.ts"
import { subscription_store } from "../../../store.ts" // Add this line

export const handler: Handlers<string | null> = {
    async POST (req, _ctx) {
        const { email, fileId } = await req.json()

        try {
            await subscription_store.set(fileId, email)
            return new Response(JSON.stringify({ email, fileId }))
        }
        catch (err) {
            console.error(err)
            return new Response('An error happend saving the subscription.', err)

        }
        finally {
            console.log(await subscription_store.get(fileId))
        }

    },
}
