import unittest
import json
import base64
from booth.src.encryption.encrypt import encrypt


def make_test_function(original_data, key, iv, expected_tag, expected_encrypted_data):
    def test(self):
        encrypted_data,tag = encrypt(original_data, iv, key)
        self.assertEqual(encrypted_data, expected_encrypted_data)
        self.assertEqual(tag, expected_tag)
    return test


class TestEncrypt(unittest.TestCase):
    pass  # Placeholder for our dynamically created methods


# Load test data from JSON file
with open("shared_test_files/encyption_datasets.json", "r") as f:
    test_data = json.load(f)

for i, data in enumerate(test_data):
    # Convert base64 encoded strings back to bytes
    original_data = base64.b64decode(data["original_data"])
    key = base64.b64decode(data["key"])
    iv = base64.b64decode(data["iv"])
    tag = base64.b64decode(data["tag"])
    expected_encrypted_data = base64.b64decode(data["encrypted_data"])

    test_func = make_test_function(original_data, key, iv,tag, expected_encrypted_data)
    setattr(TestEncrypt, f"test_encrypt_{i}", test_func)


if __name__ == "__main__":
    unittest.main()
