from src.abstract.camera import Camera
from tests.mocks.create_image import createImage
from tests.mocks.create_video import createVideo
from pathlib import Path


class MockCamera(Camera):
    def __init__(self, width: int, height: int) -> None:
        self._width = width
        self._height = height
    
    def take_picture(self, fp: Path):
        return createImage(self.width, self.height, fp)

    def take_video(self, fp: Path, fps=24, duration_ms=500):
        return createVideo(self.width, self.height, fp, fps, duration_ms)

    @property
    def width(self):
        return self._width

    @property
    def height(self):
        return self._height