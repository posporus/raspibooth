from src.camera.camera import Camera
from src.config import get_hardware, config

camera: Camera

hardware_camera = get_hardware("camera", config)
[width, height] = config["video"]["resolution"]
fps = config["video"]["fps"]
rotation = config["video"]["rotation"]

if hardware_camera == "picamera":
    from src.camera.camera_picamera import CameraPiCamera

    camera = CameraPiCamera(width, height, fps, rotation)

else:
    from src.camera.mock_camera import MockCamera

    camera = MockCamera(width, height, fps)
