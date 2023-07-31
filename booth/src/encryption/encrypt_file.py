from pathlib import Path
from src.encryption.encrypt import encrypt
import os

def encrypt_file(input_file_path:Path, output_file_path:Path, key:bytes):
    # Generate a random IV
    iv = os.urandom(12)

    # Read the input file
    with open(input_file_path, 'rb') as f:
        data = f.read()

    # Encrypt the data
    ciphertext, tag = encrypt(data, iv, key)

    # Write the encrypted data to the output file
    with open(output_file_path, 'wb') as f:
        f.write(iv)
        f.write(tag)
        f.write(ciphertext)
