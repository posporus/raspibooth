from src.booth_runner import BoothRunner
from src.camera.main import camera
from src.config import config


from src.button.gpio_button import GpioButton


def main():




    booth_runner = BoothRunner(
        camera
        ringlight=Ringlight(**config_dict['ringlight']),
        printer=ThermalPrinter(),
        start_button=GpioButton(config.button.pin)
    )
    booth_runner.run()

    GPIO.cleanup()


if __name__ == '__main__':
    main()
