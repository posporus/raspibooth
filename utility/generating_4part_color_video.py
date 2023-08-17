import ffmpeg
import numpy as np
from PIL import Image, ImageDraw
import tempfile
import os
import argparse

# Define the colors in RGB format
colors = [(0, 255, 0), (0, 0, 255), (255, 0, 0), (255, 255, 0)]  # Green, Blue, Red, Yellow
def create_video(duration, fps):
    framesPerColor = int(fps*duration)
    # Create a temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        # Create a video for each color
        for i, color in enumerate(colors):
            # Create a temporary directory for the images
            with tempfile.TemporaryDirectory() as img_temp_dir:
                # Create 25 images for each color with a progress bar that increases over time
                for j in range(framesPerColor):
                    # Create an image of the specified color
                    img = Image.new('RGB', (150, 200), color=color)
                    
                    # Draw a progress bar on the image
                    draw = ImageDraw.Draw(img)
                    draw.rectangle([(0, 190), (150*(j+1)/framesPerColor, 200)], fill=(255, 255, 255))
                    
                    # Save the image in the temporary directory
                    img.save(os.path.join(img_temp_dir, f'color_{i}_{j:02d}.png'))
                
                # Create a video from the images in the temporary directory
                (
                    ffmpeg
                    .input(os.path.join(img_temp_dir, 'color_*.png'), pattern_type='glob', framerate=fps)
                    .output(os.path.join(temp_dir, f'color_{i}.mp4'), pix_fmt='yuv420p')
                    .run()
                )

        # Get the list of video files
        video_files = sorted([os.path.join(temp_dir, f) for f in os.listdir(temp_dir) if f.endswith('.mp4')])

        # Create a list of ffmpeg input objects
        inputs = [ffmpeg.input(f) for f in video_files]

        # Concatenate the videos together
        (
            ffmpeg
            .concat(*inputs)
            .output('shared_test_files/test_videos/4colors.mp4', pix_fmt='yuv420p')
            .run()
        )

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Create a test video with 4 colors.')
    parser.add_argument('--duration', type=float, default=1, help='The duration of each color in seconds.')
    parser.add_argument('--fps', type=int, default=25, help='The frames per second of the video.')
    args = parser.parse_args()

    create_video(args.duration, args.fps)