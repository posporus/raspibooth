import argparse
import os
import shutil
from booth.src.encryption.encrypt_file import encrypt_file
from booth.src.utility.random_string import random_string
from booth.src.encryption.generate_key_from_password import generate_key_from_password
from pathlib import Path
import json, base64

"""
This uses the encryption module of the booth to generate test files for example
for testing client decryption.
"""

# define one test file, that will be encrypted with different keys.
input_file_path = Path("shared_test_files/test_videos/testvideo_480x640_4s.mp4")
output_file_dir = Path("shared_test_files/encrypted_test_videos/")


def generate_testfile():
    fileId = random_string(10)
    output_file_path = output_file_dir.joinpath(fileId)
    password = random_string(10)
    salt = bytes(fileId, "utf-8")
    key = generate_key_from_password(password, salt)

    iv = encrypt_file(input_file_path, output_file_path, key)
    test_data = {
        "fileId": fileId,
        "password": password,
        "salt": salt.decode("utf-8"),
        "key": base64.b64encode(key).decode(),
        "original_test_data_file_path": str(input_file_path),
        "iv": base64.b64encode(iv).decode(),
    }
    return test_data


def generate_encrypted_test_videos(num_testfiles: int, wipe: bool):
    if wipe:
        shutil.rmtree(
            output_file_dir
        )  # Be careful with this, it deletes everything in the directory!
        os.makedirs(output_file_dir)
        test_data_list = []
    else:
        # If not wiping, load the existing data
        with open(output_file_dir.joinpath("test_data.json"), "r") as json_file:
            test_data_list = json.load(json_file)

    for i in range(num_testfiles):
        test_data = generate_testfile()
        test_data_list.append(test_data)

    with open(output_file_dir.joinpath("test_data.json"), "w") as json_file:
        json.dump(test_data_list, json_file)


def main():
    parser = argparse.ArgumentParser(description="Generate encrypted test files.")
    parser.add_argument(
        "num_testfiles", type=int, help="Number of test files to generate."
    )
    parser.add_argument(
        "-w",
        "--no-wipe",
        dest="wipe",
        action="store_false",
        default=True,
        help="Do not wipe the output directory before generating new files.",
    )

    args = parser.parse_args()

    generate_encrypted_test_videos(args.num_testfiles, args.wipe)


if __name__ == "__main__":
    main()
