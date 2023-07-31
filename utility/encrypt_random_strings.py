import os
import json
import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

# The string to encrypt
data = "Hello, world!"

# Generate a random 256-bit key
key = os.urandom(32)

# Generate a random 96-bit IV.
iv = os.urandom(12)

# Construct an AES-GCM Cipher object with the given key and a randomly generated IV.
cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())

# Create an encryptor object.
encryptor = cipher.encryptor()

# Encrypt the data
ciphertext = encryptor.update(data.encode()) + encryptor.finalize()

# Prepare the data for the JSON file
json_data = {
    "original": data,
    "encrypted": base64.b64encode(ciphertext).decode(),  # base64 encode the encrypted data
    "iv": base64.b64encode(iv).decode(),  # base64 encode the IV
    "key": base64.b64encode(key).decode(),  # base64 encode the key
}

# Write the JSON data to a file
with open("shared_test_files/simple_string_encryption.json", "w") as json_file:
    json.dump(json_data, json_file)
