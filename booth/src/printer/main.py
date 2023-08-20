from .printer import Printer
from src.config import getHardware, config

printer: Printer

hardware_printer = getHardware("button")

if hardware_printer == "serial_thermalprinter":
    import printer.serial_thermalprinter as serial_thermalprinter
    printer = serial_thermalprinter.SerialThermalprinter()

else:
    import mock_printer
    printer = mock_printer.MockPrinter()