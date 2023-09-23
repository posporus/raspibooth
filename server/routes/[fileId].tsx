import { RouteContext } from "$fresh/server.ts"
import { file_store } from "../store.ts"
import Loader from "../islands/Loader.tsx"
import LeaveMail from "../islands/LeaveMail.tsx"
import { isValidFileId } from "../utils/isValidFileId.ts"
import { _config } from "../core/config.ts"
import Photopaper from '../islands/Photopaper/index.tsx'
import { PhotopaperWrapper } from "../components/PhotopaperWrapper.tsx"

const config = _config()


export default async function VideoPage (_req: Request, ctx: RouteContext) {
  const { fileId } = ctx.params
  const verified = isValidFileId(fileId, config.file_id_length, config.file_id_checksum_length)
  const hasFile = await file_store.has(fileId)
  return (
    <>
      <main >

        {
          !verified ? <>
            <WrongTokenHero />
          </> :

            hasFile ?
              <>
                <Loader></Loader>
                <PhotopaperWrapper>
                  <Photopaper fileId={fileId}/>
                </PhotopaperWrapper>
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
        <h1 class="text-5xl font-bold">Wrong Url</h1>
        <p class="py-6">There is probably a typo in your url.</p>

        <p></p>
      </div>
    </div>
  </div>
)