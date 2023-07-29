from ringlight import Ringlight
import unittest
import time
class TestRinglight(unittest.TestCase):
    def setUp(self) -> None:
        self.r = Ringlight(18,32)
    def testRinglight(self):
        time.sleep(1)
        self.r.set_state("idle")
        time.sleep(1)
        self.r.set_state("loading")
        time.sleep(1)
        self.r.set_state("postprocessing")
        time.sleep(1)
        self.r.set_state("blackout")
