import { RouteContext } from "$fresh/server.ts"
import DataFetcher from "../islands/DataFetcher.tsx"
import { file_store } from "../store.ts"
import Loader from "../islands/Loader.tsx"
import LeaveMail from "../islands/LeaveMail.tsx"
import { verifyStringWithChecksum } from "../utils/verifyStringWithChecksum.ts"

export default async function VideoPage (_req: Request, ctx: RouteContext) {
  const { fileId } = ctx.params
  const verified = verifyStringWithChecksum(fileId, 3)
  const hasFile = await file_store.has(fileId)
  return (
    <>
      <main >

        {
          !verified ? <>
            <WrongTokenHero/>
          </> :

            hasFile ?
              <>
                <Loader></Loader>
                <DataFetcher fileId={fileId} />
              </>
              : <LeaveMail fileId={fileId} />}

      </main>
    </>
  )
}


const WrongTokenHero = () => (
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Wrong Url.</h1>
        <p class="py-6">There is probably a typo in your Url</p>
        <p></p>
      </div>
    </div>
  </div>
)