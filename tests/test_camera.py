import unittest
import os
import tempfile
from src.camera_picamera import CameraPiCamera
from pathlib import Path

class TestCameraPiCamera(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.camera = CameraPiCamera(640, 480)

    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()

    def tearDown(self):
        # Clean up the temporary directory
        self.temp_dir.cleanup()

    def test_take_video(self):
        # Use a temporary file for the video
        video_file = Path(self.temp_dir.name) / 'test_video.h264'

        # Record a short video
        self.camera.take_video(video_file, 500)

        # Check that the video file was created
        self.assertTrue(video_file.exists(), "Video file was not created")

        # Clean up the video file after the test
        os.remove(str(video_file))

    def test_resolution(self):
        self.assertEqual(self.camera.width, 640)
        self.assertEqual(self.camera.height, 480)

if __name__ == '__main__':
    unittest.main()
