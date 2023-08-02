export async function fetchFile(fileId:string) {
    try{

        const resp = await fetch(`${window.location.origin}/api/file/${fileId}`)
        if (!resp.ok) {
            console.error(`Error fetching file ${fileId}: ${resp.status} ${resp.statusText}`)
            return null
        }
        const data: Uint8Array | null = (await resp.body?.getReader().read())?.value || null
        //console.log('window.location.origin',window.location.origin)
        return data
    } catch(err) {
        console.error('was dat soll hab ich gefragt!', err)
        return null
    }
}