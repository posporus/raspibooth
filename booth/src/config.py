import yaml

def load_config(config_file_path: str) -> dict:
    """
    Load the configuration from the given YAML file.

    Args:
        config_file_path (str): Path to the YAML configuration file.

    Returns:
        dict: Configuration dictionary.
    """
    with open(config_file_path, 'r') as file:
        return yaml.safe_load(file)


config = load_config('booth.config.yaml')


def get_hardware(type: str, config: dict) -> str:
    """
    Retrieve the hardware configuration based on the given type.

    Args:
        type (str): The type of hardware.
        config (dict): Configuration dictionary.

    Returns:
        str or None: The hardware configuration, or None if not found.
    """

    hardware = config.get('hardware', {})
    if hardware == None:
        return None
    print(hardware)
    device = hardware.get(type)
    
    if isinstance(device, str):
        return device
    if isinstance(device, dict):
        return list(device.keys())[0]
    return None



# Usage:
# Import the config dictionary from the module
# camera_resolution = config['hardware']['picamera']['resolution']
# print("Camera Resolution:", camera_resolution)
