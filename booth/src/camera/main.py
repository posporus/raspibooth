from camera import Camera
from src.config import getHardware, config

camera: Camera

hardware_camera = getHardware("camera")
[width, height] = config["video"]["resolution"]
fps = config["video"]["fps"]
rotation = config["video"]["rotation"]

if hardware_camera == "picamera":
    import camera_picamera
    camera = camera_picamera.CameraPiCamera(width,height,fps,rotation)

else:
    import mock_camera
    camera = mock_camera.MockCamera(width,height,fps)