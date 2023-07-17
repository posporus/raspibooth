from ringlight.fx.effect_class import Effect
from rpi_ws281x import PixelStrip
import time

@Effect
def colorWipe(strip:PixelStrip, color, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, color)
        strip.show()
        time.sleep(wait_ms / 1000.0)