from tests.hardware.test_button import test_button
from tests.hardware.test_ringlight import test_ringlight
from tests.hardware.test_printer import test_printer

print("Hardwaretest.")
if test_button():
    print("buttontest successful.")

print("Ringlighttest.")
if test_ringlight():
    print("ringlight test complete.")

print("Printer.")
if test_printer():
    print("printer test complete.")