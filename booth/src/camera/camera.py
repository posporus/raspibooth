from abc import ABC, abstractmethod
from pathlib import Path


class Camera(ABC):
    @abstractmethod
    def __init__(self,width: int, height: int, fps:int) -> None:
        pass

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
    def record_video(self, fp: Path or str, duration_ms=500):
        pass
    
    @abstractmethod
    def completed(self):
        pass

