import cv2

def convert_h264_to_gif(input_file_path, output_file_path, fps=10):
    """
    Converts an H.264 video file to a GIF using opencv-python.

    Parameters:
        input_file_path (str): The path of the input H.264 video file.
        output_file_path (str): The path where the GIF will be saved, including the filename with '.gif' extension.
        fps (int): Frames per second for the GIF (default is 10).

    Returns:
        None
    """
    try:
        video_capture = cv2.VideoCapture(input_file_path)
        frame_width = int(video_capture.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(video_capture.get(cv2.CAP_PROP_FRAME_HEIGHT))

        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        gif_writer = cv2.VideoWriter(output_file_path, fourcc, fps, (frame_width, frame_height))

        while True:
            ret, frame = video_capture.read()
            if not ret:
                break
            gif_writer.write(frame)

        gif_writer.release()
        video_capture.release()
    except Exception as e:
        print(f"Error during conversion: {e}")

if __name__ == "__main__":
    input_h264_file_path = "./tmp/video.h264"  # Replace with the path of the H.264 video
    output_gif_file_path = "./tmp/output.gif"   # Replace with the desired output GIF file path
    convert_h264_to_gif(input_h264_file_path, output_gif_file_path)
