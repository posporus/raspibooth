import unittest
import os
import tempfile
import zipfile
from src.zip_files import zip_files  # change this to the new function import

class TestZipFiles(unittest.TestCase):
    def setUp(self):
        # Create a temporary directory
        self.test_dir = tempfile.TemporaryDirectory()

        # Generate 4 random binary files and a text file
        self.files = []
        for i in range(4):
            data = os.urandom(1024)  # 1KB of random binary data
            filename = f'file{i}.bin'
            with open(os.path.join(self.test_dir.name, filename), 'wb') as f:
                f.write(data)
            self.files.append((os.path.join(self.test_dir.name, filename), data))

        text = 'Hello, world!'
        filename = 'file.txt'
        with open(os.path.join(self.test_dir.name, filename), 'w') as f:
            f.write(text)
        self.files.append((os.path.join(self.test_dir.name, filename), text.encode()))

    def tearDown(self):
        # Clean up the temporary directory
        self.test_dir.cleanup()

    def test_zip_files(self):
        # Run the function
        zip_files([f[0] for f in self.files], self.test_dir.name)

        # Check that the archive file exists
        self.assertTrue(os.path.exists(os.path.join(self.test_dir.name, 'archive.zip')))

        # Unzip the archive and check the contents
        with zipfile.ZipFile(os.path.join(self.test_dir.name, 'archive.zip'), 'r') as zip_file:
            for filename, original_data in self.files:
                data = zip_file.read(os.path.basename(filename))
                self.assertEqual(data, original_data)

if __name__ == '__main__':
    unittest.main()
