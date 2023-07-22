# Import the necessary modules
import os
import filetype
import unittest
import tempfile

# Import the function to be tested
from tests.mocks.create_image import createImage

# Define a dictionary mapping file extensions to their MIME types
image_filetypes = {
    ".bmp": "image/bmp",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
}

# Define the test class
class TestCreateImage(unittest.TestCase):
    # Define the test method
    def test_image_creation(self):
        # Loop through each file extension and MIME type in the dictionary
        for extension, mime in image_filetypes.items():
            # Call the helper function to perform the test for this extension and MIME type
            test_image_creation_with_filetype(self, extension, mime)

# Define a helper function to perform a test for a specific extension and MIME type
def test_image_creation_with_filetype(self: unittest.TestCase, extension, mime):
    # Create a temporary directory using the tempfile module
    with tempfile.TemporaryDirectory() as tempdir:
        try:
            # Create the file path for the image to be created
            file_path = os.path.join(tempdir, f"testimage{extension}")
            print("FilePath:", file_path)
            
            # Call the createImage function to create the image
            createImage(100, 100, file_path)

            # Check if the file exists
            self.assertTrue(os.path.exists(file_path))
            
            # Check if the MIME type of the created file matches the expected MIME type
            self.assertEqual(filetype.guess(file_path).mime, mime)

        finally:
            # Clean up the file after the test
            if os.path.exists(file_path):
                os.remove(file_path)
