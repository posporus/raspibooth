from src.postprocess import postprocess
import os, tempfile, unittest

class TestPostprocess(unittest.TestCase):
    def setUp(self):
        # Create a temporary directory to store the test output
        self.test_dir = tempfile.TemporaryDirectory()

    def tearDown(self):
        # Clean up the temporary directory
        self.test_dir.cleanup()

    def test_postprocess(self):
        # Create some input videos
        input_videos = [
            "tests/fixtures/recordings/test_video_1.h264",
            "tests/fixtures/recordings/test_video_2.h264",
            "tests/fixtures/recordings/test_video_3.h264",
            "tests/fixtures/recordings/test_video_4.h264",
        ]
        output_folder = self.test_dir.name

        # Run the postprocess function
        filename, password = postprocess(input_videos, output_folder)

        # Assert that the output file exists
        output_file = os.path.join(output_folder, filename)
        self.assertTrue(os.path.exists(output_file))

        # Assert that the input and temporary files have been deleted
        for file_path in input_videos:
            self.assertFalse(os.path.exists(file_path))
