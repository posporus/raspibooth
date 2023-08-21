import unittest
from src.config import get_hardware  # Replace with your actual module name

class TestGetHardware(unittest.TestCase):

    def setUp(self):
        # Mock configuration data for testing
        self.mock_config = {
            'hardware': {
                'camera': 'picamera',
                'light': {
                    'led': 'green'
                }
            }
        }

    def test_get_hardware_str(self):
        hardware = get_hardware('camera', self.mock_config)
        self.assertEqual(hardware, 'picamera')

    def test_get_hardware_dict(self):
        hardware = get_hardware('light', self.mock_config)
        self.assertEqual(hardware, 'led')

    def test_get_hardware_none(self):
        hardware = get_hardware('nonexistent', self.mock_config)
        self.assertIsNone(hardware)

    def test_get_hardware_missing_hardware_key(self):
        # Configuration without 'hardware' key
        config_without_hardware = {'some_key': 'some_value'}
        hardware = get_hardware('camera', config_without_hardware)
        self.assertIsNone(hardware)

if __name__ == '__main__':
    unittest.main()
