import unittest
import yaml

class TestConfig(unittest.TestCase):
    def setUp(self):
        with open("config.yml", "r") as f:
            self.config = yaml.safe_load(f)

    def test_load_config(self):
        self.assertIsNotNone(self.config)

    def test_config_keys(self):
        self.assertIn('GPIO', self.config)
        self.assertIn('RINGLIGHT', self.config)
        self.assertIn('BUTTON_PIN', self.config['GPIO'])
        self.assertIn('LED_PIN', self.config['RINGLIGHT'])
        self.assertIn('LED_COUNT', self.config['RINGLIGHT'])
