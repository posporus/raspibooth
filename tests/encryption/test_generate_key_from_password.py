import unittest
import os
import base64
from src.encryption.generate_key_from_password import (
    generate_key_from_password,
)  # replace with your actual module


# Define the test class
class TestKeyFromPassword(unittest.TestCase):
    def test_generate_key_from_password(self):
        # Define a test password and salt
        password = "test_password"
        salt = os.urandom(16)

        # Call the function to generate a key
        key = generate_key_from_password(password, salt)

        # Assert that the key is the correct type
        self.assertIsInstance(key, bytes)

        # Assert that the key is the correct byte length (32 bytes)
        self.assertEqual(len(key), 32)
