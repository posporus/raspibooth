import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>deno-e2e-encrypted-provider</title>
      </Head>
      enter file id.
          
     
    </>
  );
}
