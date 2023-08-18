from src.abstract.camera import Camera
from pathlib import Path
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
        self.camera.start_recording(str(fp))
        self.camera.wait_recording(int(duration_ms/1000))
        self.camera.stop_recording()
        pass

    @property
    def width(self):
        return self.camera.resolution[0]

    @property
    def height(self):
        return self.camera.resolution[1]

    @property
    def fps(self):
        return self.fps