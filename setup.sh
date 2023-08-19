#!/bin/bash

# Get the absolute path of the current script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Define the subdirectories you want to include in the Python path
SUBDIRS=("booth" "utility")

# Check if the venv directory exists
if [ ! -d "${SCRIPT_DIR}/venv" ]; then
  # If it doesn't exist, create a new virtual environment
  echo "Creating new virtual environment in 'venv/'..."
  python3 -m venv "${SCRIPT_DIR}/venv"
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source ${SCRIPT_DIR}/venv/bin/activate

# Get the site-packages directory of the virtual environment
SITE_PACKAGES=$(python -c "from distutils.sysconfig import get_python_lib; print(get_python_lib())")

# Create a .pth file in the site-packages directory
PTH_FILE="${SITE_PACKAGES}/project_paths.pth"

# Empty the .pth file or create it if it doesn't exist
> $PTH_FILE

# Write the absolute paths to the .pth file
for SUBDIR in "${SUBDIRS[@]}"; do
  echo "${SCRIPT_DIR}/${SUBDIR}/" >> $PTH_FILE
done

# Print a success message for .pth file creation
echo "Created .pth file at: $PTH_FILE"

# Install common Python dependencies from requirements.txt
if [ -f "${SCRIPT_DIR}/requirements.txt" ]; then
  echo "Installing common Python dependencies..."
  pip install -r "${SCRIPT_DIR}/requirements.txt"
else
  echo "Warning: No requirements.txt file found in ${SCRIPT_DIR}/"
fi

# Check for 'pi' argument to install Raspberry Pi-specific packages
if [ "$1" == "pi" ]; then
  if [ -f "${SCRIPT_DIR}/requirements_pi.txt" ]; then
    echo "Installing Raspberry Pi-specific Python dependencies..."
    pip install -r "${SCRIPT_DIR}/requirements_pi.txt"
  else
    echo "Warning: No requirements_pi.txt file found in ${SCRIPT_DIR}/"
  fi
fi

# Optionally: Deactivate the virtual environment
# deactivate
