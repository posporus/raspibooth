from src.postprocessing.postprocess import postprocess
import os
import unittest

class TestRunProstprocess(unittest.TestCase):
    def test_run_postprocess(self):
        # Define the input video files
        input_files = [
            'tests/fixtures/recordings/test_video_1.h264',
            'tests/fixtures/recordings/test_video_2.h264',
            'tests/fixtures/recordings/test_video_3.h264',
            'tests/fixtures/recordings/test_video_4.h264'
        ]

        # Define the output folder
        output_folder = 'tests/fixtures/encrypted_videos'

        # Ensure the output folder exists
        os.makedirs(output_folder, exist_ok=True)

        # Run the postprocess function
        filename, password = postprocess(input_files, output_folder, cleanup=False)

        # Print the filename and password
        print('Output filename:', filename)
        print('Encryption password:', password)

if __name__ == '__main__':
    main()
