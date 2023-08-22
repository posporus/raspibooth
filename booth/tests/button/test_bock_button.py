import unittest
from unittest.mock import patch
from src.button.mock_button import MockButton  # Adjust the import path accordingly
import unittest

from collections import Callable

class TestMockButton(unittest.TestCase):

    def test_simulate_press(self):
        # Create an instance of the MockButton
        button = MockButton()

        # Flag to check if the callback was called
        self.button_pressed = False

        # Callback function to be executed when the button is pressed
        def button_callback():
            self.button_pressed = True

        # Register the callback function
        button.when_pressed(button_callback)

        # Switch to non-console behavior
        button.use_console_input = False

        # Simulate a button press programmatically
        button.simulate_press()

        # Check if the callback was called
        self.assertTrue(self.button_pressed, "Callback was not called on simulate_press")

if __name__ == "__main__":
    unittest.main()
