from tests.mocks.mock_camera import MockCamera

import os
import filetype
import unittest
import tempfile


image_filetypes = {
    ".bmp": "image/bmp",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
}

video_filetypes = {
    ".avi": "video/x-msvideo",
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".mkv": "video/x-matroska",
    ".flv": "video/x-flv",
    ".wmv": "video/x-ms-wmv",
    ".h264": "video/H264",
}


class TestMockCamera(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.camera = MockCamera(10, 10)

    def test_take_picture(self):
        for extension, mime in image_filetypes.items():
            with self.subTest(extension=extension):
                self.camera_action_test_helper('picture', extension, mime)

    def test_take_picture(self):
        '''TODO:this fails if a codec is not installed'''
        for extension, mime in video_filetypes.items():
            with self.subTest(extension=extension):
                self.camera_action_test_helper('video', extension, mime)

    def camera_action_test_helper(self, action: str, extension: str, mime: str):
        with tempfile.TemporaryDirectory() as tempdir:
            file_path = os.path.join(tempdir, f"test{action}{extension}")
            if action == 'picture':
                self.camera.take_picture(file_path)
            elif action == 'video':
                self.camera.take_video(file_path, 24, 100)
            else:
                raise ValueError(f"Invalid action: {action}")
            self.assertTrue(os.path.exists(file_path))
            self.assertEqual(filetype.guess(file_path).mime, mime)
            if os.path.exists(file_path):
                os.remove(file_path)
