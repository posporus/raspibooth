# from .printer import Printer
# from escpos.printer import Serial


# class SerialThermalprinter(Printer):
#     def __init__(self) -> None:
#         self.p = Serial(devfile='/dev/serial0',
#             baudrate=9600,
#             bytesize=8,
#             parity='N',
#             stopbits=1,
#             timeout=1.00,
#             dsrdtr=True)

#     def printQr(self, url:str, password:str):
#         full_url = f'{url}#{password}'
#         self.p.text("Thank you for choosing RaspiBooth!")
#         self.p.text(f"Scan QR-Code or visit {url} and enter password: {password}")
#         self.p.qr(full_url)
#         pass