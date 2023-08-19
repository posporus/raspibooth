#!/bin/bash

# Define paths
CONFIG_PATH="booth.config.yaml"
COMMANDS_PATH="_setup/install_commands.json"

# Get the absolute path of the current script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Check if the booth.config.yaml file exists in the root folder
CONFIG_PATH="${SCRIPT_DIR}/booth.config.yaml"
if [ ! -f "$CONFIG_PATH" ]; then
  # If it doesn't exist, copy the example configuration file from _setup folder
  echo "No configuration file found."
  cp "${SCRIPT_DIR}/_setup/_booth.config.yaml" "$CONFIG_PATH"
  echo "An example configuration file has been copied to: $CONFIG_PATH"
  
  # Pause and notify the user
  echo "Please configure your project using this file, and then press any key to continue the setup..."
  read -n 1 -s
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source ${SCRIPT_DIR}/venv/bin/activate

# Install common Python dependencies from requirements.txt
if [ -f "${SCRIPT_DIR}/requirements.txt" ]; then
  echo "Installing common Python dependencies..."
  pip install -r "${SCRIPT_DIR}/requirements.txt"
else
  echo "Warning: No requirements.txt file found in ${SCRIPT_DIR}/"
fi

# Iterate over hardware components and install or uninstall packages
for hardware_name in "picamera" "start-button" "ringlight" "thermalprinter_serial"; do
    # Install the package if it is enabled in the config
    command=$(python3 _setup/hardware_config.py $CONFIG_PATH $COMMANDS_PATH $hardware_name install)
    if [ -n "$command" ]; then
        echo "Installing $hardware_name..."
        eval $command
    fi

    # Remove the package if it is not enabled in the config
    command=$(python3 _setup/hardware_config.py $CONFIG_PATH $COMMANDS_PATH $hardware_name remove)
    if [ -n "$command" ]; then
        echo "Removing $hardware_name..."
        eval $command
    fi
done

# Print a success message to inform the user that the setup is complete
echo -e "\n🎉 Setup completed successfully! Your project is now ready to run. 🎉\n"
