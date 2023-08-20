from button import Button
from src.config import getHardware, config

start_button: Button

hardware_start_button = getHardware("button")

if hardware_start_button == "gpio":
    import gpio_button
    pin = config['hardware']['start_button']['gpio']
    start_button = gpio_button.GpioButton(pin)

else:
    import mock_button
    start_button = mock_button.MockButton()