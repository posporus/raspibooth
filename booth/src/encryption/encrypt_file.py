# from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
# from cryptography.hazmat.backends import default_backend
# import os

# def encrypt_file(input_file_path, output_file_path, key:bytes):
#     '''Encrypts a file using AES-256. Returns the IV if successful.'''
    
#     # Generate a random 96-bit IV.
#     iv = os.urandom(12)

#     # Construct an AES-GCM Cipher object with the given key and a randomly generated IV.
#     cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())

#     # Create an encryptor object.
#     encryptor = cipher.encryptor()

#     # Open the input and output files and encrypt the data.
#     try:
#         with open(input_file_path, 'rb') as infile, open(output_file_path, 'wb') as outfile:
#             data = infile.read()  # Read the entire file into memory.
#             ct = encryptor.update(data) + encryptor.finalize()  # Encrypt the data.
#             outfile.write(iv + ct)  # Write out the IV and the encrypted data to the output file.
#         return iv

#     except Exception as e:
#         print("An error occurred while encrypting the file:", str(e))
#         return False
