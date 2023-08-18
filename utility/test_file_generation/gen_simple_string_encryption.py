import os
import json
import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def gen_simple_string_encryption(file_path: str = "../shared_test_files/simple_string_encryption.json") -> None:
    """
    Encrypts a hardcoded string "Hello, world!", and saves the original string,
    the encrypted data, the IV, and the key to a JSON file.

    :param file_path: The path where the JSON file will be saved.
    """
    data = "Hello, world!"
    key = os.urandom(32)
    iv = os.urandom(12)

    cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(data.encode()) + encryptor.finalize()

    json_data = {
        "original": data,
        "encrypted": base64.b64encode(ciphertext).decode(),
        "iv": base64.b64encode(iv).decode(),
        "key": base64.b64encode(key).decode(),
    }
    
    with open(file_path, "w") as json_file:
        json.dump(json_data, json_file)