import unittest
from src.utility.random_string_with_checksum import random_string_with_checksum

class TestRandomStringWithChecksum(unittest.TestCase):
    
    def test_length_of_string(self):
        password = random_string_with_checksum(10, 3)
        self.assertEqual(len(password), 10)
        
    def test_checksum(self):
        password = random_string_with_checksum(10, 3)
        random_part = password[:-3]
        checksum = password[-3:]
        self.assertEqual(sum(ord(char) for char in random_part) % 1000, int(checksum))
        
    def test_checksum_length(self):
        password = random_string_with_checksum(10, 3)
        self.assertEqual(len(password[-3:]), 3)
        
    def test_value_error(self):
        with self.assertRaises(ValueError):
            random_string_with_checksum(10, 10)
            
if __name__ == '__main__':
    unittest.main()