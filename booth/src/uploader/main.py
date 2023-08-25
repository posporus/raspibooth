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
        response_text = await upload_file(file, upload_url, API_KEY)
        # You might want to adjust this check based on what your async upload_file returns
        # if "Success" in response_text:  # or any other condition to check if the upload was successful
        #     print('ok.')
        print(response_text)

if __name__ == '__main__':
    asyncio.run(uploader('booth/upload'))
