from abc import ABC, abstractmethod
from src.abstract.button import Button
import RPi.GPIO as GPIO
from threading import Event
from collections import Callable


class GpioButton(Button):
    callback: Callable = None

    def __init__(self, pin: int) -> None:
        self.button_event = Event()
        self.pin = pin
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

        # Add an event detection for the button press
        GPIO.add_event_detect(
            self.pin,
            GPIO.FALLING,
            callback=self._press,
            bouncetime=300
        )

    def wait(self):
        self.button_event.wait()
        

    def when_pressed(self, callback):
        self.callback = callback
        pass

    def _press(self,_channel):
        if self.callback != None:
            self.callback()
        self.button_event.set()
