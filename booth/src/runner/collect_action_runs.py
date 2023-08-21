import os

def collect_action_runs(directory='booth/action_runs'):
    """
    Collects all .yaml files in the given directory and returns their paths as a list.
    
    Args:
        directory (str): The directory to search for .yaml files.
    
    Returns:
        list: A list of paths to .yaml files.
    """
    # List all files in the directory
    all_files = os.listdir(directory)
    
    # Filter for .yaml files
    yaml_files = [os.path.join(directory, f) for f in all_files if f.endswith('.yaml')]
    
    return yaml_files


# Run the test
if __name__ == "__main__":
    collected_files = collect_action_runs()
    
    # Print the result
    for fpath in collected_files:
        print(fpath)