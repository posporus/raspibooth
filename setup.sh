#!/bin/bash

# Step 1: Create virtual environment
python3 -m venv venv

# Step 2: Activate virtual environment
source venv/bin/activate

# Step 3: Install requirements

# Step 4: Set up PYTHONPATH
SITE_PACKAGES_PATH=$(find venv/lib/ -name site-packages)
echo "$(pwd)/booth" >> "$SITE_PACKAGES_PATH/pythonpath.pth"
echo "$(pwd)/utility" >> "$SITE_PACKAGES_PATH/pythonpath.pth"

pip install -r requirements.txt

echo "Setup complete! Virtual environment activated. Run 'source venv/bin/activate' to activate it in the future."
