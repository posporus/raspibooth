import { useState, useEffect, StateUpdater } from 'preact/hooks'
import { isClient } from "../utils/isClient.ts"
import { generateCryptoKeyFromPassword } from "../utils/generateCryptoKeyFromPassword.ts"
import { decrypt_buffer } from "../utils/decrypt_buffer.ts"
import { fetchFile } from '../utils/fetchFile.ts'
import { useClient } from '../utils/client.ts'

interface DecryptorProps {
  fileId: string
}

export default function Decryptor (props: DecryptorProps) {

  const [decryptedData, setDecryptedData] = useState<Uint8Array | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null)
  const [client] = useClient()

  useEffect(() => {
    if (!client) return

    setPassword(getPasswordFromUrl())
    console.log(props.fileId);

    // self.addEventListener('hashchange', function (event) {
    //   console.log('hashchange detected. updating password.')
    //   setPassword(getPasswordFromUrl())
    // });

    (async () => {
      const data = await fetchFile(props.fileId)
      console.log(data)
      setEncryptedData(data)
    })()

  }, [client])

  useEffect(() => {
    if (!encryptedData || !password) return

    (async () => {

      try {

        await decryptProcedure(encryptedData, password, props.fileId, setDecryptedData)
      } catch (error) {
        console.error(error)
        setError(error.message)
      }
    })()

  }, [encryptedData])

    





  return (
    <div>
      Decryptor {props.fileId}
      <br />
      <br />
      decrypted: {decryptedData ? decryptedData.toString() : 'No data'}
      <br />
      {error && <p>Error: {error}</p>}
    </div>
  )
}


const getPasswordFromUrl = (): string => isClient() ? decodeURIComponent(self.location.hash.substring(1)) : ''

const decryptProcedure = async (encryptedData: Uint8Array, password: string, fileId: string, setDecryptedData: StateUpdater<Uint8Array | null>): Promise<void> => {

  try {

    const cryptoKey = await generateCryptoKeyFromPassword(password, fileId)
    console.log('key generated.', cryptoKey)

    const decrypted = await decrypt_buffer(encryptedData, cryptoKey)

    setDecryptedData(decrypted)
  }
  catch (error) {
    throw error
  }

}