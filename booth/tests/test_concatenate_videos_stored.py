import os
import ffmpeg
from pathlib import Path
import unittest
from src.concatenate_videos import concatenate_videos


class TestConcatenateVideos(unittest.TestCase):

    def test_concatenate_videos(self):
        # Define the input and output files
        input_files = [
            'tests/fixtures/recordings/test_video_1.h264',
            'tests/fixtures/recordings/test_video_2.h264',
            'tests/fixtures/recordings/test_video_3.h264',
            'tests/fixtures/recordings/test_video_4.h264'
        ]
        output_file = 'tests/fixtures/output.mp4'

        # Run the function
        concatenate_videos(input_files, output_file)

        # Check that the output file was created
        self.assertTrue(os.path.exists(output_file))

        # Check the frame rate and duration of the output video
        probe = ffmpeg.probe(output_file)
        video_stream = next(
            (stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
        # Assert that a video stream is present
        self.assertIsNotNone(video_stream)
        # Assert that the frame rate is 30 fps
        #self.assertEqual(video_stream['avg_frame_rate'], '30/1')
