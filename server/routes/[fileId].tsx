import { PageProps, Handlers } from "$fresh/server.ts"
import Decryptor from "../islands/Decryptor.tsx"
import { base64ToUint8Array } from "../utils/convertions.ts"
import { fetchFile } from "../utils/fetchFile.ts"

// export const handler: Handlers<Uint8Array | null> = {
//   async GET (_, ctx) {
//     const { fileId } = ctx.params
//     const data = await fetchFile(fileId)

//     return ctx.render(data)
//   },
// }

export default function VideoPage (props: PageProps<Uint8Array | null>) {
  const { fileId } = props.params
  const data = props.data
  return (
    <main>
      <p>File ID: <b>{fileId}</b></p>
      
      <Decryptor fileId={fileId}></Decryptor>
    </main>
  )
}
