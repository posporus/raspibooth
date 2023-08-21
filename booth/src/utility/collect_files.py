import os

def collect_files(directory):
    """
    Collects all files in the given directory and returns their paths as a list.
    
    Args:
        directory (str): The directory to search for files.
    
    Returns:
        list: A list of paths to files.
    """
    return [os.path.join(directory, f) for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

# Example usage:
# files = collect_files('/path/to/directory')
# print(files)
