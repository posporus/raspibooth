from src.abstract.camera import Camera
from pathlib import Path
import picamera
import os
import ffmpeg
from threading import Thread

class CameraPiCamera(Camera):
    """
    CameraPiCamera Class:
    A class that interfaces with the Raspberry Pi Camera module using the picamera library.
    
    Methods:
    - take_video: Records a video and saves it to a specified file path.
                   After recording, it converts the video to .mp4 format in a new thread,
                   and deletes the original video file after successful conversion.
    """
    
    def __init__(self, width: int, height: int, fps=25, rotation=0) -> None:
        """
        Initializes the CameraPiCamera object with the given parameters.
        """
        self._width = width
        self._height = height
        self._fps = fps
        self.camera = picamera.PiCamera()
        self.camera.resolution = (width, height)
        self.camera.rotation = rotation

    def take_video(self, fp: Path, duration_ms=500):
        """
        Records a video for a specified duration and saves it to the given file path.
        After recording, it converts the video to .mp4 format in a new thread,
        and deletes the original video file after successful conversion.
        """
        self.camera.start_recording(str(fp))
        self.camera.wait_recording(int(duration_ms/1000))
        self.camera.stop_recording()
        
        # Start a new thread to convert the video to .mp4 format
        conversion_thread = Thread(target=self.convert_and_delete_original, args=(fp,))
        conversion_thread.start()

    def convert_and_delete_original(self, input_file: Path):
        """
        Converts the video file to .mp4 format and deletes the original file after successful conversion.
        """
        output_file = convert_file_to_mp4(str(input_file))
        if output_file is not None:
            os.remove(str(input_file))

    @property
    def width(self):
        return self.camera.resolution[0]

    @property
    def height(self):
        return self.camera.resolution[1]

    @property
    def fps(self):
        return self._fps

def convert_file_to_mp4(input_file: str):
    """
    Converts a video file to .mp4 format using the ffmpeg library.
    
    Parameters:
    - input_file (str): The path to the input video file.
    
    Returns:
    - str: The path to the converted .mp4 file, or None if an error occurred.
    """
    output_file = os.path.splitext(input_file)[0] + ".mp4"
    try:
        stream = ffmpeg.input(input_file)
        stream = ffmpeg.output(stream, output_file)
        ffmpeg.run(stream)
        print(f"Conversion completed. The output file is {output_file}")
        return output_file
    except ffmpeg.Error as e:
        print(f"Error occurred: {e.stderr.decode()}")
        return None

# Example usage
camera = CameraPiCamera(width=640, height=480)
camera.take_video(Path('video.h264'), duration_ms=5000)
