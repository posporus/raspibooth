import { useEffect, useState, useMemo } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'
import { signal } from "@preact/signals-core"


import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min'

import { loadingState } from '../Loader.tsx'
import { fetchFile } from "../../browser/fetchFile.ts"

import { generateCryptoKeyFromPassword } from "../../browser/generateCryptoKeyFromPassword.ts"
import { decrypt_buffer } from "../../browser/decrypt_buffer.ts"
import { type UnpackedData, getDataFromUnzipped } from '../../browser/getDataFromUnzipped.ts'
import PhotopaperCanvas from "./PhotopaperCanvas.tsx"

import { trigger } from "../../hooks/useTrigger.ts"
import { download } from '../../utils/download.ts'

import { uint8ArrayToBase64, base64ToUint8Array } from "../../browser/convertions.ts"


interface PhotopaperProps {
    fileId: string
}

export const [triggerDownloadArchive, callTriggerDownloadArchive] = trigger()

export const favSignal = signal<boolean | null>(null)

export default function Photopaper (props: PhotopaperProps) {

    const { fileId } = props

    const [error, setError] = useState<string | null>(null)
    const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null)
    const [decryptedData, setDecryptedData] = useState<Uint8Array | null>(null)
    const [unpackedData, setUnpackedData] = useState<UnpackedData & { fileId: typeof fileId } | null>(null)
    // Use useMemo for the password state
    const password = useMemo(() => getPasswordFromUrl(), [])

    //fetching encrypted, zipped videos from server
    useEffect(() => {
        if (!IS_BROWSER || !fileId) return

        console.log('fileId Effect')

        const cached = localStorage.getItem(fileId)

        favSignal.value = !!cached

        if (cached) {

            const cachedDecryptedData = base64ToUint8Array(cached)
            console.info(`Found cache for ${fileId}.`)
            setDecryptedData(cachedDecryptedData)
            setEncryptedData(null)

            return
        }

        loadingState.value = 'fetching'

            ; (async () => {
                try {
                    const data = await fetchFile(fileId)
                    setEncryptedData(data)
                } catch (error) {
                    console.error(error)
                    setError(`Error fetching file ${fileId}: ${error.message}`)
                }
            })()


    }, [fileId])

    //decrypting fetched data
    useEffect(() => {
        if (!encryptedData || !password) return
        console.log('encryptedData Effect')

        loadingState.value = 'decrypting'
            ; (async () => {
                try {
                    const cryptoKey = await generateCryptoKeyFromPassword(password, fileId)
                    const decrypted = await decrypt_buffer(encryptedData, cryptoKey)
                    setDecryptedData(decrypted)

                } catch (error) {
                    setError(`Error encrypting file ${fileId}: ${error.message}`)
                }
            })()


    }, [encryptedData])

    //unpacking decrypted, zipped data
    useEffect(() => {
        if (!decryptedData) return
        console.log('decryptedData Effect')

        favSignal.subscribe(v=>{

            if(favSignal.value) {
                try {
                    localStorage.setItem(fileId, uint8ArrayToBase64(decryptedData))
                }
                catch (err) {
                    console.warn(`Not able to cache. Reason: ${err}`)
                }
            }
            else {
                localStorage.removeItem(fileId)
            }
        })


        //TODO: maybe 'unzipping' state?
        loadingState.value = 'unpacking'

        try {
            const unzipped = fflate.unzipSync(decryptedData)
            const zipData = getDataFromUnzipped(unzipped)

            setUnpackedData({ fileId, ...zipData })
        }
        catch (error) {
            console.error(`Error unpacking file ${fileId}: ${error.message}`)
            setError(`Error unpacking file ${fileId}: ${error.message}`)
        }

        triggerDownloadArchive.subscribe((v) => {
            if (v <= 0) return
            const blobUrl = URL.createObjectURL(new Blob([decryptedData], { type: "application/zip" }))
            download(`${fileId}.zip`, blobUrl)
        })



    }, [decryptedData])

    //on error
    if (error !== null) {
        return (
            <>
                Something went wrong fetching the data.
                {error}
            </>
        )
    }

    return (
        <>
            {unpackedData && <PhotopaperCanvas data={unpackedData} />}
        </>
    )
}

const getPasswordFromUrl = (): string => (IS_BROWSER ? decodeURIComponent(self.location.hash.substring(1)) : '')


