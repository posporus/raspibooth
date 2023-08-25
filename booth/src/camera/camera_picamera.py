from src.camera.camera import Camera
from pathlib import Path
import picamera
import os
import ffmpeg
import tempfile

class CameraPiCamera(Camera):
    def __init__(self, width: int, height: int, fps=25, rotation = 0) -> None:
        self._width = width
        self._height = height
        self._fps = fps
        self.camera = picamera.PiCamera()
        self.camera.resolution = (width, height)
        self.camera.rotation = rotation

    def _convert_to_mp4(self, temp_file: Path, output_file: Path):
        """Converts the given temp_file to an mp4 format."""
        try:
            stream = ffmpeg.input(str(temp_file))
            stream = ffmpeg.output(stream, str(output_file))
            ffmpeg.run(stream)
            print(f"Conversion completed. The output file is {output_file}")
        except ffmpeg.Error as e:
            print(f"Error occurred: {e.stderr.decode()}")

    def record_video(self, fp: Path, duration_ms=500):
        with tempfile.NamedTemporaryFile(suffix=".h264", delete=False) as temp:
            # Record to the temporary file
            self.camera.start_recording(temp.name)
            self.camera.wait_recording(int(duration_ms/1000))
            self.camera.stop_recording()
            
            # Convert the temporary file to mp4 format
            self._convert_to_mp4(temp.name, fp)
            
            # Remove the temporary file
            os.remove(temp.name)

    @property
    def width(self):
        return self.camera.resolution[0]

    @property
    def height(self):
        return self.camera.resolution[1]

    @property
    def fps(self):
        return self._fps

if __name__ == "__main__":
    # Create a CameraPiCamera instance with specific width, height, and fps
    cam = CameraPiCamera(width=640, height=480, fps=25)

    # Define the output path for the .mp4 video
    output_path = Path("video.mp4")

    # Record a 1-second video
    cam.record_video(output_path, duration_ms=1000)

    print(f"Video recorded and saved to {output_path}")
