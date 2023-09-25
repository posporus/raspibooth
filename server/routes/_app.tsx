import { AppProps } from "$fresh/server.ts"
import { Head } from "$fresh/runtime.ts"
import AnimatedBackground from "../components/AnimatedBackground.tsx"


export default function App ({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Raspibooth DEMO</title>
        <link href="/daisyui.css" rel="stylesheet" type="text/css" />
      </Head>
      {/* <AnimatedBackground /> */}

      <div class="flex flex-col w-screen h-screen bg-gradient-to-b from-[#332F7D] via-[#93245E] to-[#00D4FF]">

        <div class="sticky top-0 bg-base-100 navbar z-50 h-[4rem]">
          <a class="btn btn-ghost normal-case text-xl">raspibooth v0.0.0</a>
        </div>
        <div class="flex-grow w-screen">
          <Component />
        </div>
      </div>
      <div class="footer">
        footer
      </div>
    </>
  )
}
