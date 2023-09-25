import { Head } from "$fresh/runtime.ts"
import { Handlers } from "$fresh/server.ts"
import PasswordForm from "../islands/PasswordForm.tsx"


// export const handler: Handlers = {
//   async GET (_req, ctx) {
//     return await ctx.render()
//   },
//   async POST (req, _ctx) {
//     const form = await req.formData()
//     const fileId = form.get("fileId")?.toString()
//     const password = form.get("password")?.toString()


//     const headers = new Headers()
//     headers.set("location", `/${fileId}#${password}`)
//     return new Response(null, {
//       status: 303,
//       headers,
//     })
//   },
// }


export default function Home () {
  return (
    <>
      <PasswordForm/>


    </>
  )
}
