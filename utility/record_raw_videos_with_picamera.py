import time
from picamera import PiCamera
from pathlib import Path
from src.utility.random_string import random_string



def record_raw_videos_with_picamera(output_directory="../shared_test_files/raw_test_videos",dimensions=(480, 640), fps=30, duration_ms=1000, num_recordings=4, rotation=90):
    output_dir = Path(output_directory)
    width, height = dimensions

    with PiCamera() as camera:
        camera.resolution = dimensions
        camera.framerate = fps
        camera.rotation = rotation

        for i in range(num_recordings):
            time.sleep(0.2)  # wait 200ms
            suffix = random_string(3)
            filename = f'recording_{width}x{height}_{fps}fps_{duration_ms}ms_rotation{rotation}-{suffix}.h264'
            output_path = output_dir / filename
            camera.start_recording(str(output_path), format='h264')
            camera.wait_recording(duration_ms / 1000)  # duration in seconds
            camera.stop_recording()
