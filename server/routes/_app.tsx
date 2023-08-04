import { AppProps } from "$fresh/server.ts"
import { Head } from "$fresh/runtime.ts"


export default function App ({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@3.5.1/dist/full.css" rel="stylesheet" type="text/css" />
      </Head>
      <div class="">

        <Component />
      </div>
    </>
  )
}
