import os
import json
from src.utility.collect_files import collect_files
from src.uploader.upload_file import upload_file
from src.config import config
import asyncio
import log_config
import logging

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
            logging.error("Invalid API key. Aborting uploads.")
            break
        elif status_code == 400:
            error_msg = f"Error uploading {file}. No fileId/checksum provided by the server."
            logging.error(error_msg)
        elif status_code == 200:
            try:
                os.remove(file)  # Delete the file
                success_msg = f'Successfully uploaded and deleted {file}.'
                logging.info(success_msg)
            except Exception as e:
                error_msg = f"Error deleting file {file}. Reason: {e}"
                logging.error(error_msg)
        else:
            error_msg = f'Unexpected status code {status_code} for file {file}. Response: {response_text}'
            logging.error(error_msg)

if __name__ == '__main__':
    asyncio.run(uploader('booth/upload'))
