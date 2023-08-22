import unittest
import os
import tempfile
from src.utility.collect_files import collect_files  # Assuming the function is in a module named 'your_module_name'

class TestCollectFiles(unittest.TestCase):

    def setUp(self):
        # This method is called before every test. You can use it to set up any shared resources.
        self.temp_dir = tempfile.TemporaryDirectory()
        self.test_directory = self.temp_dir.name

    def tearDown(self):
        # This method is called after every test. You can use it to clean up any resources.
        self.temp_dir.cleanup()

    def create_files(self, filenames):
        # Helper method to create files in the temporary directory
        for fname in filenames:
            with open(os.path.join(self.test_directory, fname), 'w') as f:
                f.write("test content")

    def test_no_files(self):
        result = collect_files(self.test_directory)
        self.assertEqual(result, [], "Expected an empty list as there are no files")

    def test_some_files(self):
        self.create_files(["file1.txt", "file2.log", "file3.yaml"])
        result = collect_files(self.test_directory)
        expected_result = [
            os.path.join(self.test_directory, "file1.txt"),
            os.path.join(self.test_directory, "file2.log"),
            os.path.join(self.test_directory, "file3.yaml")
        ]
        self.assertEqual(set(result), set(expected_result), "Expected list of paths to all files")

    def test_files_and_subdirectories(self):
        self.create_files(["file1.txt", "file2.log"])
        os.mkdir(os.path.join(self.test_directory, "subdir"))
        result = collect_files(self.test_directory)
        expected_result = [
            os.path.join(self.test_directory, "file1.txt"),
            os.path.join(self.test_directory, "file2.log")
        ]
        self.assertEqual(set(result), set(expected_result), "Expected list of paths to files, excluding subdirectories")

if __name__ == '__main__':
    unittest.main()
