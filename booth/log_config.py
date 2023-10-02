import logging

logging.basicConfig(filename='raspibooth.log', level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')

# Optionally, configure additional handlers, like a console handler:
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s: %(message)s')
console_handler.setFormatter(formatter)

# Add the console handler to the root logger
root_logger = logging.getLogger()
root_logger.addHandler(console_handler)
