import { PhotopaperWrapper } from "../../components/PhotopaperWrapper.tsx";
import { Story } from "./_/Story.tsx";
import TestPhotopaperCanvas from "../../islands/test_helpers/TestPhotopaperCanvas.tsx";


export default function PhotoPaperWrapperStory () {
  return (
    <Story>
      <PhotopaperWrapper>
        <TestPhotopaperCanvas width={1080} height={1440} gap={30} count={4}/>
      </PhotopaperWrapper>
    </Story>
  );
}