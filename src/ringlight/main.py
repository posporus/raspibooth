from src.abstract.rgbLeds import RgbLeds
from rpi_ws281x import PixelStrip, Color
from src.ringlight.effect import Effect
from src.ringlight.fx import *
import asyncio
from threading import Event, Thread


class Ringlight(RgbLeds):

    def __init__(self, pin: int, led_count: int) -> None:

        LED_COUNT = led_count        # Number of LED pixels.
        # GPIO pin connected to the pixels (18 uses PWM!).
        LED_PIN = pin
        # LED_PIN = 10        # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
        LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
        # DMA channel to use for generating signal (try 10)
        LED_DMA = 10
        LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
        # True to invert the signal (when using NPN transistor level shift)
        LED_INVERT = False
        LED_CHANNEL = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

        self.strip = PixelStrip(
            LED_COUNT,
            LED_PIN,
            LED_FREQ_HZ,
            LED_DMA,
            LED_INVERT,
            LED_BRIGHTNESS,
            LED_CHANNEL,
        )

        self.strip.begin()

        self.stop_event = Event()


        self.current_fx = blackout


    def working(self):
        theaterChase.brightness =20
        theaterChase.loop = -1
        self.current_fx = self.fx_run(theaterChase,Color(255,0,0))

    def idle(self):
        rainbow.brightness = 20
        rainbow.loop = -1
        self.current_fx = self.fx_run(rainbow)
    
    def blackout(self):
        self.current_fx = self.fx_run(blackout)
    
    def stop(self):
        self.current_fx.stop()

    def fx_run(self, effect: Effect, *args):
        effect.strip = self.strip    
        thread = Thread(target=effect,args=args)
        self.stop()
        thread.start()
        return effect

    # def blackout(self, event:Event):
