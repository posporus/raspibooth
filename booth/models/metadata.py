from typing import Optional, Any, TypeVar, Type, cast


T = TypeVar("T")


def from_float(x: Any) -> float:
    assert isinstance(x, (float, int)) and not isinstance(x, bool)
    return float(x)


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


def from_none(x: Any) -> Any:
    assert x is None
    return x


def from_union(fs, x):
    for f in fs:
        try:
            return f(x)
        except:
            pass
    assert False


def to_float(x: Any) -> float:
    assert isinstance(x, float)
    return x


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


class Metadata:
    duration: float
    event_name: Optional[str]
    fps: float
    location: Optional[str]
    play_speed: Optional[float]
    timestamp: float

    def __init__(self, duration: float, event_name: Optional[str], fps: float, location: Optional[str], play_speed: Optional[float], timestamp: float) -> None:
        self.duration = duration
        self.event_name = event_name
        self.fps = fps
        self.location = location
        self.play_speed = play_speed
        self.timestamp = timestamp

    @staticmethod
    def from_dict(obj: Any) -> 'Metadata':
        assert isinstance(obj, dict)
        duration = from_float(obj.get("duration"))
        event_name = from_union([from_str, from_none], obj.get("eventName"))
        fps = from_float(obj.get("fps"))
        location = from_union([from_str, from_none], obj.get("location"))
        play_speed = from_union([from_float, from_none], obj.get("playSpeed"))
        timestamp = from_float(obj.get("timestamp"))
        return Metadata(duration, event_name, fps, location, play_speed, timestamp)

    def to_dict(self) -> dict:
        result: dict = {}
        result["duration"] = to_float(self.duration)
        if self.event_name is not None:
            result["eventName"] = from_union([from_str, from_none], self.event_name)
        result["fps"] = to_float(self.fps)
        if self.location is not None:
            result["location"] = from_union([from_str, from_none], self.location)
        if self.play_speed is not None:
            result["playSpeed"] = from_union([to_float, from_none], self.play_speed)
        result["timestamp"] = to_float(self.timestamp)
        return result


def metadata_from_dict(s: Any) -> Metadata:
    return Metadata.from_dict(s)


def metadata_to_dict(x: Metadata) -> Any:
    return to_class(Metadata, x)
