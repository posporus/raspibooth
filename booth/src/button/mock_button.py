from src.button.button import Button
from collections import Callable

class MockButton(Button):
    callback: Callable = None

    def __init__(self) -> None:
        # By default, use console input for wait behavior
        self.use_console_input = True 
        if self.use_console_input:
            print("MockButton initialized. Use the console input to simulate a button press by default.")


    def wait(self):
        if self.use_console_input:
            input("Press any key to simulate button press...")
            if self.callback:
                self.callback()
        else:
            # If not using console input, this will wait for simulate_press() to be called
            pass

    def when_pressed(self, callback):
        self.callback = callback

    def simulate_press(self):
        """Simulate a button press programmatically."""
        if self.callback:
            self.callback()

if __name__ == "__main__":
    # Callback function to be executed when the button is pressed
    def button_callback():
        print("Button was pressed!")

    # Create an instance of the MockButton
    button = MockButton()

    # Register the callback function
    button.when_pressed(button_callback)

    # Use console input for wait behavior (default)
    print("Using console input for wait behavior...")
    button.wait()

    # Switch to non-console behavior and simulate a button press programmatically
    print("\nSwitching to non-console behavior...")
    button.use_console_input = False
    print("Simulating button press programmatically...")
    button.simulate_press()