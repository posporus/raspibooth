from src.button.button import Button
from src.config import get_hardware, config

start_button: Button

hardware_start_button = get_hardware("start_button", config)

if hardware_start_button == "gpio":
    from src.button.gpio_button import GpioButton
    pin = config['hardware']['start_button']['gpio']
    start_button = GpioButton(pin)
else:
    from src.button.mock_button import MockButton
    start_button = MockButton()

# Proof of functionality in the main section
if __name__ == "__main__":
    print("Configured start_button", start_button)
    
