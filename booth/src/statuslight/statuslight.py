from abc import ABC, abstractmethod
from _collections_abc import Callable


class StatusLight(ABC):
    @abstractmethod
    def set_state(self):
        pass

    @property
    @abstractmethod
    def effects() -> (
        {
            "idle": Callable,
            "postprocessing": Callable,
            "loading": Callable,
            "blackout": Callable,
        }
    ):
        pass
