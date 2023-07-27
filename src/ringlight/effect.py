from typing import Any
from rpi_ws281x import PixelStrip
from collections import Callable
from threading import Thread
from threading import Event


class Effect(object):
    running: bool = False
    func: Callable
    onFinished: Callable = None
    strip: PixelStrip
    loop: int = 1
    brightness = 255
    #thread: Thread
    stop_event:Event

    

    def __init__(self, func: Callable) -> None:
        self.func = func
        self.stop_event = Event()

    def __call__(self, *args: Any) -> Any:
        print('thread!',args)

        self.strip.setBrightness(self.brightness)
        self.args = args
        self.running = True
        #self.thread = Thread(target=self.func,args=(self, *self.args))
        self.func(self, *self.args)
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
            self.func(self, *self.args)
