class Effect:
    loopable: bool
    running: bool
    func: function
    onFinished: function

    def __init__(self, func: function, loopable=False) -> None:
        self.func = func
        self.loopable = loopable

    def play(self, args):
        func(args)
        pass

    

    def stop(self):
        pass