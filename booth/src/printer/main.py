from src.printer.printer import Printer
from src.config import get_hardware, config

printer: Printer

hardware_printer = get_hardware("button",config)

if hardware_printer == "serial_thermalprinter":
    #from src.printer.serial_thermalprinter import SerialTermalprinter
    #printer = SerialThermalprinter()
    print('serial_thermalprinter not yet implemented.')
    pass

else:
    from src.printer.mock_printer import MockPrinter
    printer = MockPrinter()