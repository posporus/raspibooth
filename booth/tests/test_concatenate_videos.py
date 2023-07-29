import unittest
import os
import tempfile
from src.concatenate_videos import concatenate_videos


class TestConcatenateVideos(unittest.TestCase):
    def setUp(self):
        # Generate some small test videos
        self.test_videos = [
            'tests/fixtures/recordings/test_video_1.h264',
            'tests/fixtures/recordings/test_video_2.h264',
            'tests/fixtures/recordings/test_video_3.h264',
            'tests/fixtures/recordings/test_video_4.h264'
        ]

    def test_concatenate_videos(self):
        # Create a temporary directory to store the output video
        with tempfile.TemporaryDirectory() as tempdir:
            output_file = os.path.join(tempdir, 'output.mp4')

            # Call the function under test
            concatenate_videos(self.test_videos, output_file)

            # Check that the output file exists
            self.assertTrue(os.path.exists(output_file))

            # Check that the output file is a valid video file with the expected duration
            #video = VideoFileClip(output_file)
            # assuming each test video is 1 second long
            #self.assertEqual(video.duration, 4)


if __name__ == '__main__':
    unittest.main()
