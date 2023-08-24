from src.statuslight.statuslight import StatusLight
from src.config import get_hardware, config

statuslight: StatusLight

hardware_statuslight = get_hardware("statuslight",config)

if hardware_statuslight == "ws281x":
    from src.statuslight.statuslight_ws281x import StatusLightWS281x
    count = config['hardware']["statuslight"]["ws281x"]["count"]
    pin = config['hardware']["statuslight"]["ws281x"]["pin"]
    statuslight = StatusLightWS281x(pin,count)

else:
    from src.statuslight.mock_statuslight import MockStatusLight
    statuslight = MockStatusLight()