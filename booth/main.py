from src.booth_runner import BoothRunner
from src.camera_picamera import CameraPiCamera
from src.thermal_printer import ThermalPrinter
from src.ringlight import Ringlight
from src.concatenate_videos import concatenate_videos
from src.utility.load_config import config, config_dict
import RPi.GPIO as GPIO
from src.gpio_button import GpioButton


def main():


    booth_runner = BoothRunner(
        camera=CameraPiCamera(
            config.camera.width,
            config.camera.height,
            rotation=config.camera.rotation
        ),
        ringlight=Ringlight(**config_dict['ringlight']),
        printer=ThermalPrinter(),
        start_button=GpioButton(config.button.pin)
    )
    booth_runner.run()

    GPIO.cleanup()


if __name__ == '__main__':
    main()
