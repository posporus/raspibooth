import { PhotopaperWrapper } from "../../components/PhotopaperWrapper.tsx";
import PhotopaperWithMenu, { PhotopaperWithMenuProps } from "../../islands/PhotopaperWithMenu.tsx";
import { Story } from "./_/Story.tsx";
import { PhotopaperProps } from "../../islands/Photopaper.tsx";
import { useTrigger } from "../../hooks/useTrigger.ts";

let sample_video = new Uint8Array()
try {

  sample_video = await Deno.readFile("../shared_test_files/test_videos/1s_30fps_480x640_Blue.mp4")

} catch (err) {
  console.error(err)
}
const photopaperProps:PhotopaperWithMenuProps = {
  videos: [
    sample_video, sample_video, sample_video, sample_video
  ],
  fileId:'D048mdDfje',
  metadata: {
    duration:1,
    playSpeed:1,
    timestamp: 109345029
  }
  

}

export default function PhotoPaperWrapperStory () {



 
  return (
    <Story>
      <PhotopaperWrapper>
        <PhotopaperWithMenu {... photopaperProps}/>
      </PhotopaperWrapper>
    </Story>
  );
}