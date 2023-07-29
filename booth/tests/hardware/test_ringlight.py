import unittest
from src.ringlight.main import Ringlight
from src.ringlight.fx import rainbow
import time

class TestRinglight(unittest.TestCase):
    def setUp(self) -> None:
        self.ringlight = Ringlight(18,32)

    def testIdle(self):
        self.ringlight.idle()
        time.sleep(2)
        print('2 seconds over.')
        self.ringlight.stop()
        time.sleep(1)
        print('1 second over')
        self.ringlight.working()
        time.sleep(1)
        print('another 1 second over.')
        self.ringlight.blackout()