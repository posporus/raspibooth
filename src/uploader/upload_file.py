import requests
import os

def upload_file(file_path, url, api_key):
    '''
    Uploads a file to a given URL using POST.

    Args:
    file_path (str): Path to the file to upload.
    url (str): URL to upload the file to.
    api_key (str): API key for authentication.

    Returns:
    Response object.
    '''

    # Open the file in binary mode
    with open(file_path, 'rb') as file:
        # Set up the headers
        headers = {
            'X-API-Key': api_key,
        }

        # Make the POST request
        response = requests.post(url, headers=headers, data=file.read())

    return response
