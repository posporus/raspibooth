from abc import ABC, abstractmethod


class AudioPlayer(ABC):
    @abstractmethod
    def one_shot(self, file, channels):
        pass

    @abstractmethod
    def loop(self, file, channels):
        pass
