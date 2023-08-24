import aiohttp
import os

async def upload_file(file_path, url, api_key):
    '''
    Asynchronously uploads a file to a given URL using POST.

    Args:
    file_path (str): Path to the file to upload.
    url (str): URL to upload the file to.
    api_key (str): API key for authentication.

    Returns:
    Tuple containing response text and status code.
    '''
    file_id = os.path.basename(file_path)
    print(file_id)
    # Open the file in binary mode
    with open(file_path, 'rb') as file:
        data = file.read()

    # Set up the headers
    headers = {
        'X-API-Key': api_key,
        'X-File-Id': file_id
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, headers=headers, data=data) as response:
            return await response.text(), response.status  # Return both response text and status code
