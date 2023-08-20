import os
import random
import tempfile
from typing import Tuple
from PIL import Image, ImageDraw
import ffmpeg

def create_single_color_video(
    duration: float = 1,
    fps: int = 30,
    width: int = 480,
    height: int = 640,
    output_path: str = "../shared_test_files/test_videos/",
    filename:str = None
) -> None:
    """
    Creates a video of a random single color.

    :param duration: The duration of the video in seconds
    :param fps: The frames per second of the video
    :param width: The width of the video in pixels
    :param height: The height of the video in pixels
    :param output_path: The directory to save the output video, relative to this script's location
    """
    framesPerColor = int(fps * duration)
    
    # List of color names and their corresponding RGB values
    colors = [
        ('Red', (255, 0, 0)),
        ('Green', (0, 255, 0)),
        ('Blue', (0, 0, 255)),
        ('Yellow', (255, 255, 0)),
        ('Purple', (128, 0, 128)),
        ('Cyan', (0, 255, 255))
    ]
    
    # Randomly select a color name and its RGB value
    color_name, color_rgb = random.choice(colors)
    
    if filename == None:
        # Format the filename based on the parameters
        filename = f'{duration}s_{fps}fps_{width}x{height}_{color_name}.mp4'
    
   
    # Ensure the output directory exists; if not, create it
    os.makedirs(output_path, exist_ok=True)
    
    # Create the full output path by joining the directory and filename
    full_output_path = os.path.join(output_path, filename)

    # Create a temporary directory for the images
    with tempfile.TemporaryDirectory() as img_temp_dir:
        # Create images for the specified color with a progress bar that increases over time
        for j in range(framesPerColor):
            # Create an image of the specified color
            img = Image.new('RGB', (width, height), color=color_rgb)
            
            # Draw a progress bar on the image
            draw = ImageDraw.Draw(img)
            progress = (width * (j + 1) / framesPerColor)
            status_bar_height = 20  # Increased from 10 to 20
            draw.rectangle([(0, height - status_bar_height), (progress, height)], fill=(255, 255, 255))
            
            # Define the points for the triangle
            center_x = width / 2
            triangle_height = 30  # Increased from 15 to 30
            point1 = (center_x, height - status_bar_height)
            point2 = (center_x - triangle_height/2, height)
            point3 = (center_x + triangle_height/2, height)
            
            # Draw the triangle
            draw.polygon([point1, point2, point3], fill=(255, 0, 0))
            
            # Save the image in the temporary directory
            img.save(os.path.join(img_temp_dir, f'frame_{j:02d}.png'))
        
        # Create a video from the images in the temporary directory
        (
            ffmpeg
            .input(os.path.join(img_temp_dir, 'frame_*.png'), pattern_type='glob', framerate=fps)
            .output(full_output_path, pix_fmt='yuv420p')
            .run()
        )

