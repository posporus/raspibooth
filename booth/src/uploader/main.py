import os
import json
from src.utility.collect_files import collect_files
from src.uploader.upload_file import upload_file
from src.config import config
import asyncio

API_KEY = config["API_KEY"]

SERVER_URL = config["SERVER_URL"]
UPLOAD_PATH = config["UPLOAD_PATH"]
upload_url = f'{SERVER_URL}{UPLOAD_PATH}'

async def uploader(upload_dir: str):
    files = collect_files(upload_dir)
    for file in files:
        response_text, status_code = await upload_file(file, upload_url, API_KEY)

        # Check server response
        if status_code == 403:
            print("Invalid API key. Aborting uploads.")
            break
        elif status_code == 400:
            print(f"Error uploading {file}. No fileId provided by the server.")
        elif status_code == 200:
        
            try:
                os.remove(file)  # Delete the file
                print(f'Successfully uploaded and deleted {file}.')
            except Exception as e:
                print(f"Error deleting file {file}. Reason: {e}")
            
        else:
            print(f'Unexpected status code {status_code} for file {file}. Response: {response_text}')


if __name__ == '__main__':
    asyncio.run(uploader('booth/upload'))
