import yaml
import heapq
import time
from src.runner.action import Action


class Timeline:
    def __init__(self):
        self.actions = []

    def schedule(self, action):
        heapq.heappush(self.actions, action)

    def run(self):
        start_time = time.time()

        while self.actions:
            elapsed_time = (time.time() - start_time) * 1000  # Convert to milliseconds
            
            # Wait until the next action is due
            next_action_time = self.actions[0].time
            time_to_next_action = max(0, next_action_time - elapsed_time) / 1000.0  # Convert back to seconds
            time.sleep(time_to_next_action)
            
            # Execute all due actions
            for action in self.actions[:]:
                if elapsed_time >= action.time:
                    action.execute()
                    self.actions.remove(action)


    def save_to_yaml(self, filename):
        with open(filename, 'w') as f:
            yaml_data = {
                'metadata': self.metadata,
                'actions': [{'time': a.time, 'function': a.function.__name__, 'args': list(a.args)} for a in self.actions]
            }
            yaml.dump(yaml_data, f)

    def load_from_yaml(self, filename, functions_map):
        with open(filename, 'r') as f:
            yaml_data = yaml.safe_load(f)
            self.metadata = yaml_data.get('metadata', {})  # Load metadata if available
            print('metadata',self.metadata)

            for data in yaml_data.get('actions', []):
                function_name = data['function']
                time = data['time']
                args = tuple(data['args'])
                self.schedule(Action(time, functions_map[function_name], args=args))
