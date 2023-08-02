import { PageProps, Handlers } from "$fresh/server.ts"
import Decryptor from "../islands/Decryptor.tsx"
import { base64ToUint8Array } from "../utils/convertions.ts"

export const handler: Handlers<Uint8Array | null> = {
  async GET (_, ctx) {
    const { fileId } = ctx.params
    const resp = await fetch(`http://localhost:8000/api/file/${fileId}`)
    if (!resp.ok) {
      console.error(`Error fetching file ${fileId}: ${resp.status} ${resp.statusText}`)
      return ctx.render(null)
    }
    const data: Uint8Array | null = (await resp.body?.getReader().read())?.value || null
    console.log('datatype:', typeof (data), data)

    return ctx.render(data)
  },
}

export default function VideoPage (props: PageProps<Uint8Array | null>) {
  const { fileId } = props.params
  const data = props.data
  return (
    <main>
      <p>File ID: <b>{fileId}</b></p>
      <p>data: {data ? data.toString() : 'No data'}</p>
      {data && <Decryptor fileId={fileId} data={data}></Decryptor>}
    </main>
  )
}
