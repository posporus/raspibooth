import { RouteContext } from "$fresh/server.ts"
import DataFetcher from "../islands/DataFetcher.tsx"
import { file_store } from "../store.ts"
import Loader from "../islands/Loader.tsx"

export default async function VideoPage (_req:Request,ctx:RouteContext) {
  const { fileId } = ctx.params
  const hasFile = await file_store.has(fileId)
  console.log('hasFile',hasFile)
  return (
    <>
      <main >
        <Loader></Loader>
        {hasFile ? <DataFetcher fileId={fileId}/> : <div>no file.</div>}
        
      </main>
    </>
  )
}

