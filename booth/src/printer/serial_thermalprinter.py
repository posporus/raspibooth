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
        self.p.set(underline=True)
        self.p.text(f'{title}\n')
        self.p.set(underline=False)
        self.p.qr(qrcode,size=4, center=True)
        self.p.text(f"Access Token:\n")
        self.p.set(bold=True,align='center')
        self.p.text(f"{token}\n")
        self.p.set(bold=False,align='left')
        self.p.set(align='center')
        self.p.text(f'-----------------\n')
        self.p.set(align='left')
        self.p.text(f'{message}\n')

        self.p.print_and_feed(5)

    def printMessage(self, message):
        self.p.text(message)
        self.p.print_and_feed(3)

# Simple test in the main section
if __name__ == "__main__":
    printer = SerialThermalprinter()
    test_title = "RaspiBooth QR Code"
    test_qrcode = "https://example.com/qrasdfasdf#ölkasjdö"
    test_token = "jgeh3-ldD8e-0jL4d-uzdbD"
    test_message = "Thank you for choosing RaspiBooth!"
    printer.printQr(test_title, test_qrcode, test_token, test_message)
    print("Test print completed.")
