import os
import zipfile
from pathlib import Path

def zip_files(file_list, output_folder, archive_name='archive.zip'):
    # Create a ZipFile object in the specified output folder
    with zipfile.ZipFile(os.path.join(output_folder, archive_name), 'w') as zip_file:
        # Loop through the files in the file_list
        for file_path in file_list:
            # Add the file to the zip
            zip_file.write(file_path, arcname=os.path.basename(file_path))

    return Path(output_folder).joinpath(archive_name)