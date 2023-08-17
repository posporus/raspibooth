import { PageProps, Handlers } from "$fresh/server.ts";
import Decryptor from "../islands/Decryptor.tsx";

export const handler: Handlers<Uint8Array | null> = {
  async GET(_, ctx) {
    const { fileId } = ctx.params;
    const resp = await fetch(`http://localhost:8000/api/file/${fileId}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    // const bodeReader = await resp.body?.getReader().read()
    const data: Uint8Array | null = (await resp.body?.getReader().read())?.value || null
    return ctx.render(data);
  },
};



export default function GreetPage(props: PageProps<Uint8Array>) {
  const { fileId } = props.params;
  const data  = props.data
  return (
    <main>
      <p>File ID: <b>{fileId}</b></p>
      <p>data: {data.toString()}</p>
      <Decryptor fileId={fileId} data={data}></Decryptor>
    </main>
  );
}
