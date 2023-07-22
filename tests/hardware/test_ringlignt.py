import unittest
from src.load_config import config
import time
from rpi_ws281x import PixelStrip, Color


class TestRealLEDStrip(unittest.TestCase):
    @classmethod
    def setUp(self):
        LED_COUNT = config['RINGLIGHT']['LED_COUNT']
        LED_PIN = config['RINGLIGHT']['LED_PIN']
        LED_FREQ_HZ = 800000  # LED signal frequency in Hz
        LED_DMA = 10  # DMA channel to use for generating signal
        LED_BRIGHTNESS = 255  # Adjust the brightness (0 to 255)
        LED_INVERT = False  # True to invert the signal
        self.strip = strip = PixelStrip(
            LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS)
        self.strip.begin()

    @classmethod
    def tearDownClass(cls) -> None:
        clear_pixels(cls.strip)

    def test_led_strip(self):
        for i in range(32):
            self.led_strip.turn_on_led(i)
            if input(f"Press Enter if LED {i} is ON, or type 'N' and press Enter if it's not...").upper() == 'N':
                self.fail(f"LED {i} did not turn ON as expected")
            self.led_strip.turn_off_all()

    def test_rainbow(self):
        rainbow_cycle(self.strip)
        if input(f"Press Enter if LED you see the rainbow, or type 'N' and press Enter if not...").upper() == 'N':
            self.fail(f"No rainbow :((")

    def test_red(self):
        set_solid(self.strip, Color(255, 0, 0))
        if input(f"Press Enter if LED you see REG, or type 'N' and press Enter if not...").upper() == 'N':
            self.fail(f"No red :(")

    def test_green(self):
        set_solid(self.strip, Color(0, 255, 0))
        if input(f"Press Enter if LED you see GREEN, or type 'N' and press Enter if not...").upper() == 'N':
            self.fail(f"No green :(")

    def test_blue(self):
        set_solid(self.strip, Color(0, 0, 255))
        if input(f"Press Enter if LED you see BLUE, or type 'N' and press Enter if not...").upper() == 'N':
            self.fail(f"No blue :(")



# helpers

def set_solid(strip: PixelStrip, color=Color(0, 0, 0)):
    # Turn off all LEDs
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, color)
    strip.show()


def clear_pixels(strip: PixelStrip):
    # Turn off all LEDs
    set_solid(strip)


def rainbow_cycle(strip: PixelStrip, wait_time=0.005):
    # Cycle the entire LED strip through the rainbow
    for j in range(255):
        for i in range(strip.numPixels()):
            pixel_index = (i * 256 // strip.numPixels()) + j
            strip.setPixelColor(i, wheel(pixel_index & 255))
        strip.show()
        time.sleep(wait_time)


def wheel(pos):
    # Generate a color wheel value
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)
