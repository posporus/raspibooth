import unittest
from pathlib import Path
import tempfile
from src.camera.mock_camera import MockCamera

class TestMockCamera(unittest.TestCase):
    
    def setUp(self):
        """Set up testing environment before each test."""
        self.mock_camera = MockCamera()
        self.temp_dir = tempfile.TemporaryDirectory()
        
    def tearDown(self):
        """Clean up after each test."""
        self.temp_dir.cleanup()
    
    def test_properties(self):
        """Test the properties of MockCamera."""
        self.assertEqual(self.mock_camera.width, 640)
        self.assertEqual(self.mock_camera.height, 480)
        self.assertEqual(self.mock_camera.fps, 30)
    
    def test_record_video_default(self):
        """Test the record_video method with default settings."""
        temp_file_path = Path(self.temp_dir.name) / 'mock_video.mp4'
        self.mock_camera.record_video(temp_file_path, duration_ms=2000)
        # Check if the video is created
        self.assertTrue(temp_file_path.exists())
    
    def test_record_video_with_path(self):
        """Test the record_video method with a specified directory."""
        temp_subdir = Path(self.temp_dir.name) / 'test_videos'
        temp_subdir.mkdir(parents=True, exist_ok=True)
        temp_file_path = temp_subdir / 'test_output.mp4'
        self.mock_camera.record_video(temp_file_path, duration_ms=2000)
        # Check if the video is created in the specified directory
        self.assertTrue(temp_file_path.exists())
    
    # More tests can be added as needed

if __name__ == '__main__':
    unittest.main()
