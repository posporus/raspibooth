import json
import secrets
import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from typing import Tuple

def generate_random_data(size: int = 100) -> bytes:
    return secrets.token_bytes(size)

def generate_key_iv(size: int = 32, iv_length: int = 12) -> Tuple[bytes, bytes]:
    key = secrets.token_bytes(size)
    iv = secrets.token_bytes(iv_length)
    return key, iv

def encrypt_data(data: bytes, key: bytes, iv: bytes) -> Tuple[bytes, bytes]:
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(data) + encryptor.finalize()
    tag = encryptor.tag
    return ciphertext, tag

def decrypt_data(encrypted_data: bytes, key: bytes, iv: bytes, tag: bytes) -> bytes:
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv, tag), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(encrypted_data) + decryptor.finalize()
    return decrypted_data

def gen_encryption_datasets(file:str="../shared_test_files/encryption_datasets.json",number_of_datasets: int = 10) -> None:
    data_list = []
    for _ in range(number_of_datasets):
        data = generate_random_data()
        key, iv = generate_key_iv()
        encrypted_data, tag = encrypt_data(data, key, iv)
        decrypted_data = decrypt_data(encrypted_data, key, iv, tag)
        assert data == decrypted_data, "The original and decrypted data do not match."
        
        data_list.append({
            "original_data": base64.b64encode(data).decode(),
            "encrypted_data": base64.b64encode(encrypted_data).decode(),
            "key": base64.b64encode(key).decode(),
            "iv": base64.b64encode(iv).decode(),
            "tag": base64.b64encode(tag).decode(),
        })
    
    with open(file, "w") as f:
        json.dump(data_list, f)
