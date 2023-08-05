import unittest
import os
import shutil
import tempfile
import ffmpeg
from src.convert_files_to_mp4 import convert_files_to_mp4  # replace 'your_module' with the actual module name

class TestConvertFilesToMP4(unittest.TestCase):

    def setUp(self):
        # Create a temporary directory
        self.test_dir = tempfile.mkdtemp()

        # Directory containing the test videos
        self.test_videos_dir = 'shared_test_files/raw_test_videos/'

        # Copy all .h264 files in the directory to the temporary directory
        self.h264_files = [shutil.copy2(os.path.join(self.test_videos_dir, f), self.test_dir) for f in os.listdir(self.test_videos_dir) if f.endswith('.h264')]

    def test_convert_files_to_mp4(self):
        # Convert the files to mp4
        converted_files = convert_files_to_mp4(self.h264_files)
        
        # Check that the correct number of files have been converted
        self.assertEqual(len(converted_files), len(self.h264_files))

        # Check that all the converted files exist
        for file in converted_files:
            self.assertTrue(os.path.exists(file))

        # Check that all the converted files are in mp4 format
        for file in converted_files:
            self.assertTrue(file.endswith('.mp4'))

    def tearDown(self):
        # Remove temporary directory and all files in it
        shutil.rmtree(self.test_dir)

if __name__ == '__main__':
    unittest.main()
