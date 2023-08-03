import json

# Load the JSON file
with open('shared_test_files/encrypted_test_videos/test_data.json', 'r') as f:
    data = json.load(f)

# Generate URLs for each item in the list
urls = [f"http://localhost:8000/{item['fileId']}#{item['password']}" for item in data]

# Print the URLs
for url in urls:
    print(url)
