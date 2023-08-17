import { RouteContext } from "$fresh/server.ts"
import DataFetcher from "../islands/DataFetcher.tsx"
import { file_store } from "../store.ts"
import Loader from "../islands/Loader.tsx"
import LeaveMail from "../islands/LeaveMail.tsx"

export default async function VideoPage (_req: Request, ctx: RouteContext) {
  const { fileId } = ctx.params
  const hasFile = await file_store.has(fileId)
  return (
    <>
      <main >

        {hasFile ?
          <>
            <Loader></Loader>
            <DataFetcher fileId={fileId} />
          </>
          : <LeaveMail fileId={fileId} />}

      </main>
    </>
  )
}

