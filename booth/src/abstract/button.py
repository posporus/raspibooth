from abc import ABC, abstractmethod


class Button(ABC):
    @abstractmethod
    def when_pressed(self, callback):
        pass
    @abstractmethod
    def wait(self):
        pass
