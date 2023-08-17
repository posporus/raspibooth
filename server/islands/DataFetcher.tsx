import { useEffect, useState } from 'preact/hooks'
import { loadingState } from '../islands/Loader.tsx'
import { useClient } from '../utils/client.ts'
import { fetchFile } from '../utils/fetchFile.ts'
import Decryptor from './Decryptor.tsx'

interface DataFetcherProps {
    fileId: string
}

export default function DataFetcher (props: DataFetcherProps) {
    const { fileId } = props

    const [error, setError] = useState<string | null>(null)
    const [client] = useClient()
    const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null)

    useEffect(() => {
        if (!client || !props.fileId) return

        loadingState.value = 'fetching';

        (async () => {
            try {
                const data = await fetchFile(fileId)
                setEncryptedData(data)
            } catch (error) {
                console.error(error)
                setError(`Error fetching file ${props.fileId}: ${error.message}`)
            }
        })()
    }, [client, props.fileId])

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
            <Decryptor fileId={fileId} data={encryptedData}></Decryptor>
        </>
    )
}
