# from pathlib import Path
# from src.encryption.encrypt_file import encrypt_file
# import os
# import tempfile
# import unittest
# from src.encryption.is_valid_aes256_key import is_valid_aes256_key

# from tests.encryption.decrypt_file import decrypt_file


# class TestDecryption(unittest.TestCase):
#     @classmethod
#     def setUpClass(cls):
#         cls.testfile_path = 'booth/tests/fixtures/test_output.mp4'
#         #cls.key = Fernet.generate_key()
#         cls.key  = os.urandom(32)
        
#         #print('KEY:',cls.key.decode())

#     def test_encrypt_file(self):
#         with tempfile.TemporaryDirectory() as tmp_dir:
#             tmp_file = Path(tmp_dir).joinpath('encrypted_file')
#             # Call the encryption method
#             print('tmp_file', tmp_file)
#             encrypt_file(self.testfile_path, tmp_file, self.key)

#             # Assert that the output file exists
#             self.assertTrue(os.path.exists(tmp_file))

#             # Call the decryption method
#             decrypted_file_path = tempfile.mktemp()
#             decrypt_file(tmp_file, decrypted_file_path,self.key)

#             # Assert that the decrypted file exists
#             self.assertTrue(os.path.exists(decrypted_file_path))

#             # Clean up the output file after the test
#             os.remove(tmp_file)
#             os.remove(decrypted_file_path)
