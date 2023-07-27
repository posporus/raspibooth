from src.concatenate_videos import concatenate_videos
from src.utility.random_string import random_string
from src.encryption.generate_key_from_password import generate_key_from_password
from src.encryption.encrypt_file import encrypt_file
from pathlib import Path
import tempfile
import os


def postprocess(input_videos: list, output_folder,cleanup = True):
    """
    takes the input videos and adds them together. then it engrypts it with a generated password and
    saves the file into the upload folder. in the end it cleans up all files and returns
    the filename and password.
    """

    # add videos together
    with tempfile.TemporaryDirectory() as tmp_dir:
        # concatenated_file = Path(tmp).joinpath(random_filename)
        tmp_path = Path(tmp_dir).joinpath('output.mp4')

        try:
            concatenate_videos(input_videos, str(tmp_path))
        except:
            os.remove(tmp_path)
            raise Exception("Error concatenating videos.")

        random_filename = random_string(10)
        # salt is the utf-8 encoded random filename
        salt = bytes(random_filename, "utf-8")

        encryption_password = random_string(10)
        encryption_key = generate_key_from_password(encryption_password, salt)

        output_filepath = Path(output_folder).joinpath(random_filename)
        try:
            encrypt_file(tmp_path, output_filepath, encryption_key)
        except:
            raise Exception("Error encrypting file.")

        # cleaning
        if output_filepath.exists() and cleanup == True:
            os.remove(tmp_path)
            if os.path.exists(tmp_path):
                raise Exception(f"Unable to delete temporary file: {tmp_path}")

            for file_path in input_videos:
                os.remove(file_path)
                if os.path.exists(file_path):
                    raise Exception(f"Unable to delete input video: {file_path}")

        return (random_filename, encryption_password)
