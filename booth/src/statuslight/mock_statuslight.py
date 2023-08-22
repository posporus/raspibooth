from src.statuslight.statuslight import StatusLight

class MockStatusLight(StatusLight):
    state = "postprocessing"

    def __init__(self) -> None:
        self._effects = {
            "idle": self.fx_idle,
            "postprocessing": self.fx_postprocessing,
            "loading": self.fx_loading,
            "blackout": self.fx_blackout
        }

    @property
    def effects(self):
        return self._effects

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

if __name__ == "__main__":
    # Create an instance of MockStatusLight
    mock_light = MockStatusLight()

    # Test setting different states and observe the terminal outputs
    states_to_test = ["idle", "postprocessing", "loading", "blackout", "nonexistent_state"]
    for state in states_to_test:
        print(f"Setting state to: {state}")
        mock_light.set_state(state)
        print("\n")
