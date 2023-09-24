import { useEffect, useState, useMemo } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'

import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min'

import { loadingState } from '../Loader.tsx'
import { fetchFile } from "../../browser/fetchFile.ts"

import { generateCryptoKeyFromPassword } from "../../browser/generateCryptoKeyFromPassword.ts"
import { decrypt_buffer } from "../../browser/decrypt_buffer.ts"
import { type UnpackedData, getDataFromUnzipped } from '../../browser/getDataFromUnzipped.ts'
import PhotopaperCanvas from "./PhotopaperCanvas.tsx"

import { trigger } from "../../hooks/useTrigger.ts"
import { download } from '../../utils/download.ts'
// import {uint8ArrayToBase64} from '../../browser/convertions.ts'



interface PhotopaperProps {
    fileId: string
}

export const [triggerDownloadArchive, callTriggerDownloadArchive] = trigger()

export default function Photopaper (props: PhotopaperProps) {

    const { fileId } = props

    const [error, setError] = useState<string | null>(null)
    const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null)
    const [decryptedData, setDecryptedData] = useState<Uint8Array | null>(null)
    const [unpackedData, setUnpackedData] = useState<UnpackedData | null>(null)
    // Use useMemo for the password state
    const password = useMemo(() => getPasswordFromUrl(), [])

    useEffect(() => {
        if (!encryptedData) return
        triggerDownloadArchive.subscribe((v) => {
            if (v <= 0) return
            const blobUrl = URL.createObjectURL(new Blob([encryptedData], {type: "application/zip"}));
            download(`${fileId}.zip`,blobUrl)
        })
    }, [])

    //fetching encrypted, zipped videos from server
    useEffect(() => {
        loadingState.value = 'fetching'
        if (!IS_BROWSER || !fileId) return

        (async () => {
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
        //TODO: maybe 'unzipping' state?
        loadingState.value = 'decrypting'

        try {
            const unzipped = fflate.unzipSync(decryptedData)
            const zipData = getDataFromUnzipped(unzipped)

            setUnpackedData(zipData)
        }
        catch (error) {
            setError(`Error unpacking file ${fileId}: ${error.message}`)
        }



    }, [decryptedData])

    //on error
    if (error || encryptedData === null) {
        return (
            <>
                Something went wrong fetching the data.
                {error}
            </>
        )
    }

    return (
        <>
            {unpackedData && <PhotopaperCanvas {...{ ...unpackedData, fileId }} />}
        </>
    )
}

const getPasswordFromUrl = (): string => (IS_BROWSER ? decodeURIComponent(self.location.hash.substring(1)) : '')


