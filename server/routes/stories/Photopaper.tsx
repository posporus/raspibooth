import Photopaper from "../../islands/Photopaper.tsx"
import { Story } from "./_/Story.tsx"

let sample_video = new Uint8Array()
try {

  sample_video = await Deno.readFile("../shared_test_files/test_videos/1s_30fps_480x640_Blue.mp4")

} catch (err) {
  console.error(err)
}
const photopaperProps = {
  fps: 30,
  duration: 2,
  timestamp: 12345678,
  videos: [
    sample_video, sample_video, sample_video, sample_video
  ]
}

export default function PhotoPaperStory () {
  return (
    <Story>
      <Photopaper {...photopaperProps} />
    </Story>
  )
}