from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def encrypt(data:bytes,iv:bytes,key:bytes):
    '''Encrypts data using AES-256. Returns the IV if successful.'''

    # Construct an AES-GCM Cipher object with the given key and a randomly generated IV.
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())

    # Create an encryptor object.
    encryptor = cipher.encryptor()

    ciphertext = encryptor.update(data) + encryptor.finalize()
    tag = encryptor.tag

    # Open the input and output files and encrypt the data.
    try:
       
        return ciphertext, tag

    except Exception as e:
        print("An error occurred while encrypting the file:", str(e))
        return False
