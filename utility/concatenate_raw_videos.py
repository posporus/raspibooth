import os
import random
from glob import glob
from src.concatenate_videos import concatenate_videos
from src.utility.random_string import random_string

def generate_test_video():
    # Get list of all .h264 videos in the directory
    video_files = glob('shared_test_files/raw_test_videos/*.h264')

    # Check if there are less than 4 videos, if so repeat the list until we have at least 4
    while len(video_files) < 4:
        video_files *= 2

    # Shuffle the list to ensure random order
    random.shuffle(video_files)

    # Take the first 4 videos from the shuffled list
    input_files = video_files[:4]

    # Generate a random string for the output filename
    filename = f'test_video_{random_string(3)}.mp4'
    output_file = os.path.join('shared_test_files/test_videos', filename)

    # Call concatenate_videos with the selected input files and output file
    concatenate_videos(input_files, output_file)

if __name__ == '__main__':
    generate_test_video()
