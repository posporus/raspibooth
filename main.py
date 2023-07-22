# from sys import settrace

# from rpi_ws281x import Color
# from ringlight import fx
# from ringlight.strip import strip
# import time

# if __name__ == "__main__":
    
#     fx.theaterChase.loop = -1
#     #theaterChase(Color(100,100,100))
#     fx.rainbow.loop = -1
#     fx.rainbow.brightness =20
#     fx.rainbow()
#     fx.blackout()
#     time.sleep(1)
#     fx.solid(Color(2,55,100))

from src.load_config import config

print(config)