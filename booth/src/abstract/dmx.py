from abc import ABC, abstractmethod


class DMXFixture(ABC):
    @property
    @abstractmethod
    def address(self):
        pass

    @abstractmethod
    def set_channel(self, value):
        pass
