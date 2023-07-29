from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


def decrypt_file(input_file_path, output_file_path, key: bytes):
    """
    Decrypts a file using AES-256-GCM.

    Args:
        input_file_path (str): Path to the encrypted input file.
        output_file_path (str): Path to write the decrypted output file.
        key (bytes): The 256-bit key used for decryption.
    """
    # Open the input and output files and decrypt the data.
    try:
        with open(input_file_path, 'rb') as infile, open(output_file_path, 'wb') as outfile:
            # The IV was written out before the ciphertext.
            iv = infile.read(12)

            # Construct a Cipher object, with the key, iv, and additionally the
            # GCM tag used for authenticating the message.
            cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())

            # Create a decryptor object.
            decryptor = cipher.decryptor()

            # Read the file in chunks of 64KB.
            for chunk in iter(lambda: infile.read(64 * 1024), b''):
                pt = decryptor.update(chunk)
                outfile.write(pt)

            # Finalize the decryption. If the message was tampered with, an exception will be raised here.
            decryptor.finalize()
    except Exception as e:
        print("An error occurred while decrypting the file:", str(e))
        return False

    return True
