from abc import ABC, abstractmethod

'''
[title]
[QR-code] <- containing [url]/[fileId]#[password]
Access Token: [token]
[message]
'''


class Printer(ABC):
    @abstractmethod
    def printQr(self, title, qrcode, token, message):
        pass

    @abstractmethod
    def printMessage(self, message):
        pass