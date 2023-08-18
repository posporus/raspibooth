import json

def generate_test_links_from_files(file):
    # Load the JSON file
    with open(file, "r") as f:
        data = json.load(f)

    # Generate URLs for each item in the list
    urls = [
        f"http://localhost:8000/{item['fileId']}#{item['password']}" for item in data
    ]
    return '\n'.join(urls)
