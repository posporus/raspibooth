import json
import argparse
import secrets
import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from typing import Tuple

def generate_random_data(size: int = 100) -> bytes:
    # Generate random data
    return secrets.token_bytes(size)

def generate_key_iv(size: int = 32, iv_length: int = 12) -> Tuple[bytes, bytes]:
    # Generate random key and IV
    key = secrets.token_bytes(size)
    iv = secrets.token_bytes(iv_length)
    return key, iv

def encrypt_data(data: bytes, key: bytes, iv: bytes) -> Tuple[bytes, bytes]:
    # Construct an AES-GCM Cipher object with the given key and IV
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())
    # Create an encryptor object
    encryptor = cipher.encryptor()
    # Encrypt the data
    ciphertext = encryptor.update(data) + encryptor.finalize()
    
    tag = encryptor.tag
    return ciphertext, tag

def decrypt_data(encrypted_data: bytes, key: bytes, iv: bytes, tag: bytes) -> bytes:
    # Construct a Cipher object, with the key, iv, and additionally the
    # GCM tag used for authenticating the message.
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv, tag), backend=default_backend())
    # Create a decryptor object
    decryptor = cipher.decryptor()
    # Decrypt the data
    decrypted_data = decryptor.update(encrypted_data) + decryptor.finalize()
    return decrypted_data

def main(n: int) -> None:
    data_list = []
    for _ in range(n):
        # Generate data, key, and IV
        data = generate_random_data()
        key, iv = generate_key_iv()
        # Encrypt the data
        encrypted_data, tag = encrypt_data(data, key, iv)
        # Decrypt the data
        decrypted_data = decrypt_data(encrypted_data, key, iv, tag)
        # Verify the data
        assert data == decrypted_data, "The original and decrypted data do not match."
        # Append to list as dictionaries
        data_list.append({
            "original_data": base64.b64encode(data).decode(),
            "encrypted_data": base64.b64encode(encrypted_data).decode(),
            "key": base64.b64encode(key).decode(),
            "iv": base64.b64encode(iv).decode(),
            "tag":base64.b64encode(tag).decode(),
        })
    # Write data to JSON file
    with open("shared_test_files/encyption_datasets.json", "w") as f:
        json.dump(data_list, f)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate encrypted test data.")
    parser.add_argument("num_testfiles", type=int, help="Number of test files to generate.")
    args = parser.parse_args()
    main(args.num_testfiles)
