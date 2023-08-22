from src.runner.collect_action_runs import collect_action_runs
import unittest
import os
import tempfile

class TestCollectActionRuns(unittest.TestCase):

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

    def test_no_yaml_files(self):
        self.create_files(["file1.txt", "file2.log"])
        result = collect_action_runs(self.test_directory)
        self.assertEqual(result, [], "Expected an empty list as there are no .yaml files")

    def test_some_yaml_files(self):
        self.create_files(["file1.yaml", "file2.txt", "file3.yaml"])
        result = collect_action_runs(self.test_directory)
        expected_result = [
            os.path.join(self.test_directory, "file1.yaml"),
            os.path.join(self.test_directory, "file3.yaml")
        ]
        self.assertEqual(set(result), set(expected_result), "Expected list of paths to .yaml files")

    def test_all_yaml_files(self):
        self.create_files(["file1.yaml", "file2.yaml", "file3.yaml"])
        result = collect_action_runs(self.test_directory)
        expected_result = [
            os.path.join(self.test_directory, "file1.yaml"),
            os.path.join(self.test_directory, "file2.yaml"),
            os.path.join(self.test_directory, "file3.yaml")
        ]
        self.assertEqual(set(result), set(expected_result), "Expected list of paths to all .yaml files")

if __name__ == '__main__':
    unittest.main()
