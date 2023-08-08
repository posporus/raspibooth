from src.postprocessing.postprocess import postprocess
from src.encryption.generate_key_from_password import generate_key_from_password
import os, tempfile, unittest
import shutil
from pathlib import Path


class TestPostprocess(unittest.TestCase):
    def setUp(self):
        # Create a temporary directory to store the test output
        self.test_dir = tempfile.TemporaryDirectory()

        # Input files
        self.input_files = [
            'tests/fixtures/recordings/test_video_1.h264',
            'tests/fixtures/recordings/test_video_2.h264',
            'tests/fixtures/recordings/test_video_3.h264',
            'tests/fixtures/recordings/test_video_4.h264'
        ]

        # Copy input files to the temporary directory
        self.input_files_temp = [os.path.join(self.test_dir.name, os.path.basename(f)) for f in self.input_files]
        for src, dest in zip(self.input_files, self.input_files_temp):
            shutil.copy(src, dest)

    def tearDown(self):
        # Clean up the temporary directory
        self.test_dir.cleanup()

    def test_postprocess_password_is_string(self):
        output_folder = self.test_dir.name

        # Run the postprocess function
        filename, password = postprocess(self.input_files_temp, output_folder)
        self.assertIsInstance(password,str)

    def test_postprocess(self):
        output_folder = self.test_dir.name

        # Run the postprocess function
        filename, password = postprocess(self.input_files_temp, output_folder)

        # Assert that the output file exists
        output_file = os.path.join(output_folder, filename)
        self.assertTrue(os.path.exists(output_file))

        # Assert that the input and temporary files have been deleted
        for file_path in self.input_files_temp:
            self.assertFalse(os.path.exists(file_path))

        # Decrypt the file to test if the encryption was successful
        # decrypted_output_file = os.path.join(self.test_dir.name, 'decrypted_output.mp4')
        # key = generate_key_from_password(password,filename)
        # decrypt_file(password, Path(output_file), Path(decrypted_output_file))

        # Assert that the decrypted file exists
        #self.assertTrue(os.path.exists(decrypted_output_file))
