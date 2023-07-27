from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import os

def encrypt_file(input_file_path, output_file_path, key):
    '''Encrypts a file usind AES-256. Returns true if succsessful.'''
    
    # Check key length
    if len(key) != 32:  # AES-256 needs a 256-bit key (32 bytes)
        print("Key must be 32 bytes (256 bits) long.")
        return False

    # Generate a random 96-bit IV.
    iv = os.urandom(12)

    # Construct an AES-GCM Cipher object with the given key and a randomly generated IV.
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())

    # Create an encryptor object.
    encryptor = cipher.encryptor()

    # Open the input and output files and encrypt the data.
    try:
        with open(input_file_path, 'rb') as infile, open(output_file_path, 'wb') as outfile:
            outfile.write(iv)  # Write out the IV to the output file.

            # Read the file in chunks of 64KB.
            for chunk in iter(lambda: infile.read(64 * 1024), b''):
                ct = encryptor.update(chunk)
                outfile.write(ct)

            outfile.write(encryptor.finalize())
        return True

    except Exception as e:
        print("An error occurred while encrypting the file:", str(e))
        return False