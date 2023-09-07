import { AppProps } from "$fresh/server.ts"
import { Head } from "$fresh/runtime.ts"
import AnimatedBackground from "../components/AnimatedBackground.tsx"


export default function App ({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link href="/daisyui.css" rel="stylesheet" type="text/css" />
      </Head>
        <AnimatedBackground/>
      <div class="w-screen h-screen">
        {/* <div class="navbar bg-base-100 fixed">
          <a class="btn btn-ghost normal-case text-xl">raspibooth</a>
        </div> */}
        <Component />
      </div>
    </>
  )
}
