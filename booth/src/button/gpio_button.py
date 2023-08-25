from src.button.button import Button
import RPi.GPIO as GPIO
from threading import Event
from collections import Callable
import time

class GpioButton(Button):
    callback: Callable = None

    def __init__(self, pin: int) -> None:
        self.pin = pin
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    def __del__(self):
        # Cleanup the GPIO resources
        GPIO.cleanup(self.pin)

    def wait(self):
        print("Waiting for gpio button press.",self.pin)

    # Block the script until the button is pressed and then released
        button_pressed = False
        while True:
            if not GPIO.input(self.pin):
                # Button was pressed down
                button_pressed = True
            elif button_pressed and GPIO.input(self.pin):
                # Button was released
                if self.callback:
                    self.callback()
                # Break out of the loop
                break
            # Sleep for a short duration to avoid busy waiting
            time.sleep(0.1)


    def when_pressed(self, callback):
        self.callback = callback

# Simple test in the main section
if __name__ == "__main__":
    def button_callback():
        print("Button was pressed!")

    button = GpioButton(17)  # Assuming pin 17 for this test
    button.when_pressed(button_callback)
    print("Waiting for button press...")
    button.wait()
