from src.encryption.encrypt_file import encrypt_file
import unittest
import os
import tempfile
import base64



# Define the test class
class TestEncryption(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.testfile_path = 'tests/fixtures/testfile.bin'
        cls.key = os.urandom(32)
        

    def test_encrypt_file(self):
        with tempfile.NamedTemporaryFile(suffix=".bin", delete=False) as tmp:
            # Call the encryption method
            result = encrypt_file(self.testfile_path, tmp.name, self.key)

            # Assert that the method returned True
            self.assertTrue(result)

            # Assert that the output file exists
            self.assertTrue(os.path.exists(tmp.name))

            # Clean up the output file after the test
            os.remove(tmp.name)
