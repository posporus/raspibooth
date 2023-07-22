import time
from rpi_ws281x import PixelStrip, Color
from src.load_config import config


# LED strip configuration
LED_COUNT = config['RINGLIGHT']['LED_COUNT']
LED_PIN = config['RINGLIGHT']['LED_PIN']
LED_FREQ_HZ = 800000  # LED signal frequency in Hz
LED_DMA = 10  # DMA channel to use for generating signal
LED_BRIGHTNESS = 255  # Adjust the brightness (0 to 255)
LED_INVERT = False  # True to invert the signal

# Initialize the LED strip
strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS)
strip.begin()

def clear_pixels():
    # Turn off all LEDs
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(0, 0, 0))
    strip.show()

def color_wipe(color, wait_time=0.05):
    # Wipe the LED strip with a single color
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, color)
        strip.show()
        time.sleep(wait_time)

def rainbow_cycle(wait_time=0.005):
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

def test_ringlight():
    try:
        # Test basic animations
        
        print("Color wipe animation")
        color_wipe(Color(255, 0, 0))  # Red
        time.sleep(1)

        print("Rainbow cycle animation")
        rainbow_cycle()
        time.sleep(1)

    except KeyboardInterrupt:
        print("Animation interrupted.")
    finally:
        clear_pixels()
        return True

if __name__ == "__main__":
    test_ringlight()
