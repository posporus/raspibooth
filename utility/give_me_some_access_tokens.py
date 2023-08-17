import json

def format_token(token, num_parts):
    """
    Format a token into a specified number of parts separated by dashes.
    """
    part_length = len(token) // num_parts
    return '-'.join([token[i:i + part_length] for i in range(0, len(token), part_length)])

# Load the JSON file
with open('shared_test_files/test_archives/test_data.json', 'r') as f:
    data = json.load(f)

# Number of parts into which the token should be divided
num_parts = 4

# Generate access tokens for each item in the list
for item in data:
    raw_token = item['fileId'] + item['password']
    access_token = format_token(raw_token, num_parts)
    print(access_token)
