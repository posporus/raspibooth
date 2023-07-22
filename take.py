import time
import picamera

def record_video(file_path, duration=10):
    """
    Records a video using the Raspberry Pi camera and saves it as an MP4 file.

    Parameters:
        file_path (str): The path where the video file will be saved, including the filename with '.mp4' extension.
        duration (int): The duration of the video recording in seconds (default is 10 seconds).

    Returns:
        None
    """
    try:
        with picamera.PiCamera() as camera:
            camera.resolution = (1280, 720)  # Set the resolution (adjust as needed)
            camera.start_recording(file_path)
            camera.wait_recording(duration)
            camera.stop_recording()
    except picamera.PiCameraError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    video_file_path = "./tmp/video.h264"  # Replace with the desired file path
    recording_duration = 1  # Replace with the desired recording duration in seconds
    record_video(video_file_path, duration=recording_duration)
