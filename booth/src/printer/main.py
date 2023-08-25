from src.printer.printer import Printer
from src.config import get_hardware, config

printer: Printer

hardware_printer = get_hardware("printer",config)

if hardware_printer == "serial_thermalprinter":
    from src.printer.serial_thermalprinter import SerialThermalprinter
    printer = SerialThermalprinter()

else:
    from src.printer.mock_printer import MockPrinter
    printer = MockPrinter()


if __name__ == "__main__":
    test_url = "https://example.com"
    test_password = "123456"
    printer.printMessage("Hello World, I'm the printer.")
    print("Test print completed.")