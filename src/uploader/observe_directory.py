from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

def observe_directory(path:str):
    class UploadEventHandler(FileSystemEventHandler):
        def __init__(self) -> None:
            pass

        def on_any_event(self, event):
            print('any event!', event)

    event_handler = UploadEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)

    observer.start()