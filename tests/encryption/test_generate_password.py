import unittest
from src.encryption.generate_password import generate_password, characters


# Define the test class
class TestPasswordGeneration(unittest.TestCase):
    def test_generate_password(self):
        # Test with various password lengths
        for password_length in [1, 2, 8, 9, 10, 11, 12, 14, 16, 24, 32]:
            # Call the function to generate a password
            password = generate_password(password_length)

            # Assert that the password is the correct type
            self.assertIsInstance(password, str)

            # Assert that the password is the correct length
            self.assertEqual(len(password), password_length)

            # Assert that the password consists of only the valid characters
            self.assertTrue(all(char in characters for char in password))
