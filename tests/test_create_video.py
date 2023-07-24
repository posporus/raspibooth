# Import the necessary modules
import os
import filetype
import unittest
import tempfile

# Import the function to be tested
from tests.mocks.create_video import createVideo

# Define a dictionary mapping file extensions to their MIME types
video_filetypes = {
    ".avi": "video/x-msvideo",  # AVI format
    ".mp4": "video/mp4",  # MPEG-4 format
    ".mov": "video/quicktime",  # QuickTime format
    ".mkv": "video/x-matroska",  # Matroska format
    ".flv": "video/x-flv",  # Flash Video format
    ".wmv": "video/x-ms-wmv",  # Windows Media Video format
    ".h264": "video/H264",  # H264 Video format
}


# Define the test class
class TestCreateVideo(unittest.TestCase):
    print("NOT SUPPORTED VIDEO FORMATS BY YOUR MACHINE WILL FAIL THE TEST!")
    # Define the test method
    def test_video_creation(self):
        # Loop through each file extension and MIME type in the dictionary
        for extension, mime in video_filetypes.items():
            # Call the helper function to perform the test for this extension and MIME type
            test_video_creation_with_filetype(self, extension, mime)


# Define a helper function to perform a test for a specific extension and MIME type
def test_video_creation_with_filetype(self: unittest.TestCase, extension, mime):
    # Create a temporary directory using the tempfile module
    with tempfile.TemporaryDirectory() as tempdir:
        try:
            # Create the file path for the video to be created
            file_path = os.path.join(tempdir, f"testvideo{extension}")
            #print("FilePath:", file_path)

            # Call the createVideo function to create the video
            createVideo(
                100, 100, file_path, 30, 5000
            )  # 100x100 resolution, 30 fps, 5000 ms duration

            # Check if the file exists
            self.assertTrue(os.path.exists(file_path))

            # Check if the MIME type of the created file matches the expected MIME type
            self.assertEqual(filetype.guess(file_path).mime, mime)

        finally:
            # Clean up the file after the test
            if os.path.exists(file_path):
                os.remove(file_path)
