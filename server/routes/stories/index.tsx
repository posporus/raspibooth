import { walk } from "https://deno.land/std/fs/mod.ts"

async function getTsxFiles (path: string) {
    const tsxFiles: string[] = []
    for await (const entry of walk(path, {
        match: [/\.tsx$/],
        skip: [/index\.tsx$/, /^_.*$/, /_/],
    })) {
        if (entry.isFile) {
            const relativePath = entry.path.replace(path, "")
            tsxFiles.push(relativePath)
        }
    }
    return tsxFiles
}

const path = "routes/stories" // Replace with your folder path
const tsxFiles = await getTsxFiles(path)
console.log(tsxFiles)


export default function TestPage () {

    return (
        <>

            Stories:
            {tsxFiles.map((story) => <li><a href={story}>{story}</a></li>)}
            {window.location.href}

        </>
    )
}
