export async function fetchFile(fileId:string) {
    try{
        const resp = await fetch(`${window.location.origin}/api/file/${fileId}`)
        if (!resp.ok) {
            console.error(`Error fetching file ${fileId}: ${resp.status} ${resp.statusText}`)
            return null
        }
        const data = await resp.arrayBuffer()
        return new Uint8Array(data)
    } catch(err) {
        console.error('Error fetching file:', err)
        return null
    }
}





