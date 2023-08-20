from src.camera.camera import Camera
from pathlib import Path
import subprocess


class MockCamera(Camera):
    def __init__(self, width: int, height: int, fps=30) -> None:
        self._width = width
        self._height = height
        self._fps = fps

    def take_video(self, fp: Path, duration_ms=500):
        num_frames = int(self.fps*(duration_ms/1000))

        dst_path = str(fp)
        src_path = 'tests/fixtures/testvideo_540x960.h264'
        command = [
            'ffmpeg',
            '-i', src_path,
            '-vframes', str(num_frames),
            '-c:v', 'copy',
            dst_path
        ]

        if subprocess.run(command).returncode != 0:
            print(f'Error occurred while copying video to {dst_path}')
            return False

        return True

    @property
    def width(self):
        return self._width

    @property
    def height(self):
        return self._height

    @property
    def fps(self):
        return self._fps
