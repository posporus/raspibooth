from src.abstract.button import Button


class MockButton(Button):
    def when_pressed(self, callback):
        self.callback = callback

    def simulatePush(self):
        self.callback()
