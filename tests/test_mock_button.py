import unittest
from src.abstract.button import Button
from tests.mocks.mock_button import MockButton

class TestMockButton(unittest.TestCase):
    def setUp(self):
        self.button = MockButton()

    def test_when_pressed(self):
        self.callback_called = False
        def callback():
            self.callback_called = True
        self.button.when_pressed(callback)
        self.assertFalse(self.callback_called)

    def test_simulatePush(self):
        self.callback_called = False
        def callback():
            self.callback_called = True
        self.button.when_pressed(callback)
        self.button.simulatePush()
        self.assertTrue(self.callback_called)
