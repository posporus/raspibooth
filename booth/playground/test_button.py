from utility.load_config import config
import RPi.GPIO as GPIO
import threading

# Set the GPIO mode and the GPIO pin number
BUTTON_PIN = config['GPIO']['BUTTON_PIN']
button_event = threading.Event()

def button_callback(channel):
    button_event.set()

def test_button():
    # Set up GPIO mode and pin
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    # Add an event detection for the button press
    GPIO.add_event_detect(BUTTON_PIN, GPIO.FALLING, callback=button_callback, bouncetime=300)

    print("Weiting for the button to be pressed...")

    # Wait for the button press event
    button_event.wait()

    # Clean up the GPIO settings
    GPIO.cleanup()

    return True

if __name__ == "__main__":
    test_button()