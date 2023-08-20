from .printer import Printer


class MockPrinter(Printer):
    def printQr(self, title, qrcode, token, message):
        print(
            f"""
\033[1m\033[94m{title}\033[0m
\033[93m{qrcode}\033
\033[92mAccess Token:\033[0m \033[91m{token}\033[0m
{message}
"""
        )

    def printMessage(self, message):
        print(f"\033[92m{message}\033[0m")

# if __name__ == "__main__":
#     mock_printer = MockPrinter()
#     mock_printer.printQr("Sample Title", "Sample QR Code", "Sample Token", "Sample Message")
#     mock_printer.printMessage("This is a test message.")