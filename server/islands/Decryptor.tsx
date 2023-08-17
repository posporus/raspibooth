import { isClient } from "../utils/isClient.ts";
import { decrypt } from "../utils/decrypt.ts";

interface DecryptorProps {
  fileId: string;
  data: Uint8Array;
}

export default function Decryptor(props: DecryptorProps) {
  let decrypted_data: Uint8Array = new Uint8Array();

  if (isClient()) {
    const key = decodeURIComponent(window.location.hash.substring(1));
    if (key !== "") {
      const encoder = new TextEncoder();
    const salt = encoder.encode("your string here");

      decrypt(props.data, key,salt).then((value) => {
        console.log(value);
        decrypted_data = value;
      });
    }
    else console.log('no key')
  }

  return (
    <div>
      Decryptor {props.fileId}
      <br />
      encrypted: {props.data.toString()}
      <br />
      decrypted: {decrypted_data.toString()}
    </div>
  );
}