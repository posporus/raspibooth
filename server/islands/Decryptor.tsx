// @deno-types="https://cdn.skypack.dev/fflate@0.8.0/lib/index.d.ts"
import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min'
import { useState, useEffect, useMemo, useCallback, type StateUpdater } from 'preact/hooks'
import { isClient } from "../utils/isClient.ts"
import { generateCryptoKeyFromPassword } from "../utils/generateCryptoKeyFromPassword.ts"
import { decrypt_buffer } from "../utils/decrypt_buffer.ts"
import { fetchFile } from '../utils/fetchFile.ts'
import { useClient } from '../utils/client.ts'
import { type LoadingState, loadingState } from '../islands/Loader.tsx'


import Canvas from './Canvas.tsx'
import { type CanvasData, getDataFromUnzipped } from '../utils/getDataFromUnzipped.ts'
interface DecryptorProps {
  fileId: string
}

export default function Decryptor (props: DecryptorProps) {
  

  const [canvasData, setCanvasData] = useState<CanvasData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Use useMemo for the password state
  const password = useMemo(() => getPasswordFromUrl(), [])

  const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null)
  const [client] = useClient()

  // Additional States
  //const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  // Memoize the decryptProcedure function using useCallback
  const memoizedDecryptProcedure = useCallback(
    async (data: Uint8Array, password: string, fileId: string) => {
      try {
        const cryptoKey = await generateCryptoKeyFromPassword(password, fileId)
        const decrypted = await decrypt_buffer(data, cryptoKey)
        const unzipped = fflate.unzipSync(decrypted)

        setCanvasData(getDataFromUnzipped(unzipped))
      } catch (error) {
        throw error
      }
    },
    []
  )

  useEffect(() => {
    if (!client || !props.fileId) return

    loadingState.value = 'fetching';

    (async () => {
      try {
        const data = await fetchFile(props.fileId)
        setEncryptedData(data)
      } catch (error) {
        console.error(error)
        setIsError(true)
        setError(`Error fetching file ${props.fileId}: ${error.message}`)
      } finally {
        //setIsLoading(false)
      }
    })()
  }, [client, props.fileId])

  useEffect(() => {
    if (!encryptedData || !password) return

    loadingState.value = 'decrypting'
    //setIsLoading(true)
    setIsError(false)

    memoizedDecryptProcedure(encryptedData, password, props.fileId)
      .catch((error) => {
        console.error(error)
        setIsError(true)
        setError(error.message)
      })
      .finally(() => {
        loadingState.value = 'building'
      })
  }, [encryptedData, password, props.fileId, memoizedDecryptProcedure])

  return (
    <>


      {canvasData && <Canvas {...canvasData}></Canvas>}


    </>
  )
}

const getPasswordFromUrl = (): string => (isClient() ? decodeURIComponent(self.location.hash.substring(1)) : '')
