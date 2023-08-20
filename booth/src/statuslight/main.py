from .statuslight import StatusLight
from src.config import getHardware, config

statuslight: StatusLight

hardware_statuslight = getHardware("statuslight")

if hardware_statuslight == "ws281x":
    import statuslight_ws281x
    statuslight = statuslight_ws281x.StatusLightWS281x()

else:
    import mock_statuslight
    staticmethod = mock_statuslight.MockStatusLight()