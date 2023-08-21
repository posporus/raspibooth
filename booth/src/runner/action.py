class Action:
    def __init__(self, time, function, args=None):
        self.time = time
        self.function = function
        self.args = args if args else ()

    def __lt__(self, other):
        return self.time < other.time

    def execute(self):
        self.function(*self.args)