import cv2
import os
import unittest
from src.camera.mock_camera import MockCamera
import tempfile
from pathlib import Path

class TestMockCamera(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.camera = MockCamera(10, 10, 24)

    def test_take_video_file_writing(self):
        with tempfile.TemporaryDirectory() as tempdir:
            file_path = Path(tempdir) / "testvideo.h264"
            self.camera.take_video(file_path, 100)
            self.assertTrue(os.path.exists(file_path))
