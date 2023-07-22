import os

import unittest
from tests.mocks.create_image import createImage


class TestCreateImage(unittest.TestCase):
    def test_image_creation(self):
        # Create the file
        file_path = "./tmp/img.bmp"
        print("FilePath:", file_path)
        createImage(100, 100, file_path, "red")

        # Check if the file exists
        self.assertTrue(os.path.exists(file_path))
