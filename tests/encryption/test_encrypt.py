import unittest
import os
import tempfile
from src.encryption.generate_key_from_password import generate_key_from_password
from src.encryption.generate_password import generate_password
from src.encryption.encrypt_file import encrypt_file


class TestEncryptionProcess(unittest.TestCase):
    def test_encryption_process(self):
        # Define the input file path
        input_file_path = 'tests/fixtures/testfile.bin'

        # Define a test password length
        password_length = 16

        # Generate a random password
        password = generate_password(password_length)

        # Generate a random salt
        salt = os.urandom(16)

        # Generate a key from the password
        key = generate_key_from_password(password, salt)

        # Create a temporary directory to store the output file
        with tempfile.TemporaryDirectory() as tempdir:
            # Define the output file path within the temporary directory
            output_file_path = os.path.join(tempdir, 'encrypted_testfile.bin')

            # Call the function to encrypt the file
            success = encrypt_file(input_file_path, output_file_path, key)

            # Assert that the function returned True
            self.assertTrue(success)

            # Assert that the output file exists
            self.assertTrue(os.path.exists(output_file_path))