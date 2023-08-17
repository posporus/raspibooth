import json
import string
import argparse
from src.utility.random_string_with_checksum import random_string_with_checksum

characters = string.ascii_letters + string.digits

# Fixed path where the JSON data should be saved
fixed_path = 'shared_test_files/random_strings.json'

def generate_strings_to_json(num_strings: int, password_length: int = 10, checksum_length: int = 3, append: bool = False):
    """
    Generates a specified number of random strings with checksums and saves them in a JSON file.
    
    :param num_strings: The number of random strings to generate
    :param password_length: The length of each random string, including the checksum (default is 10)
    :param checksum_length: The length of the checksum part of each string (default is 3)
    :param append: Whether to append new entries to the JSON file instead of overwriting it (default is False)
    """
    strings = [
        {
            "string": random_string_with_checksum(password_length, checksum_length),
            "checksum_length": checksum_length,
            "string_length": password_length
        }
        for _ in range(num_strings)
    ]
    
    if append:
        try:
            with open(fixed_path, 'r') as json_file:
                existing_data = json.load(json_file)
                strings = existing_data + strings
        except FileNotFoundError:
            pass
    
    with open(fixed_path, 'w') as json_file:
        json.dump(strings, json_file)
        
    print(f'{num_strings} strings have been saved to {fixed_path}')

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate random strings with checksums and save them in a JSON file.")
    parser.add_argument("num_strings", type=int, help="The number of random strings to generate")
    parser.add_argument("--password_length", type=int, default=10, help="The length of each random string, including the checksum (default is 10)")
    parser.add_argument("--checksum_length", type=int, default=3, help="The length of the checksum part of each string (default is 3)")
    parser.add_argument("--append", action="store_true", help="Whether to append new entries to the JSON file instead of overwriting it")
    
    args = parser.parse_args()
    
    generate_strings_to_json(args.num_strings, args.password_length, args.checksum_length, args.append)
