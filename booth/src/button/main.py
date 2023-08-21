from src.button.button import Button
from src.config import get_hardware, config

start_button: Button

hardware_start_button = get_hardware("button",config)

if hardware_start_button == "gpio":
    from src.button.gpio_button import GpioButton
    pin = config['hardware']['start_button']['gpio']
    start_button = GpioButton(pin)

else:
    from src.button.mock_button import MockButton
    start_button = MockButton()