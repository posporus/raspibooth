import yaml

# Path to the YAML configuration file
config_path = 'booth.config.yaml'

# Load the configuration file
with open(config_path, 'r') as file:
    config = yaml.safe_load(file)

    # print(config)


def getHardware(type:str):
    hardware = config['hardware'][type]
    if isinstance(hardware,str):
        return hardware
    if isinstance(hardware,dict):
        return list(hardware.keys())[0]
    return None

'''
Usage:
```python
# Import the config dictionary from config.py
from config import config

# Access the camera resolution from the configuration
camera_resolution = config['hardware']['picamera']['resolution']

# Now you can use camera_resolution in your code
print("Camera Resolution:", camera_resolution)

```
'''