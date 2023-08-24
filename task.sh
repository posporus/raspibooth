#!/bin/bash

# Function to display help
function display_help {
    echo "Usage: $0 [server_test|server_start|booth_test] [optional file]"
    echo "  server_test: Run server tests"
    echo "  server_start: Run deno fresh"
    echo "  booth_test: Run booth tests"
    echo "  optional file: File to test (for server_test and booth_test)"
}

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    echo "Error: No arguments provided"
    display_help
    exit 1
fi

# Get the task and optional file argument
TASK=$1
FILE=$2

# Run the appropriate task
case $TASK in
    booth_run)
        echo "running booth"
        sudo venv/bin/python3.9 booth/main.py
        ;;
    server_test)
        # Navigate to 'server' and run tests
        pushd server
        echo "Running server tests..."
        deno test --allow-all $FILE
        popd
        ;;
    server_start)
        # Navigate to 'server' and run deno fresh
        pushd server
        echo "Running deno fresh..."
        deno task start
        popd
        ;;
    booth_test)
        # Navigate to 'booth' and run tests
        pushd booth
        echo "Running booth tests..."
        python3 -m unittest $FILE
        popd
        ;;
    *)
        echo "Error: Invalid task"
        display_help
        exit 1
        ;;
esac
