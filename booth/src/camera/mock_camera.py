from .camera import Camera
from pathlib import Path
from .create_single_color_video import create_single_color_video
import os

class MockCamera(Camera):
    def __init__(self,width:int,height:int,fps:int):
        self._width = width
        self._height = height
        self._fps = fps

    @property
    def width(self) -> int:
        return self._width

    @property
    def height(self) -> int:
        return self._height

    @property
    def fps(self) -> int:
        return self._fps

    def record_video(self, fp: Path or str, duration_ms=500):
        duration_s = duration_ms / 1000.0  # Convert duration to seconds
        output_directory, filename = os.path.split(fp)
        
        # Default to the current directory if no directory is provided
        output_directory = output_directory or '.'

        create_single_color_video(duration_s, self._fps, self._width, self._height, output_directory, filename)



if __name__ == '__main__':
    # Create an instance of MockCamera
    mock_camera = MockCamera()
    
    # Print camera properties
    print(f"Camera Width: {mock_camera.width}")
    print(f"Camera Height: {mock_camera.height}")
    print(f"Camera FPS: {mock_camera.fps}")
    
    # Record a video
    mock_camera.record_video('mock_video.mp4', duration_ms=5000)  # 5 seconds video for demonstration
    
    print("Video saved to 'mock_video.mp4'")
