from abc import ABC, abstractmethod


class RgbLeds(ABC):
    @abstractmethod
    def one_shot(self, effect):
        pass

    @abstractmethod
    def loop(self, effect):
        pass

    @abstractmethod
    def set_solid(self, r=0, g=0, b=0):
        pass
