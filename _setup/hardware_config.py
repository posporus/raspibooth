import json
import yaml
import sys

def check_hardware_enabled(config_path, hardware_name):
    with open(config_path, 'r') as file:
        config = yaml.safe_load(file)
    # Check if config is not None, and if 'hardware' key is in config and is not None
    return config is not None and config.get('hardware') is not None and hardware_name in config['hardware']


def get_install_or_remove_command(hardware_info, action):
    installer = hardware_info['installer']
    package = hardware_info['package']
    sudo = 'sudo ' if hardware_info['sudo'] else ''
    
    if installer == 'apt':
        if action == 'install':
            return f'{sudo}apt-get install -y {package}'
        elif action == 'remove':
            return f'{sudo}apt-get remove -y {package}'
    elif installer == 'pip':
        if action == 'install':
            return f'{sudo}pip install {package}'
        elif action == 'remove':
            return f'{sudo}pip uninstall -y {package}'
    return None

if __name__ == '__main__':
    config_path, commands_path, hardware_name, action = sys.argv[1:]
    
    with open(commands_path, 'r') as file:
        commands_data = json.load(file)
        
    hardware_info = commands_data.get(hardware_name)
    if hardware_info:
        if check_hardware_enabled(config_path, hardware_name):
            if action == 'install':
                command = get_install_or_remove_command(hardware_info, action)
                if command:
                    print(command)
        else:
            if action == 'remove':
                command = get_install_or_remove_command(hardware_info, action)
                if command:
                    print(command)
