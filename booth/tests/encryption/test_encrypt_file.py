import os
import unittest
import tempfile
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from pathlib import Path
from src.encryption.encrypt_file import encrypt_file

def decrypt(ciphertext:bytes, iv:bytes, key:bytes, tag:bytes):
    '''Decrypts data using AES-256. Returns the original data if successful.'''

    # Construct a Cipher object, with the key, iv, and additionally the
    # GCM tag used for authenticating the message.
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv, tag), backend=default_backend())

    # Create a decryptor object
    decryptor = cipher.decryptor()

    # Decrypt the data
    return decryptor.update(ciphertext) + decryptor.finalize()

class TestEncryption(unittest.TestCase):
    def test_encrypt_file(self):
        # Generate a random key
        key = os.urandom(32)

        # Create a temporary file and write some data to it
        with tempfile.NamedTemporaryFile(delete=False) as f:
            f.write(b'This is some test data')
            input_file_path = Path(f.name)

        # Create a temporary file for the encrypted data
        with tempfile.NamedTemporaryFile(delete=False) as f:
            output_file_path = Path(f.name)

        # Encrypt the file
        encrypt_file(input_file_path, output_file_path, key)

        # Read the encrypted file
        with open(output_file_path, 'rb') as f:
            iv = f.read(12)
            tag = f.read(16)
            ciphertext = f.read()

        # Decrypt the data
        decrypted_data = decrypt(ciphertext, iv, key, tag)

        # Verify that the decrypted data matches the original data
        with open(input_file_path, 'rb') as f:
            original_data = f.read()

        self.assertEqual(decrypted_data, original_data, "The original and decrypted data do not match.")

        # Clean up the temporary files
        os.remove(input_file_path)
        os.remove(output_file_path)

if __name__ == '__main__':
    unittest.main()
