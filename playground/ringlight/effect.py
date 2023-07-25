from typing import Any
from rpi_ws281x import PixelStrip
from collections import Callable


class Effect(object):
    running: bool = False
    func: Callable
    onFinished: Callable = None
    strip: PixelStrip
    loop: int = 1
    brightness = 255

    def __init__(self, func: Callable) -> None:
        self.func = func

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        self.strip.setBrightness(self.brightness)
        self.args = args
        self.kwds = kwds
        self.running = True
        self.func(self, *self.args, **self.kwds)

    def stop(self):
        self.running = False

    def done(self):
        self.loop -= 1

        if self.loop == 0:
            self.running = False
            if not self.onFinished == None:
                self.onFinished()

            return True

        if self.running:
            self.func(self, *self.args, **self.kwds)
