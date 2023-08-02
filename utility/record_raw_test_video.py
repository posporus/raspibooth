import argparse
import time
from picamera import PiCamera
from pathlib import Path
from src.utility.random_string import random_string

output_dir = Path("shared_test_files/raw_test_videos")


def record_raw_test_video(dimensions=(480, 640), fps=30, duration_ms=1000, num_recordings=4, rotation=90):
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


def main():
    parser = argparse.ArgumentParser(description='Record raw test videos.')
    parser.add_argument('-w', '--width', type=int,
                        default=480, help='Video width in pixels.')
    parser.add_argument('-ht', '--height', type=int,
                        default=640, help='Video height in pixels.')
    parser.add_argument('-f', '--fps', type=int,
                        default=30, help='Frames per second.')
    parser.add_argument('-d', '--duration', type=int,
                        default=1000, help='Video duration in milliseconds.')
    parser.add_argument('-n', '--num-recordings', type=int,
                        default=4, help='Number of recordings to make.')
    parser.add_argument('-r', '--rotation', type=int,
                        default=90, help='Camera rotation in degrees.')

    args = parser.parse_args()

    record_raw_test_video((args.width, args.height), args.fps,
                          args.duration, args.num_recordings, args.rotation)


if __name__ == "__main__":
    main()
