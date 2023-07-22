from abc import ABC, abstractmethod


class Printer(ABC):
    @abstractmethod
    def text(self, text):
        pass

    @abstractmethod
    def qr_code(self, data):
        pass
