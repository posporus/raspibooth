import yaml

class Button:
    def __init__(self, pin):
        self.pin = pin

class RingLight:
    def __init__(self, pin, led_count):
        self.pin = pin
        self.led_count = led_count

class Camera:
    def __init__(self, width, height, rotation, duration):
        self.width = width
        self.height = height
        self.rotation = rotation
        self.duration = duration

class Config:
    def __init__(self, button, ringlight, camera):
        self.button = Button(**button)
        self.ringlight = RingLight(**ringlight)
        self.camera = Camera(**camera)

with open("config.yml", 'r') as stream:
    config_dict = yaml.safe_load(stream)
    config = Config(**config_dict)
