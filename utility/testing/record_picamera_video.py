from pathlib import Path
from datetime import datetime
from src.hardware.camera_picamera import CameraPiCamera

def record_picamera_video(fps: int=30, duration: int=1, width: int=640, height: int=480, rotation: int=90, file_path: str="../recordings/"):
    """
    Record a video using the CameraPiCamera class and save it as an MP4 file.
    
    Parameters:
        fps (int): The frames per second of the video.
        duration (int): The duration of the video in milliseconds.
        width (int): The width of the video in pixels.
        height (int): The height of the video in pixels.
        rotation (int): The rotation of the camera in degrees (0, 90, 180, or 270).
        file_path (str): The directory where the resulting MP4 file will be saved.
        
    Returns:
        None
    """
    # Get the current date and time and format it as a string
    now = datetime.now()
    date_time_str = now.strftime("%Y%m%d-%H%M%S")
    
    # Create the filename using the date and time
    filename = f"video_{date_time_str}.mp4"
    
    # Create the full path for the output file
    output_path = Path(file_path) / filename
    
    # Create an instance of the CameraPiCamera class
    camera = CameraPiCamera(width=width, height=height, fps=fps, rotation=rotation)
    
    # Use the take_video method of the CameraPiCamera instance to record the video
    camera.take_video(fp=output_path, duration_ms=duration)
    
    print(f"Video recording started. The video will be saved to: {output_path}")

# Usage Example:
# Record a 10-second video with a resolution of 1920x1080 at 30 FPS, with no rotation,
# and save it in the current directory. The filename will be generated based on the current date and time.
# record_video(fps=30, duration=10000, width=1920, height=1080, rotation=0, file_path=".")
