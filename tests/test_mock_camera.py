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
    ".avi": "video/x-msvideo",  # AVI format
    ".mp4": "video/mp4",  # MPEG-4 format
    ".mov": "video/quicktime",  # QuickTime format
    ".mkv": "video/x-matroska",  # Matroska format
    ".flv": "video/x-flv",  # Flash Video format
    ".wmv": "video/x-ms-wmv",  # Windows Media Video format
    ".h264": "video/H264",  # H264 Video format
}


class TestMockCamera(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.camera = MockCamera(10, 10)

    def test_take_picture(self):
        for extension, mime in image_filetypes.items():
            camera_picture_test_helper(self, extension, mime)

    def test_take_picture(self):
        '''TODO:This test fails if a format is not supported.'''
        for extension, mime in video_filetypes.items():
            camera_video_test_helper(self, extension, mime)


def camera_picture_test_helper(self: unittest.TestCase, extension: str, mime: str):
    with tempfile.TemporaryDirectory() as tempdir:
        try:
            file_path = os.path.join(tempdir, f"testvideo{extension}")

            self.camera.take_picture(file_path)

            self.assertTrue(os.path.exists(file_path))

            self.assertEqual(filetype.guess(file_path).mime, mime)

        finally:
            if os.path.exists(file_path):
                os.remove(file_path)


def camera_video_test_helper(self: unittest.TestCase, extension: str, mime: str):
    with tempfile.TemporaryDirectory() as tempdir:
        try:
            file_path = os.path.join(tempdir, f"testvideo{extension}")

            self.camera.take_video(file_path, 24, 100)

            self.assertTrue(os.path.exists(file_path))

            self.assertEqual(filetype.guess(file_path).mime, mime)

        finally:
            if os.path.exists(file_path):
                os.remove(file_path)
