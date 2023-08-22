from src.statuslight.statuslight import StatusLight
from src.config import get_hardware, config

statuslight: StatusLight

hardware_statuslight = get_hardware("statuslight",config)

if hardware_statuslight == "ws281x":
    from src.statuslight.statuslight_ws281x import StatusLightWS281x
    statuslight = StatusLightWS281x()

else:
    from src.statuslight.mock_statuslight import MockStatusLight
    statuslight = MockStatusLight()