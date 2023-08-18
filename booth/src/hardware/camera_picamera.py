import subprocess
import tempfile
from pathlib import Path
import threading
from src.abstract.camera import Camera
import picamera

class CameraPiCamera(Camera):
    def __init__(self, width: int, height: int, fps=25, rotation = 0) -> None:
        self._width = width
        self._height = height
        self._fps = fps
        self.camera = picamera.PiCamera()
        self.camera.resolution = (width, height)
        self.camera.rotation = rotation

    def take_video(self, fp: Path, duration_ms=500):
        # Create a temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            # Define the path for the temporary raw video file
            temp_video_path = Path(temp_dir) / 'temp_video.h264'
            
            # Record the video to the temporary file
            self.camera.start_recording(str(temp_video_path))
            self.camera.wait_recording(int(duration_ms/1000))
            self.camera.stop_recording()

            # Start the conversion in a separate thread
            conv_thread = threading.Thread(target=self._convert_to_mp4, args=(temp_video_path, fp))
            conv_thread.start()
    
    def _convert_to_mp4(self, src: Path, dest: Path):
        # Convert the raw video to MP4 format using ffmpeg
        command = ['ffmpeg', '-framerate', str(self._fps), '-i', str(src), '-c:v', 'libx264', '-r', str(self._fps), str(dest)]
        subprocess.run(command)
        
        # The temporary file and directory will be deleted automatically when exiting the 'with' block
    
    @property
    def width(self):
        return self.camera.resolution[0]

    @property
    def height(self):
        return self.camera.resolution[1]

    @property
    def fps(self):
        return self._fps
