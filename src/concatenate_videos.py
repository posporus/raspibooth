import ffmpeg

def concatenate_videos(input_files, output_file):
    """
    Concatenate multiple videos into one using ffmpeg.

    Parameters:
    input_files (list): List of paths to input video files.
    output_file (str): Path to output video file.
    """
    # Concatenate videos
    (
        ffmpeg
        .input('concat:' + '|'.join(input_files))
        .output(output_file, codec='copy')
        .run()
    )
