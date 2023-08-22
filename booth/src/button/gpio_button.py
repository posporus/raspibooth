from src.button.button import Button
import RPi.GPIO as GPIO
from threading import Event
from collections import Callable

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
        # Block the script until the button is pressed
        while True:
            if not GPIO.input(self.pin):
                # Button was pressed
                if self.callback:
                    self.callback()
                # Break out of the loop
                break
            # Sleep for a short duration to avoid busy waiting
            time.sleep(0.1)

    def when_pressed(self, callback):
        self.callback = callback