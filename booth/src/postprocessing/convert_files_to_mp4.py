import os, ffmpeg

def convert_files_to_mp4(file_list):
    converted_files = []
    for file in file_list:
        input_file = os.path.join(os.path.dirname(file), file)
        output_file = os.path.splitext(input_file)[0] + ".mp4"
        try:
            stream = ffmpeg.input(input_file)
            stream = ffmpeg.output(stream, output_file)
            ffmpeg.run(stream)
            print(f"Conversion completed. The output file is {output_file}")
            converted_files.append(output_file)
        except ffmpeg.Error as e:
            print(f"Error occurred: {e.stderr.decode()}")
    return converted_files