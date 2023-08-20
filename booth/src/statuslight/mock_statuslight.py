from .statuslight import StatusLight

class MockStatusLight(StatusLight):
    state = "postprocessing"

    def __init__(self) -> None:
        self.effects = {
            "idle": self.fx_idle,
            "postprocessing": self.fx_postprocessing,
            "loading": self.fx_loading,
            "blackout": self.fx_blackout
        }
        self.sleep = 0.02

    def run_effect(self):
        effect = self.effects.get(self.state)
        if effect:
            effect()

    def set_state(self, state):
        self.state = state
        self.run_effect()

    # Mock effects with simple terminal outputs
    def fx_idle(self):
        print(f"[Mock LED] Idle effect")

    def fx_postprocessing(self):
        print(f"[Mock LED] Post-processing effect")

    def fx_loading(self):
        print(f"[Mock LED] Loading effect")

    def fx_blackout(self):
        print(f"[Mock LED] Blackout effect")
