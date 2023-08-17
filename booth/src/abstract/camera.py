from abc import ABC, abstractmethod
from pathlib import Path


class Camera(ABC):
    @property
    @abstractmethod
    def width(self) -> int:
        pass

    @property
    @abstractmethod
    def height(self) -> int:
        pass

    @property
    @abstractmethod
    def fps(self) -> int:
        pass

    # @abstractmethod
    # def take_picture(self, fp: Path or str):
    #     pass

    @abstractmethod
    def take_video(self, fp: Path or str, duration_ms=500):
        pass
