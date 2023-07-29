from abc import ABC, abstractmethod


class LedStrip(ABC):
    @abstractmethod
    def set_state(self):
        pass
    

