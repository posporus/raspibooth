#!/bin/bash

# Navigate to the Python project directory and run the Python tests
cd booth
echo "Running Python tests..."
python3 -m unittest discover -s ./tests/
cd ..

# Navigate to the Deno project directory and run the Deno tests
cd server
echo "Running Deno tests..."
deno test
cd ..
