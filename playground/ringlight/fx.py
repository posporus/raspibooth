from ringlight.effect import Effect
from rpi_ws281x import Color
import time
from ringlight.strip import strip


Effect.strip = strip


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


@Effect
def solid(self: Effect, color: Color, wait_ms=0):
    for i in range(self.strip.numPixels()):
        self.strip.setPixelColor(i, color)
    self.strip.show()
    if wait_ms:
        time.sleep(wait_ms / 1000.0)

    self.done()


@Effect
def blackout(self: Effect, wait_ms=0):
    """Set every pixel to 0"""
    for i in range(self.strip.numPixels()):
        self.strip.setPixelColor(i, Color(0, 0, 0))
    self.strip.show()
    if wait_ms:
        time.sleep(wait_ms / 1000.0)

    self.done()


@Effect
def colorWipe(self: Effect, color, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(self.strip.numPixels()):
        if self.running == False:
            break
        self.strip.setPixelColor(i, color)
        self.strip.show()
        time.sleep(wait_ms / 1000.0)
    self.done()


@Effect
def theaterChase(self, color, wait_ms=50):
    """Movie theater light style chaser animation."""
    
    for q in range(3):
        if self.running == False:
            break

        for i in range(0, self.strip.numPixels(), 3):
            self.strip.setPixelColor(i + q, color)
        self.strip.show()
        time.sleep(wait_ms / 1000.0)
        for i in range(0, self.strip.numPixels(), 3):
            self.strip.setPixelColor(i + q, 0)

    self.done()

@Effect
def rainbow(self, wait_ms=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256 * iterations):
        if self.running == False:
            break

        for i in range(self.strip.numPixels()):
            self.strip.setPixelColor(i, wheel((i + j) & 255))
        self.strip.show()
        time.sleep(wait_ms / 1000.0)
    self.done()

