from rpi_ws281x import PixelStrip, Color
from threading import Thread
import time
from src.statuslight.statuslight import StatusLight


def theaterChase(ringlight, color):
    """Movie theater light style chaser animation."""
    for q in range(3):

        for i in range(0, ringlight.strip.numPixels(), 3):
            ringlight.strip.setPixelColor(i + q, color)
        ringlight.strip.show()
        time.sleep(0.05)
        for i in range(0, ringlight.strip.numPixels(), 3):
            ringlight.strip.setPixelColor(i + q, 0)


def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)


def make_color_darker(color, scale_factor):
    r = (color >> 16) & 0xFF
    g = (color >> 8) & 0xFF
    b = color & 0xFF

    r = int(r * scale_factor)
    g = int(g * scale_factor)
    b = int(b * scale_factor)

    # print(scale_factor,r,g,b)

    return Color(r, g, b)


def fx_idle(ringlight: 'StatusLightWS281x', j):
    # print(locals())
    ringlight.strip.setBrightness(20)
    for i in range(ringlight.strip.numPixels()):
        ringlight.strip.setPixelColor(i, wheel((i + j) & 255))
    ringlight.strip.show()
    time.sleep(0.02)


def fx_posprocessing(ringlight: 'StatusLightWS281x', _i):
    theaterChase(ringlight, Color(140, 30, 80))


def fx_loading(ringlight: 'StatusLightWS281x', _i):
    """Draws a moving pixel with a tail."""
    color = Color(255, 200, 100)
    tail = 6

    num_pixels = ringlight.strip.numPixels()
    i = _i % num_pixels

    for t in range(1, tail+1):
        # turn off the pixel at the tail
        n = i-t
        if n < 0:
            n = num_pixels + n
        ringlight.strip.setPixelColor(
            n, make_color_darker(color, 1-t/tail))

    ringlight.strip.show()
    time.sleep(0.03)

def fx_blackout(ringlight:'StatusLightWS281x',_i):
    for i in range(ringlight.strip.numPixels()):
        ringlight.strip.setPixelColor(i, Color(0, 0, 0))
    ringlight.strip.show()


class StatusLightWS281x(StatusLight):
    state = "postprocessing"

    def __init__(self, pin: int, led_count: int) -> None:

        LED_COUNT = led_count        # Number of LED pixels.
        # GPIO pin connected to the pixels (18 uses PWM!).
        LED_PIN = pin
        # LED_PIN = 10        # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
        # LED signal frequency in hertz (usually 800khz)
        LED_FREQ_HZ = 800000
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

        self.effects = {
            "idle": fx_idle,
            "postprocessing": fx_posprocessing,
            "loading": fx_loading,
            "blackout": fx_blackout
        }

        self.thread = Thread(target=self.run)
        self.thread.start()

        self.sleep = 0.02

    def run(self):
        i = 0
        while True:
            i += 1
            effect = self.effects[self.state]
            effect(self, i)

    def set_state(self, state):
        self.state = state
