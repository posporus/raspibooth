import { PhotopaperWrapper } from "../../components/PhotopaperWrapper.tsx";
import { Story } from "./_/Story.tsx";
import TestPhotopaper from "../../islands/test_helpers/TestPhotopaper.tsx";


export default function PhotoPaperWrapperStory () {
  return (
    <Story>
      <PhotopaperWrapper>
        <TestPhotopaper width={1080} height={1440} gap={30} count={4}/>
      </PhotopaperWrapper>
    </Story>
  );
}