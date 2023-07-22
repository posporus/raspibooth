import cv2
import numpy as np
from pathlib import Path


def createVideo(width, height, fp: Path or str, fps, duration_ms):
    """This method is used by MockCamera to simulate recording of a video."""
    # Create a VideoWriter object

    if isinstance(fp,Path):
        fp = str(fp)
    codec = get_codec_for_extension(fp)
    fourcc = cv2.VideoWriter_fourcc(*codec)
    video = cv2.VideoWriter(fp, fourcc, fps, (width, height))

    for _ in range(int(fps * duration_ms / 1000)):
        # Generate a random image
        img = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)

        # Write the image to the video file
        video.write(img)

    # Release the VideoWriter
    video.release()


def get_codec_for_extension(file_path: Path or str) -> str:
    """Get the corresponding codec for a given file extension."""

    if isinstance(file_path, str):
        file_path = Path(file_path)
    # Define a mapping from file extensions to codecs
    codec_map = {
        ".avi": "XVID",  # Xvid codec (MPEG-4 compliant video codec)
        ".mp4": "MP4V",  # MPEG-4 video codec
        ".mov": "mp4v",  # QuickTime often uses MPEG-4 video codec
        ".mkv": "XVID",  # Matroska format can also use Xvid codec
        ".flv": "FLV1",  # Flash Video codec
        ".wmv": "WMV2",  # Windows Media Video codec
        ".h264": "H264",  # H.264/AVC codec
    }

    # Extract extension from the file path
    extension = file_path.suffix

    # Get the codec from the map, return None if the extension is not recognized
    return codec_map.get(extension.lower(), None)
