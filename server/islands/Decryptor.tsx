// @deno-types="https://cdn.skypack.dev/fflate@0.8.0/lib/index.d.ts"
import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min'
import { useState, useEffect, useMemo, useCallback, type StateUpdater } from 'preact/hooks'
import { isClient } from "../utils/isClient.ts"
import { generateCryptoKeyFromPassword } from "../utils/generateCryptoKeyFromPassword.ts"
import { decrypt_buffer } from "../utils/decrypt_buffer.ts"
import { useClient } from '../utils/client.ts'
import { type LoadingState, loadingState } from '../islands/Loader.tsx'


import Photopaper from './Photopaper.tsx'
import { type CanvasData, getDataFromUnzipped } from '../utils/getDataFromUnzipped.ts'
import { PhotopaperWrapper } from '../components/PhotopaperWrapper.tsx'
interface DecryptorProps {
  data: Uint8Array
  fileId: string
}

export default function Decryptor (props: DecryptorProps) {
  const { data } = props

  const [canvasData, setCanvasData] = useState<CanvasData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Use useMemo for the password state
  const password = useMemo(() => getPasswordFromUrl(), [])

  const [client] = useClient()


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
    if (!data || !password) return

    loadingState.value = 'decrypting'

    memoizedDecryptProcedure(data, password, props.fileId)
      .catch((error) => {
        console.error(error)
        setError(error.message)
      })
      .finally(() => {
        loadingState.value = 'building'
      })
  }, [data, password, props.fileId, memoizedDecryptProcedure])

  return (
    <>
      <PhotopaperWrapper>
        {canvasData && <Photopaper {...canvasData}></Photopaper>}
      </PhotopaperWrapper>
    </>
  )
}

const getPasswordFromUrl = (): string => (isClient() ? decodeURIComponent(self.location.hash.substring(1)) : '')
