import unittest
from src.camera.camera_picamera import CameraPiCamera
from pathlib import Path
import time

class TestCameraPiCamera(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.camera = CameraPiCamera(480, 640, rotation=90)

    def test_take_4_videos(self):
        for i in range(1, 5):
            # Specify the path where you want to save the video
            video_file = Path(f"tests/tmp/test_video_{i}.h264")

            # Record a short video
            self.camera.take_video(video_file, 1000)

            # Check that the video file was created
            self.assertTrue(video_file.exists(), f"Video file {i} was not created")

            # Wait for one second
            if i < 4:
                time.sleep(1)

if __name__ == '__main__':
    unittest.main()
