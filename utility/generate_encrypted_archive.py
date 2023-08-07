import tempfile, shutil, os, base64, json
from src.write_metadata_json import write_metadata_json
from src.postprocessing.convert_files_to_mp4 import convert_files_to_mp4
from src.zip_files import zip_files
from src.encryption.generate_key_from_password import generate_key_from_password
from src.encryption.encrypt_file import encrypt_file
from src.utility.random_string import random_string
from pathlib import Path

# helper function to copy first n files from a folder to another.
def copy_first_n_files(src_dir, dest_dir, n=4):
    files = os.listdir(src_dir)
    copied_files = []
    for file in files[:n]:
        full_file_path = os.path.join(src_dir, file)
        shutil.copy(full_file_path, dest_dir)
        copied_files.append(Path(dest_dir).joinpath(file))
        print(file)
    return copied_files

def generate_encrypted_archive():
    output_dir = Path("shared_test_files/test_archives")
    # temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        # run thru action loops
        # imitate action loops. copy raw files to this folder.
        raw_files = copy_first_n_files("shared_test_files/raw_test_videos/", temp_dir)

        # convert raws to mp4 and save
        converted_files = convert_files_to_mp4(raw_files)

        # save metadata into json
        metadata_file = write_metadata_json(
            3, 30, os.path.join(temp_dir, "metadata.json")
        )

        archive_files = converted_files + [metadata_file]
        # zip files
        archive_filepath = zip_files(archive_files, temp_dir)

        # generate needed data for encryption
        fileId = random_string(10)
        password = random_string(10)
        salt = bytes(fileId, "utf-8")
        key = generate_key_from_password(password, salt)
        output_file_path = output_dir.joinpath(fileId)

        # encrypt files and save to upload folder
        iv, tag = encrypt_file(archive_filepath, str(output_file_path), key)
        shutil.copy(archive_filepath, f"{str(output_file_path)}.zip")

        test_data = {
            "fileId": fileId,
            "password": password,
            "salt": salt.decode("utf-8"),
            "key": base64.b64encode(key).decode(),
            "iv": base64.b64encode(iv).decode(),
            "tag": base64.b64encode(tag).decode(),
        }

        # Append test_data to a JSON file in the output folder
        test_data_file = os.path.join(output_dir, 'test_data.json')
        if os.path.exists(test_data_file):
            with open(test_data_file, 'r') as f:
                data = json.load(f)
        else:
            data = []
        data.append(test_data)
        with open(test_data_file, 'w') as f:
            json.dump(data, f)

if __name__ == "__main__":
    generate_encrypted_archive()
