import unittest
from pathlib import Path
from unittest.mock import patch, Mock
from src.hardware.camera_picamera import CameraPiCamera, convert_file_to_mp4

class TestCameraPiCamera(unittest.TestCase):

    def setUp(self):
        self.width = 640
        self.height = 480
        self.fps = 25
        self.rotation = 0
        self.camera = CameraPiCamera(self.width, self.height, self.fps, self.rotation)

    def test_initialization(self):
        self.assertEqual(self.camera.width, self.width)
        self.assertEqual(self.camera.height, self.height)
        self.assertEqual(self.camera.fps, self.fps)

    def test_take_video(self):
        with patch('picamera.PiCamera.start_recording') as mock_start_recording, \
             patch('picamera.PiCamera.wait_recording') as mock_wait_recording, \
             patch('picamera.PiCamera.stop_recording') as mock_stop_recording:
            self.camera.take_video(Path('test_video.h264'), duration_ms=5000)
            mock_start_recording.assert_called_once()
            mock_wait_recording.assert_called_once()
            mock_stop_recording.assert_called_once()

    def test_convert_and_delete_original(self):
        with patch('your_module.convert_file_to_mp4', return_value='test_video.mp4') as mock_convert, \
             patch('os.remove') as mock_remove:
            self.camera.convert_and_delete_original(Path('test_video.h264'))
            mock_convert.assert_called_once_with('test_video.h264')
            mock_remove.assert_called_once_with('test_video.h264')

class TestConvertFileToMP4(unittest.TestCase):

    def test_conversion_success(self):
        with patch('ffmpeg.input'), \
             patch('ffmpeg.output'), \
             patch('ffmpeg.run'):
            result = convert_file_to_mp4('test_video.h264')
            self.assertEqual(result, 'test_video.mp4')

    def test_conversion_failure(self):
        with patch('ffmpeg.input'), \
             patch('ffmpeg.output'), \
             patch('ffmpeg.run', side_effect=Exception('Conversion Error')):
            result = convert_file_to_mp4('test_video.h264')
            self.assertIsNone(result)

if __name__ == '__main__':
    unittest.main()
