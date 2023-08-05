import json
import time


def write_metadata_json(duration, fps, file_path="metadata.json"):
    metadata = {"timestamp": time.time(), "duration": duration, "fps": fps}

    with open(file_path, "w") as json_file:
        json.dump(metadata, json_file)

    return file_path


# Usage:
# write_metadata(3, 30)
