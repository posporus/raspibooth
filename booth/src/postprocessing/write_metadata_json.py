import json
import time
from models.metadata import Metadata, metadata_to_dict


def write_metadata_json(
    duration,
    fps,
    play_speed: int = 1,
    location=None,
    event_name=None,
    file_path="metadata.json",
):
    metadata: Metadata = {
        "timestamp": time.time(),
        "duration": duration / 1000,
        "fps": fps,
        "playSpeed": play_speed,
        "location": location,
        "eventName": event_name,
    }

    with open(file_path, "w") as json_file:
        json.dump(metadata, json_file)

    return file_path


# Usage:
# write_metadata(3, 30)
