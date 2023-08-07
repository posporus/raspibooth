import { PageProps } from "$fresh/server.ts"
import Decryptor from "../islands/Decryptor.tsx"
import Loader from '../islands/Loader.tsx'


export default function VideoPage (props: PageProps<Uint8Array | null>) {

  const { fileId } = props.params
  const data = props.data
  return (
    <>
      <main >
        {/* <div class="navbar bg-base-100 fixed">
        <a class="btn btn-ghost normal-case text-xl">raspibooth</a>
      </div> */}
        <Loader></Loader>
        <div class="flex justify-center items-center w-screen h-screen bg-red-100" style="background: linear-gradient(360deg, rgba(51,47,125,1) 0%, rgba(147,36,86,1) 34%, rgba(0,212,255,1) 100%);">
          <div class="h-4/5 drop-shadow-xl">
            <Decryptor fileId={fileId}></Decryptor>

          </div>

        </div>
      </main>
    </>
  )
}
