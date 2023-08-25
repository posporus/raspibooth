// @deno-types="https://cdn.skypack.dev/fflate@0.8.0/lib/index.d.ts"
import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min'
import { useState, useEffect, useMemo, useCallback, type StateUpdater } from 'preact/hooks'
import { generateCryptoKeyFromPassword } from "../browser/generateCryptoKeyFromPassword.ts"
import { decrypt_buffer } from "../browser/decrypt_buffer.ts"
import { loadingState } from '../islands/Loader.tsx'
import { IS_BROWSER } from '$fresh/runtime.ts'

import Photopaper from './Photopaper.tsx'
import { type CanvasData, getDataFromUnzipped } from '../browser/getDataFromUnzipped.ts'
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

const getPasswordFromUrl = (): string => (IS_BROWSER ? decodeURIComponent(self.location.hash.substring(1)) : '')
