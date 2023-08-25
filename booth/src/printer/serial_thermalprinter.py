from src.printer.printer import Printer
from escpos.printer import Serial

class SerialThermalprinter(Printer):
    def __init__(self) -> None:
        self.p = Serial(devfile='/dev/serial0',
            baudrate=9600,
            bytesize=8,
            parity='N',
            stopbits=1,
            timeout=1.00,
            dsrdtr=True)

    def printQr(self, title, qrcode, token, message):
        self.p.text(f'{title}\n')
        self.p.qr(qrcode)
        self.p.text(f"Access Token: {token}\n")
        self.p.text(f'{message}\n')
        self.p.print_and_feed(3)

    def printMessage(self, message):
        self.p.text(message)
        self.p.print_and_feed(3)

# Simple test in the main section
if __name__ == "__main__":
    printer = SerialThermalprinter()
    test_title = "RaspiBooth QR Code"
    test_qrcode = "https://example.com/qr"
    test_token = "ABC123"
    test_message = "Thank you for choosing RaspiBooth!"
    printer.printQr(test_title, test_qrcode, test_token, test_message)
    print("Test print completed.")
