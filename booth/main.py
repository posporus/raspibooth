from src.camera.main import camera
from src.button.main import start_button
from src.printer.main import printer
from src.statuslight.main import statuslight
import tempfile
from src.config import config
from pathlib import Path
from src.runner.timeline import Timeline
from src.runner.collect_action_runs import collect_action_runs
import random
import datetime
from src.postprocessing.write_metadata_json import write_metadata_json
from src.postprocessing.zip_files import zip_files
from src.utility.collect_files import collect_files
from src.utility.random_string_with_checksum import random_string_with_checksum
from src.utility.random_string import random_string
from src.encryption.generate_key_from_password import generate_key_from_password
from src.encryption.encrypt_file import encrypt_file
from src.utility.generate_access_token import generate_access_token
import os

duration = config["video"]["duration"]
fps = config["video"]["fps"]

action_run_files = collect_action_runs()

upload_dir = Path(config["UPLOAD_DIR"])

SERVER_URL = config["SERVER_URL"]


def session():
    with tempfile.TemporaryDirectory() as temp_dir:
        for i in range(4):
            # temporary video path
            filename = datetime.datetime.now().strftime(f"{i}-%Y%m%d_%H%M%S.mp4")
            video_path = Path(temp_dir).joinpath(filename)

            # map action functions
            def record():
                camera.record_video(video_path, duration)

            def set_state(state):
                statuslight.set_state(state)

            functions_map = {"record": record, "set_state": set_state}

            # randomly choose an action run file
            timeline_path = random.choice(action_run_files)

            timeline = Timeline()
            timeline.load_from_yaml(timeline_path, functions_map)

            timeline.run()

        file_id, password = postprocessing(temp_dir, upload_dir)
        postPrint(file_id, password)


def postPrint(fileId: str, password: str):
    url = f"{SERVER_URL}{fileId}#{password}"
    access_token = generate_access_token(fileId, password)
    printer.printQr(
        "Your way to your images",
        url,
        access_token,
        "If you have any questions, the answer is 42.",
    )


def postprocessing(input_dir: str, output_dir: str):
    metadata_filepath = os.path.join(input_dir, "metadata.json")
    write_metadata_json(duration, fps, str(metadata_filepath))

    # collect all files from temp folder and zip it.
    archive_files = collect_files(input_dir)
    archive_filepath = zip_files(archive_files, input_dir)

    # prepare for encryption
    fileId = random_string_with_checksum(10)
    password = random_string(10)
    salt = bytes(fileId, "utf-8")
    key = generate_key_from_password(password, salt)

    output_file_path = os.path.join(output_dir, fileId)
    encrypt_file(archive_filepath, Path(output_file_path), key)
    return fileId, password


def main():
    try:
        while True:
            start_button.when_pressed(session)
            start_button.wait()
    except KeyboardInterrupt:
        print("Program interrupted by user.")


if __name__ == "__main__":
    main()
