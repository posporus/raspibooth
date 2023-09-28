from src.printer.printer import Printer
from escpos.printer import Serial, Dummy

class SerialThermalprinter(Printer):
    def __init__(self) -> None:
        self.p = Serial(devfile='/dev/serial0',
            baudrate=9600,
            bytesize=8,
            parity='N',
            stopbits=1,
            timeout=1.00,
            dsrdtr=True,
            # profile="NT-5890K"
            profile="ZJ-5870"
            )
        self.d = Dummy()

    def printQr(self, title, qrcode, token, message, url):

        self.d.set(underline=True,bold=True,align='center')
        self.d.text(f'{title}\n')

        self.d.qr(qrcode,size=4, center=True)

        self.d.set(align='center')
        self.d.text(f"-------- OR --------\n")
        self.d.set(underline=True,align='center')
        self.d.text(f"{url}\n")

        self.d.set(align='center')
        self.d.text(f"Access Token:\n")
        self.d.set(bold=True,align='center')
        self.d.text(f"{token}\n")
        self.d.set(bold=False,align='center')
        self.d.text(f'---------------------\n\n')

        self.d.set(align='left')
        self.d.text(f'{message}\n')

        self.d.print_and_feed(5)

        self.p._raw(self.d.output)

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
    url = "https://example.com"
    printer.printQr(test_title, test_qrcode, test_token, test_message, url)
    print("Test print completed.")
