import { useState, useEffect } from 'preact/hooks'
import { isClient } from "../utils/isClient.ts"
import { generateCryptoKeyFromPassword } from "../utils/generateCryptoKeyFromPassword.ts"
import { decrypt_buffer } from "../utils/decrypt_buffer.ts"

interface DecryptorProps {
  fileId: string
  data: Uint8Array
}

export default function Decryptor (props: DecryptorProps) {

  const [decryptedData, setDecryptedData] = useState<Uint8Array | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const decryptData = async () => {
      if (isClient()) {
        console.log(props.data)
        const password = decodeURIComponent(window.location.hash.substring(1))
        if (password !== "") {
          try {
            const cryptoKey = await generateCryptoKeyFromPassword(password, props.fileId)
            console.log('key generated.', cryptoKey)
            setDecryptedData(await decrypt_buffer(props.data.buffer, cryptoKey))
            console.log('decrypted,', decryptedData)
          } catch (error) {
            console.error(error)
            setError(error.message)
          }
        } else {
          console.log('no key')
        }
      }
    }

    decryptData()
  }, [props.data, props.fileId])


  return (
    <div>
      Decryptor {props.fileId}
      <br />
      encrypted: {props.data.toString()}
      <br />
      decrypted: {decryptedData ? decryptedData.toString() : 'No data'}
      <br />
      {error && <p>Error: {error}</p>}
    </div>
  )
}
