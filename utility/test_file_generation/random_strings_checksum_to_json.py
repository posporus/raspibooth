import json
import string
from src.utility.random_string_with_checksum import random_string_with_checksum

characters = string.ascii_letters + string.digits

# Fixed path where the JSON data should be saved

def random_strings_checksum_to_json(num_strings: int, password_length: int = 10, checksum_length: int = 3,output_path="../shared_test_files/random_strings.json", append: bool = False):
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
            with open(output_path, 'r') as json_file:
                existing_data = json.load(json_file)
                strings = existing_data + strings
        except FileNotFoundError:
            pass
    
    with open(output_path, 'w') as json_file:
        json.dump(strings, json_file)
        
    return f'{num_strings} strings have been saved to {output_path}'