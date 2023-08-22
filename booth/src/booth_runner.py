from src.camera.camera import Camera
from printer.printer import Printer
from src.statuslight.statuslight import StatusLight
from src.button.button import Button
import time

import threading

def buttoncp():
    print('preeeeessssss!')

class BoothRunner():
    def __init__(self,camera:Camera, start_button:Button, statuslight:StatusLight, printer:Printer) -> None:
        self.camera = camera
        self.ringlight = ringlight
        self.start_button = start_button
        self.printer = printer
        
        pass
    

    def run(self):
        
        # self.ringlight.set_state('idle')
        # self.start_button.wait()
        # time.sleep(1)
        # self.ringlight.set_state('loading')
        # time.sleep(1)
        # self.ringlight.set_state('blackout')

        # self.action_loop()
        pass

        
        # - run thru action loops
        # - 
        

    def action_loop(self,iterations = 4):
        files = []
        for i in range(iterations):
            pass


    def action(self):
        pass
    
    def post_processing(self, files: list):
        pass